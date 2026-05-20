import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, PackagePlus, Sparkles } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { StatusPill } from "@/components/status-pill";
import { OrderTracker } from "@/components/order-tracker";
import { formatDateTime, formatMoney2, orders, services } from "@/mocks/data";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Home · Sparkle" }] }),
  component: CustomerHome,
});

function CustomerHome() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 350);
    return () => clearTimeout(t);
  }, []);

  const active = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled").slice(0, 3);
  const liveOrder = active[0];

  return (
    <div className="space-y-5">
      {/* Sticky live tracker (mobile-first) */}
      {liveOrder && (
        <div className="sticky top-[68px] z-20 -mx-4 px-4 md:static md:m-0 md:p-0">
          <OrderTracker order={liveOrder} />
        </div>
      )}

      <div className="rounded-2xl bg-ink text-ink-foreground p-6 lg:p-8 flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl">
          <div className="text-xs text-ink-foreground/60 uppercase tracking-wider">Good morning, Liam</div>
          <h1 className="font-display text-2xl sm:text-4xl font-semibold mt-2">Your laundry day, handled.</h1>
          <p className="text-sm text-ink-foreground/70 mt-2 hidden sm:block">Tap below to schedule a pickup. We'll be at your door in under 90 minutes.</p>
        </div>
        <Link to="/app/new-order" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90">
          <PackagePlus className="size-4" /> Start a new order
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl font-semibold">Active orders</h2>
          <Link to="/app/orders" className="text-xs text-primary inline-flex items-center gap-1">View all <ArrowUpRight className="size-3" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {!loaded
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 animate-pulse">
                  <div className="h-3 w-24 bg-muted rounded" />
                  <div className="h-9 w-9 bg-muted rounded-xl mt-4" />
                  <div className="h-3 w-32 bg-muted rounded mt-3" />
                  <div className="h-3 w-20 bg-muted rounded mt-2" />
                </div>
              ))
            : active.map((o) => (
                <Link
                  key={o.id}
                  to="/app/orders/$orderId"
                  params={{ orderId: o.id }}
                  className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{o.code}</span>
                    <StatusPill status={o.status} />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Avatar seed={o.items[0].serviceName} size={36} />
                    <div>
                      <div className="text-sm font-medium">{o.items[0].serviceName}</div>
                      <div className="text-xs text-muted-foreground">{o.items[0].quantity} {o.items[0].unit} · {formatMoney2(o.amount)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-3">Placed {formatDateTime(o.createdAt)}</div>
                </Link>
              ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold mb-3">Quick reorder</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((s) => (
            <Link
              key={s.id}
              to="/app/new-order"
              className="rounded-2xl border border-border bg-card p-4 hover:border-primary/40 transition-colors flex flex-col items-start gap-2"
            >
              <div className="size-9 rounded-xl bg-muted grid place-items-center"><Sparkles className="size-4" /></div>
              <div className="text-sm font-medium">{s.name}</div>
              <div className="text-xs text-muted-foreground">{formatMoney2(s.pricePerUnit)}/{s.unit}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
