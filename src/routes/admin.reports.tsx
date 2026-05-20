import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { revenueByMonth, services } from "@/mocks/data";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports · Sparkle Wash" }] }),
  component: ReportsPage,
});

const orderTrend = [
  { label: "W1", orders: 84 }, { label: "W2", orders: 102 }, { label: "W3", orders: 78 },
  { label: "W4", orders: 121 }, { label: "W5", orders: 134 }, { label: "W6", orders: 148 },
];

const colors = ["var(--primary)", "var(--ink)", "var(--success)", "var(--warning)", "var(--info)", "var(--chart-5)"];

function ReportsPage() {
  const serviceMix = services.map((s, i) => ({ name: s.name, value: 80 - i * 11 }));

  return (
    <div className="space-y-5">
      <PageHeader title="Reports" subtitle="Charts that explain what happened, and why." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Orders per week" subtitle="Last 6 weeks">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={orderTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              <Line type="monotone" dataKey="orders" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary)" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Revenue" subtitle="Monthly bars">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByMonth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="value" fill="var(--ink)" radius={[10, 10, 4, 4]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Service mix" subtitle="Share by service this month" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={serviceMix} dataKey="value" nameKey="name" outerRadius={110} innerRadius={60} paddingAngle={3}>
                {serviceMix.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground mb-3">{subtitle}</p>}
      {children}
    </div>
  );
}
