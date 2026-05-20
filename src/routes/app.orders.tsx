import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { formatDateTime, formatMoney2, orders } from "@/mocks/data";

export const Route = createFileRoute("/app/orders")({
  head: () => ({ meta: [{ title: "My orders · Sparkle" }] }),
  component: MyOrders,
});

function MyOrders() {
  return (
    <div className="space-y-5">
      <PageHeader title="My orders" subtitle="Everything you've sent through Sparkle." />
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {orders.slice(0, 12).map((o) => (
          <Link
            key={o.id}
            to="/app/orders/$orderId"
            params={{ orderId: o.id }}
            className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{o.code}</span>
                <StatusPill status={o.status} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{o.items[0].serviceName} · {formatDateTime(o.createdAt)}</div>
            </div>
            <div className="font-medium tabular-nums">{formatMoney2(o.amount)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
