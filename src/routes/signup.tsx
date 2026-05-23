import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — MT Laundry" },
      { name: "description", content: "Spin up a new MT Laundry workspace in 30 seconds." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", business: "", email: "", password: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.name) {
      toast.error("Please fill out the required fields");
      return;
    }
    toast.success("Account created — welcome to MT Laundry");
    navigate({ to: "/admin" });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <AuthShell
      eyebrow="Start free · no card"
      title="Spin up your laundromat"
      subtitle="One workspace for owners, staff and customers. Bring your team in after."
      footer={
        <div className="flex items-center justify-between">
          <span>Already have an account?</span>
          <Link to="/login" className="text-foreground font-medium hover:underline">
            Sign in
          </Link>
        </div>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" value={form.name} onChange={set("name")} placeholder="Maya Ortiz" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business">Business</Label>
            <Input id="business" value={form.business} onChange={set("business")} placeholder="Sparkle Wash" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@laundry.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={form.password} onChange={set("password")} placeholder="At least 8 characters" />
        </div>

        <Button type="submit" className="w-full">Create workspace</Button>

        <p className="text-[11px] text-muted-foreground text-center">
          By continuing you agree to our terms and privacy policy.
        </p>
      </form>
    </AuthShell>
  );
}
