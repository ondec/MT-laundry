import { createFileRoute } from "@tanstack/react-router";
import { Clock, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { formatMoney2, getBranchServices, services as allServices } from "@/mocks/data";
import { useBranchScope } from "@/lib/tenant-brand";

export const Route = createFileRoute("/admin/services")({
  head: () => ({ meta: [{ title: "Services · Sparkle Wash" }] }),
  component: ServicesPage,
});

function ServicesPage() {
  const { activeBranch } = useBranchScope();
  const list = getBranchServices(activeBranch);
  const subtitle = activeBranch
    ? `Pricing at ${activeBranch.name}. Branch can override tenant prices or hide services.`
    : "Tenant-wide catalog. Pick a branch in the topbar to see its overrides.";

  return (
    <div className="space-y-5">
      <PageHeader
        title="Service catalog"
        subtitle={subtitle}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink text-ink-foreground px-3 py-2 text-sm hover:opacity-90">
            <Plus className="size-4" /> Add service
          </button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((s) => {
          const base = allServices.find((b) => b.id === s.id);
          const isOverridden = activeBranch && base && base.pricePerUnit !== s.pricePerUnit;
          return (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.description}</p>
                </div>
                {isOverridden && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                    Branch price
                  </span>
                )}
              </div>
              <div className="flex items-end justify-between pt-2">
                <div>
                  <div className="text-xs text-muted-foreground">Price</div>
                  <div className="font-display text-2xl font-semibold">
                    {formatMoney2(s.pricePerUnit)}
                    <span className="text-sm text-muted-foreground font-normal">/{s.unit}</span>
                  </div>
                  {isOverridden && base && (
                    <div className="text-[11px] text-muted-foreground mt-0.5 line-through">
                      Tenant {formatMoney2(base.pricePerUnit)}/{base.unit}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {s.turnaroundHours}h
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {activeBranch && allServices.length > list.length && (
        <div className="text-xs text-muted-foreground">
          {allServices.length - list.length} service{allServices.length - list.length === 1 ? "" : "s"} hidden at this branch.
        </div>
      )}
    </div>
  );
}
