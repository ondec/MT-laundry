import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { tenants } from "@/mocks/data";
import type { Tenant } from "@/types";

const STORAGE_KEY = "sudsly.activeTenantId";
const DEFAULT_ID = "t-1";

interface BrandContextValue {
  tenant: Tenant;
  setActiveTenantId: (id: string) => void;
  allTenants: Tenant[];
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function TenantBrandProvider({ children }: { children: ReactNode }) {
  // Always start with default for SSR consistency; hydrate from storage on mount.
  const [activeId, setActiveId] = useState<string>(DEFAULT_ID);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && tenants.some((t) => t.id === stored)) setActiveId(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setActiveTenantId = (id: string) => {
    setActiveId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  };

  const tenant = useMemo(
    () => tenants.find((t) => t.id === activeId) ?? tenants[0],
    [activeId],
  );

  const value = useMemo(
    () => ({ tenant, setActiveTenantId, allTenants: tenants }),
    [tenant],
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
  if (!ctx) throw new Error("useTenantBrand must be used inside <TenantBrandProvider>");
  return ctx;
}
