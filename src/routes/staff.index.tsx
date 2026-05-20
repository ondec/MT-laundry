import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/avatar";
import { formatDateTime, formatMoney2, orders } from "@/mocks/data";
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
  return (
    <div className="space-y-5">
      <PageHeader
        title="Today's queue"
        subtitle={`${orders.length} active tickets · drag through the stages`}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {columns.map((col) => {
          const items = orders.filter((o) => o.status === col.id);
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
