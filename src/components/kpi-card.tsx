import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  dark?: boolean;
  icon?: React.ReactNode;
}

export function KpiCard({ label, value, delta, deltaLabel = "from last month", dark, icon }: KpiCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 flex flex-col gap-3 transition-shadow hover:shadow-sm",
        dark ? "bg-ink text-ink-foreground border-ink" : "bg-card border-border",
      )}
    >
      <div className="flex items-center justify-between">
        <p className={cn("text-sm", dark ? "text-ink-foreground/70" : "text-muted-foreground")}>{label}</p>
        {icon && (
          <div
            className={cn(
              "size-8 rounded-full grid place-items-center",
              dark ? "bg-white/10" : "bg-muted",
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="font-display text-3xl tracking-tight font-semibold">{value}</div>
      {typeof delta === "number" && (
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              positive ? "text-success-foreground" : "text-destructive",
              dark && positive && "text-success",
            )}
          >
            {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
          <span className={cn(dark ? "text-ink-foreground/60" : "text-muted-foreground")}>{deltaLabel}</span>
        </div>
      )}
    </div>
  );
}
