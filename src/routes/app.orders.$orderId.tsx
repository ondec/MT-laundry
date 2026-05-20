import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { StatusPill } from "@/components/status-pill";
import { formatDateTime, formatMoney2, orders } from "@/mocks/data";
import type { OrderStatus } from "@/types";

export const Route = createFileRoute("/app/orders/$orderId")({
  head: () => ({ meta: [{ title: "Order detail · Sparkle" }] }),
  component: OrderDetail,
  notFoundComponent: () => <div className="p-6 text-sm text-muted-foreground">Order not found.</div>,
});

const flow: { id: OrderStatus; label: string }[] = [
  { id: "received", label: "Received" },
  { id: "washing", label: "Washing" },
  { id: "drying", label: "Drying" },
  { id: "folding", label: "Folding" },
  { id: "ready", label: "Ready for delivery" },
  { id: "delivered", label: "Delivered" },
];

function OrderDetail() {
  const { orderId } = Route.useParams();
  const order = orders.find((o) => o.id === orderId);
  if (!order) throw notFound();
  const currentIdx = flow.findIndex((f) => f.id === order.status);

  return (
    <div className="space-y-5 max-w-3xl">
      <Link to="/app/orders" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
        <ArrowLeft className="size-4" /> Back
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs text-muted-foreground">Order</div>
            <h1 className="font-display text-3xl font-semibold">{order.code}</h1>
            <div className="text-sm text-muted-foreground mt-1">{formatDateTime(order.createdAt)}</div>
          </div>
          <StatusPill status={order.status} />
        </div>

        <ol className="mt-8 space-y-4">
          {flow.map((step, i) => {
            const done = i <= currentIdx;
            const current = i === currentIdx;
            return (
              <li key={step.id} className="flex items-start gap-3">
                <div className={`mt-0.5 size-7 rounded-full grid place-items-center ${done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {done ? <Check className="size-3.5" /> : i + 1}
                </div>
                <div>
                  <div className={`text-sm font-medium ${current ? "text-primary" : ""}`}>{step.label}</div>
                  {done && <div className="text-xs text-muted-foreground mt-0.5">Updated {formatDateTime(order.createdAt)}</div>}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 border-t border-border pt-5 space-y-2 text-sm">
          <Row label="Service" value={order.items[0].serviceName} />
          <Row label="Quantity" value={`${order.items[0].quantity} ${order.items[0].unit}`} />
          <Row label="Amount" value={formatMoney2(order.amount)} bold />
          <Row label="Payment" value={order.paid ? "Paid" : "Pending"} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "font-semibold" : "font-medium"}>{value}</span>
    </div>
  );
}
