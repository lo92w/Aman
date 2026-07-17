import {
  db,
  usersTable,
  beneficiariesTable,
  transfersTable,
  notificationsTable,
  securityStatsTable,
  type User,
  type Beneficiary,
  type Notification,
  type Transfer as TransferRow,
  type TimelineEventJson,
  type NotificationType,
} from "@workspace/db";
import { eq, sql } from "drizzle-orm";

export const DEMO_USER_ID = 1;
export const APPROVAL_WINDOW_MS = 10 * 60 * 1000; // 10 دقائق
export const COOLING_WINDOW_MS = 90 * 1000; // 90 ثانية

export async function getDemoUser(): Promise<User> {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, DEMO_USER_ID));
  if (!user) {
    throw new Error("Demo user not found — database seed has not been run");
  }
  return user;
}

export function mapUser(user: User) {
  return {
    id: user.id,
    fullName: user.fullName,
    iban: user.iban,
    accountNumber: user.accountNumber,
    bank: user.bank,
    balance: user.balance,
    heldAmount: user.heldAmount,
    currency: user.currency,
    lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
  };
}

export function mapBeneficiary(b: Beneficiary) {
  return {
    id: b.id,
    name: b.name,
    bank: b.bank,
    iban: b.iban,
    relationship: b.relationship ?? null,
    transferCount: b.transferCount,
    lastTransferAt: b.lastTransferAt ? b.lastTransferAt.toISOString() : null,
    trusted: b.trusted,
  };
}

export function mapTransfer(t: TransferRow) {
  return {
    id: t.id,
    reference: t.reference,
    recipientName: t.recipientName,
    recipientIban: t.recipientIban,
    recipientBank: t.recipientBank,
    amount: t.amount,
    purpose: t.purpose ?? null,
    status: t.status,
    trustScore: t.trustScore,
    riskLevel: t.riskLevel,
    factors: t.factors,
    timeline: t.timeline,
    approvalDeadline: t.approvalDeadline ? t.approvalDeadline.toISOString() : null,
    coolingEndsAt: t.coolingEndsAt ? t.coolingEndsAt.toISOString() : null,
    completedAt: t.completedAt ? t.completedAt.toISOString() : null,
    createdAt: t.createdAt.toISOString(),
  };
}

export function mapNotification(n: Notification) {
  return {
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    read: n.read,
    createdAt: n.createdAt.toISOString(),
  };
}

export function timelineEvent(
  type: string,
  label: string,
  detail?: string | null,
  at?: Date,
): TimelineEventJson {
  return {
    at: (at ?? new Date()).toISOString(),
    type,
    label,
    detail: detail ?? null,
  };
}

export function formatSar(amount: number): string {
  return `${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س`;
}

export async function notify(
  type: NotificationType,
  title: string,
  body: string,
): Promise<void> {
  await db.insert(notificationsTable).values({
    userId: DEMO_USER_ID,
    type,
    title,
    body,
  });
}

export async function bumpStats(patch: {
  analyzed?: number;
  flagged?: number;
  blocked?: number;
  protectedAmount?: number;
}): Promise<void> {
  const set: Record<string, unknown> = {};
  if (patch.analyzed) {
    set.analyzedCount = sql`${securityStatsTable.analyzedCount} + ${patch.analyzed}`;
  }
  if (patch.flagged) {
    set.flaggedCount = sql`${securityStatsTable.flaggedCount} + ${patch.flagged}`;
  }
  if (patch.blocked) {
    set.blockedCount = sql`${securityStatsTable.blockedCount} + ${patch.blocked}`;
  }
  if (patch.protectedAmount) {
    set.protectedAmount = sql`${securityStatsTable.protectedAmount} + ${patch.protectedAmount}`;
  }
  if (Object.keys(set).length === 0) return;
  await db.update(securityStatsTable).set(set);
}

/** إعادة المبلغ المحجوز إلى رصيد العميل */
async function refundHold(amount: number): Promise<void> {
  await db
    .update(usersTable)
    .set({
      balance: sql`${usersTable.balance} + ${amount}`,
      heldAmount: sql`GREATEST(${usersTable.heldAmount} - ${amount}, 0)`,
    })
    .where(eq(usersTable.id, DEMO_USER_ID));
}

/** خصم نهائي للمبلغ المحجوز (اكتمال التحويل بعد التهدئة) */
async function releaseHold(amount: number): Promise<void> {
  await db
    .update(usersTable)
    .set({
      heldAmount: sql`GREATEST(${usersTable.heldAmount} - ${amount}, 0)`,
    })
    .where(eq(usersTable.id, DEMO_USER_ID));
}

async function bumpBeneficiary(beneficiaryId: number | null): Promise<void> {
  if (!beneficiaryId) return;
  await db
    .update(beneficiariesTable)
    .set({
      transferCount: sql`${beneficiariesTable.transferCount} + 1`,
      lastTransferAt: new Date(),
    })
    .where(eq(beneficiariesTable.id, beneficiaryId));
}

async function persist(
  id: number,
  fields: Partial<typeof transfersTable.$inferInsert>,
): Promise<void> {
  await db.update(transfersTable).set(fields).where(eq(transfersTable.id, id));
}

export async function expireTransfer(
  t: TransferRow,
  at: Date,
): Promise<TransferRow> {
  const timeline = [
    ...t.timeline,
    timelineEvent(
      "expired",
      "انتهت مهلة الموافقة",
      "لم يؤكد المستلم خلال المهلة — أُعيد المبلغ كاملًا إلى رصيدك",
      at,
    ),
  ];
  await refundHold(t.amount);
  await persist(t.id, { status: "expired", timeline });
  await notify(
    "cancel",
    "أُلغي التحويل تلقائيًا لحمايتك",
    `انتهت مهلة موافقة المستلم لحوالة ${formatSar(t.amount)} إلى ${t.recipientName}، وأُعيد المبلغ إلى رصيدك.`,
  );
  if (t.riskLevel === "high") {
    await bumpStats({ protectedAmount: t.amount });
  }
  return { ...t, status: "expired", timeline };
}

export async function completeCooling(
  t: TransferRow,
  at: Date,
): Promise<TransferRow> {
  const timeline = [
    ...t.timeline,
    timelineEvent("completed", "اكتمل التحويل", "وصل المبلغ إلى حساب المستلم", at),
  ];
  await releaseHold(t.amount);
  await persist(t.id, { status: "completed", completedAt: at, timeline });
  await bumpBeneficiary(t.beneficiaryId);
  await notify(
    "success",
    "اكتملت الحوالة بنجاح",
    `تم تحويل ${formatSar(t.amount)} إلى ${t.recipientName}.`,
  );
  return { ...t, status: "completed", completedAt: at, timeline };
}

/**
 * الانتقالات الزمنية الكسولة: تُطبق عند كل قراءة —
 * انتهاء مهلة موافقة المستلم، أو اكتمال فترة التهدئة.
 */
export async function applyLifecycle(t: TransferRow): Promise<TransferRow> {
  const now = new Date();
  if (
    t.status === "awaiting_recipient_approval" &&
    t.approvalDeadline &&
    now > t.approvalDeadline
  ) {
    return expireTransfer(t, t.approvalDeadline);
  }
  if (t.status === "in_cooling_period" && t.coolingEndsAt && now > t.coolingEndsAt) {
    return completeCooling(t, t.coolingEndsAt);
  }
  return t;
}

export function makeReference(): string {
  const num = Math.floor(100000 + Math.random() * 899999);
  return `AMN-${new Date().getFullYear()}-${num}`;
}
