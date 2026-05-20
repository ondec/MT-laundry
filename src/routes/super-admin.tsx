import { createFileRoute } from "@tanstack/react-router";
import { Building2, LayoutDashboard, Receipt, Settings, Sparkles } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";
import { TenantBrandProvider } from "@/lib/tenant-brand";

export const Route = createFileRoute("/super-admin")({
  component: SuperLayout,
});

const nav: NavItem[] = [
  { to: "/super-admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/super-admin/tenants", label: "Tenants", icon: Building2 },
  { to: "/super-admin/plans", label: "Plans", icon: Sparkles },
  { to: "/super-admin/billing", label: "Billing", icon: Receipt },
  { to: "/super-admin/settings", label: "Settings", icon: Settings },
];

function SuperLayout() {
  return (
    <TenantBrandProvider>
      <AppShell
        brand={{ name: "Sudsly HQ", tagline: "Platform admin", logoInitial: "S" }}
        nav={nav}
        userName="Alex Vega"
        userRole="Platform admin"
        searchPlaceholder="Search tenants, plans…"
        showTenantSwitcher={false}
        promo={{
          title: "Onboard a tenant",
          body: "Walk a new laundromat through setup, plan and branding in one wizard.",
          cta: "Start",
          href: "/super-admin/tenants",
        }}
      />
    </TenantBrandProvider>
  );
}
