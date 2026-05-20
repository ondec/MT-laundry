import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Truck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/avatar";
import { formatDateTime, orders } from "@/mocks/data";
import { STAFF_BRANCH_INDEX } from "@/lib/staff-context";

export const Route = createFileRoute("/staff/pickups")({
  head: () => ({ meta: [{ title: "Pickups & Delivery · Operator" }] }),
  component: PickupsPage,
});

function PickupsPage() {
  const scoped = orders.filter((o) => o.branchIndex === STAFF_BRANCH_INDEX);
  const pickups = scoped.filter((o) => o.status === "received").slice(0, 6);
  const deliveries = scoped.filter((o) => o.status === "ready").slice(0, 6);
  return (
    <div className="space-y-5">
      <PageHeader title="Pickups & Delivery" subtitle="Your route for the day." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Lane title="Pickups" icon={<Truck className="size-4" />} items={pickups} accent="text-info-foreground" />
        <Lane title="Deliveries" icon={<MapPin className="size-4" />} items={deliveries} accent="text-success-foreground" />
      </div>
    </div>
  );
}

function Lane({ title, icon, items, accent }: { title: string; icon: React.ReactNode; items: typeof orders; accent: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-display font-semibold flex items-center gap-2"><span className={accent}>{icon}</span>{title}</h3>
        <span className="text-xs text-muted-foreground">{items.length} stops</span>
      </div>
      <ul className="divide-y divide-border">
        {items.map((o, i) => (
          <li key={o.id} className="px-5 py-3 flex items-center gap-3">
            <div className="size-7 rounded-full bg-muted grid place-items-center text-xs font-medium">{i + 1}</div>
            <Avatar seed={o.customerName} size={32} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{o.customerName}</div>
              <div className="text-xs text-muted-foreground truncate">{o.code} · {formatDateTime(o.createdAt)}</div>
            </div>
            <button className="text-xs rounded-full bg-ink text-ink-foreground px-3 py-1.5">Navigate</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
