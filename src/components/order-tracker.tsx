import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Truck } from "lucide-react";
import { formatMoney2 } from "@/mocks/data";
import type { Order, OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const flow: { id: OrderStatus; label: string }[] = [
  { id: "received", label: "Received" },
  { id: "washing", label: "Washing" },
  { id: "drying", label: "Drying" },
  { id: "folding", label: "Folding" },
  { id: "ready", label: "Out for delivery" },
  { id: "delivered", label: "Delivered" },
];

export function OrderTracker({ order }: { order: Order }) {
  const idx = flow.findIndex((f) => f.id === order.status);
  const pct = Math.max(8, ((idx + 1) / flow.length) * 100);
  return (
    <Link
      to="/app/orders/$orderId"
      params={{ orderId: order.id }}
      className="block rounded-2xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
          <Truck className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground">Tracking · {order.code}</div>
          <div className="font-medium text-sm truncate">{flow[idx]?.label ?? order.status}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium tabular-nums">{formatMoney2(order.amount)}</div>
          <div className="text-[10px] text-muted-foreground inline-flex items-center gap-0.5">View <ArrowUpRight className="size-3" /></div>
        </div>
      </div>
      <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ol className="mt-3 grid grid-cols-6 gap-1">
        {flow.map((f, i) => (
          <li key={f.id} className={cn("flex flex-col items-center gap-1 text-[9px]", i <= idx ? "text-foreground" : "text-muted-foreground")}>
            <span className={cn("size-1.5 rounded-full", i <= idx ? "bg-primary" : "bg-muted-foreground/40")} />
            <span className="truncate w-full text-center">{f.label.split(" ")[0]}</span>
          </li>
        ))}
      </ol>
    </Link>
  );
}
