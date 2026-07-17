import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useListTransfers, getListTransfersQueryKey } from "@workspace/api-client-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Link } from "wouter";
import { ArrowUpRight, Filter, Search, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransfersList() {
  const [filter, setFilter] = useState<string>('all');
  const { data: transfers, isLoading } = useListTransfers(filter === 'all' ? undefined : { status: filter });

  return (
    <AppLayout title="التحويلات">
      <div className="p-6 space-y-6">
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide hide-scrollbar">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>الكل</FilterButton>
          <FilterButton active={filter === 'awaiting_recipient_approval'} onClick={() => setFilter('awaiting_recipient_approval')}>معلقة</FilterButton>
          <FilterButton active={filter === 'in_cooling_period'} onClick={() => setFilter('in_cooling_period')}>فترة تهدئة</FilterButton>
          <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>مكتملة</FilterButton>
          <FilterButton active={filter === 'cancelled'} onClick={() => setFilter('cancelled')}>ملغاة</FilterButton>
        </div>

        {/* List */}
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))
          ) : !transfers?.length ? (
            <div className="text-center p-12 bg-muted/30 rounded-3xl border border-dashed border-border mt-10">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowLeftRight className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">لا توجد تحويلات</h3>
              <p className="text-muted-foreground text-sm">لم تقم بأي عمليات تحويل حتى الآن</p>
            </div>
          ) : (
            transfers.map(transfer => (
              <Link key={transfer.id} href={`/transfers/${transfer.id}`}>
                <div className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      transfer.status === 'completed' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                      transfer.status === 'cancelled' || transfer.status === 'blocked' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                    )}>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[15px]">{transfer.recipientName}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">{formatDate(transfer.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold font-display text-lg">{formatCurrency(transfer.amount)}</span>
                    <StatusBadge status={transfer.status} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </AppLayout>
  );
}

function FilterButton({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
        active 
          ? "bg-primary text-primary-foreground border-primary shadow-md" 
          : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
