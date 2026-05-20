import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { formatMoney, formatMoney2, revenueByMonth } from "@/mocks/data";

export const Route = createFileRoute("/admin/finance")({
  head: () => ({ meta: [{ title: "Finance · Sparkle Wash" }] }),
  component: FinancePage,
});

const expenses = [
  { category: "Detergent & supplies", amount: 1840, delta: 3.1, up: true },
  { category: "Rent & utilities", amount: 4200, delta: 0, up: true },
  { category: "Payroll", amount: 9400, delta: 5.2, up: true },
  { category: "Marketing", amount: 620, delta: -1.4, up: false },
  { category: "Equipment maintenance", amount: 380, delta: 0.5, up: true },
];

function FinancePage() {
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  return (
    <div className="space-y-5">
      <PageHeader title="Finance" subtitle="Money in, money out, money kept." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard label="Gross revenue" value={formatMoney(46300)} delta={6.4} dark />
        <KpiCard label="Operating expenses" value={formatMoney(totalExpenses)} delta={2.1} />
        <KpiCard label="Net profit" value={formatMoney(46300 - totalExpenses)} delta={11.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display font-semibold text-lg mb-1">Revenue trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 6 months</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByMonth} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => [formatMoney(v), "Revenue"]} />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display font-semibold text-lg mb-1">Expense breakdown</h3>
          <p className="text-xs text-muted-foreground mb-4">This month</p>
          <ul className="divide-y divide-border">
            {expenses.map((e) => (
              <li key={e.category} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{e.category}</div>
                  <div className={`text-xs flex items-center gap-0.5 mt-0.5 ${e.up ? "text-muted-foreground" : "text-success-foreground"}`}>
                    {e.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {Math.abs(e.delta).toFixed(1)}%
                  </div>
                </div>
                <div className="font-medium">{formatMoney2(e.amount)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
