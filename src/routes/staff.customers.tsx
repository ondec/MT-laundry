import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/avatar";
import { customers, formatMoney2 } from "@/mocks/data";

export const Route = createFileRoute("/staff/customers")({
  head: () => ({ meta: [{ title: "Customer lookup · Operator" }] }),
  component: Lookup,
});

function Lookup() {
  const [q, setQ] = useState("");
  const list = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())).slice(0, 12);
  return (
    <div className="space-y-5">
      <PageHeader title="Customer lookup" subtitle="Find an account at the counter, fast." />
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a name…"
          className="w-full bg-card border border-border rounded-full pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <Avatar seed={c.avatarSeed} size={44} />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.totalOrders} orders · {formatMoney2(c.totalSpent)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
