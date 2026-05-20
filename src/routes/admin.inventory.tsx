import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { formatMoney2, inventory } from "@/mocks/data";
import { useBranchScope } from "@/lib/tenant-brand";

export const Route = createFileRoute("/admin/inventory")({
  head: () => ({ meta: [{ title: "Inventory · Sparkle Wash" }] }),
  component: InventoryPage,
});

function InventoryPage() {
  const { filterByBranch, activeBranch, branches } = useBranchScope();
  const items = filterByBranch(inventory);
  const lowStock = items.filter((i) => i.stock <= i.reorderAt).length;
  return (
    <div className="space-y-5">
      <PageHeader
        title="Inventory"
        subtitle={`${items.length} SKUs · ${lowStock} need reordering${activeBranch ? ` · ${activeBranch.name}` : " · across all branches"}`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink text-ink-foreground px-3 py-2 text-sm hover:opacity-90">
            <Plus className="size-4" /> Add item
          </button>
        }
      />

      <div className="rounded-2xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Item</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Branch</th>
              <th className="px-5 py-3 font-medium">In stock</th>
              <th className="px-5 py-3 font-medium">Reorder at</th>
              <th className="px-5 py-3 font-medium">Unit cost</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => {
              const low = i.stock <= i.reorderAt;
              const branch = branches[i.branchIndex];
              return (
                <tr key={i.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{i.name}</td>
                  <td className="px-5 py-3 text-muted-foreground capitalize">{i.category}</td>
                  <td className="px-5 py-3 text-muted-foreground">{branch?.name ?? "—"}</td>
                  <td className="px-5 py-3">{i.stock} <span className="text-muted-foreground">{i.unit}</span></td>
                  <td className="px-5 py-3 text-muted-foreground">{i.reorderAt}</td>
                  <td className="px-5 py-3">{formatMoney2(i.unitCost)}</td>
                  <td className="px-5 py-3">
                    {low ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive bg-destructive/10 border border-destructive/30 rounded-full px-2 py-0.5">
                        <AlertTriangle className="size-3" /> Reorder
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-success-foreground bg-success/15 border border-success/30 rounded-full px-2 py-0.5">
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  No inventory at this branch yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
