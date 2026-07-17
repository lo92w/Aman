/**
 * شاشة المستلم — تُحاكي ما يراه الطرف المُستلِم عند وصول طلب موافقة
 * هذه الصفحة توضيحية للعرض التقديمي (Hackathon demo)
 */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Info,
  ChevronLeft,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import alinmaLogo from "@assets/alinma-logo.svg";

/* ─── mock transfer – represents the awaiting transfer used in demo ─── */
const MOCK = {
  senderName: "أحمد العتيبي",
  senderBank: "مصرف الإنماء",
  senderIban: "SA03●●●●●●●●●●●●1404471",
  amount: 6000,
  purpose: "تحويل شخصي",
  reference: "AMN-2026-482901",
  deadlineMinutes: 9,
  trustScore: 56,
  riskLabel: "متوسط",
};

type RecipientDecision = "pending" | "approved" | "rejected";

export default function RecipientView() {
  const [, setLocation] = useLocation();
  const [decision, setDecision] = useState<RecipientDecision>("pending");
  const [secondsLeft, setSecondsLeft] = useState(MOCK.deadlineMinutes * 60);
  const [isLoading, setIsLoading] = useState(false);

  /* Countdown */
  useEffect(() => {
    if (decision !== "pending") return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(t); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [decision]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const expired = secondsLeft === 0 && decision === "pending";

  const handleDecision = async (choice: "approved" | "rejected") => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setDecision(choice);
    setIsLoading(false);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f0f4f8] max-w-md mx-auto shadow-2xl overflow-hidden">

      {/* Header — styled as a generic bank notification (not Alinma) */}
      <header className="bg-white px-6 pt-12 pb-4 flex items-center gap-3 shadow-sm">
        <button
          onClick={() => setLocation("/")}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground font-medium">طلب موافقة على حوالة</p>
          <p className="font-display font-bold text-sm">بنك الرياض</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4 text-white" />
        </div>
      </header>

      {/* Demo banner */}
      <div className="bg-secondary/90 text-primary px-4 py-2 text-center">
        <p className="text-[11px] font-bold">عرض توضيحي — ما يراه المستلم عند طلب الموافقة</p>
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-4">

          {/* Result states */}
          {decision === "approved" && (
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-display font-bold text-xl text-green-800 mb-2">وافقت على الاستلام</h2>
              <p className="text-sm text-green-700 leading-relaxed">
                سيتلقى المُحوِّل إشعاراً بموافقتك. المبلغ سيُحوَّل إليك بعد انتهاء فترة التهدئة (90 ثانية).
              </p>
              <div className="mt-4 bg-green-100 rounded-2xl p-3">
                <p className="text-xs text-green-800 font-bold">المبلغ المتوقع: {MOCK.amount.toLocaleString("ar-SA")} ريال</p>
              </div>
            </div>
          )}

          {decision === "rejected" && (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="font-display font-bold text-xl text-red-800 mb-2">رفضت الاستلام</h2>
              <p className="text-sm text-red-700 leading-relaxed">
                تم إشعار المُحوِّل. سيُعاد المبلغ المحجوز إلى حسابه فوراً.
              </p>
            </div>
          )}

          {expired && (
            <div className="bg-muted border border-border rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-display font-bold text-xl text-muted-foreground mb-2">انتهت المهلة</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                لم تتم الموافقة خلال المهلة المحددة، فأُعيد المبلغ تلقائياً للمُحوِّل.
              </p>
            </div>
          )}

          {decision === "pending" && !expired && (
            <>
              {/* Countdown */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-border/50 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold text-orange-600">المهلة المتبقية للرد</span>
                </div>
                <div className="font-mono text-5xl font-bold text-primary tracking-tight">
                  {minutes}:{seconds}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  إذا لم تردّ، يُعاد المبلغ تلقائياً للمُحوِّل
                </p>
              </div>

              {/* Transfer card */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-border/50 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {MOCK.senderName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{MOCK.senderName}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {MOCK.senderBank}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">يريد تحويل</p>
                  <p className="font-display text-4xl font-bold text-primary">
                    {MOCK.amount.toLocaleString("ar-SA")}
                    <span className="text-lg font-medium mr-2 text-muted-foreground"> ريال</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-muted/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">الغرض</p>
                    <p className="font-bold text-xs">{MOCK.purpose}</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">المرجع</p>
                    <p className="font-bold text-xs font-mono">{MOCK.reference}</p>
                  </div>
                </div>
              </div>

              {/* Aman trust badge */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-primary mb-1">
                    محمي بطبقة أمان — درجة ثقة {MOCK.trustScore}/100
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    طلب التحويل هذا مرّ عبر فحص أمان ذكي. موافقتك ضرورية لأن النظام صنّف المستلم بخطورة{" "}
                    <span className="font-bold text-orange-600">{MOCK.riskLabel}</span>.
                    رفضك يعني إعادة المبلغ فوراً بدون أي خسارة.
                  </p>
                </div>
              </div>

              {/* Key insight */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-amber-800 mb-1">لماذا تحتاج موافقتي؟</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    المحتال الحقيقي لا يريد الكشف عن هويته — إذا كان الحساب احتيالاً فلن يستجيب، وتُعاد الأموال تلقائياً.
                    أما المستلم الشرعي فلا يتردد في الموافقة.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pb-8">
                <Button
                  onClick={() => handleDecision("rejected")}
                  disabled={isLoading}
                  variant="outline"
                  className="flex-1 h-14 rounded-xl font-bold border-2 border-destructive text-destructive hover:bg-red-50"
                >
                  {isLoading ? "..." : "رفض"}
                </Button>
                <Button
                  onClick={() => handleDecision("approved")}
                  disabled={isLoading}
                  className="flex-2 flex-[2] h-14 rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-md"
                >
                  {isLoading ? "..." : "قبول الاستلام ✓"}
                </Button>
              </div>
            </>
          )}

          {/* Back button after decision */}
          {(decision !== "pending" || expired) && (
            <Button
              onClick={() => setLocation("/")}
              variant="outline"
              className="w-full h-12 rounded-xl font-bold mt-2"
            >
              العودة للرئيسية
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
