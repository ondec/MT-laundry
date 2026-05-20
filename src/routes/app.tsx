import { createFileRoute } from "@tanstack/react-router";
import { Gift, Home, PackagePlus, ScrollText, User } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";
import { TenantBrandProvider, useTenantBrand } from "@/lib/tenant-brand";

export const Route = createFileRoute("/app")({
  component: CustomerLayout,
});

const nav: NavItem[] = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/new-order", label: "New order", icon: PackagePlus },
  { to: "/app/orders", label: "My orders", icon: ScrollText },
  { to: "/app/loyalty", label: "Loyalty", icon: Gift },
  { to: "/app/profile", label: "Profile", icon: User },
];

function CustomerLayoutInner() {
  const { tenant } = useTenantBrand();
  return (
    <AppShell
      brand={{
        name: tenant.brand.customerAppName,
        tagline: "Customer app",
        logoInitial: tenant.brand.logoInitial,
      }}
      nav={nav}
      userName="Liam Daniel"
      userRole="Silver member"
      searchPlaceholder="Search your orders…"
      showDateRange={false}
      promo={{
        title: "Refer a friend",
        body: "Both of you get $10 off your next pickup when they place their first order.",
        cta: "Share link",
        href: "/app/loyalty",
      }}
    />
  );
}

function CustomerLayout() {
  return (
    <TenantBrandProvider>
      <CustomerLayoutInner />
    </TenantBrandProvider>
  );
}
