import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, DollarSign, Package, UserPlus, UsersRound } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KpiCard } from "@/components/kpi-card";
import { PeriodSwitcher } from "@/components/period-switcher";
import { StatusPill } from "@/components/status-pill";
import { Avatar } from "@/components/avatar";
import {
  formatMoney,
  formatMoney2,
  orders,
  revenueByDay,
  revenueByMonth,
  revenueByWeek,
  revenueByYear,
  staff,
} from "@/mocks/data";
import { useBranchScope } from "@/lib/tenant-brand";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard · Sparkle Wash" }] }),
  component: AdminDashboard,
});

const periodData = {
  Day: revenueByDay,
  Week: revenueByWeek,
  Month: revenueByMonth,
  Year: revenueByYear,
};

function AdminDashboard() {
  const [period, setPeriod] = useState<keyof typeof periodData>("Month");
  const data = periodData[period];
  const max = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back, Maretta. Here's how Sparkle Wash is moving today.</p>
        </div>
        <PeriodSwitcher
          options={["Day", "Week", "Month", "Year"]}
          value={period}
          onChange={(v) => setPeriod(v as keyof typeof periodData)}
        />
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Revenue" value="$23,902" delta={4.2} dark icon={<DollarSign className="size-4 text-white" />} />
        <KpiCard label="Active Orders" value="412" delta={1.7} icon={<Package className="size-4" />} />
        <KpiCard label="New Customers" value="148" delta={-2.9} icon={<UserPlus className="size-4" />} />
        <KpiCard label="Total Staff" value="8" delta={0.9} icon={<UsersRound className="size-4" />} />
      </div>

      {/* Chart + side widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-semibold text-lg">Total Revenue</h3>
            <button className="size-8 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-foreground">
              <ArrowUpRight className="size-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Performance over the selected period</p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} />
                <Tooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                  formatter={(v: number) => [formatMoney(v), "Revenue"]}
                />
                <Bar dataKey="value" radius={[10, 10, 4, 4]} maxBarSize={42}>
                  {data.map((d, i) => (
                    <Cell key={i} fill={d.value === max ? "var(--primary)" : "var(--ink)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <CalendarCard />
          <CommunityGrowth />
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h3 className="font-display font-semibold text-lg">Recent Orders</h3>
            <p className="text-xs text-muted-foreground">Latest tickets across the floor</p>
          </div>
          <Link to="/admin/orders" className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1">
            View all <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-y border-border">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 7).map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{o.code}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar seed={o.customerName} size={30} />
                      <span>{o.customerName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{o.items[0].serviceName}</td>
                  <td className="px-5 py-3 font-medium">{formatMoney2(o.amount)}</td>
                  <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CalendarCard() {
  const today = 19;
  const week = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = [17, 18, 19, 20, 21];
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <button className="size-7 rounded-full grid place-items-center hover:bg-muted text-muted-foreground"><ChevronLeft className="size-4" /></button>
        <div className="font-display font-semibold text-sm">September 2025</div>
        <button className="size-7 rounded-full grid place-items-center hover:bg-muted text-muted-foreground"><ChevronRight className="size-4" /></button>
      </div>
      <div className="grid grid-cols-5 gap-2 text-center">
        {week.map((d) => <div key={d} className="text-xs text-muted-foreground">{d}</div>)}
        {dates.map((d) => (
          <div
            key={d}
            className={`py-2 rounded-xl text-sm font-medium ${d === today ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityGrowth() {
  const pct = 65;
  const r = 32;
  const c = 2 * Math.PI * r;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
      <div className="flex-1">
        <h4 className="font-display font-semibold text-sm">Operational efficiency</h4>
        <p className="text-xs text-success-foreground mt-1 flex items-center gap-1">
          <ArrowUpRight className="size-3" />
          0.9% from last month
        </p>
      </div>
      <div className="relative size-20">
        <svg viewBox="0 0 80 80" className="-rotate-90 size-20">
          <circle cx="40" cy="40" r={r} stroke="var(--muted)" strokeWidth="8" fill="none" />
          <circle cx="40" cy="40" r={r} stroke="var(--primary)" strokeWidth="8" fill="none" strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-sm font-semibold">{pct}%</div>
      </div>
    </div>
  );
}
