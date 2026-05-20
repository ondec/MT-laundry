import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/avatar";
import { staff } from "@/mocks/data";

export const Route = createFileRoute("/admin/staff")({
  head: () => ({ meta: [{ title: "Staff · Sparkle Wash" }] }),
  component: StaffPage,
});

function StaffPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Staff"
        subtitle={`${staff.length} team members on payroll`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink text-ink-foreground px-3 py-2 text-sm hover:opacity-90">
            <Plus className="size-4" /> Invite teammate
          </button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {staff.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar seed={s.avatarSeed} size={44} />
              <div className="min-w-0">
                <div className="font-medium truncate">{s.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{s.role}</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
              <div>
                <div className="text-muted-foreground">Shift</div>
                <div className="font-medium capitalize mt-0.5">{s.shift}</div>
              </div>
              <div className="text-right">
                <div className="text-muted-foreground">Active orders</div>
                <div className="font-medium mt-0.5">{s.activeOrders}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
