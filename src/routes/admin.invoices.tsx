import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { formatDate, formatMoney2, invoices } from "@/mocks/data";

export const Route = createFileRoute("/admin/invoices")({
  head: () => ({ meta: [{ title: "Invoices · Sparkle Wash" }] }),
  component: InvoicesPage,
});

function InvoicesPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Invoices"
        subtitle={`${invoices.length} invoices issued recently`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm hover:bg-muted">
            <Download className="size-4" /> Export
          </button>
        }
      />
      <div className="rounded-2xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Issued</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-5 py-3 font-medium uppercase">{i.id}</td>
                <td className="px-5 py-3">{i.customerName}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatDate(i.issuedAt)}</td>
                <td className="px-5 py-3 font-medium">{formatMoney2(i.amount)}</td>
                <td className="px-5 py-3"><StatusPill status={i.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
