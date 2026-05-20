import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { formatDate, formatMoney2, tenants } from "@/mocks/data";

export const Route = createFileRoute("/super-admin/tenants")({
  head: () => ({ meta: [{ title: "Tenants · Sudsly HQ" }] }),
  component: TenantsPage,
});

function TenantsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Tenants"
        subtitle={`${tenants.length} laundromats on the platform`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink text-ink-foreground px-3 py-2 text-sm hover:opacity-90">
            <Plus className="size-4" /> Onboard tenant
          </button>
        }
      />
      <div className="rounded-2xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Tenant</th>
              <th className="px-5 py-3 font-medium">Owner</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Orders / mo</th>
              <th className="px-5 py-3 font-medium">MRR</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{t.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{t.ownerName}</td>
                <td className="px-5 py-3 text-muted-foreground">{t.city}</td>
                <td className="px-5 py-3 capitalize">{t.plan}</td>
                <td className="px-5 py-3">{t.monthlyOrders}</td>
                <td className="px-5 py-3 font-medium">{formatMoney2(t.monthlyRevenue)}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatDate(t.createdAt)}</td>
                <td className="px-5 py-3"><StatusPill status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
