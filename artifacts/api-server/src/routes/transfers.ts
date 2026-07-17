import { Router, type IRouter } from "express";
import { db, transfersTable, usersTable, type TimelineEventJson } from "@workspace/db";
import { desc, eq, sql } from "drizzle-orm";
import {
  AnalyzeTransferBody,
  CreateTransferBody,
  ListTransfersQueryParams,
  SimulateTransferBody,
} from "@workspace/api-zod";
import {
  analyzeDraft,
  buildRecipientContext,
  normalizeIban,
  SOCIAL_QUESTIONS,
  type RequiredAction,
} from "../lib/trust-engine";
import {
  APPROVAL_WINDOW_MS,
  COOLING_WINDOW_MS,
  DEMO_USER_ID,
  applyLifecycle,
  bumpStats,
  completeCooling,
  expireTransfer,
  formatSar,
  getDemoUser,
  makeReference,
  mapTransfer,
  notify,
  timelineEvent,
} from "../lib/aman-service";

const router: IRouter = Router();

const RISK_LABEL: Record<string, string> = {
  low: "ثقة مرتفعة",
  medium: "ثقة متوسطة",
  high: "خطورة مرتفعة",
};

router.post("/transfers/analyze", async (req, res): Promise<void> => {
  const parsed = AnalyzeTransferBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "تحقق من بيانات التحويل قبل التحليل" });
    return;
  }
  const ctx = await buildRecipientContext(DEMO_USER_ID, parsed.data);
  const analysis = analyzeDraft(parsed.data, ctx);
  req.log.info(
    { score: analysis.score, action: analysis.requiredAction },
    "trust analysis",
  );
  res.json(analysis);
});

router.get("/transfers", async (req, res): Promise<void> => {
  const query = ListTransfersQueryParams.safeParse(req.query);
  const statusFilter = query.success ? query.data.status : undefined;

  const rows = await db
    .select()
    .from(transfersTable)
    .where(eq(transfersTable.userId, DEMO_USER_ID))
    .orderBy(desc(transfersTable.createdAt));

  const result = [];
  for (const row of rows) {
    const fresh = await applyLifecycle(row);
    if (!statusFilter || fresh.status === statusFilter) {
      result.push(mapTransfer(fresh));
    }
  }
  res.json(result);
});

router.post("/transfers", async (req, res): Promise<void> => {
  const parsed = CreateTransferBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "تحقق من بيانات التحويل" });
    return;
  }
  const input = parsed.data;
  const user = await getDemoUser();

  if (input.amount > user.balance) {
    res.status(400).json({ error: "الرصيد المتاح غير كافٍ لإتمام هذا التحويل" });
    return;
  }

  const ctx = await buildRecipientContext(DEMO_USER_ID, input);
  const analysis = analyzeDraft(input, ctx);

  const timeline: TimelineEventJson[] = [
    timelineEvent(
      "analyzed",
      "اكتمل تحليل أمان",
      `درجة الثقة ${analysis.score}/100 — ${RISK_LABEL[analysis.riskLevel]}`,
    ),
  ];

  let action: RequiredAction = analysis.requiredAction;

  // طبقة 2: الفحص السلوكي (كشف الهندسة الاجتماعية)
  if (action === "social_check") {
    const answers = input.socialAnswers ?? [];
    if (answers.length === 0) {
      action = "recipient_approval";
      timeline.push(
        timelineEvent(
          "social_check",
          "لم يكتمل الفحص السلوكي",
          "تم رفع مستوى الحماية احترازيًا إلى موافقة المستلم",
        ),
      );
    } else {
      const redFlags = answers.filter((a) => {
        const q = SOCIAL_QUESTIONS.find((sq) => sq.id === a.questionId);
        return q?.redFlag && a.answer === true;
      }).length;

      if (redFlags >= 2) {
        action = "block";
        timeline.push(
          timelineEvent(
            "social_check",
            "الفحص السلوكي كشف مؤشرات احتيال",
            `${redFlags} من إجاباتك تطابق أساليب المحتالين المعروفة`,
          ),
        );
      } else if (redFlags === 1) {
        action = "recipient_approval";
        timeline.push(
          timelineEvent(
            "social_check",
            "الفحص السلوكي رصد مؤشرًا مقلقًا",
            "تم رفع مستوى الحماية إلى موافقة المستلم",
          ),
        );
      } else {
        action = "proceed";
        timeline.push(
          timelineEvent(
            "social_check",
            "اجتزت الفحص السلوكي",
            "لا مؤشرات تلاعب أو ضغط خارجي",
          ),
        );
      }
    }
  }

  // طبقة الإيقاف: منع التحويل أو فرض موافقة المستلم عند الإصرار
  if (action === "block" && input.overrideAcknowledged) {
    action = "recipient_approval";
    timeline.push(
      timelineEvent(
        "override",
        "اخترت المتابعة رغم التحذير",
        "فعّل أمان موافقة المستلم الإجبارية كطبقة حماية أخيرة — المبلغ لن يغادر حسابك قبل موافقته",
      ),
    );
  }

  const base = {
    userId: DEMO_USER_ID,
    beneficiaryId: ctx.beneficiary?.id ?? input.beneficiaryId ?? null,
    reference: makeReference(),
    recipientName: input.recipientName,
    recipientIban: normalizeIban(input.recipientIban),
    recipientBank: analysis.recipientPreview.bank,
    amount: input.amount,
    purpose: input.purpose ?? null,
    trustScore: analysis.score,
    riskLevel: analysis.riskLevel,
    factors: analysis.factors,
  };

  if (action === "block") {
    timeline.push(
      timelineEvent(
        "blocked",
        "أوقف أمان التحويل",
        "تطابق شبه مؤكد مع شبكة احتيال نشطة — لم يغادر أي مبلغ حسابك",
      ),
    );
    const [row] = await db
      .insert(transfersTable)
      .values({ ...base, status: "blocked", timeline })
      .returning();
    await bumpStats({ analyzed: 1, blocked: 1, protectedAmount: input.amount });
    await notify(
      "security",
      "أوقف أمان تحويلًا عالي الخطورة",
      `منع أمان تحويل ${formatSar(input.amount)} إلى «${input.recipientName}» لتطابقه مع شبكة احتيال نشطة. لم يُخصم أي مبلغ.`,
    );
    req.log.info({ transferId: row.id }, "transfer blocked");
    res.status(201).json(mapTransfer(row));
    return;
  }

  if (action === "proceed") {
    const now = new Date();
    timeline.push(
      timelineEvent("completed", "اكتمل التحويل", "وصل المبلغ إلى حساب المستلم", now),
    );
    const [row] = await db
      .insert(transfersTable)
      .values({ ...base, status: "completed", completedAt: now, timeline })
      .returning();
    await db
      .update(usersTable)
      .set({ balance: sql`${usersTable.balance} - ${input.amount}` })
      .where(eq(usersTable.id, DEMO_USER_ID));
    if (base.beneficiaryId) {
      await db.execute(
        sql`UPDATE beneficiaries SET transfer_count = transfer_count + 1, last_transfer_at = NOW() WHERE id = ${base.beneficiaryId}`,
      );
    }
    await bumpStats({ analyzed: 1 });
    await notify(
      "success",
      "اكتملت الحوالة بنجاح",
      `تم تحويل ${formatSar(input.amount)} إلى ${input.recipientName}.`,
    );
    res.status(201).json(mapTransfer(row));
    return;
  }

  // recipient_approval: حجز المبلغ حتى موافقة المستلم
  const deadline = new Date(Date.now() + APPROVAL_WINDOW_MS);
  timeline.push(
    timelineEvent(
      "awaiting",
      "بانتظار موافقة المستلم",
      "أُرسل طلب تأكيد للمستلم — المبلغ محجوز ولن يغادر حسابك قبل موافقته",
    ),
  );
  const [row] = await db
    .insert(transfersTable)
    .values({
      ...base,
      status: "awaiting_recipient_approval",
      approvalDeadline: deadline,
      timeline,
    })
    .returning();
  await db
    .update(usersTable)
    .set({
      balance: sql`${usersTable.balance} - ${input.amount}`,
      heldAmount: sql`${usersTable.heldAmount} + ${input.amount}`,
    })
    .where(eq(usersTable.id, DEMO_USER_ID));
  await bumpStats({ analyzed: 1, flagged: 1 });
  await notify(
    "pending",
    "بانتظار موافقة المستلم",
    `حوالة ${formatSar(input.amount)} إلى ${input.recipientName} تنتظر تأكيد المستلم. المبلغ محجوز في حسابك حتى الموافقة.`,
  );
  res.status(201).json(mapTransfer(row));
});

async function findOwnTransfer(id: number) {
  const [row] = await db
    .select()
    .from(transfersTable)
    .where(eq(transfersTable.id, id));
  if (!row || row.userId !== DEMO_USER_ID) return null;
  return row;
}

router.get("/transfers/:id", async (req, res): Promise<void> => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(404).json({ error: "التحويل غير موجود" });
    return;
  }
  const row = await findOwnTransfer(id);
  if (!row) {
    res.status(404).json({ error: "التحويل غير موجود" });
    return;
  }
  const fresh = await applyLifecycle(row);
  res.json(mapTransfer(fresh));
});

router.post("/transfers/:id/cancel", async (req, res): Promise<void> => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(404).json({ error: "التحويل غير موجود" });
    return;
  }
  const row = await findOwnTransfer(id);
  if (!row) {
    res.status(404).json({ error: "التحويل غير موجود" });
    return;
  }
  const fresh = await applyLifecycle(row);

  if (
    fresh.status !== "awaiting_recipient_approval" &&
    fresh.status !== "in_cooling_period"
  ) {
    res.status(409).json({ error: "لا يمكن إلغاء التحويل في حالته الحالية" });
    return;
  }

  const inCooling = fresh.status === "in_cooling_period";
  const timeline = [
    ...fresh.timeline,
    timelineEvent(
      "cancelled",
      inCooling ? "تراجعت خلال فترة التهدئة" : "ألغيت التحويل",
      "أُعيد المبلغ كاملًا إلى رصيدك فورًا",
    ),
  ];
  await db
    .update(transfersTable)
    .set({ status: "cancelled", timeline })
    .where(eq(transfersTable.id, fresh.id));
  await db
    .update(usersTable)
    .set({
      balance: sql`${usersTable.balance} + ${fresh.amount}`,
      heldAmount: sql`GREATEST(${usersTable.heldAmount} - ${fresh.amount}, 0)`,
    })
    .where(eq(usersTable.id, DEMO_USER_ID));
  await notify(
    "cancel",
    inCooling ? "تم التراجع خلال فترة التهدئة" : "أُلغي التحويل",
    `أُعيد مبلغ ${formatSar(fresh.amount)} إلى رصيدك — حوالة ${fresh.recipientName} لم تكتمل.`,
  );
  if (fresh.riskLevel === "high") {
    await bumpStats({ protectedAmount: fresh.amount });
  }
  res.json(mapTransfer({ ...fresh, status: "cancelled", timeline }));
});

router.post("/transfers/:id/simulate", async (req, res): Promise<void> => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(404).json({ error: "التحويل غير موجود" });
    return;
  }
  const parsed = SimulateTransferBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "إجراء محاكاة غير صالح" });
    return;
  }
  const row = await findOwnTransfer(id);
  if (!row) {
    res.status(404).json({ error: "التحويل غير موجود" });
    return;
  }
  const fresh = await applyLifecycle(row);
  const action = parsed.data.action;

  if (action === "recipient_approve") {
    if (fresh.status !== "awaiting_recipient_approval") {
      res.status(409).json({ error: "الإجراء غير متاح في الحالة الحالية" });
      return;
    }
    const coolingEndsAt = new Date(Date.now() + COOLING_WINDOW_MS);
    const timeline = [
      ...fresh.timeline,
      timelineEvent(
        "approved",
        "وافق المستلم على الاستلام",
        "بدأت فترة التهدئة — يمكنك التراجع واسترجاع المبلغ قبل انتهائها",
      ),
    ];
    await db
      .update(transfersTable)
      .set({ status: "in_cooling_period", coolingEndsAt, timeline })
      .where(eq(transfersTable.id, fresh.id));
    await notify(
      "pending",
      "وافق المستلم — بدأت فترة التهدئة",
      `لديك 90 ثانية للتراجع عن حوالة ${formatSar(fresh.amount)} إلى ${fresh.recipientName} قبل اكتمالها.`,
    );
    res.json(
      mapTransfer({ ...fresh, status: "in_cooling_period", coolingEndsAt, timeline }),
    );
    return;
  }

  if (action === "recipient_reject") {
    if (fresh.status !== "awaiting_recipient_approval") {
      res.status(409).json({ error: "الإجراء غير متاح في الحالة الحالية" });
      return;
    }
    const timeline = [
      ...fresh.timeline,
      timelineEvent(
        "rejected",
        "رفض المستلم الاستلام",
        "أُعيد المبلغ كاملًا إلى رصيدك فورًا",
      ),
    ];
    await db
      .update(transfersTable)
      .set({ status: "rejected_by_recipient", timeline })
      .where(eq(transfersTable.id, fresh.id));
    await db
      .update(usersTable)
      .set({
        balance: sql`${usersTable.balance} + ${fresh.amount}`,
        heldAmount: sql`GREATEST(${usersTable.heldAmount} - ${fresh.amount}, 0)`,
      })
      .where(eq(usersTable.id, DEMO_USER_ID));
    await notify(
      "cancel",
      "رفض المستلم الحوالة",
      `أُعيد مبلغ ${formatSar(fresh.amount)} إلى رصيدك بعد رفض ${fresh.recipientName} للاستلام.`,
    );
    await bumpStats({ protectedAmount: fresh.amount });
    res.json(mapTransfer({ ...fresh, status: "rejected_by_recipient", timeline }));
    return;
  }

  if (action === "skip_cooling") {
    if (fresh.status !== "in_cooling_period") {
      res.status(409).json({ error: "الإجراء غير متاح في الحالة الحالية" });
      return;
    }
    const done = await completeCooling(fresh, new Date());
    res.json(mapTransfer(done));
    return;
  }

  // expire_now
  if (fresh.status !== "awaiting_recipient_approval") {
    res.status(409).json({ error: "الإجراء غير متاح في الحالة الحالية" });
    return;
  }
  const expired = await expireTransfer(fresh, new Date());
  res.json(mapTransfer(expired));
});

export default router;
