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
  { id: "a1", who: "Akosua Mensah", action: "Advanced ticket", target: "#SW34571", branch: "Osu", at: "2m ago", kind: "status" },
  { id: "a2", who: "Kwame Boateng", action: "Updated price", target: "Dry Cleaning · East Legon", branch: "East Legon", at: "11m ago", kind: "update" },
  { id: "a3", who: "Grace Owusu", action: "Created order", target: "#SW34604 · Linda Appiah", branch: "East Legon", at: "34m ago", kind: "create" },
  { id: "a4", who: "Akosua Mensah", action: "Invited staff", target: "yaw@sparkle.gh (driver)", branch: "Spintex", at: "1h ago", kind: "auth" },
  { id: "a5", who: "Joseph Adjei", action: "Deleted draft order", target: "#SW34588", branch: "Spintex", at: "2h ago", kind: "delete" },
  { id: "a6", who: "Akosua Mensah", action: "Changed branch hours", target: "Osu · Mon–Sat 7a–9p", branch: "Osu", at: "5h ago", kind: "update" },
  { id: "a7", who: "Samuel Ofori", action: "Refunded order", target: "#SW34561 · GHS 185.00", branch: "Spintex", at: "Yesterday", kind: "update" },
  { id: "a8", who: "Akosua Mensah", action: "Updated branding", target: "Accent color #2563eb → #1d4ed8", branch: "All branches", at: "Yesterday", kind: "update" },
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
