import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Truck, Users } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";

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
    <AppShell
      brand={{ name: "Sparkle Wash", tagline: "Operator console" }}
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
  );
}
