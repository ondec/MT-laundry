import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/avatar";
import { StatusPill } from "@/components/status-pill";
import { formatDateTime, formatMoney2, orders } from "@/mocks/data";
import type { OrderStatus } from "@/types";

export const Route = createFileRoute("/staff/orders/$orderId")({
  head: () => ({ meta: [{ title: "Order detail · Operator" }] }),
  component: TicketDetail,
  notFoundComponent: () => <div className="p-6 text-sm text-muted-foreground">Order not found.</div>,
});

const flow: OrderStatus[] = ["received", "washing", "drying", "folding", "ready", "delivered"];

function TicketDetail() {
  const { orderId } = Route.useParams();
  const order = orders.find((o) => o.id === orderId);
  if (!order) throw notFound();
  const initialIdx = flow.indexOf(order.status);
  const [currentIdx, setCurrentIdx] = useState(initialIdx);

  const advance = () => {
    if (currentIdx >= flow.length - 1) {
      toast("Order already delivered");
      return;
    }
    const next = flow[currentIdx + 1];
    setCurrentIdx(currentIdx + 1);
    toast.success(`Moved to ${next}`, { description: order.code });
  };

  const scan = () => {
    toast.success("QR scanned", {
      description: `Auto-advanced ${order.code}`,
    });
    advance();
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <Link to="/staff" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
        <ArrowLeft className="size-4" /> Back to queue
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs text-muted-foreground">Ticket</div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">{order.code}</h1>
            <div className="text-sm text-muted-foreground mt-1">Created {formatDateTime(order.createdAt)}</div>
          </div>
          <StatusPill status={order.status} />
        </div>

        <div className="mt-6 flex items-center gap-3 pb-6 border-b border-border">
          <Avatar seed={order.customerName} size={44} />
          <div>
            <div className="font-medium">{order.customerName}</div>
            <div className="text-xs text-muted-foreground">Customer</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Stage progression</div>
          <div className="flex items-center justify-between gap-2">
            {flow.map((s, i) => {
              const done = i <= currentIdx;
              return (
                <div key={s} className="flex-1 flex flex-col items-center gap-2">
                  <div className={`size-9 rounded-full grid place-items-center text-xs font-medium ${done ? "bg-ink text-ink-foreground" : "bg-muted text-muted-foreground"}`}>
                    {done ? <Check className="size-4" /> : i + 1}
                  </div>
                  <div className="text-[11px] capitalize text-center">{s}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat label="Service" value={order.items[0].serviceName} />
          <Stat label="Quantity" value={`${order.items[0].quantity} ${order.items[0].unit}`} />
          <Stat label="Amount" value={formatMoney2(order.amount)} />
        </div>

        {order.notes && (
          <div className="mt-6 rounded-xl bg-warning/20 border border-warning/40 px-4 py-3 text-sm">
            <span className="font-medium">Note: </span>{order.notes}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={scan}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm hover:opacity-90"
          >
            <QrCode className="size-4" /> Scan QR
          </button>
          <button onClick={advance} className="rounded-full bg-ink text-ink-foreground px-4 py-2 text-sm">Advance stage</button>
          <button onClick={() => toast("Note panel coming next")} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">Add note</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/50 p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium mt-0.5">{value}</div>
    </div>
  );
}
