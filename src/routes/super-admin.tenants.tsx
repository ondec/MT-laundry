import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ExternalLink, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { formatDate, formatMoney2, tenants } from "@/mocks/data";

export const Route = createFileRoute("/super-admin/tenants")({
  head: () => ({ meta: [{ title: "Tenants · Sudsly HQ" }] }),
  component: TenantsPage,
});

const STORAGE_KEY = "sudsly.activeTenantId";

function TenantsPage() {
  const navigate = useNavigate();

  const viewAs = (id: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    navigate({ to: "/admin" });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Tenants"
        subtitle={`${tenants.length} laundromats on the platform. Each runs on their own brand.`}
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
              <th className="px-5 py-3 font-medium">Domain</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Orders / mo</th>
              <th className="px-5 py-3 font-medium">MRR</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-8 rounded-lg grid place-items-center text-[11px] font-semibold"
                      style={{ background: t.brand.accent, color: t.brand.accentForeground }}
                    >
                      {t.brand.logoInitial}
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{t.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{t.ownerName} · {t.city}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground font-mono text-xs">
                  {t.brand.subdomain}.sudsly.app
                </td>
                <td className="px-5 py-3 capitalize">{t.plan}</td>
                <td className="px-5 py-3">{t.monthlyOrders}</td>
                <td className="px-5 py-3 font-medium">{formatMoney2(t.monthlyRevenue)}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatDate(t.createdAt)}</td>
                <td className="px-5 py-3"><StatusPill status={t.status} /></td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => viewAs(t.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs hover:bg-muted"
                  >
                    View as <ExternalLink className="size-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
