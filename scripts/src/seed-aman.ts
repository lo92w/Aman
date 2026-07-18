/**
 * بذر بيانات العرض التجريبي لتطبيق أمان
 * تشغيل: pnpm --filter @workspace/scripts run seed:aman
 */
import {
  db,
  usersTable,
  beneficiariesTable,
  recipientProfilesTable,
  transfersTable,
  notificationsTable,
  securityStatsTable,
} from "@workspace/db";
import { sql } from "drizzle-orm";

const MIN = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;
const now = Date.now();
const at = (offset: number) => new Date(now + offset);
const iso = (offset: number) => new Date(now + offset).toISOString();

async function main() {
  await db.execute(
    sql`TRUNCATE users, beneficiaries, recipient_profiles, transfers, notifications, security_stats RESTART IDENTITY CASCADE`,
  );

  // ═══════════════════════════════════════════════════════════
  // المستخدم التجريبي
  // ═══════════════════════════════════════════════════════════
  await db.insert(usersTable).values({
    fullName: "أليانا الشريف",
    iban: "SA0305000068201621404471",
    accountNumber: "68201621404471",
    bank: "مصرف الإنماء",
    balance: 47_320.75,
    heldAmount: 5200, // حوالة بدر الشهراني المعلقة
    currency: "SAR",
    lastLoginAt: at(-2 * HOUR),
  });

  // ═══════════════════════════════════════════════════════════
  // المستفيدون المحفوظون — 4 جهات موثوقة + 4 سيناريوهات عرض
  // ═══════════════════════════════════════════════════════════
  await db.insert(beneficiariesTable).values([
    // ── جهات موثوقة ──
    {
      userId: 1,
      name: "نوف العنزي",
      bank: "البنك الأهلي السعودي",
      iban: "SA0310000002210011870025",
      relationship: "صديقة مقربة",
      transferCount: 14,
      lastTransferAt: at(-3 * HOUR),
      trusted: true,
    },
    {
      userId: 1,
      name: "ملك العتيبي",
      bank: "بنك الرياض",
      iban: "SA7120000009050044320018",
      relationship: "صديق",
      transferCount: 9,
      lastTransferAt: at(-1 * DAY),
      trusted: true,
    },
    {
      userId: 1,
      name: "شركة نماء للمقاولات",
      bank: "مصرف الإنماء",
      iban: "SA1205000000883400210067",
      relationship: "مقاول المنزل",
      transferCount: 4,
      lastTransferAt: at(-3 * DAY),
      trusted: true,
    },
    {
      userId: 1,
      name: "نورة الحربي",
      bank: "البنك السعودي الفرنسي",
      iban: "SA3060000003441099820044",
      relationship: "قريبة",
      transferCount: 2,
      lastTransferAt: at(-4 * DAY),
      trusted: false,
    },
    // ── سيناريوهات العرض الأربعة ──
    {
      userId: 1,
      name: "① آمن مباشر — خالد الغامدي",
      bank: "البنك الأهلي السعودي",
      iban: "SA4410000057849012340011",
      relationship: "سيناريو: تحويل آمن فوري (≥75)",
      transferCount: 0,
      trusted: true,
    },
    {
      userId: 1,
      name: "② فحص سلوكي — بدر الشهراني",
      bank: "بنك ساب",
      iban: "SA5540000001229077430031",
      relationship: "سيناريو: درجة ثقة متوسطة (45–74)",
      transferCount: 0,
      trusted: false,
    },
    {
      userId: 1,
      name: "③ موافقة المستلم — حساب تجاري",
      bank: "بنك الجزيرة",
      iban: "SA3960000333221100998877",
      relationship: "سيناريو: خطورة مرتفعة — موافقة مطلوبة",
      transferCount: 0,
      trusted: false,
    },
    {
      userId: 1,
      name: "④ إيقاف كامل — مؤسسة مشبوهة",
      bank: "بنك البلاد",
      iban: "SA7115000999887766554433",
      relationship: "سيناريو: شبكة احتيال نشطة — يُوقَف",
      transferCount: 0,
      trusted: false,
    },
  ]);

  // ═══════════════════════════════════════════════════════════
  // ذكاء الشبكة عن الحسابات المستلمة
  // ═══════════════════════════════════════════════════════════
  await db.insert(recipientProfilesTable).values([
    // ── الجهات الموثوقة ──
    {
      iban: "SA0310000002210011870025",
      holderName: "سارة عبدالله القحطاني",
      bank: "البنك الأهلي السعودي",
      accountAgeMonths: 96,
      nameVerified: true,
    },
    {
      iban: "SA7120000009050044320018",
      holderName: "منصور فهد الدوسري",
      bank: "بنك الرياض",
      accountAgeMonths: 58,
      nameVerified: true,
    },
    {
      iban: "SA1205000000883400210067",
      holderName: "شركة نماء للمقاولات",
      bank: "مصرف الإنماء",
      accountAgeMonths: 41,
      nameVerified: true,
    },
    {
      iban: "SA3060000003441099820044",
      holderName: "نورة سعد الحربي",
      bank: "البنك السعودي الفرنسي",
      accountAgeMonths: 30,
      nameVerified: true,
    },

    // ═══════════════════════════════════════════════════════
    // سيناريو ① — آمن مباشر: حساب موثوق لسنوات
    // IBAN: SA4410000057849012340011
    // النتيجة المتوقعة: درجة ≥80 → تحويل فوري
    // ═══════════════════════════════════════════════════════
    {
      iban: "SA4410000057849012340011",
      holderName: "خالد محمد الغامدي",
      bank: "البنك الأهلي السعودي",
      accountAgeMonths: 84,
      nameVerified: true,
      communityReports: 0,
      velocityFlag: false,
      muleScore: 0,
      notes: "سيناريو ①: آمن — تحويل فوري",
    },

    // ═══════════════════════════════════════════════════════
    // سيناريو ② — فحص سلوكي: حساب نسبيًا جديد
    // IBAN: SA5540000001229077430031
    // النتيجة المتوقعة: درجة 50–65 → social_check
    // ═══════════════════════════════════════════════════════
    {
      iban: "SA5540000001229077430031",
      holderName: "بدر ناصر الشهراني",
      bank: "بنك ساب",
      accountAgeMonths: 8,
      nameVerified: true,
      communityReports: 0,
      velocityFlag: false,
      muleScore: 10,
      notes: "سيناريو ②: فحص سلوكي — حساب حديث نسبيًا",
    },

    // ═══════════════════════════════════════════════════════
    // سيناريو ③ — موافقة المستلم: حساب مشبوه
    // IBAN: SA3960000333221100998877
    // النتيجة المتوقعة: درجة <45 → recipient_approval
    // ═══════════════════════════════════════════════════════
    {
      iban: "SA3960000333221100998877",
      holderName: "حساب تجاري — غير موثق",
      bank: "بنك الجزيرة",
      accountAgeMonths: 4,
      communityReports: 9,
      velocityFlag: true,
      muleScore: 55,
      nameVerified: false,
      scamPatterns: ["investment_scam", "urgency_pressure"],
      networkInsight: {
        inflows48h: 9,
        uniqueSenders: 8,
        avgHoldMinutes: 22,
        outflowRatio: 0.91,
        summary: "يستقبل الحساب حوالات صغيرة من أفراد متعددين ويحوّل معظمها إلى حساب خارجي واحد خلال أقل من ساعة",
      },
      notes: "سيناريو ③: موافقة مستلم — احتيال استثماري",
    },

    // ═══════════════════════════════════════════════════════
    // سيناريو ④ — إيقاف كامل: شبكة احتيال نشطة
    // IBAN: SA7115000999887766554433
    // النتيجة المتوقعة: hard block (muleScore≥80 أو reports≥15)
    // ═══════════════════════════════════════════════════════
    {
      iban: "SA7115000999887766554433",
      holderName: "حساب منشأة — قيد التحقيق",
      bank: "بنك البلاد",
      accountAgeMonths: 1,
      communityReports: 23,
      velocityFlag: true,
      muleScore: 88,
      nameVerified: false,
      scamPatterns: ["fake_store", "mule_network"],
      networkInsight: {
        inflows48h: 14,
        uniqueSenders: 13,
        avgHoldMinutes: 9,
        outflowRatio: 0.97,
        summary: "الحساب يستقبل حوالات من ضحايا متعددين ويفرغها خارجيًا خلال دقائق — نمط مطابق لشبكات غسل عائدات الاحتيال",
      },
      notes: "سيناريو ④: إيقاف كامل — شبكة غسيل",
    },
  ]);

  // ═══════════════════════════════════════════════════════════
  // سجل التحويلات — 7 حالات تغطي جميع الحالات
  // ═══════════════════════════════════════════════════════════
  await db.insert(transfersTable).values([
    // 1. إيقاف كامل
    {
      userId: 1,
      beneficiaryId: null,
      reference: "AMN-2026-481062",
      recipientName: "مؤسسة الصفقة الرابحة للتسويق",
      recipientIban: "SA7115000999887766554433",
      recipientBank: "بنك البلاد",
      amount: 3850,
      purpose: "دفعة مقابل طلب إلكتروني",
      status: "blocked",
      trustScore: 6,
      riskLevel: "high",
      factors: [
        { id: "account_age", label: "حساب مستحدث", detail: "فُتح الحساب قبل أقل من شهر", impact: -18, kind: "negative" },
        { id: "community_reports", label: "23 بلاغ احتيال", detail: "أعلى من حد الإيقاف التلقائي (15 بلاغاً)", impact: -30, kind: "negative" },
        { id: "velocity", label: "نمط تمرير أموال", detail: "يستقبل مبالغ ويحوّلها خلال دقائق", impact: -15, kind: "negative" },
        { id: "mule", label: "حساب وسيط مؤكد", detail: "muleScore 88/100 — مطابق لشبكة غسل", impact: -15, kind: "negative" },
      ],
      timeline: [
        { at: iso(-6 * DAY), type: "analyzed", label: "اكتمل تحليل أمان", detail: "درجة الثقة 6/100 — خطورة مرتفعة جداً" },
        { at: iso(-6 * DAY + 12_000), type: "blocked", label: "⛔ أوقف أمان التحويل", detail: "تطابق مؤكد مع شبكة احتيال نشطة — لم يغادر أي مبلغ حسابك" },
      ],
      createdAt: at(-6 * DAY),
    },

    // 2. آمن مكتمل
    {
      userId: 1,
      beneficiaryId: 4,
      reference: "AMN-2026-481088",
      recipientName: "نورة الحربي",
      recipientIban: "SA3060000003441099820044",
      recipientBank: "البنك السعودي الفرنسي",
      amount: 640,
      purpose: "هدية",
      status: "completed",
      trustScore: 89,
      riskLevel: "low",
      factors: [
        { id: "history", label: "تعاملات سابقة", detail: "تحويلان ناجحان مع هذا المستلم", impact: 8, kind: "positive" },
        { id: "account_age", label: "حساب مستقر", detail: "نشط منذ 2.5 سنوات", impact: 10, kind: "positive" },
        { id: "name_match", label: "الاسم مطابق", detail: "مطابق لسجلات البنك المستلم", impact: 6, kind: "positive" },
        { id: "amount", label: "مبلغ ضمن النطاق", detail: "قيمة التحويل متوافقة مع نمطك", impact: 2, kind: "positive" },
      ],
      timeline: [
        { at: iso(-4 * DAY), type: "analyzed", label: "اكتمل تحليل أمان", detail: "درجة الثقة 89/100 ✓" },
        { at: iso(-4 * DAY + 8_000), type: "completed", label: "اكتمل التحويل", detail: "وصل المبلغ إلى حساب المستلم" },
      ],
      completedAt: at(-4 * DAY + 8_000),
      createdAt: at(-4 * DAY),
    },

    // 3. مكتمل — مقاول
    {
      userId: 1,
      beneficiaryId: 3,
      reference: "AMN-2026-481094",
      recipientName: "شركة نماء للمقاولات",
      recipientIban: "SA1205000000883400210067",
      recipientBank: "مصرف الإنماء",
      amount: 12000,
      purpose: "دفعة مقاولات",
      status: "completed",
      trustScore: 84,
      riskLevel: "low",
      factors: [
        { id: "history", label: "سجل تعاملات موثوق", detail: "4 تحويلات ناجحة سابقة", impact: 15, kind: "positive" },
        { id: "account_age", label: "حساب مستقر", detail: "نشط منذ 3 سنوات", impact: 10, kind: "positive" },
        { id: "name_match", label: "الاسم مطابق", detail: "مطابق لسجلات البنك", impact: 6, kind: "positive" },
        { id: "amount", label: "مبلغ أعلى من المعتاد", detail: "أعلى من متوسط تحويلاتك", impact: -6, kind: "negative" },
      ],
      timeline: [
        { at: iso(-3 * DAY), type: "analyzed", label: "اكتمل تحليل أمان", detail: "درجة الثقة 84/100 ✓" },
        { at: iso(-3 * DAY + 9_000), type: "completed", label: "اكتمل التحويل", detail: "وصل المبلغ" },
      ],
      completedAt: at(-3 * DAY + 9_000),
      createdAt: at(-3 * DAY),
    },

    // 4. منتهي المهلة (recipient_approval → expired)
    {
      userId: 1,
      beneficiaryId: null,
      reference: "AMN-2026-481120",
      recipientName: "متجر التخفيضات الكبرى",
      recipientIban: "SA9215000111223344556677",
      recipientBank: "بنك البلاد",
      amount: 7400,
      purpose: "شراء جوال معروض",
      status: "expired",
      trustScore: 42,
      riskLevel: "high",
      factors: [
        { id: "history", label: "مستلم جديد", detail: "لا سجل تحويلات سابق", impact: -8, kind: "negative" },
        { id: "unknown_account", label: "حساب غير موثوق", detail: "لا بيانات كافية في شبكة أمان", impact: -10, kind: "negative" },
        { id: "name_match", label: "تعذر التحقق من الاسم", detail: "البنك غير متصل بشبكة أمان", impact: -6, kind: "negative" },
        { id: "amount", label: "مبلغ أعلى من المعتاد", detail: "أعلى من متوسطك", impact: -6, kind: "negative" },
      ],
      timeline: [
        { at: iso(-3 * DAY + 2 * HOUR), type: "analyzed", label: "اكتمل تحليل أمان", detail: "درجة الثقة 42/100" },
        { at: iso(-3 * DAY + 2 * HOUR + 15_000), type: "awaiting", label: "بانتظار موافقة المستلم", detail: "المبلغ محجوز" },
        { at: iso(-3 * DAY + 2 * HOUR + 10 * MIN), type: "expired", label: "انتهت مهلة الموافقة", detail: "أُعيد المبلغ كاملًا — المستلم لم يردّ" },
      ],
      createdAt: at(-3 * DAY + 2 * HOUR),
    },

    // 5. مكتمل — صديق موثوق
    {
      userId: 1,
      beneficiaryId: 2,
      reference: "AMN-2026-481166",
      recipientName: "منصور الدوسري",
      recipientIban: "SA7120000009050044320018",
      recipientBank: "بنك الرياض",
      amount: 900,
      purpose: "سداد",
      status: "completed",
      trustScore: 93,
      riskLevel: "low",
      factors: [
        { id: "history", label: "سجل موثوق", detail: "9 تحويلات ناجحة سابقة", impact: 15, kind: "positive" },
        { id: "account_age", label: "حساب مستقر", detail: "نشط منذ 4 سنوات", impact: 10, kind: "positive" },
        { id: "name_match", label: "الاسم مطابق", detail: "مطابق لسجلات البنك", impact: 6, kind: "positive" },
        { id: "amount", label: "مبلغ طبيعي", detail: "ضمن نمطك المعتاد", impact: 2, kind: "positive" },
      ],
      timeline: [
        { at: iso(-1 * DAY), type: "analyzed", label: "اكتمل تحليل أمان", detail: "درجة الثقة 93/100 ✓" },
        { at: iso(-1 * DAY + 7_000), type: "completed", label: "اكتمل التحويل", detail: "وصل المبلغ" },
      ],
      completedAt: at(-1 * DAY + 7_000),
      createdAt: at(-1 * DAY),
    },

    // 6. مكتمل — سارة
    {
      userId: 1,
      beneficiaryId: 1,
      reference: "AMN-2026-481190",
      recipientName: "سارة القحطاني",
      recipientIban: "SA0310000002210011870025",
      recipientBank: "البنك الأهلي السعودي",
      amount: 1500,
      purpose: "مصاريف عائلية",
      status: "completed",
      trustScore: 96,
      riskLevel: "low",
      factors: [
        { id: "history", label: "سجل موثوق جداً", detail: "14 تحويلًا ناجحًا", impact: 15, kind: "positive" },
        { id: "account_age", label: "حساب مستقر", detail: "نشط منذ 8 سنوات", impact: 10, kind: "positive" },
        { id: "name_match", label: "الاسم مطابق", detail: "مطابق لسجلات البنك", impact: 6, kind: "positive" },
        { id: "amount", label: "مبلغ طبيعي", detail: "ضمن نمطك", impact: 2, kind: "positive" },
      ],
      timeline: [
        { at: iso(-3 * HOUR), type: "analyzed", label: "اكتمل تحليل أمان", detail: "درجة الثقة 96/100 ✓" },
        { at: iso(-3 * HOUR + 6_000), type: "completed", label: "اكتمل التحويل", detail: "وصل المبلغ" },
      ],
      completedAt: at(-3 * HOUR + 6_000),
      createdAt: at(-3 * HOUR),
    },

    // 7. حوالة معلقة حية — بدر (سيناريو ②)
    {
      userId: 1,
      beneficiaryId: null,
      reference: "AMN-2026-481205",
      recipientName: "بدر الشهراني",
      recipientIban: "SA5540000001229077430031",
      recipientBank: "بنك ساب",
      amount: 5200,
      purpose: "مشاركة في مشروع",
      status: "awaiting_recipient_approval",
      trustScore: 56,
      riskLevel: "medium",
      factors: [
        { id: "history", label: "مستلم جديد", detail: "لا سجل تحويلات سابق بينكما", impact: -8, kind: "negative" },
        { id: "account_age", label: "حساب حديث", detail: "فُتح الحساب قبل 8 أشهر فقط", impact: -8, kind: "negative" },
        { id: "name_match", label: "الاسم مطابق", detail: "مطابق لسجلات البنك المستلم", impact: 6, kind: "positive" },
        { id: "amount", label: "مبلغ أعلى من المعتاد", detail: "أعلى من متوسط تحويلاتك", impact: -6, kind: "negative" },
      ],
      timeline: [
        { at: iso(-25 * MIN), type: "analyzed", label: "اكتمل تحليل أمان", detail: "درجة الثقة 56/100" },
        { at: iso(-25 * MIN + 40_000), type: "social_check", label: "الفحص السلوكي رصد مؤشراً مقلقاً", detail: "رُفع مستوى الحماية إلى موافقة المستلم" },
        { at: iso(-25 * MIN + 45_000), type: "awaiting", label: "⏳ بانتظار موافقة المستلم", detail: "المبلغ محجوز ولن يغادر حسابك" },
      ],
      approvalDeadline: at(8 * MIN),
      createdAt: at(-25 * MIN),
    },
  ]);

  // ═══════════════════════════════════════════════════════════
  // الإشعارات
  // ═══════════════════════════════════════════════════════════
  await db.insert(notificationsTable).values([
    {
      userId: 1,
      type: "security",
      title: "⛔ أوقف أمان تحويلًا عالي الخطورة",
      body: "منع أمان تحويل 3,850 ر.س إلى «مؤسسة الصفقة الرابحة للتسويق» لتطابقه مع شبكة احتيال نشطة. لم يُخصم أي مبلغ.",
      read: true,
      createdAt: at(-6 * DAY + 12_000),
    },
    {
      userId: 1,
      type: "cancel",
      title: "أُعيدت أموالك تلقائياً",
      body: "انتهت مهلة موافقة المستلم لحوالة 7,400 ر.س إلى متجر التخفيضات الكبرى. المستلم لم يردّ — أُعيد المبلغ كاملاً.",
      read: true,
      createdAt: at(-3 * DAY + 2 * HOUR + 10 * MIN),
    },
    {
      userId: 1,
      type: "security",
      title: "شبكة أمان تكبر",
      body: "انضم أكثر من 1,200 عميل إلى شبكة بلاغات أمان هذا الأسبوع — كل بلاغ يحمي بقية العملاء.",
      read: true,
      createdAt: at(-2 * DAY),
    },
    {
      userId: 1,
      type: "success",
      title: "✓ اكتملت الحوالة بنجاح",
      body: "تم تحويل 1,500 ر.س إلى سارة القحطاني.",
      read: true,
      createdAt: at(-3 * HOUR + 6_000),
    },
    {
      userId: 1,
      type: "trust",
      title: "🔐 رفعنا مستوى الحماية لحوالتك",
      body: "رصد الفحص السلوكي مؤشراً مقلقاً في حوالتك إلى بدر الشهراني وفعّل أمان موافقة المستلم قبل إتمامها.",
      read: false,
      createdAt: at(-25 * MIN + 40_000),
    },
    {
      userId: 1,
      type: "pending",
      title: "⏳ بانتظار موافقة المستلم",
      body: "حوالة 5,200 ر.س إلى بدر الشهراني تنتظر تأكيد المستلم. المبلغ محجوز في حسابك.",
      read: false,
      createdAt: at(-25 * MIN + 45_000),
    },
  ]);

  // ═══════════════════════════════════════════════════════════
  // إحصاءات شبكة أمان
  // ═══════════════════════════════════════════════════════════
  await db.insert(securityStatsTable).values({
    analyzedCount: 2847,
    flaggedCount: 196,
    blockedCount: 73,
    protectedAmount: 1_240_500,
    communityReports: 4_218,
    activeScamAccounts: 512,
  });

  console.log("✓ Seed completed: 1 user · 8 beneficiaries (4 trusted + 4 scenarios) · 9 recipient profiles · 7 transfers · 6 notifications");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
