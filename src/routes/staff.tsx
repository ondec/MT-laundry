import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Truck, Users } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";
import { TenantBrandProvider } from "@/lib/tenant-brand";

export const Route = createFileRoute("/staff")({
  component: StaffLayout,
});

const nav: NavItem[] = [
  { to: "/staff", label: "Today's Queue", icon: LayoutDashboard, exact: true },
  { to: "/staff/pickups", label: "Pickups & Delivery", icon: Truck },
  { to: "/staff/customers", label: "Customer Lookup", icon: Users },
];

function StaffLayout() {
  return (
    <TenantBrandProvider>
      <AppShell
        nav={nav}
        userName="Jonas Bauer"
        userRole="Operator · Morning"
        searchPlaceholder="Search a ticket #"
        showDateRange={false}
        promo={{
          title: "End-of-shift checklist",
          body: "Tap to review what still needs to move before you clock out.",
          cta: "Open checklist",
          href: "/staff",
        }}
      />
    </TenantBrandProvider>
  );
}
