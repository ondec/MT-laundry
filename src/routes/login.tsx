import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Building2, ShieldCheck, Truck, User } from "lucide-react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — MT Laundry" },
      { name: "description", content: "Sign in to your MT Laundry workspace." },
    ],
  }),
  component: LoginPage,
});

const roles = [
  { to: "/admin", label: "Owner", icon: Building2 },
  { to: "/staff", label: "Staff", icon: Truck },
  { to: "/app", label: "Customer", icon: User },
  { to: "/super-admin", label: "Platform", icon: ShieldCheck },
] as const;

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<(typeof roles)[number]["to"]>("/admin");
  const [email, setEmail] = useState("demo@mtlaundry.app");
  const [password, setPassword] = useState("password");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter your email and password");
      return;
    }
    toast.success("Welcome back");
    navigate({ to: role });
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your workspace"
      subtitle="Pick the seat you want to step into, then sign in."
      footer={
        <div className="flex items-center justify-between">
          <span>New here?</span>
          <Link to="/signup" className="text-foreground font-medium hover:underline">
            Create an account
          </Link>
        </div>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sign in as</Label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {roles.map((r) => {
              const Icon = r.icon;
              const active = role === r.to;
              return (
                <button
                  type="button"
                  key={r.to}
                  onClick={() => setRole(r.to)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border p-2.5 text-xs transition-all",
                    active
                      ? "border-foreground bg-ink text-ink-foreground"
                      : "border-border bg-card hover:border-foreground/30",
                  )}
                >
                  <Icon className="size-4" />
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@laundry.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full">Sign in</Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={() => { toast.success("Welcome back"); navigate({ to: role }); }}>
          Continue with Google
        </Button>
      </form>
    </AuthShell>
  );
}
