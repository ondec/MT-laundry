import type { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  received: "bg-muted text-foreground border-border",
  washing: "bg-info/15 text-info-foreground border-info/30",
  drying: "bg-warning/20 text-warning-foreground border-warning/40",
  folding: "bg-accent text-accent-foreground border-primary/20",
  ready: "bg-primary/15 text-primary border-primary/30",
  delivered: "bg-success/15 text-success-foreground border-success/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  paid: "bg-success/15 text-success-foreground border-success/30",
  pending: "bg-warning/20 text-warning-foreground border-warning/40",
  overdue: "bg-destructive/10 text-destructive border-destructive/30",
  active: "bg-success/15 text-success-foreground border-success/30",
  trial: "bg-info/15 text-info-foreground border-info/30",
  suspended: "bg-destructive/10 text-destructive border-destructive/30",
  gold: "bg-warning/25 text-warning-foreground border-warning/40",
  silver: "bg-muted text-foreground border-border",
  bronze: "bg-accent text-accent-foreground border-border",
};

const labels: Record<string, string> = {
  wash_fold: "Wash & Fold",
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  const key = status.toLowerCase();
  const label = labels[key] ?? key.replace(/_/g, " ");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[key] ?? "bg-muted text-foreground border-border",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
