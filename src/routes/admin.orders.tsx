import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Filter, KanbanSquare, Plus, Search, TableProperties } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { Avatar } from "@/components/avatar";
import { formatDateTime, formatMoney2, orders } from "@/mocks/data";
import { useBranchScope } from "@/lib/tenant-brand";
import { downloadCSV } from "@/lib/csv";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders · Sparkle Wash" }] }),
  component: OrdersPage,
});

const filters: (OrderStatus | "all")[] = ["all", "received", "washing", "drying", "folding", "ready", "delivered"];
const board: OrderStatus[] = ["received", "washing", "drying", "folding", "ready", "delivered"];

function OrdersPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [q, setQ] = useState("");
  const [view, setView] = useState<"table" | "board">("table");
  const { filterByBranch, activeBranch } = useBranchScope();

  const filtered = useMemo(() => {
    return filterByBranch(orders).filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (q && !o.customerName.toLowerCase().includes(q.toLowerCase()) && !o.code.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [filter, q, filterByBranch]);

  const exportCsv = () => {
    downloadCSV(
      `orders-${new Date().toISOString().slice(0, 10)}.csv`,
      filtered.map((o) => ({
        code: o.code,
        customer: o.customerName,
        service: o.items[0].serviceName,
        quantity: `${o.items[0].quantity} ${o.items[0].unit}`,
        amount: o.amount,
        status: o.status,
        paid: o.paid ? "yes" : "no",
        created: o.createdAt,
      })),
    );
    toast.success(`Exported ${filtered.length} orders`);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Orders"
        subtitle={`${filtered.length} tickets${activeBranch ? ` · ${activeBranch.name}` : " · all branches"}`}
        actions={
          <>
            <div className="inline-flex items-center rounded-full border border-border bg-card p-0.5">
              <button
                onClick={() => setView("table")}
                className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs", view === "table" ? "bg-ink text-ink-foreground" : "text-muted-foreground")}
              >
                <TableProperties className="size-3.5" /> Table
              </button>
              <button
                onClick={() => setView("board")}
                className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs", view === "board" ? "bg-ink text-ink-foreground" : "text-muted-foreground")}
              >
                <KanbanSquare className="size-3.5" /> Board
              </button>
            </div>
            <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm hover:bg-muted">
              <Download className="size-4" /> Export
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-ink text-ink-foreground px-3 py-2 text-sm hover:opacity-90">
              <Plus className="size-4" /> New order
            </button>
          </>
        }
      />

      <div className="rounded-2xl border border-border bg-card">
        <div className="p-4 flex flex-wrap items-center gap-3 border-b border-border">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by customer or order #"
              className="w-full bg-muted rounded-full pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {view === "table" && (
            <div className="flex flex-wrap items-center gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs capitalize border transition ${
                    filter === f ? "bg-ink text-ink-foreground border-ink" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
          <button className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Filter className="size-3.5" /> More filters
          </button>
        </div>

        {view === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Qty</th>
                  <th className="px-5 py-3 font-medium">Created</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Payment</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-5 py-3 font-medium">{o.code}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar seed={o.customerName} size={28} />
                        <span>{o.customerName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{o.items[0].serviceName}</td>
                    <td className="px-5 py-3">{o.items[0].quantity} {o.items[0].unit}</td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDateTime(o.createdAt)}</td>
                    <td className="px-5 py-3 font-medium">{formatMoney2(o.amount)}</td>
                    <td className="px-5 py-3"><StatusPill status={o.paid ? "paid" : "pending"} /></td>
                    <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 overflow-x-auto">
            <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-3 min-w-full">
              {board.map((status) => {
                const items = filtered.filter((o) => o.status === status);
                return (
                  <div key={status} className="rounded-2xl bg-muted/40 p-3 flex flex-col min-h-[420px]">
                    <div className="flex items-center justify-between px-1 mb-2">
                      <span className="text-xs font-semibold capitalize">{status}</span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{items.length}</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((o) => (
                        <Link
                          key={o.id}
                          to="/admin/orders"
                          className="block rounded-xl bg-card border border-border p-3 hover:border-primary/40 transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium">{o.code}</span>
                            <span className="text-muted-foreground tabular-nums">{formatMoney2(o.amount)}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar seed={o.customerName} size={24} />
                            <span className="text-sm truncate">{o.customerName}</span>
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-1 truncate">{o.items[0].serviceName}</div>
                        </Link>
                      ))}
                      {items.length === 0 && (
                        <div className="text-xs text-muted-foreground text-center py-6">Nothing here</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
