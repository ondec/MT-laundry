import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — MT Laundry" },
      { name: "description", content: "We'll send a reset link to your email." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter your email");
      return;
    }
    setSent(true);
    toast.success("Reset link sent");
  };

  return (
    <AuthShell
      eyebrow="Forgot password"
      title="Let's get you back in"
      subtitle="Enter your email and we'll send a link to reset your password."
      footer={
        <div className="flex items-center justify-between">
          <Link to="/login" className="text-foreground font-medium hover:underline">← Back to sign in</Link>
          <Link to="/signup" className="hover:text-foreground">Create account</Link>
        </div>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-border bg-card p-5 text-sm">
          <div className="font-medium text-foreground">Check your inbox</div>
          <p className="mt-1 text-muted-foreground">
            If an account exists for <span className="text-foreground">{email}</span>, you'll get a reset link in a minute.
          </p>
          <Button variant="outline" className="mt-4 w-full" onClick={() => setSent(false)}>
            Send again
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@laundry.com"
            />
          </div>
          <Button type="submit" className="w-full">Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
