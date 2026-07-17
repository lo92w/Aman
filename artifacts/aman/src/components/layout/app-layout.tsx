import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, ArrowLeftRight, Bell, LogOut, ChevronRight, PlusCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import alinmaLogo from "@assets/alinma-logo.svg";

export function AppLayout({ children, title, showBack }: { children: ReactNode, title?: string, showBack?: boolean }) {
  const { logout, user } = useAuth();
  const [location, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background relative max-w-md mx-auto shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground pt-12 pb-4 px-6 rounded-b-[2rem] shadow-md flex items-center justify-between">
        {showBack ? (
          <button 
            onClick={() => window.history.back()} 
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        ) : (
          <div className="flex flex-col">
            <span className="text-xs text-primary-foreground/70 font-medium">مرحباً بك</span>
            <span className="text-sm font-bold truncate max-w-[150px]">{user?.fullName || 'ضيف'}</span>
          </div>
        )}
        
        <div className="absolute left-1/2 -translate-x-1/2">
          {title ? (
            <h1 className="font-display font-bold text-lg">{title}</h1>
          ) : (
            <img src={alinmaLogo} alt="Alinma" className="h-6 object-contain" />
          )}
        </div>

        {!showBack && (
          <button onClick={logout} className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors">
            <LogOut className="w-5 h-5 text-primary-foreground/80" />
          </button>
        )}
        {showBack && <div className="w-10"></div>}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 relative z-0">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 left-0 right-0 z-50 bg-card border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
        <div className="grid grid-cols-4 items-center px-2 pt-2 pb-4">
          <NavItem href="/" icon={Home} label="الرئيسية" active={location === "/"} />
          <NavItem href="/transfers" icon={ArrowLeftRight} label="التحويلات" active={location.startsWith("/transfers")} />
          <NavItem href="/transfer" icon={PlusCircle} label="تحويل" active={location === "/transfer"} highlight />
          <NavItem href="/notifications" icon={Bell} label="الإشعارات" active={location === "/notifications"} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ href, icon: Icon, label, active, highlight }: { href: string, icon: any, label: string, active: boolean, highlight?: boolean }) {
  return (
    <Link href={href} className={cn(
      "flex flex-col items-center gap-1 py-1 transition-colors",
      active || highlight
        ? "text-primary"
        : "text-muted-foreground hover:text-primary/70"
    )}>
      {highlight ? (
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-2xl transition-colors",
          active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
        )}>
          <Icon className="w-5 h-5" />
        </div>
      ) : (
        <Icon className={cn("w-6 h-6", active && "fill-primary/10")} />
      )}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
