import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FilePenLine, Plus, Trash2, UserCog } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/avatar";

export const Route = createFileRoute("/admin/audit-log")({
  head: () => ({ meta: [{ title: "Audit log · Sparkle Wash" }] }),
  component: AuditLogPage,
});

type Entry = {
  id: string;
  who: string;
  action: string;
  target: string;
  branch: string;
  at: string;
  kind: "create" | "update" | "delete" | "auth" | "status";
};

const entries: Entry[] = [
  { id: "a1", who: "Maretta Daniel", action: "Advanced ticket", target: "#SW34571", branch: "Williamsburg", at: "2m ago", kind: "status" },
  { id: "a2", who: "Jonas Bauer", action: "Updated price", target: "Dry Cleaning · Park Slope", branch: "Park Slope", at: "11m ago", kind: "update" },
  { id: "a3", who: "Amina Hassan", action: "Created order", target: "#SW34604 · Nora Klein", branch: "Park Slope", at: "34m ago", kind: "create" },
  { id: "a4", who: "Maretta Daniel", action: "Invited staff", target: "leo@sparkle.co (driver)", branch: "DUMBO", at: "1h ago", kind: "auth" },
  { id: "a5", who: "Theo Romano", action: "Deleted draft order", target: "#SW34588", branch: "DUMBO", at: "2h ago", kind: "delete" },
  { id: "a6", who: "Maretta Daniel", action: "Changed branch hours", target: "Williamsburg · Mon–Sat 7a–9p", branch: "Williamsburg", at: "5h ago", kind: "update" },
  { id: "a7", who: "Yusuf Adeyemi", action: "Refunded order", target: "#SW34561 · $42.50", branch: "DUMBO", at: "Yesterday", kind: "update" },
  { id: "a8", who: "Maretta Daniel", action: "Updated branding", target: "Accent color #2563eb → #1d4ed8", branch: "All branches", at: "Yesterday", kind: "update" },
];

const iconFor = (k: Entry["kind"]) => {
  const map = {
    create: { icon: Plus, color: "text-success-foreground bg-success/20" },
    update: { icon: FilePenLine, color: "text-info-foreground bg-info/20" },
    delete: { icon: Trash2, color: "text-destructive bg-destructive/15" },
    auth: { icon: UserCog, color: "text-foreground bg-muted" },
    status: { icon: CheckCircle2, color: "text-primary bg-primary/15" },
  } as const;
  return map[k];
};

function AuditLogPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Audit log" subtitle="Every change made across your branches, who made it, and when." />
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {entries.map((e) => {
          const { icon: Icon, color } = iconFor(e.kind);
          return (
            <div key={e.id} className="flex items-center gap-4 px-5 py-4">
              <div className={`size-9 rounded-xl grid place-items-center ${color}`}>
                <Icon className="size-4" />
              </div>
              <Avatar seed={e.who} size={32} />
              <div className="flex-1 min-w-0">
                <div className="text-sm">
                  <span className="font-medium">{e.who}</span>{" "}
                  <span className="text-muted-foreground">{e.action.toLowerCase()}</span>{" "}
                  <span className="font-medium">{e.target}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{e.branch}</div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{e.at}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
