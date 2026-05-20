import { cn } from "@/lib/utils";

interface PeriodSwitcherProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

export function PeriodSwitcher({ options, value, onChange, className }: PeriodSwitcherProps) {
  return (
    <div className={cn("inline-flex items-center rounded-full border border-border bg-card p-1", className)}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "px-3.5 py-1 text-sm rounded-full transition-colors",
            value === opt
              ? "bg-ink text-ink-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
