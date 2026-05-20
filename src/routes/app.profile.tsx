import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile · Sparkle" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Profile" subtitle="Your details, addresses and payment methods." />

      <div className="rounded-2xl border border-border bg-card p-5 space-y-2 text-sm">
        <Row label="Name" value="Liam Daniel" />
        <Row label="Email" value="liam.daniel@mail.com" />
        <Row label="Phone" value="+1 555-0101" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display font-semibold mb-3">Addresses</h3>
        <div className="rounded-xl border border-border p-4 flex items-start gap-3">
          <MapPin className="size-4 mt-0.5 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">Home</div>
            <div className="text-xs text-muted-foreground">218 Oak St, Apt 2 · Brooklyn, NY</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display font-semibold mb-3">Payment methods</h3>
        <div className="rounded-xl border border-border p-4 flex items-center gap-3">
          <CreditCard className="size-4 text-muted-foreground" />
          <div className="flex-1">
            <div className="text-sm font-medium">Visa ending 4242</div>
            <div className="text-xs text-muted-foreground">Expires 09/27</div>
          </div>
          <span className="text-xs text-muted-foreground">Default</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
