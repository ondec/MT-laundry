import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Boxes,
  Building2,
  ClipboardList,
  LayoutDashboard,
  Palette,
  Receipt,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/app-shell";
import { BranchSwitcher } from "@/components/branch-switcher";
import { CommandPalette } from "@/components/command-palette";
import { TenantBrandProvider, useTenantBrand } from "@/lib/tenant-brand";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const nav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/services", label: "Services", icon: Sparkles },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/staff", label: "Staff", icon: UsersRound },
  { to: "/admin/branches", label: "Branches", icon: Building2 },
  { to: "/admin/finance", label: "Finance", icon: Wallet },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/invoices", label: "Invoices", icon: Receipt },
  { to: "/admin/audit-log", label: "Audit log", icon: ClipboardList },
  { to: "/admin/branding", label: "Branding", icon: Palette },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const IMPERSONATE_KEY = "sudsly.activeTenantId";

function ImpersonateBanner() {
  const navigate = useNavigate();
  const { tenant } = useTenantBrand();
  const [active, setActive] = useState(false);

  useEffect(() => {
    try {
      setActive(!!localStorage.getItem(IMPERSONATE_KEY));
    } catch {
      /* ignore */
    }
  }, []);

  if (!active) return null;
  return (
    <div className="bg-warning/30 border-b border-warning/50 text-foreground text-xs px-4 py-2 flex items-center gap-3">
      <span className="font-medium">Viewing as {tenant.name}</span>
      <span className="text-muted-foreground hidden sm:inline">All actions are read-only in this session.</span>
      <button
        onClick={() => {
          try { localStorage.removeItem(IMPERSONATE_KEY); } catch { /* ignore */ }
          navigate({ to: "/super-admin/tenants" });
        }}
        className="ml-auto inline-flex items-center gap-1 rounded-full bg-foreground text-background px-2.5 py-0.5"
      >
        <X className="size-3" /> Exit
      </button>
    </div>
  );
}

function AdminLayoutInner() {
  const { tenant } = useTenantBrand();
  return (
    <>
      <ImpersonateBanner />
      <AppShell
        nav={nav}
        userName={tenant.ownerName}
        userRole="Owner"
        topBar={
          <>
            <BranchSwitcher />
            <KbdHint />
          </>
        }
        promo={{
          title: "Upgrade to Scale",
          body: "Unlock unlimited routes, advanced reports and a branded customer app.",
          cta: "Upgrade",
          href: "/admin/settings",
        }}
        searchPlaceholder="Search orders, customers…"
      />
      <CommandPalette />
    </>
  );
}

function KbdHint() {
  return (
    <kbd className="hidden lg:inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-[10px] text-muted-foreground font-mono">
      ⌘K
    </kbd>
  );
}

function AdminLayout() {
  return (
    <TenantBrandProvider>
      <AdminLayoutInner />
    </TenantBrandProvider>
  );
}

// silence unused import warning for Link (referenced in case extension adds in-banner link)
export const _Link = Link;
