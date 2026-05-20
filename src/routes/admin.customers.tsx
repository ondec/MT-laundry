import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { Avatar } from "@/components/avatar";
import { customers, formatDate, formatMoney2 } from "@/mocks/data";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({ meta: [{ title: "Customers · Sparkle Wash" }] }),
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Customers"
        subtitle={`${customers.length} active accounts`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink text-ink-foreground px-3 py-2 text-sm hover:opacity-90">
            <Plus className="size-4" /> Add customer
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Lifetime customers" value={String(customers.length)} />
        <Stat label="Gold tier" value={String(customers.filter((c) => c.tier === "gold").length)} />
        <Stat label="Loyalty points outstanding" value={customers.reduce((s, c) => s + c.loyaltyPoints, 0).toLocaleString()} />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Orders</th>
              <th className="px-5 py-3 font-medium">Lifetime spend</th>
              <th className="px-5 py-3 font-medium">Points</th>
              <th className="px-5 py-3 font-medium">Tier</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar seed={c.avatarSeed} size={34} />
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{formatDate(c.joinedAt)}</td>
                <td className="px-5 py-3">{c.totalOrders}</td>
                <td className="px-5 py-3 font-medium">{formatMoney2(c.totalSpent)}</td>
                <td className="px-5 py-3">{c.loyaltyPoints}</td>
                <td className="px-5 py-3"><StatusPill status={c.tier} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-display text-2xl font-semibold mt-1.5">{value}</div>
    </div>
  );
}
