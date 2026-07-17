import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useListBeneficiaries,
  useAnalyzeTransfer,
  useCreateTransfer,
  useGetMe,
  getGetDashboardQueryKey,
  getListTransfersQueryKey,
} from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import {
  ShieldCheck,
  User,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  BrainCircuit,
  ShieldAlert,
  Users,
  ChevronLeft,
  Ban,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import alinmaLogo from "@assets/alinma-logo.svg";

/* ─── schemas ─── */
const step1Schema = z.object({
  beneficiaryId: z.string().optional(),
  recipientName: z.string().min(2, "الاسم مطلوب"),
  recipientIban: z.string().min(10, "الآيبان غير صالح"),
  recipientBank: z.string().optional(),
});

const step2Schema = z.object({
  amount: z.coerce.number().min(1, "المبلغ يجب أن يكون أكبر من صفر"),
  purpose: z.string().optional(),
});

type FlowStep = 1 | 2 | "analysis" | "social_check" | "action";

/* ─── component ─── */
export default function TransferFlow() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<FlowStep>(1);
  const [draftData, setDraftData] = useState<Record<string, unknown>>({});
  const [analysis, setAnalysis] = useState<any>(null);
  const [socialAnswers, setSocialAnswers] = useState<Record<string, boolean>>({});

  const { data: user } = useGetMe();
  const { data: beneficiaries, isLoading: isBenesLoading } = useListBeneficiaries();
  const analyzeMutation = useAnalyzeTransfer();
  const createMutation = useCreateTransfer();

  const form1 = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: { beneficiaryId: "", recipientName: "", recipientIban: "", recipientBank: "مصرف الإنماء" },
  });

  const form2 = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: { amount: undefined, purpose: "تحويل شخصي" },
  });

  /* Step 1 → 2 */
  const onStep1Submit = (values: z.infer<typeof step1Schema>) => {
    setDraftData((prev) => ({ ...prev, ...values }));
    setStep(2);
  };

  /* Step 2 → analysis → social_check | action */
  const onStep2Submit = async (values: z.infer<typeof step2Schema>) => {
    const fullDraft = {
      ...draftData,
      ...values,
      beneficiaryId: draftData.beneficiaryId
        ? parseInt(draftData.beneficiaryId as string, 10)
        : undefined,
    };
    setDraftData(fullDraft);
    setStep("analysis");

    try {
      const result = await analyzeMutation.mutateAsync({ data: fullDraft as any });
      setAnalysis(result);
      await new Promise((r) => setTimeout(r, 2200)); // let the animation breathe
      setStep(result.requiredAction === "social_check" ? "social_check" : "action");
    } catch {
      toast({ title: "خطأ", description: "تعذر فحص التحويل، يرجى المحاولة مجدداً", variant: "destructive" });
      setStep(2);
    }
  };

  /* Final submit (create transfer) */
  const handleProceed = async (overrideAcknowledged = false) => {
    try {
      const answersArray = Object.entries(socialAnswers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));
      const payload = {
        recipientName: draftData.recipientName as string,
        recipientIban: draftData.recipientIban as string,
        amount: draftData.amount as number,
        purpose: (draftData.purpose as string) || undefined,
        beneficiaryId: (draftData.beneficiaryId as number | undefined) || undefined,
        socialAnswers: answersArray.length > 0 ? answersArray : undefined,
        overrideAcknowledged,
      };

      const transfer = await createMutation.mutateAsync({ data: payload });
      queryClient.invalidateQueries({ queryKey: getGetDashboardQueryKey() });
      queryClient.invalidateQueries({ queryKey: getListTransfersQueryKey() });
      setLocation(`/transfers/${transfer.id}`);
    } catch (err: any) {
      const msg = err?.data?.error || "فشلت عملية التحويل";
      toast({ title: "خطأ", description: msg, variant: "destructive" });
    }
  };

  /* ── Aman steps share a special frame ── */
  const isAmanStep = step === "analysis" || step === "social_check" || step === "action";

  if (isAmanStep) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-primary max-w-md mx-auto shadow-2xl overflow-hidden">
        {/* Aman header */}
        <div className="pt-14 pb-6 px-6 flex items-center justify-between">
          <button
            onClick={() => (step === "analysis" ? undefined : setStep(step === "social_check" ? "action" : 2))}
            className="p-2 rounded-full bg-white/10 text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span className="text-white font-display font-bold text-sm">طبقة أمان الذكية</span>
          </div>
          <div className="w-9" />
        </div>

        <div className="flex-1 bg-background rounded-t-[2.5rem] overflow-y-auto">
          <div className="p-6 pb-24">

            {/* ── Analysis animation ── */}
            {step === "analysis" && <AnalysisScreen />}

            {/* ── Social check ── */}
            {step === "social_check" && analysis && (
              <div className="space-y-5">
                <div className="bg-orange-50 border border-orange-200 rounded-3xl p-5 text-center">
                  <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <h2 className="font-display font-bold text-lg mb-1 text-orange-900">تحقق أمني إضافي</h2>
                  <p className="text-sm text-orange-800/80 leading-relaxed">
                    لحمايتك من أساليب الاحتيال، أجب بصدق على هذه الأسئلة القصيرة قبل إتمام التحويل.
                  </p>
                </div>

                <div className="space-y-4">
                  {analysis.socialCheck.map((q: any, i: number) => (
                    <div key={q.id} className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                      <p className="font-bold text-[15px] leading-relaxed mb-4">
                        {i + 1}. {q.question}
                      </p>
                      <RadioGroup
                        onValueChange={(val) =>
                          setSocialAnswers((prev) => ({ ...prev, [q.id]: val === "yes" }))
                        }
                        className="flex gap-3"
                      >
                        {["yes", "no"].map((val) => (
                          <div key={val} className="flex-1">
                            <RadioGroupItem value={val} id={`${q.id}-${val}`} className="peer sr-only" />
                            <Label
                              htmlFor={`${q.id}-${val}`}
                              className="w-full block text-center py-3 border-2 border-border/50 rounded-xl peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all font-bold"
                            >
                              {val === "yes" ? "نعم" : "لا"}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full h-14 rounded-xl text-base font-bold shadow-lg"
                  disabled={
                    Object.keys(socialAnswers).length !== analysis.socialCheck.length ||
                    createMutation.isPending
                  }
                  onClick={() => handleProceed()}
                >
                  {createMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "متابعة التحويل"
                  )}
                </Button>
              </div>
            )}

            {/* ── Action / Score reveal ── */}
            {step === "action" && analysis && (
              <div className="space-y-5">
                {/* Score ring */}
                <div
                  className={cn(
                    "rounded-3xl p-6 text-center shadow-md border",
                    analysis.riskLevel === "low"
                      ? "bg-green-50 border-green-200"
                      : analysis.riskLevel === "medium"
                        ? "bg-orange-50 border-orange-200"
                        : "bg-red-50 border-red-200"
                  )}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">
                    مؤشر ثقة أمان
                  </span>
                  <div className="relative flex justify-center items-center h-32 my-2">
                    <svg className="absolute w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/20" />
                      <circle
                        cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6"
                        strokeDasharray="276"
                        strokeDashoffset={276 - (276 * analysis.score) / 100}
                        strokeLinecap="round"
                        className={cn(
                          analysis.riskLevel === "low" ? "text-green-500" :
                          analysis.riskLevel === "medium" ? "text-orange-500" : "text-destructive"
                        )}
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <span className={cn(
                        "font-display text-5xl font-bold",
                        analysis.riskLevel === "low" ? "text-green-700" :
                        analysis.riskLevel === "medium" ? "text-orange-700" : "text-destructive"
                      )}>
                        {analysis.score}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">/ 100</span>
                    </div>
                  </div>
                  <h2 className="font-display font-bold text-lg mb-1">{analysis.headline}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summary}</p>
                </div>

                {/* Recipient preview */}
                <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    بيانات المستلم
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الاسم المطابق بالبنك</span>
                      <span className={cn("font-bold", analysis.recipientPreview.nameVerified ? "text-green-600" : "text-orange-600")}>
                        {analysis.recipientPreview.holderNameMasked}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">البنك</span>
                      <span className="font-bold">{analysis.recipientPreview.bank}</span>
                    </div>
                    {analysis.recipientPreview.accountAgeMonths != null && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">عمر الحساب</span>
                        <span className="font-bold">{analysis.recipientPreview.accountAgeMonths} أشهر</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Factors */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    لماذا هذه النتيجة؟
                  </h3>
                  {analysis.factors.slice(0, 4).map((f: any) => (
                    <div key={f.id} className="bg-card border border-border/50 rounded-xl p-3 flex gap-3 items-start shadow-sm">
                      {f.kind === "positive" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      ) : f.kind === "negative" ? (
                        <ShieldAlert className="w-5 h-5 text-destructive shrink-0" />
                      ) : (
                        <Info className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                      <div>
                        <span className="font-bold text-sm block">{f.label}</span>
                        <span className="text-xs text-muted-foreground leading-snug block mt-0.5">{f.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Patterns */}
                {analysis.detectedPatterns.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <h3 className="font-bold text-red-800 text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      نمط احتيال مكتشف
                    </h3>
                    {analysis.detectedPatterns.map((p: any) => (
                      <p key={p.id} className="text-xs text-red-700/80 mb-1">{p.description}</p>
                    ))}
                  </div>
                )}

                {analysis.communityReports > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                    <h3 className="font-bold text-orange-800 text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      بلاغات المجتمع ({analysis.communityReports})
                    </h3>
                    <p className="text-xs text-orange-700/80 mt-1">
                      مستخدمون أبلغوا عن نشاط مشبوه لهذا الحساب مؤخراً.
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-2 pb-8">
                  {analysis.requiredAction === "proceed" && (
                    <Button
                      onClick={() => handleProceed(false)}
                      disabled={createMutation.isPending}
                      className="w-full h-14 rounded-xl text-base font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg"
                    >
                      {createMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "إرسال الحوالة بأمان ✓"}
                    </Button>
                  )}

                  {analysis.requiredAction === "recipient_approval" && (
                    <div className="space-y-3">
                      <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 text-center">
                        <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-bold text-sm mb-1">بانتظار موافقة المستلم</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          المبلغ يُحجز في حسابك ولا يغادر إلا بعد تأكيد المستلم، مع فترة تهدئة تتيح لك التراجع.
                        </p>
                      </div>
                      <Button
                        onClick={() => handleProceed(false)}
                        disabled={createMutation.isPending}
                        className="w-full h-14 rounded-xl text-base font-bold shadow-lg"
                      >
                        {createMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "متابعة عبر طبقة الحماية"}
                      </Button>
                    </div>
                  )}

                  {analysis.requiredAction === "block" && (
                    <div className="space-y-3">
                      <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-center">
                        <Ban className="w-8 h-8 text-destructive mx-auto mb-2" />
                        <h4 className="font-bold text-sm text-red-800 mb-1">أوقف أمان هذه الحوالة لحمايتك</h4>
                        <p className="text-xs text-red-700/80 leading-relaxed">
                          المؤشرات تدل بقوة على محاولة احتيال. ننصحك بشدة بالتوقف.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation("/")}
                          variant="outline"
                          className="flex-1 h-12 rounded-xl font-bold border-2"
                        >
                          إلغاء والعودة
                        </Button>
                        <Button
                          onClick={() => handleProceed(true)}
                          disabled={createMutation.isPending}
                          variant="ghost"
                          className="text-xs h-12 text-muted-foreground hover:text-destructive hover:bg-red-50"
                        >
                          {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "الإصرار على التحويل"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Bank steps (1 & 2): pure Alinma look ── */
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background max-w-md mx-auto shadow-2xl overflow-hidden">
      {/* Alinma header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground pt-12 pb-4 px-6 shadow-md flex items-center justify-between rounded-b-[2rem]">
        <button
          onClick={() => (step === 1 ? setLocation("/") : setStep(1))}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <img src={alinmaLogo} alt="Alinma" className="h-6 object-contain" />
        </div>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto pb-10">
        <div className="p-6">
          {/* Progress */}
          <div className="flex items-center gap-1.5 mb-8">
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div className={cn("h-1 flex-1 rounded-full", step === 2 ? "bg-primary" : "bg-muted")} />
            <div className="h-1 flex-1 rounded-full bg-muted" />
          </div>

          {/* ── Step 1: Recipient ── */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl mb-1">لمن تريد التحويل؟</h2>
                <p className="text-sm text-muted-foreground">اختر مستفيداً محفوظاً أو أضف جديداً</p>
              </div>

              {/* Saved beneficiaries */}
              {!isBenesLoading && beneficiaries && beneficiaries.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-muted-foreground">المستفيدون</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
                    {beneficiaries.map((bene) => (
                      <button
                        key={bene.id}
                        type="button"
                        onClick={() => {
                          form1.setValue("beneficiaryId", bene.id.toString());
                          form1.setValue("recipientName", bene.name);
                          form1.setValue("recipientIban", bene.iban);
                          form1.setValue("recipientBank", bene.bank);
                        }}
                        className={cn(
                          "flex flex-col items-center gap-2 min-w-[76px] p-3 rounded-2xl border transition-all shrink-0",
                          form1.watch("beneficiaryId") === bene.id.toString()
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/40"
                        )}
                      >
                        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {bene.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-center line-clamp-1">
                          {bene.name.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-3 text-muted-foreground">أو أدخل بيانات جديدة</span>
                </div>
              </div>

              <Form {...form1}>
                <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-4">
                  <FormField
                    control={form1.control}
                    name="recipientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم المستلم</FormLabel>
                        <FormControl>
                          <Input placeholder="الاسم الكامل" {...field} className="h-14 rounded-xl bg-card" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form1.control}
                    name="recipientIban"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الآيبان (IBAN)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="SA..."
                            {...field}
                            className="h-14 rounded-xl bg-card font-mono text-left"
                            dir="ltr"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form1.control}
                    name="recipientBank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البنك</FormLabel>
                        <FormControl>
                          <Input placeholder="اسم البنك" {...field} className="h-14 rounded-xl bg-card" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-14 rounded-xl text-base font-bold mt-2 shadow-md shadow-primary/20">
                    التالي
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {/* ── Step 2: Amount ── */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl mb-1">كم تريد أن تحوّل؟</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl border border-border/50 mt-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {(draftData.recipientName as string || "").charAt(0)}
                  </div>
                  <span className="flex-1">
                    إلى: <strong className="text-foreground">{draftData.recipientName as string}</strong>
                  </span>
                  <button onClick={() => setStep(1)} className="text-primary text-xs underline">
                    تعديل
                  </button>
                </div>
              </div>

              {user && (
                <div className="flex justify-between items-center bg-muted/50 p-4 rounded-xl border border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">رصيدك المتاح</span>
                  <span className="font-bold font-display">{formatCurrency(user.balance)}</span>
                </div>
              )}

              <Form {...form2}>
                <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-5">
                  <FormField
                    control={form2.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">المبلغ</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              min="1"
                              placeholder="0"
                              {...field}
                              value={field.value ?? ""}
                              className="h-28 rounded-2xl bg-card text-center text-5xl font-display font-bold border-2 focus-visible:ring-0 focus-visible:border-primary pr-20"
                              dir="ltr"
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">
                              SAR
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form2.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الغرض من التحويل</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="مثال: تحويل شخصي، إيجار..."
                            {...field}
                            className="h-14 rounded-xl bg-card"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={analyzeMutation.isPending}
                    className="w-full h-14 rounded-xl text-base font-bold shadow-md shadow-primary/20 flex items-center gap-2"
                  >
                    {analyzeMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        متابعة وفحص أمان
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ─── Analysis screen component ─── */
const PHASES = [
  "يتحقق من هوية المستلم...",
  "يفحص سجل الشبكة...",
  "يطابق نماذج الاحتيال...",
  "يحلل سلوك الحساب...",
  "يحسب درجة الثقة النهائية...",
];

function AnalysisScreen() {
  const [phaseIdx, setPhaseIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhaseIdx((i) => (i + 1) % PHASES.length), 440);
    return () => clearInterval(t);
  }, []);

  // Data dots positions on a circle
  const dots = [0, 72, 144, 216, 288].map((deg) => ({
    x: 50 + 38 * Math.sin((deg * Math.PI) / 180),
    y: 50 - 38 * Math.cos((deg * Math.PI) / 180),
  }));

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-10 text-center">

      {/* Scanner visualization */}
      <div className="relative w-56 h-56 flex items-center justify-center">

        {/* Outermost slow-pulse ring */}
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse" />

        {/* Slow-rotating dashed ring */}
        <div
          className="absolute inset-4 rounded-full border-2 border-dashed border-primary/15 animate-spin"
          style={{ animationDuration: "10s" }}
        />

        {/* Static track ring */}
        <div className="absolute inset-10 rounded-full border-2 border-primary/10" />

        {/* Fast rotating scanner arc */}
        <div
          className="absolute inset-10 rounded-full border-[3px] border-transparent border-t-secondary border-r-secondary/40 animate-spin"
          style={{ animationDuration: "1s" }}
        />

        {/* Data dots orbiting the track */}
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-secondary/60"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              transform: "translate(-50%, -50%)",
              opacity: 0.4 + 0.6 * ((phaseIdx + i) % 5) / 4,
              transition: "opacity 0.4s ease",
            }}
          />
        ))}

        {/* Center glow */}
        <div className="absolute inset-[28%] rounded-full bg-primary/8 blur-md" />

        {/* Center shield */}
        <div className="relative z-10 w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/50">
          <ShieldCheck className="w-10 h-10 text-secondary" />
        </div>
      </div>

      {/* Text */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-bold">أمان يفحص الحوالة</h2>
        <p className="text-muted-foreground text-sm h-5 transition-all duration-300">
          {PHASES[phaseIdx]}
        </p>
      </div>

      {/* Progress */}
      <div className="w-64 space-y-2">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-l from-secondary to-primary/80"
            style={{ animation: "progress 2.2s ease-out forwards" }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground/60 font-medium px-0.5">
          <span>تحليل البيانات</span>
          <span>محرك أمان الذكي</span>
        </div>
      </div>
    </div>
  );
}
