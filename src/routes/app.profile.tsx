import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, CreditCard, Home, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile · Sparkle" }] }),
  component: Profile,
});

const addresses = [
  { id: "a1", label: "Home", icon: Home, line: "218 Oak St, Apt 2", city: "Brooklyn, NY 11211", isDefault: true },
  { id: "a2", label: "Work", icon: Briefcase, line: "55 Pearl St, Floor 14", city: "Brooklyn, NY 11201" },
];

const cards = [
  { id: "c1", brand: "Visa", last4: "4242", exp: "09/27", isDefault: true },
  { id: "c2", brand: "Mastercard", last4: "8081", exp: "03/26" },
];

function Profile() {
  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Profile" subtitle="Your details, addresses and payment methods." />

      <div className="rounded-2xl border border-border bg-card p-5 space-y-2 text-sm">
        <Row label="Name" value="Liam Daniel" />
        <Row label="Email" value="liam.daniel@mail.com" />
        <Row label="Phone" value="+1 555-0101" />
      </div>

      <Section
        title="Addresses"
        action={
          <button
            onClick={() => toast("Address picker coming next")}
            className="inline-flex items-center gap-1 text-xs text-primary"
          >
            <Plus className="size-3.5" /> Add address
          </button>
        }
      >
        {addresses.map((a) => (
          <div key={a.id} className="rounded-xl border border-border p-4 flex items-start gap-3">
            <a.icon className="size-4 mt-0.5 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium flex items-center gap-2">
                {a.label}
                {a.isDefault && <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 rounded px-1.5 py-0.5">Default</span>}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{a.line}</div>
              <div className="text-xs text-muted-foreground">{a.city}</div>
            </div>
            <button
              onClick={() => toast.success(`Updated ${a.label}`)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Edit
            </button>
          </div>
        ))}
      </Section>

      <Section
        title="Payment methods"
        action={
          <button
            onClick={() => toast("Stripe element coming soon")}
            className="inline-flex items-center gap-1 text-xs text-primary"
          >
            <Plus className="size-3.5" /> Add card
          </button>
        }
      >
        {cards.map((c) => (
          <div key={c.id} className="rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="size-10 rounded-lg bg-ink text-ink-foreground grid place-items-center text-[10px] font-semibold">
              {c.brand === "Visa" ? "VISA" : "MC"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{c.brand} ending {c.last4}</div>
              <div className="text-xs text-muted-foreground">Expires {c.exp}</div>
            </div>
            {c.isDefault ? (
              <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 rounded px-1.5 py-0.5">Default</span>
            ) : (
              <button
                onClick={() => toast.success(`${c.brand} •••• ${c.last4} set as default`)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Make default
              </button>
            )}
          </div>
        ))}
      </Section>

      <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-3">
        <CreditCard className="size-4 text-muted-foreground" />
        <div className="flex-1 text-sm">
          <div className="font-medium">Apple Pay</div>
          <div className="text-xs text-muted-foreground">One-tap checkout on supported devices</div>
        </div>
        <button
          onClick={() => toast.success("Apple Pay enabled")}
          className="text-xs rounded-full border border-border px-3 py-1.5 hover:bg-muted"
        >
          Enable
        </button>
      </div>
    </div>
  );
}

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold">{title}</h3>
        {action}
      </div>
      <MapPin className="hidden" />
      <div className="space-y-2">{children}</div>
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
