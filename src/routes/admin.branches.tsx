import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Building2, MapPin, Phone, Plus, ShoppingBag, Star, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { inventory, orders, services as allServices, staff } from "@/mocks/data";
import { useBranchScope } from "@/lib/tenant-brand";

export const Route = createFileRoute("/admin/branches")({
  head: () => ({ meta: [{ title: "Branches · Sparkle Wash" }] }),
  component: BranchesPage,
});

function BranchesPage() {
  const { branches, setActiveBranchId } = useBranchScope();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Branches"
        subtitle={`${branches.length} locations · each branch can override pricing, stock and staff.`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink text-ink-foreground px-3 py-2 text-sm hover:opacity-90">
            <Plus className="size-4" /> Add branch
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {branches.map((b, idx) => {
          const branchOrders = orders.filter((o) => o.branchIndex === idx).length;
          const branchStaff = staff.filter((s) => s.branchIndex === idx).length;
          const branchSkus = inventory.filter((i) => i.branchIndex === idx).length;
          const overrideCount = Object.keys(b.serviceOverrides).length;
          const disabledCount = Object.values(b.serviceOverrides).filter((o) => o.disabled).length;

          return (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="size-11 rounded-xl bg-muted grid place-items-center">
                  <Building2 className="size-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-lg truncate">{b.name}</h3>
                    {b.isDefault && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                        <Star className="size-3" /> Default
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1.5">
                    <MapPin className="size-3" /> {b.address}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 inline-flex items-center gap-1.5">
                    <Phone className="size-3" /> {b.phone}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{b.hours}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Manager · <span className="text-foreground font-medium">{b.managerName}</span></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <Stat icon={<ShoppingBag className="size-3.5" />} label="Orders" value={branchOrders} />
                <Stat icon={<UsersRound className="size-3.5" />} label="Staff" value={branchStaff} />
                <Stat icon={<Boxes className="size-3.5" />} label="SKUs" value={branchSkus} />
              </div>

              {overrideCount > 0 && (
                <div className="rounded-xl border border-border bg-muted/30 p-3 text-xs">
                  <div className="font-medium mb-1">Service overrides ({overrideCount})</div>
                  <ul className="space-y-1 text-muted-foreground">
                    {Object.entries(b.serviceOverrides).map(([sid, ov]) => {
                      const svc = allServices.find((s) => s.id === sid);
                      if (!svc) return null;
                      return (
                        <li key={sid} className="flex items-center justify-between">
                          <span>{svc.name}</span>
                          <span className="font-medium text-foreground">
                            {ov.disabled
                              ? "Not offered"
                              : ov.pricePerUnit != null
                                ? `$${ov.pricePerUnit.toFixed(2)} /${svc.unit}`
                                : "—"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {disabledCount > 0 && (
                    <div className="mt-2 text-[11px] text-muted-foreground">{disabledCount} service{disabledCount === 1 ? "" : "s"} hidden at this branch.</div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1 border-t border-border">
                <button
                  onClick={() => setActiveBranchId(b.id)}
                  className="rounded-full bg-ink text-ink-foreground px-3 py-1.5 text-xs hover:opacity-90"
                >
                  View as this branch
                </button>
                <button className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl bg-muted/40 p-2.5">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider inline-flex items-center gap-1 justify-center w-full">
        {icon} {label}
      </div>
      <div className="font-display text-xl font-semibold mt-0.5">{value}</div>
    </div>
  );
}
