import { AppLayout } from "@/components/layout/app-layout";
import { useListNotifications, useMarkNotificationsRead, getListNotificationsQueryKey } from "@workspace/api-client-react";
import { formatTime, formatDate } from "@/lib/utils";
import { ShieldCheck, CheckCircle2, XCircle, Clock, AlertTriangle, Check, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function Notifications() {
  const { data: notifications, isLoading } = useListNotifications();
  const markRead = useMarkNotificationsRead();
  const queryClient = useQueryClient();

  const handleMarkAllRead = () => {
    markRead.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() });
      }
    });
  };

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <AppLayout title="الإشعارات" showBack>
      <div className="p-6 space-y-6">
        
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">أحدث الإشعارات</h2>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-primary text-xs h-8">
              <Check className="w-4 h-4 ml-1" />
              تحديد الكل كمقروء
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-muted/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : !notifications?.length ? (
          <div className="text-center p-12 bg-muted/30 rounded-3xl border border-dashed border-border mt-10">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2">لا توجد إشعارات</h3>
            <p className="text-muted-foreground text-sm">أنت على اطلاع بكل جديد</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={cn(
                  "p-4 rounded-2xl border transition-colors flex gap-4 items-start",
                  notification.read ? "bg-card border-border/50 opacity-75" : "bg-card border-primary/20 shadow-sm"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1",
                  getIconStyle(notification.type)
                )}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className={cn("font-bold text-sm", !notification.read && "text-primary")}>
                      {notification.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap mr-2">
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {notification.body}
                  </p>
                  <div className="text-[10px] text-muted-foreground/60 pt-2 mt-2 border-t border-border/50">
                    {formatDate(notification.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AppLayout>
  );
}

function getIcon(type: string) {
  switch (type) {
    case 'trust': return <ShieldCheck className="w-5 h-5" />;
    case 'success': return <CheckCircle2 className="w-5 h-5" />;
    case 'pending': return <Clock className="w-5 h-5" />;
    case 'cancel': return <XCircle className="w-5 h-5" />;
    case 'security': return <AlertTriangle className="w-5 h-5" />;
    default: return <Bell className="w-5 h-5" />;
  }
}

function getIconStyle(type: string) {
  switch (type) {
    case 'trust': return "bg-primary/10 text-primary";
    case 'success': return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case 'pending': return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    case 'cancel': return "bg-muted text-muted-foreground";
    case 'security': return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    default: return "bg-muted text-muted-foreground";
  }
}
