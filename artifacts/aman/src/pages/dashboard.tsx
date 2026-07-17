import { useState } from "react";
import { Link } from "wouter";
import { useGetDashboard, useGetMe } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ShieldCheck,
  ArrowUpRight,
  AlertTriangle,
  CreditCard,
  ChevronLeft,
  Eye,
  EyeOff,
  Copy,
  CheckCheck,
  Zap,
  TrendingUp,
  Users,
  ArrowLeftRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/* ─── 4 scenarios for quick demo access ─── */
const SCENARIOS = [
  {
    id: "proceed",
    emoji: "✅",
    label: "آمن مباشر",
    sublabel: "درجة ثقة ≥ 75",
    iban: "SA0310000002210011870025",
    name: "سارة القحطاني",
  },
  {
    id: "social",
    emoji: "🔍",
    label: "فحص سلوكي",
    sublabel: "درجة ثقة 45–74",
    iban: "SA5540000001229077430031",
    name: "بدر الشهراني",
  },
  {
    id: "approval",
    emoji: "🔐",
    label: "موافقة المستلم",
    sublabel: "مؤشر ثقة 40",
    iban: "SA3960000333221100998877",
    name: "حساب تجاري",
  },
  {
    id: "block",
    emoji: "⛔",
    label: "إيقاف كامل",
    sublabel: "شبكة احتيال نشطة",
    iban: "SA7115000999887766554433",
    name: "مؤسسة مشبوهة",
  },
] as const;

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetDashboard();
  const { data: user } = useGetMe();
  const { toast } = useToast();
  const [hideBalance, setHideBalance] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const copyIban = (iban: string, id: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedId(id);
    toast({ title: "تم النسخ ✓", description: `${iban.slice(0, 10)}...` });
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading || !dashboard || !user) {
    return (
      <AppLayout>
        <div className="p-5 space-y-4">
          <Skeleton className="h-52 w-full rounded-3xl" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </AppLayout>
    );
  }

  const saved = ((dashboard.protection.blockedCount + dashboard.protection.flaggedCount) * 3200).toLocaleString("ar-SA");

  return (
    <AppLayout>
      {/* ── Balance + hero extends from header ── */}
      <div className="bg-primary text-primary-foreground px-6 pt-4 pb-14 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute -top-8 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-4 right-6 opacity-[0.06]">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            <circle cx="60" cy="40" r="38" stroke="white" strokeWidth="1.5" />
            <circle cx="60" cy="40" r="28" stroke="white" strokeWidth="1" />
            <path d="M60 12 L84 55 L36 55 Z" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Account chip */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 border border-white/15">
            <CreditCard className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs text-white/80 font-medium">
              {user.bank} — •••• {user.accountNumber.slice(-4)}
            </span>
          </div>
          <button onClick={() => setHideBalance(h => !h)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            {hideBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>

        {/* Balance */}
        <div className="relative z-10 mb-6">
          <p className="text-xs text-white/60 font-medium mb-1">الرصيد المتاح</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[42px] font-bold tracking-tight leading-none">
              {hideBalance ? "●●●●●" : user.balance.toLocaleString("ar-u-nu-latn", { maximumFractionDigits: 2 })}
            </span>
            <span className="text-lg font-medium text-secondary">ر.س</span>
          </div>
          {user.heldAmount > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-white/60">
                محجوز بأمان: {formatCurrency(user.heldAmount)}
              </span>
              <Link href="/transfers" className="text-secondary text-xs font-bold underline">عرض</Link>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="relative z-10 flex gap-2">
          <Link href="/transfer" className="flex-1">
            <div className="flex items-center justify-center gap-2 bg-secondary text-primary py-2.5 rounded-2xl font-bold text-sm shadow-lg hover:bg-secondary/90 active:scale-95 transition-all">
              <ArrowUpRight className="w-4 h-4" />
              تحويل جديد
            </div>
          </Link>
          <Link href="/transfers" className="flex-1">
            <div className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/15 py-2.5 rounded-2xl font-bold text-sm hover:bg-white/15 active:scale-95 transition-all">
              <ArrowLeftRight className="w-4 h-4" />
              العمليات
            </div>
          </Link>
        </div>
      </div>

      <div className="px-5 pb-32 space-y-5 -mt-6 relative z-10">

        {/* ── Aman protection stats ── */}
        <div className="bg-card rounded-3xl shadow-lg border border-border/30 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-display font-bold text-sm">أمان يحمي حسابك</h3>
            <div className="mr-auto flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              نشط
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <StatPill icon={Zap} value={dashboard.protection.analyzedCount.toLocaleString("ar-u-nu-latn")} label="فُحصت" color="blue" />
            <StatPill icon={AlertTriangle} value={(dashboard.protection.blockedCount + dashboard.protection.flaggedCount).toString()} label="أوقفها" color="red" />
            <StatPill icon={TrendingUp} value={`${(dashboard.protection.analyzedCount > 0 ? Math.round(((dashboard.protection.blockedCount + dashboard.protection.flaggedCount) / dashboard.protection.analyzedCount) * 100) : 2)}%`} label="خطورة" color="orange" />
          </div>
        </div>

        {/* ── Demo overlay trigger ── */}
        {showDemo && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col justify-end"
            onClick={() => setShowDemo(false)}
          >
            <div
              className="bg-card rounded-t-3xl p-6 pb-10 max-w-md mx-auto w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-5" />
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">حسابات الاختبار</h3>
                  <p className="text-muted-foreground text-[10px]">انسخ الآيبان ← تحويل جديد ← الصقه</p>
                </div>
              </div>
              <div className="space-y-2">
                {SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => copyIban(sc.iban, sc.id)}
                    className="w-full flex items-center justify-between p-4 bg-muted/50 border border-border/50 rounded-2xl hover:bg-muted active:scale-[0.98] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{sc.emoji}</span>
                      <div className="text-right">
                        <p className="font-bold text-sm">{sc.label}</p>
                        <p className="text-muted-foreground text-[11px]">{sc.sublabel}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0",
                      copiedId === sc.id ? "bg-green-100 text-green-600" : "bg-card text-muted-foreground border border-border/50 group-hover:border-primary/30"
                    )}>
                      {copiedId === sc.id
                        ? <CheckCheck className="w-4 h-4" />
                        : <Copy className="w-4 h-4" />
                      }
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Demo trigger pill ── */}
        <button
          onClick={() => setShowDemo(true)}
          className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 border border-dashed border-border/60 rounded-2xl text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-all group"
        >
          <span className="flex items-center gap-2 text-xs font-medium">
            <span className="text-sm">🎬</span>
            سيناريوهات العرض التجريبي
          </span>
          <ChevronLeft className="w-4 h-4 rotate-180 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* ── Recent transfers ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-base">أحدث الحوالات</h3>
            <Link href="/transfers" className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline">
              عرض الكل <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {dashboard.recentTransfers.length > 0 ? (
            <div className="space-y-2.5">
              {dashboard.recentTransfers.slice(0, 5).map((transfer) => (
                <Link key={transfer.id} href={`/transfers/${transfer.id}`}>
                  <div className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-sm border border-border/40 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center font-display font-bold text-base",
                        transfer.status === "completed" ? "bg-green-100 text-green-700" :
                        transfer.status === "blocked" ? "bg-red-100 text-red-700" :
                        "bg-orange-100 text-orange-700"
                      )}>
                        {transfer.recipientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-none mb-1">{transfer.recipientName}</p>
                        <p className="text-[11px] text-muted-foreground">{formatDate(transfer.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-left flex items-center gap-2">
                      <div>
                        <p className="font-bold font-display text-sm">{formatCurrency(transfer.amount)}</p>
                        <StatusBadge status={transfer.status} />
                      </div>
                      <ChevronLeft className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-10 bg-muted/30 rounded-2xl border border-dashed border-border">
              <ShieldCheck className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">لا توجد حوالات حديثة</p>
              <Link href="/transfer" className="text-primary text-sm font-bold hover:underline">
                ابدأ تحويلك الأول
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

function StatPill({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string; label: string; color: "blue" | "red" | "orange" }) {
  const colors = {
    blue: "bg-primary/8 text-primary",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className={cn("rounded-2xl p-3 flex flex-col gap-1.5", colors[color])}>
      <Icon className="w-4 h-4 opacity-80" />
      <span className="font-display font-bold text-lg leading-none">{value}</span>
      <span className="text-[10px] font-medium opacity-70">{label}</span>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    completed: { label: "مكتملة ✓", color: "text-green-600" },
    awaiting_recipient_approval: { label: "⏳ بانتظار المستلم", color: "text-orange-600" },
    in_cooling_period: { label: "🕐 فترة تهدئة", color: "text-orange-500" },
    cancelled: { label: "ملغاة", color: "text-muted-foreground" },
    rejected_by_recipient: { label: "مرفوضة", color: "text-destructive" },
    expired: { label: "انتهت المهلة", color: "text-muted-foreground" },
    blocked: { label: "⛔ موقوفة", color: "text-destructive" },
  };
  const s = map[status] || { label: status, color: "text-muted-foreground" };
  return <span className={cn("text-[10px] font-bold mt-0.5 block", s.color)}>{s.label}</span>;
}
