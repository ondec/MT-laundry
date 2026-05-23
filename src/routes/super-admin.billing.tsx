import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { formatDate, formatMoney2, tenants } from "@/mocks/data";

export const Route = createFileRoute("/super-admin/billing")({
  head: () => ({ meta: [{ title: "Billing · MT Laundry HQ" }] }),
  component: Billing,
});

const rows = tenants.map((t, i) => ({
  id: `bill-${i + 1}`,
  tenant: t.name,
  plan: t.plan,
  amount: t.plan === "scale" ? 149 : t.plan === "growth" ? 99 : 49,
  issued: new Date(Date.now() - i * 86400000 * 4).toISOString(),
  status: i % 5 === 0 ? "pending" : i === 5 ? "overdue" : "paid",
}));

function Billing() {
  return (
    <div className="space-y-5">
      <PageHeader title="Platform billing" subtitle="Tenant subscriptions and invoices." />
      <div className="rounded-2xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Tenant</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Issued</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-5 py-3 font-medium uppercase">{r.id}</td>
                <td className="px-5 py-3">{r.tenant}</td>
                <td className="px-5 py-3 capitalize">{r.plan}</td>
                <td className="px-5 py-3 font-medium">{formatMoney2(r.amount)}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatDate(r.issued)}</td>
                <td className="px-5 py-3"><StatusPill status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
