import { useState } from "react";
import { Building2, Check, ChevronDown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBranchScope } from "@/lib/tenant-brand";

/**
 * Admin-facing branch switcher with an "All branches" option.
 * Persists per-tenant via the brand provider.
 */
export function BranchSwitcher() {
  const { branches, activeBranch, activeBranchId, setActiveBranchId } = useBranchScope();
  const [open, setOpen] = useState(false);

  const label = activeBranch ? activeBranch.name : "All branches";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:bg-muted"
        title="Switch branch"
      >
        <Building2 className="size-3.5 text-muted-foreground" />
        <span className="max-w-[140px] truncate font-medium">{label}</span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-popover shadow-lg p-1.5 z-50">
            <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              Branch scope
            </div>
            <Option
              label="All branches"
              hint="Combined view across every location"
              active={activeBranchId === "all"}
              onClick={() => {
                setActiveBranchId("all");
                setOpen(false);
              }}
            />
            <div className="my-1 border-t border-border" />
            {branches.map((b) => {
              const active = b.id === activeBranchId;
              return (
                <Option
                  key={b.id}
                  label={b.name}
                  hint={b.address}
                  active={active}
                  onClick={() => {
                    setActiveBranchId(b.id);
                    setOpen(false);
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function Option({
  label,
  hint,
  active,
  onClick,
}: {
  label: string;
  hint?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-left text-sm hover:bg-muted",
        active && "bg-muted",
      )}
    >
      <Building2 className="size-4 mt-0.5 text-muted-foreground shrink-0" />
      <span className="flex-1 min-w-0">
        <span className="block truncate font-medium">{label}</span>
        {hint && <span className="block truncate text-[11px] text-muted-foreground">{hint}</span>}
      </span>
      {active && <Check className="size-4 text-primary shrink-0" />}
    </button>
  );
}

/**
 * Read-only badge used by the Staff portal — staff members are tied to one
 * branch and cannot switch contexts themselves.
 */
export function LockedBranchChip({ branchName }: { branchName: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
      title="Staff are assigned to a single branch"
    >
      <Lock className="size-3" />
      <Building2 className="size-3.5" />
      <span className="font-medium text-foreground">{branchName}</span>
    </span>
  );
}
