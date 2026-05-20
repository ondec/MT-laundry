import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Clock, Minus, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { formatMoney2, services } from "@/mocks/data";

export const Route = createFileRoute("/app/new-order")({
  head: () => ({ meta: [{ title: "New order · Sparkle" }] }),
  component: NewOrder,
});

const slots = ["Today, 4:00 – 6:00 PM", "Today, 6:00 – 8:00 PM", "Tomorrow, 9:00 – 11:00 AM", "Tomorrow, 1:00 – 3:00 PM"];

function NewOrder() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [slot, setSlot] = useState(slots[0]);

  const total = useMemo(
    () => services.reduce((s, svc) => s + (qty[svc.id] ?? 0) * svc.pricePerUnit, 0),
    [qty],
  );
  const items = services.filter((s) => (qty[s.id] ?? 0) > 0);

  const inc = (id: string, d: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + d) }));

  return (
    <div className="space-y-5">
      <PageHeader title="Place a new order" subtitle="Pick your services, choose a slot, you're done." />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display font-semibold mb-3">1. Choose services</h3>
            <div className="divide-y divide-border">
              {services.map((s) => (
                <div key={s.id} className="py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      {formatMoney2(s.pricePerUnit)}/{s.unit}
                      <span className="inline-flex items-center gap-1"><Clock className="size-3" />{s.turnaroundHours}h</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background">
                    <button onClick={() => inc(s.id, -1)} className="size-8 grid place-items-center text-muted-foreground hover:text-foreground"><Minus className="size-3.5" /></button>
                    <span className="w-6 text-center text-sm tabular-nums">{qty[s.id] ?? 0}</span>
                    <button onClick={() => inc(s.id, 1)} className="size-8 grid place-items-center text-muted-foreground hover:text-foreground"><Plus className="size-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display font-semibold mb-3">2. Pickup slot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {slots.map((sl) => (
                <button
                  key={sl}
                  onClick={() => setSlot(sl)}
                  className={`text-left rounded-xl border px-4 py-3 text-sm transition ${
                    slot === sl ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {slot === sl && <Check className="size-4 text-primary" />}
                    {sl}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-5 h-fit lg:sticky lg:top-4">
          <h3 className="font-display font-semibold">Order summary</h3>
          <div className="mt-4 space-y-2 text-sm min-h-[60px]">
            {items.length === 0 && <div className="text-muted-foreground text-xs">Add a service to get started.</div>}
            {items.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <span>{s.name} <span className="text-muted-foreground">×{qty[s.id]}</span></span>
                <span className="font-medium">{formatMoney2((qty[s.id] ?? 0) * s.pricePerUnit)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border my-4" />
          <div className="text-xs text-muted-foreground">Pickup</div>
          <div className="text-sm font-medium">{slot}</div>
          <div className="border-t border-border my-4" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-2xl font-semibold">{formatMoney2(total)}</span>
          </div>
          <button
            disabled={total === 0}
            className="mt-4 w-full rounded-full bg-ink text-ink-foreground py-3 text-sm font-medium disabled:opacity-40 hover:opacity-90"
          >
            Confirm pickup
          </button>
        </aside>
      </div>
    </div>
  );
}
