import { createFileRoute } from "@tanstack/react-router";
import { Gift, Home, PackagePlus, ScrollText, User } from "lucide-react";
import { type NavItem } from "@/components/app-shell";
import { MobileAppShell } from "@/components/mobile-app-shell";
import { TenantBrandProvider } from "@/lib/tenant-brand";

export const Route = createFileRoute("/app")({
  component: CustomerLayout,
});

const nav: NavItem[] = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/new-order", label: "Order", icon: PackagePlus },
  { to: "/app/orders", label: "Orders", icon: ScrollText },
  { to: "/app/loyalty", label: "Loyalty", icon: Gift },
  { to: "/app/profile", label: "Profile", icon: User },
];

function CustomerLayout() {
  return (
    <TenantBrandProvider>
      <MobileAppShell
        nav={nav}
        userName="Liam Daniel"
        userRole="Silver member"
        promo={{
          title: "Refer a friend",
          body: "Both of you get $10 off your next pickup when they place their first order.",
          cta: "Share link",
          href: "/app/loyalty",
        }}
      />
    </TenantBrandProvider>
  );
}
