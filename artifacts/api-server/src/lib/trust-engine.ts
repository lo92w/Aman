import {
  db,
  beneficiariesTable,
  recipientProfilesTable,
  transfersTable,
  type Beneficiary,
  type RecipientProfile,
  type TrustFactorJson,
} from "@workspace/db";
import { and, eq } from "drizzle-orm";

export type RiskLevel = "low" | "medium" | "high";
export type RequiredAction =
  | "proceed"
  | "social_check"
  | "recipient_approval"
  | "block";

export interface ScamPatternInfo {
  id: string;
  name: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
}

export interface SocialQuestion {
  id: string;
  question: string;
  redFlag: boolean;
}

export interface AnalysisResult {
  score: number;
  riskLevel: RiskLevel;
  requiredAction: RequiredAction;
  headline: string;
  summary: string;
  factors: TrustFactorJson[];
  detectedPatterns: ScamPatternInfo[];
  socialCheck: SocialQuestion[];
  networkInsight: {
    inflows48h: number;
    uniqueSenders: number;
    avgHoldMinutes: number;
    outflowRatio: number;
    summary: string;
  } | null;
  recipientPreview: {
    holderNameMasked: string;
    bank: string;
    accountAgeMonths: number | null;
    isNewRecipient: boolean;
    nameVerified: boolean;
  };
  communityReports: number;
}

export interface DraftInput {
  beneficiaryId?: number | null;
  recipientName: string;
  recipientIban: string;
  recipientBank?: string | null;
  amount: number;
  purpose?: string | null;
}

export interface RecipientContext {
  beneficiary: Beneficiary | null;
  profile: RecipientProfile | null;
  priorCompletedCount: number;
}

export const SCAM_PATTERN_CATALOG: Record<string, ScamPatternInfo> = {
  fake_store: {
    id: "fake_store",
    name: "متجر إلكتروني وهمي",
    description: "حساب مرتبط بمتاجر تستلم المدفوعات ولا تسلّم المنتجات",
    severity: "critical",
  },
  investment_scam: {
    id: "investment_scam",
    name: "احتيال استثماري",
    description: "وعود بأرباح سريعة ومضاعفة الأموال عبر منصات غير مرخصة",
    severity: "critical",
  },
  impersonation: {
    id: "impersonation",
    name: "انتحال جهة رسمية",
    description: "التظاهر بجهة حكومية أو بنك لطلب تحويلات عاجلة",
    severity: "high",
  },
  mule_network: {
    id: "mule_network",
    name: "شبكة حسابات وسيطة",
    description: "حساب ضمن شبكة تمرير أموال مرتبطة بعمليات احتيال",
    severity: "critical",
  },
  urgency_pressure: {
    id: "urgency_pressure",
    name: "أسلوب الضغط والاستعجال",
    description: "دفع الضحية لإتمام التحويل بسرعة قبل التفكير أو الاستشارة",
    severity: "medium",
  },
};

export const SOCIAL_QUESTIONS: SocialQuestion[] = [
  {
    id: "sc_contact",
    question:
      "هل تواصل معك المستلم من رقم غير معروف عبر واتساب أو تيليجرام؟",
    redFlag: true,
  },
  {
    id: "sc_promise",
    question: "هل وُعدت بأرباح أو جائزة أو مضاعفة لهذا المبلغ؟",
    redFlag: true,
  },
  {
    id: "sc_urgency",
    question: "هل يستعجلك أحد لإتمام هذا التحويل الآن؟",
    redFlag: true,
  },
  {
    id: "sc_known",
    question: "هل تعرف المستلم شخصيًا والتقيت به من قبل؟",
    redFlag: false,
  },
];

const INVESTMENT_KEYWORDS = [
  "استثمار",
  "أرباح",
  "ارباح",
  "ربح",
  "مضاعف",
  "تداول",
  "فوركس",
  "عملات رقمية",
  "محفظة",
];

const URGENCY_KEYWORDS = ["عاجل", "سريع", "فوري", "آخر فرصة", "اليوم فقط"];

const FEE_BAIT_KEYWORDS = ["رسوم تفعيل", "رسوم توصيل", "عمولة", "شحن رصيد", "جائزة"];

export function normalizeIban(iban: string): string {
  return iban.replace(/\s+/g, "").toUpperCase();
}

export function maskName(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (word.length <= 2) return word + "••";
      const keep = word.slice(0, 2);
      return keep + "•".repeat(Math.min(4, Math.max(2, word.length - 2)));
    })
    .join(" ");
}

export async function buildRecipientContext(
  userId: number,
  draft: DraftInput,
): Promise<RecipientContext> {
  const iban = normalizeIban(draft.recipientIban);

  let beneficiary: Beneficiary | null = null;
  if (draft.beneficiaryId) {
    const [row] = await db
      .select()
      .from(beneficiariesTable)
      .where(
        and(
          eq(beneficiariesTable.id, draft.beneficiaryId),
          eq(beneficiariesTable.userId, userId),
        ),
      );
    beneficiary = row ?? null;
  }
  if (!beneficiary) {
    const all = await db
      .select()
      .from(beneficiariesTable)
      .where(eq(beneficiariesTable.userId, userId));
    beneficiary = all.find((b) => normalizeIban(b.iban) === iban) ?? null;
  }

  const profiles = await db.select().from(recipientProfilesTable);
  const profile = profiles.find((p) => normalizeIban(p.iban) === iban) ?? null;

  const past = await db
    .select()
    .from(transfersTable)
    .where(
      and(eq(transfersTable.userId, userId), eq(transfersTable.status, "completed")),
    );
  const priorCompletedCount = past.filter(
    (t) => normalizeIban(t.recipientIban) === iban,
  ).length;

  return { beneficiary, profile, priorCompletedCount };
}

function factor(
  id: string,
  label: string,
  detail: string,
  impact: number,
): TrustFactorJson {
  return {
    id,
    label,
    detail,
    impact,
    kind: impact > 0 ? "positive" : impact < 0 ? "negative" : "neutral",
  };
}

function containsAny(text: string, keywords: string[]): string | null {
  for (const kw of keywords) {
    if (text.includes(kw)) return kw;
  }
  return null;
}

export function analyzeDraft(
  draft: DraftInput,
  ctx: RecipientContext,
): AnalysisResult {
  const { beneficiary, profile, priorCompletedCount } = ctx;
  const factors: TrustFactorJson[] = [];
  const detectedPatterns: ScamPatternInfo[] = [];

  // 1) سجل التعاملات مع المستلم
  const historyCount = (beneficiary?.transferCount ?? 0) + priorCompletedCount;
  if (historyCount >= 3) {
    factors.push(
      factor(
        "history",
        "سجل تعاملات موثوق",
        `${historyCount} تحويلًا ناجحًا سابقًا لهذا المستلم`,
        15,
      ),
    );
  } else if (historyCount >= 1) {
    factors.push(
      factor(
        "history",
        "تعاملات سابقة محدودة",
        `${historyCount === 1 ? "تحويل واحد ناجح" : "تحويلان ناجحان"} مع هذا المستلم`,
        8,
      ),
    );
  } else {
    factors.push(
      factor(
        "history",
        "مستلم جديد",
        "لا يوجد سجل تحويلات سابق بينكما",
        -8,
      ),
    );
  }

  // 2) عمر الحساب ومعرفته في الشبكة
  if (profile) {
    const months = profile.accountAgeMonths;
    if (months >= 24) {
      factors.push(
        factor(
          "account_age",
          "حساب مستقر",
          `الحساب نشط منذ ${Math.floor(months / 12)} ${months >= 36 ? "سنوات" : "سنة"} تقريبًا`,
          10,
        ),
      );
    } else if (months >= 12) {
      factors.push(
        factor("account_age", "عمر حساب مقبول", "الحساب نشط منذ أكثر من سنة", 5),
      );
    } else if (months >= 3) {
      factors.push(
        factor(
          "account_age",
          "حساب حديث نسبيًا",
          `فُتح الحساب قبل ${months} أشهر فقط`,
          -8,
        ),
      );
    } else {
      factors.push(
        factor(
          "account_age",
          "حساب مستحدث",
          months <= 1
            ? "فُتح الحساب قبل أقل من شهر"
            : `فُتح الحساب قبل ${months} شهر فقط`,
          -18,
        ),
      );
    }
  } else {
    factors.push(
      factor(
        "unknown_account",
        "حساب غير معروف",
        "لا تتوفر بيانات كافية عن هذا الحساب في شبكة أمان",
        -10,
      ),
    );
  }

  // 3) تطابق اسم المستفيد
  if (profile) {
    if (profile.nameVerified) {
      factors.push(
        factor(
          "name_match",
          "الاسم مطابق",
          "اسم المستفيد مطابق لسجلات البنك المستلم",
          6,
        ),
      );
    } else {
      factors.push(
        factor(
          "name_match",
          "تباين في اسم المستفيد",
          "الاسم المُدخل لا يطابق تمامًا سجلات البنك المستلم",
          -10,
        ),
      );
    }
  } else {
    factors.push(
      factor(
        "name_match",
        "تعذر التحقق من الاسم",
        "لا يمكن مطابقة الاسم مع بنك غير متصل بشبكة أمان",
        -6,
      ),
    );
  }

  // 4) حجم المبلغ
  if (draft.amount > 15000) {
    factors.push(
      factor(
        "amount",
        "مبلغ مرتفع بشكل غير معتاد",
        "المبلغ أعلى بكثير من متوسط تحويلاتك الشهرية",
        -12,
      ),
    );
  } else if (draft.amount > 5000) {
    factors.push(
      factor(
        "amount",
        "مبلغ أعلى من المعتاد",
        "المبلغ أعلى من متوسط تحويلاتك المعتادة",
        -6,
      ),
    );
  } else {
    factors.push(
      factor("amount", "مبلغ ضمن النطاق المعتاد", "قيمة التحويل متوافقة مع نمطك", 2),
    );
  }

  // 5) بلاغات المجتمع
  const reports = profile?.communityReports ?? 0;
  if (reports > 0) {
    factors.push(
      factor(
        "community_reports",
        "بلاغات من مجتمع أمان",
        `${reports} بلاغ احتيال مسجل ضد هذا الحساب من عملاء آخرين`,
        -Math.min(30, reports * 3),
      ),
    );
  }

  // 6) نمط حركة الأموال
  if (profile?.velocityFlag) {
    factors.push(
      factor(
        "velocity",
        "نمط تمرير أموال",
        "الحساب يستقبل مبالغ من مصادر متعددة ويحوّلها خارجيًا خلال دقائق",
        -15,
      ),
    );
  }
  const muleScore = profile?.muleScore ?? 0;
  if (muleScore >= 70) {
    factors.push(
      factor(
        "mule",
        "اشتباه حساب وسيط",
        "خصائص الحساب تطابق شبكات غسل عائدات الاحتيال بدرجة عالية",
        -15,
      ),
    );
  } else if (muleScore >= 40) {
    factors.push(
      factor(
        "mule",
        "مؤشرات حساب وسيط",
        "بعض خصائص الحساب تشبه الحسابات الوسيطة",
        -8,
      ),
    );
  }

  // 7) تحليل صياغة الغرض
  const purpose = (draft.purpose ?? "").trim();
  if (purpose) {
    const invKw = containsAny(purpose, INVESTMENT_KEYWORDS);
    const urgKw = containsAny(purpose, URGENCY_KEYWORDS);
    const feeKw = containsAny(purpose, FEE_BAIT_KEYWORDS);
    const hit = invKw ?? feeKw ?? urgKw;
    if (hit) {
      factors.push(
        factor(
          "purpose",
          "صياغة الغرض مطابقة لأنماط احتيال",
          `عبارة «${hit}» شائعة في البلاغات المسجلة لدى أمان`,
          -10,
        ),
      );
      if (invKw && !profile?.scamPatterns.includes("investment_scam")) {
        detectedPatterns.push(SCAM_PATTERN_CATALOG.investment_scam);
      }
      if (urgKw && !profile?.scamPatterns.includes("urgency_pressure")) {
        detectedPatterns.push(SCAM_PATTERN_CATALOG.urgency_pressure);
      }
    }
  }

  // أنماط الاحتيال المسجلة على الحساب
  if (profile) {
    for (const pid of profile.scamPatterns) {
      const info = SCAM_PATTERN_CATALOG[pid];
      if (info && !detectedPatterns.some((p) => p.id === info.id)) {
        detectedPatterns.push(info);
      }
    }
  }

  const raw = 72 + factors.reduce((sum, f) => sum + f.impact, 0);
  const score = Math.max(4, Math.min(98, Math.round(raw)));

  const riskLevel: RiskLevel = score >= 75 ? "low" : score >= 45 ? "medium" : "high";

  let requiredAction: RequiredAction =
    riskLevel === "low"
      ? "proceed"
      : riskLevel === "medium"
        ? "social_check"
        : "recipient_approval";

  if (profile && (profile.communityReports >= 15 || profile.muleScore >= 80)) {
    requiredAction = "block";
  }

  const texts: Record<RequiredAction, { headline: string; summary: string }> = {
    proceed: {
      headline: "المستلم موثوق — التحويل آمن",
      summary:
        "سجل المستلم ونمط التعاملات لا يُظهران أي مؤشرات خطر. يمكن إتمام الحوالة مباشرة.",
    },
    social_check: {
      headline: "توقف لحظة — نحتاج تأكيدك",
      summary:
        "رصد أمان مؤشرات تستدعي فحصًا سريعًا قبل الإتمام. أجب عن الأسئلة التالية بصدق — فهي مصممة لكشف أساليب المحتالين وقت الدفع.",
    },
    recipient_approval: {
      headline: "مؤشرات خطر مرتفعة",
      summary:
        "هذا التحويل يحمل نمطًا مشابهًا لحالات احتيال مسجلة. سيُطلب من المستلم تأكيد الاستلام خلال مهلة محددة، ويبقى مبلغك محجوزًا في حسابك حتى الموافقة.",
    },
    block: {
      headline: "أوقف أمان هذا التحويل",
      summary:
        "تطابق شبه مؤكد مع شبكة احتيال نشطة. ننصح بشدة بعدم الإتمام — يمكنك توثيق المحاولة وإيقافها، أو المتابعة على مسؤوليتك عبر موافقة المستلم الإجبارية.",
    },
  };

  const needsSocial = requiredAction !== "proceed";

  return {
    score,
    riskLevel,
    requiredAction,
    headline: texts[requiredAction].headline,
    summary: texts[requiredAction].summary,
    factors,
    detectedPatterns,
    socialCheck: needsSocial ? SOCIAL_QUESTIONS : [],
    networkInsight:
      profile?.networkInsight && (profile.velocityFlag || muleScore >= 40)
        ? profile.networkInsight
        : null,
    recipientPreview: {
      holderNameMasked: maskName(profile?.holderName ?? draft.recipientName),
      bank: profile?.bank ?? draft.recipientBank ?? "بنك غير محدد",
      accountAgeMonths: profile?.accountAgeMonths ?? null,
      isNewRecipient: !beneficiary && ctx.priorCompletedCount === 0,
      nameVerified: profile?.nameVerified ?? false,
    },
    communityReports: reports,
  };
}
