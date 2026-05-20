import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ListChecks, Truck, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/avatar";
import { formatDateTime, formatMoney2, orders } from "@/mocks/data";
import { useTenantBrand } from "@/lib/tenant-brand";
import { STAFF_BRANCH_INDEX } from "@/lib/staff-context";
import type { OrderStatus } from "@/types";

export const Route = createFileRoute("/staff/")({
  head: () => ({ meta: [{ title: "Today's queue · Operator" }] }),
  component: StaffQueue,
});

const columns: { id: OrderStatus; label: string; accent: string }[] = [
  { id: "received", label: "Received", accent: "bg-muted-foreground" },
  { id: "washing", label: "Washing", accent: "bg-info" },
  { id: "drying", label: "Drying", accent: "bg-warning" },
  { id: "folding", label: "Folding", accent: "bg-accent-foreground" },
  { id: "ready", label: "Ready", accent: "bg-primary" },
  { id: "delivered", label: "Delivered", accent: "bg-success" },
];

function StaffQueue() {
  const { tenant } = useTenantBrand();
  const branch = tenant.branches[STAFF_BRANCH_INDEX] ?? tenant.branches[0];
  const branchOrders = orders.filter((o) => o.branchIndex === STAFF_BRANCH_INDEX);

  const pickupsToday = branchOrders.filter((o) => o.status === "received").length;
  const readyForDelivery = branchOrders.filter((o) => o.status === "ready").length;
  const inProgress = branchOrders.filter((o) => ["washing", "drying", "folding"].includes(o.status)).length;

  const [online, setOnline] = useState(true);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    setOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Today's queue"
        subtitle={`${branchOrders.length} active tickets at ${branch.name} · drag through the stages`}
        actions={
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
            online ? "border-success/40 bg-success/10 text-success-foreground" : "border-warning/50 bg-warning/15 text-foreground"
          }`}>
            {online ? <Wifi className="size-3" /> : <WifiOff className="size-3" />}
            {online ? "Online" : "Offline — actions will sync"}
          </span>
        }
      />

      {/* My shift today */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold">My shift today</h3>
            <p className="text-xs text-muted-foreground">{branch.name} · {branch.hours.split("·")[1] ?? branch.hours}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <ShiftStat icon={<Truck className="size-4" />} label="Pickups due" value={pickupsToday} accent="bg-info/20 text-info-foreground" />
          <ShiftStat icon={<ListChecks className="size-4" />} label="In progress" value={inProgress} accent="bg-warning/20 text-foreground" />
          <ShiftStat icon={<Clock className="size-4" />} label="Ready to deliver" value={readyForDelivery} accent="bg-primary/15 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {columns.map((col) => {
          const items = branchOrders.filter((o) => o.status === col.id);
          return (
            <div key={col.id} className="rounded-2xl border border-border bg-card flex flex-col min-h-[420px]">
              <div className="flex items-center justify-between px-3 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${col.accent}`} />
                  <span className="font-medium text-sm">{col.label}</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{items.length}</span>
              </div>
              <div className="p-2 space-y-2 overflow-y-auto">
                {items.map((o) => (
                  <Link
                    key={o.id}
                    to="/staff/orders/$orderId"
                    params={{ orderId: o.id }}
                    className="block rounded-xl border border-border bg-background p-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{o.code}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="size-3" />{formatDateTime(o.createdAt).split(",")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar seed={o.customerName} size={26} />
                      <span className="text-sm truncate">{o.customerName}</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center justify-between">
                      <span className="truncate">{o.items[0].serviceName}</span>
                      <span className="font-medium text-foreground">{formatMoney2(o.amount)}</span>
                    </div>
                  </Link>
                ))}
                {items.length === 0 && (
                  <div className="text-xs text-muted-foreground text-center py-6">Nothing here</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShiftStat({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent: string }) {
  return (
    <div className="rounded-xl bg-muted/40 p-4">
      <div className={`size-8 rounded-lg grid place-items-center ${accent}`}>{icon}</div>
      <div className="text-2xl font-display font-semibold mt-3 tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
