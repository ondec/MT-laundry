import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Building2, DollarSign, TrendingUp, Users } from "lucide-react";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { formatMoney, formatMoney2, tenants } from "@/mocks/data";

export const Route = createFileRoute("/super-admin/")({
  head: () => ({ meta: [{ title: "Overview · MT Laundry HQ" }] }),
  component: SuperOverview,
});

const mrr = [
  { label: "Jan", value: 38000 }, { label: "Feb", value: 41000 }, { label: "Mar", value: 47000 },
  { label: "Apr", value: 52000 }, { label: "May", value: 58000 }, { label: "Jun", value: 64000 },
];

function SuperOverview() {
  return (
    <div className="space-y-5">
      <PageHeader title="Platform overview" subtitle="How MT Laundry itself is doing." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="MRR" value={formatMoney(64000)} delta={9.4} dark icon={<DollarSign className="size-4 text-white" />} />
        <KpiCard label="Active tenants" value={String(tenants.filter((t) => t.status === "active").length)} delta={3.1} icon={<Building2 className="size-4" />} />
        <KpiCard label="Trial tenants" value={String(tenants.filter((t) => t.status === "trial").length)} delta={12.5} icon={<Users className="size-4" />} />
        <KpiCard label="Net growth" value="+6.4%" delta={1.2} icon={<TrendingUp className="size-4" />} />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display font-semibold text-lg">MRR trend</h3>
        <p className="text-xs text-muted-foreground mb-4">Last 6 months</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mrr} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => [formatMoney(v), "MRR"]} />
              <Bar dataKey="value" fill="var(--primary)" radius={[10, 10, 4, 4]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Plan usage meters */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display font-semibold text-lg">Plan usage</h3>
        <p className="text-xs text-muted-foreground mb-4">Monthly order volume vs plan cap. Flagged tenants are over their allowance.</p>
        <div className="space-y-3">
          {tenants.map((t) => {
            const cap = t.plan === "starter" ? 100 : t.plan === "growth" ? 500 : 1500;
            const pct = Math.min(100, Math.round((t.monthlyOrders / cap) * 100));
            const over = t.monthlyOrders > cap;
            return (
              <div key={t.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-center gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="size-6 rounded-md grid place-items-center text-[10px] font-semibold" style={{ background: t.brand.accent, color: t.brand.accentForeground }}>
                    {t.brand.logoInitial}
                  </span>
                  <span className="text-sm font-medium truncate">{t.name}</span>
                  <span className="text-[10px] text-muted-foreground capitalize">· {t.plan}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${over ? "bg-destructive" : pct > 80 ? "bg-warning" : "bg-primary"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-xs tabular-nums text-muted-foreground whitespace-nowrap">
                  {t.monthlyOrders} / {cap}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <div className="p-5 pb-3">
          <h3 className="font-display font-semibold text-lg">Recent tenants</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-y border-border">
                <th className="px-5 py-3 font-medium">Tenant</th>
                <th className="px-5 py-3 font-medium">City</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">MRR</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{t.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.city}</td>
                  <td className="px-5 py-3 capitalize">{t.plan}</td>
                  <td className="px-5 py-3 font-medium">{formatMoney2(t.monthlyRevenue)}</td>
                  <td className="px-5 py-3"><StatusPill status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
