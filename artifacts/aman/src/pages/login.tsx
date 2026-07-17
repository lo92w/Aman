import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Loader2, Lock, Fingerprint } from "lucide-react";
import alinmaLogo from "@assets/alinma-logo.svg";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState<"user" | "pass" | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    try {
      await login({ data: values });
      setLocation("/");
    } catch {
      /* demo: any creds work */
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-primary relative max-w-md mx-auto shadow-2xl overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-20 w-56 h-56 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.2s" }} />
        <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Top section */}
      <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-8 px-8 relative z-10">

        {/* Shield hero */}
        <div className="relative mb-8">
          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-secondary/30 animate-ping" style={{ animationDuration: "2s" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-secondary/20 animate-ping" style={{ animationDuration: "2.4s", animationDelay: "0.4s" }} />
          </div>
          {/* Shield */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center shadow-2xl rotate-3">
            <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm" />
            <ShieldCheck className="w-10 h-10 text-primary relative z-10" strokeWidth={2} />
          </div>
        </div>

        {/* Logo + brand */}
        <img src={alinmaLogo} alt="Alinma" className="h-8 object-contain mb-3 brightness-0 invert opacity-90" />
        <div className="text-center mb-2">
          <h1 className="font-display font-bold text-white/95 text-lg tracking-wide">مزوّد بطبقة أمان الذكية</h1>
          <p className="text-white/50 text-xs mt-1 tracking-wider">POWERED BY AMAN TRUST ENGINE</p>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
          {["SAMA Compliant", "AML Protected", "256-bit Encrypted"].map(b => (
            <span key={b} className="text-[10px] font-bold text-secondary/80 border border-secondary/30 px-2.5 py-1 rounded-full tracking-wider bg-secondary/5">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Form card — slides up */}
      <div className="bg-background rounded-t-[2.5rem] px-7 pt-8 pb-10 relative z-10 shadow-[0_-20px_60px_rgba(0,0,0,0.3)]">
        <div className="w-10 h-1 bg-border/50 rounded-full mx-auto mb-6" />
        <h2 className="font-display font-bold text-xl mb-1">تسجيل الدخول</h2>
        <p className="text-muted-foreground text-xs mb-6">نموذج تجريبي — أدخل أي بيانات للدخول</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className={cn(
                      "relative flex items-center border-2 rounded-2xl h-14 overflow-hidden transition-all bg-muted/40",
                      focused === "user" ? "border-primary shadow-sm shadow-primary/20" : "border-transparent"
                    )}>
                      <div className="absolute right-4 text-muted-foreground">
                        <Lock className="w-4 h-4" />
                      </div>
                      <Input
                        placeholder="اسم المستخدم"
                        {...field}
                        dir="rtl"
                        className="h-full border-0 bg-transparent pr-11 rounded-2xl focus-visible:ring-0 font-medium"
                        onFocus={() => setFocused("user")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className={cn(
                      "relative flex items-center border-2 rounded-2xl h-14 overflow-hidden transition-all bg-muted/40",
                      focused === "pass" ? "border-primary shadow-sm shadow-primary/20" : "border-transparent"
                    )}>
                      <div className="absolute right-4 text-muted-foreground">
                        <Fingerprint className="w-4 h-4" />
                      </div>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        dir="ltr"
                        className="h-full border-0 bg-transparent pr-11 text-right rounded-2xl focus-visible:ring-0 font-medium tracking-widest"
                        onFocus={() => setFocused("pass")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/30 mt-2 tracking-wide"
            >
              {isSubmitting
                ? <Loader2 className="w-6 h-6 animate-spin" />
                : <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> دخول آمن</span>
              }
            </Button>
          </form>
        </Form>

        <p className="text-center text-[11px] text-muted-foreground/50 mt-6 leading-relaxed">
          هذا نموذج أولي لعرض الهاكاثون فقط
        </p>
      </div>
    </div>
  );
}
