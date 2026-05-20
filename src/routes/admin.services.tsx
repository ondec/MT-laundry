import { createFileRoute } from "@tanstack/react-router";
import { Clock, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { formatMoney2, services } from "@/mocks/data";

export const Route = createFileRoute("/admin/services")({
  head: () => ({ meta: [{ title: "Services · Sparkle Wash" }] }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Service catalog"
        subtitle="What you offer, how it's priced, how long it takes."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink text-ink-foreground px-3 py-2 text-sm hover:opacity-90">
            <Plus className="size-4" /> Add service
          </button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display font-semibold text-lg">{s.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.description}</p>
              </div>
            </div>
            <div className="flex items-end justify-between pt-2">
              <div>
                <div className="text-xs text-muted-foreground">Price</div>
                <div className="font-display text-2xl font-semibold">{formatMoney2(s.pricePerUnit)}<span className="text-sm text-muted-foreground font-normal">/{s.unit}</span></div>
              </div>
              <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {s.turnaroundHours}h
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
