import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { tenants } from "@/mocks/data";
import type { Branch, Tenant } from "@/types";

const TENANT_KEY = "sudsly.activeTenantId";
const BRANCH_KEY_PREFIX = "sudsly.activeBranchId.";
const DEFAULT_TENANT_ID = "t-1";

/** "all" means "show data across every branch". */
export type BranchSelection = string | "all";

interface BrandContextValue {
  tenant: Tenant;
  setActiveTenantId: (id: string) => void;
  allTenants: Tenant[];

  /** Active branch selection for the current tenant. */
  activeBranchId: BranchSelection;
  /** Resolved Branch object — null when "all" is selected. */
  activeBranch: Branch | null;
  /** Index in tenant.branches, or null when "all". */
  activeBranchIndex: number | null;
  setActiveBranchId: (id: BranchSelection) => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function TenantBrandProvider({ children }: { children: ReactNode }) {
  // Always start with default for SSR consistency; hydrate from storage on mount.
  const [activeId, setActiveId] = useState<string>(DEFAULT_TENANT_ID);
  const [branchByTenant, setBranchByTenant] = useState<Record<string, BranchSelection>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TENANT_KEY);
      if (stored && tenants.some((t) => t.id === stored)) setActiveId(stored);

      // Rehydrate any per-tenant branch selections previously stored.
      const map: Record<string, BranchSelection> = {};
      for (const t of tenants) {
        const v = localStorage.getItem(BRANCH_KEY_PREFIX + t.id);
        if (v) map[t.id] = v;
      }
      setBranchByTenant(map);
    } catch {
      /* ignore */
    }
  }, []);

  const setActiveTenantId = (id: string) => {
    setActiveId(id);
    try {
      localStorage.setItem(TENANT_KEY, id);
    } catch {
      /* ignore */
    }
  };

  const tenant = useMemo(
    () => tenants.find((t) => t.id === activeId) ?? tenants[0],
    [activeId],
  );

  const activeBranchId: BranchSelection = branchByTenant[tenant.id] ?? "all";

  const setActiveBranchId = useCallback(
    (id: BranchSelection) => {
      setBranchByTenant((prev) => ({ ...prev, [tenant.id]: id }));
      try {
        localStorage.setItem(BRANCH_KEY_PREFIX + tenant.id, id);
      } catch {
        /* ignore */
      }
    },
    [tenant.id],
  );

  const activeBranch =
    activeBranchId === "all" ? null : tenant.branches.find((b) => b.id === activeBranchId) ?? null;
  const activeBranchIndex = activeBranch ? tenant.branches.indexOf(activeBranch) : null;

  const value = useMemo(
    () => ({
      tenant,
      setActiveTenantId,
      allTenants: tenants,
      activeBranchId,
      activeBranch,
      activeBranchIndex,
      setActiveBranchId,
    }),
    [tenant, activeBranchId, activeBranch, activeBranchIndex, setActiveBranchId],
  );

  return (
    <BrandContext.Provider value={value}>
      <div
        style={{
          // Override the global accent with the tenant's brand color.
          ["--primary" as string]: tenant.brand.accent,
          ["--primary-foreground" as string]: tenant.brand.accentForeground,
          ["--ring" as string]: tenant.brand.accent,
          ["--chart-1" as string]: tenant.brand.accent,
          ["--sidebar-primary" as string]: tenant.brand.accent,
          ["--sidebar-ring" as string]: tenant.brand.accent,
        }}
      >
        {children}
      </div>
    </BrandContext.Provider>
  );
}

export function useTenantBrand() {
  const ctx = useContext(BrandContext);
  if (ctx) return ctx;
  // Fallback for shells outside a provider — used by Super Admin etc.
  const t = tenants[0];
  return {
    tenant: t,
    setActiveTenantId: () => {},
    allTenants: tenants,
    activeBranchId: "all" as BranchSelection,
    activeBranch: null,
    activeBranchIndex: null,
    setActiveBranchId: () => {},
  };
}

/**
 * Convenience hook for views that only care about branch scoping.
 * Returns helpers to filter any branch-stamped record collection.
 */
export function useBranchScope() {
  const { tenant, activeBranch, activeBranchIndex, activeBranchId, setActiveBranchId } = useTenantBrand();

  const filterByBranch = useCallback(
    <T extends { branchIndex: number }>(items: T[]): T[] => {
      if (activeBranchIndex == null) return items;
      return items.filter((it) => it.branchIndex === activeBranchIndex);
    },
    [activeBranchIndex],
  );

  return {
    branches: tenant.branches,
    activeBranch,
    activeBranchIndex,
    activeBranchId,
    setActiveBranchId,
    filterByBranch,
  };
}
