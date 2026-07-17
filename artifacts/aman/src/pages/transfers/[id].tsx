import { AppLayout } from "@/components/layout/app-layout";
import { 
  useGetTransfer, 
  useCancelTransfer, 
  useSimulateTransfer,
  getGetTransferQueryKey,
  getListTransfersQueryKey,
  getGetDashboardQueryKey,
  type Transfer
} from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { useRoute, Link } from "wouter";
import { StatusBadge } from "@/pages/dashboard";
import { ShieldCheck, Clock, AlertTriangle, CheckCircle2, XCircle, ArrowRight, Ban, Info, ShieldAlert, Activity, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function TransferDetail() {
  const [, params] = useRoute("/transfers/:id");
  const id = parseInt(params?.id || "0", 10);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: transfer, isLoading } = useGetTransfer(id, {
    query: {
      queryKey: getGetTransferQueryKey(id),
      enabled: !!id,
      // Poll while in active pending states to catch server-side transitions
      refetchInterval: (query) => {
        const status = query.state.data?.status;
        if (status === 'awaiting_recipient_approval' || status === 'in_cooling_period') {
          return 4000;
        }
        return false;
      }
    }
  });

  const cancelMutation = useCancelTransfer();
  const simulateMutation = useSimulateTransfer();

  const handleCancel = async () => {
    try {
      await cancelMutation.mutateAsync({ id });
      queryClient.invalidateQueries({ queryKey: getGetTransferQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getListTransfersQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetDashboardQueryKey() });
      toast({ title: "تم إلغاء التحويل", description: "تم إرجاع المبلغ إلى رصيدك." });
    } catch (e) {
      toast({ title: "خطأ", description: "لم نتمكن من إلغاء التحويل.", variant: "destructive" });
    }
  };

  const simulate = async (action: 'recipient_approve' | 'recipient_reject' | 'skip_cooling' | 'expire_now') => {
    try {
      await simulateMutation.mutateAsync({ id, data: { action } });
      queryClient.invalidateQueries({ queryKey: getGetTransferQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getListTransfersQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetDashboardQueryKey() });
      toast({ title: "تمت المحاكاة بنجاح" });
    } catch (e) {
      toast({ title: "خطأ في المحاكاة", variant: "destructive" });
    }
  };

  if (isLoading || !transfer) {
    return (
      <AppLayout title="تفاصيل التحويل" showBack>
        <div className="p-6 space-y-6">
          <Skeleton className="h-48 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </AppLayout>
    );
  }

  const isPending = transfer.status === 'awaiting_recipient_approval' || transfer.status === 'in_cooling_period';

  return (
    <AppLayout title="تفاصيل التحويل" showBack>
      <div className="p-6 space-y-6 pb-32">
        
        {/* Receipt Header */}
        <div className="bg-card rounded-3xl p-6 shadow-sm border border-border/50 text-center flex flex-col items-center relative overflow-hidden">
          <StatusIcon status={transfer.status} className="w-16 h-16 mb-4" />
          
          <span className="text-muted-foreground text-sm mb-1">المبلغ</span>
          <div className="font-display text-4xl font-bold mb-4">{formatCurrency(transfer.amount)}</div>
          
          <div className="w-full flex justify-center mb-6">
            <StatusBadge status={transfer.status} />
          </div>

          <div className="w-full bg-muted/30 rounded-2xl p-4 flex flex-col gap-3 text-sm text-right">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">المستفيد</span>
              <span className="font-bold">{transfer.recipientName}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">البنك</span>
              <span className="font-bold">{transfer.recipientBank || 'غير محدد'}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">الآيبان</span>
              <span className="font-mono">{transfer.recipientIban}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">الغرض</span>
              <span className="font-bold">{transfer.purpose || 'تحويل شخصي'}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-muted-foreground">الرقم المرجعي</span>
              <span className="font-mono text-xs">{transfer.reference}</span>
            </div>
          </div>
        </div>

        {/* Aman Protection Box - Always show for awareness */}
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-bold">تحليل أمان</h3>
            <span className="mr-auto font-mono bg-white px-2 py-1 rounded-md text-xs border border-primary/10 shadow-sm font-bold">
              مؤشر الثقة: {transfer.trustScore}/100
            </span>
          </div>
          <div className="space-y-2 mt-4">
            {transfer.factors.map(f => (
              <div key={f.id} className="flex gap-2 text-sm">
                {f.kind === 'positive' ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> :
                 f.kind === 'negative' ? <ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> :
                 <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />}
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timers & Cancellation */}
        {isPending && (
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-5">
            <h3 className="font-bold text-orange-800 dark:text-orange-400 mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {transfer.status === 'awaiting_recipient_approval' ? 'بانتظار موافقة المستلم' : 'فترة التهدئة نشطة'}
            </h3>
            <p className="text-sm text-orange-700/80 dark:text-orange-300/80 mb-4">
              المبلغ محجوز بأمان. يمكنك استرجاع المبلغ فوراً دون الرجوع للمستفيد.
            </p>
            
            {transfer.status === 'awaiting_recipient_approval' && transfer.approvalDeadline && (
              <CountdownTimer deadline={transfer.approvalDeadline} label="تنتهي المهلة خلال" />
            )}
            {transfer.status === 'in_cooling_period' && transfer.coolingEndsAt && (
              <CountdownTimer deadline={transfer.coolingEndsAt} label="تنتهي التهدئة خلال" />
            )}

            <Button 
              variant="destructive" 
              className="w-full mt-4 rounded-xl font-bold h-12 shadow-sm"
              onClick={handleCancel}
              disabled={cancelMutation.isPending}
            >
              استرجاع فوري للمبلغ
            </Button>

            {/* Link to recipient view — demo only */}
            {transfer.status === 'awaiting_recipient_approval' && (
              <Link href="/recipient-view">
                <div className="mt-3 flex items-center justify-center gap-2 p-3 bg-white/60 rounded-xl border border-orange-200 text-orange-800 text-sm font-bold cursor-pointer hover:bg-white/80 transition-colors">
                  <Eye className="w-4 h-4" />
                  شاهد ما يراه المستلم الآن
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Timeline */}
        <div>
          <h3 className="font-bold text-lg mb-4">سجل العملية</h3>
          <div className="space-y-0 relative before:absolute before:inset-y-2 before:right-3.5 before:w-0.5 before:bg-border/60">
            {transfer.timeline.map((event, i) => (
              <div key={i} className="relative pl-4 pr-10 py-3">
                <div className="absolute right-2 top-4 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background" />
                <div className="bg-card border border-border/50 rounded-2xl p-3 shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm">{event.label}</span>
                    <span className="text-xs text-muted-foreground">{formatTime(event.at)}</span>
                  </div>
                  {event.detail && (
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">{event.detail}</p>
                  )}
                  <span className="text-[10px] text-muted-foreground/50 mt-2 block">{formatDate(event.at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HACKATHON DEMO PANEL */}
        <div className="mt-12 bg-secondary/10 border-2 border-secondary/20 rounded-3xl p-5 relative overflow-hidden border-dashed">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />
          <h3 className="font-display font-bold text-secondary-foreground mb-4 flex items-center gap-2 relative z-10">
            <Activity className="w-5 h-5" />
            وضع العرض التقديمي (Demo)
          </h3>
          <p className="text-xs text-muted-foreground mb-4 relative z-10">
            أدوات لمحاكاة مرور الوقت أو استجابة المستلم لتسريع العرض.
          </p>
          <div className="grid grid-cols-2 gap-2 relative z-10">
            {transfer.status === 'awaiting_recipient_approval' && (
              <>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => simulate('recipient_approve')}>
                  محاكاة: قبول المستلم
                </Button>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => simulate('recipient_reject')}>
                  محاكاة: رفض المستلم
                </Button>
                <Button size="sm" variant="outline" className="text-xs col-span-2" onClick={() => simulate('expire_now')}>
                  تسريع الوقت: انتهاء المهلة
                </Button>
              </>
            )}
            {transfer.status === 'in_cooling_period' && (
              <Button size="sm" variant="outline" className="text-xs col-span-2" onClick={() => simulate('skip_cooling')}>
                تسريع الوقت: تخطي التهدئة
              </Button>
            )}
            {!isPending && (
              <div className="col-span-2 text-center text-xs text-muted-foreground py-2">
                لا توجد إجراءات محاكاة متاحة لهذه الحالة
              </div>
            )}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

function StatusIcon({ status, className }: { status: string, className?: string }) {
  if (status === 'completed') return <CheckCircle2 className={cn("text-green-500", className)} />;
  if (status === 'awaiting_recipient_approval' || status === 'in_cooling_period') return <Clock className={cn("text-orange-500", className)} />;
  if (status === 'blocked' || status === 'rejected_by_recipient') return <Ban className={cn("text-destructive", className)} />;
  return <XCircle className={cn("text-muted-foreground", className)} />;
}

function CountdownTimer({ deadline, label }: { deadline: string, label: string }) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const end = new Date(deadline).getTime();
    
    const update = () => {
      const now = new Date().getTime();
      const distance = end - now;
      
      if (distance < 0) {
        setTimeLeft('00:00');
        return;
      }
      
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };
    
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="flex items-center justify-between bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-orange-200/50 dark:border-orange-900/30">
      <span className="text-sm font-medium">{label}</span>
      <span className="font-mono font-bold text-lg tracking-widest">{timeLeft}</span>
    </div>
  );
}
