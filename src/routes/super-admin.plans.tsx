import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/super-admin/plans")({
  head: () => ({ meta: [{ title: "Plans · MT Laundry HQ" }] }),
  component: Plans,
});

const plans = [
  { name: "Starter", price: 49, tag: "Solo shop", features: ["1 location", "Up to 200 orders/mo", "Email support", "Basic reports"] },
  { name: "Growth", price: 99, tag: "Most popular", features: ["3 locations", "Unlimited orders", "Staff roles", "Loyalty program", "Pickup routing"], featured: true },
  { name: "Scale", price: 149, tag: "Multi-site", features: ["Unlimited locations", "Branded customer app", "Advanced analytics", "API access", "Priority support"] },
];

function Plans() {
  return (
    <div className="space-y-5">
      <PageHeader title="Plans" subtitle="What tenants pay, what they get." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border p-6 flex flex-col ${p.featured ? "bg-ink text-ink-foreground border-ink" : "bg-card border-border"}`}
          >
            <div className="text-xs uppercase tracking-wider opacity-70">{p.tag}</div>
            <div className="font-display text-2xl font-semibold mt-2">{p.name}</div>
            <div className="font-display text-4xl font-semibold mt-4">${p.price}<span className="text-sm opacity-70 font-normal">/mo</span></div>
            <ul className="mt-6 space-y-2 text-sm flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className={`size-4 ${p.featured ? "text-primary" : "text-primary"}`} /> {f}
                </li>
              ))}
            </ul>
            <button className={`mt-6 rounded-full py-2.5 text-sm font-medium ${p.featured ? "bg-primary text-primary-foreground" : "bg-ink text-ink-foreground"}`}>
              Edit plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
