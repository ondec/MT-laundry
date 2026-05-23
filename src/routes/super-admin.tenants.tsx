import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ExternalLink, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { formatDate, formatMoney2, tenants } from "@/mocks/data";
import type { Tenant } from "@/types";

export const Route = createFileRoute("/super-admin/tenants")({
  head: () => ({ meta: [{ title: "Tenants · MT Laundry HQ" }] }),
  component: TenantsPage,
});

const STORAGE_KEY = "sudsly.activeTenantId";

const planCaps: Record<Tenant["plan"], number> = { starter: 100, growth: 500, scale: 1500 };

function healthScore(t: Tenant): { score: number; label: string; tone: string } {
  if (t.status === "suspended") return { score: 12, label: "At risk", tone: "bg-destructive text-destructive-foreground" };
  if (t.status === "trial") return { score: 58, label: "Onboarding", tone: "bg-warning text-foreground" };
  const usage = t.monthlyOrders / planCaps[t.plan];
  const score = Math.min(100, Math.round(40 + usage * 60));
  if (score >= 75) return { score, label: "Healthy", tone: "bg-success/30 text-success-foreground" };
  if (score >= 50) return { score, label: "Steady", tone: "bg-info/30 text-info-foreground" };
  return { score, label: "Watch", tone: "bg-warning/30 text-foreground" };
}

function TenantsPage() {
  const navigate = useNavigate();

  const impersonate = (id: string) => {
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
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Plan usage</th>
              <th className="px-5 py-3 font-medium">MRR</th>
              <th className="px-5 py-3 font-medium">Health</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => {
              const cap = planCaps[t.plan];
              const usagePct = Math.min(100, Math.round((t.monthlyOrders / cap) * 100));
              const health = healthScore(t);
              const overage = t.monthlyOrders > cap;
              return (
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
                        <div className="text-xs text-muted-foreground truncate">{t.ownerName} · {t.brand.subdomain}.sudsly.app</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize">{t.plan}</td>
                  <td className="px-5 py-3 min-w-[180px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="tabular-nums">{t.monthlyOrders}/{cap}</span>
                      {overage && <span className="text-destructive font-medium">Over</span>}
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${overage ? "bg-destructive" : usagePct > 80 ? "bg-warning" : "bg-primary"}`}
                        style={{ width: `${Math.min(100, usagePct)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3 font-medium">{formatMoney2(t.monthlyRevenue)}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${health.tone}`}>
                      <span className="tabular-nums">{health.score}</span>
                      {health.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{formatDate(t.createdAt)}</td>
                  <td className="px-5 py-3"><StatusPill status={t.status} /></td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => impersonate(t.id)}
                      className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs hover:bg-muted"
                    >
                      Impersonate <ExternalLink className="size-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
