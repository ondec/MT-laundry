import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Receipt,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";

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
  { to: "/admin/finance", label: "Finance", icon: Wallet },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/invoices", label: "Invoices", icon: Receipt },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  return (
    <AppShell
      brand={{ name: "Sparkle Wash", tagline: "Tenant admin" }}
      nav={nav}
      userName="Maretta Daniel"
      userRole="Owner"
      promo={{
        title: "Upgrade to Scale",
        body: "Unlock unlimited routes, advanced reports and a branded customer app.",
        cta: "Upgrade",
        href: "/admin/settings",
      }}
      searchPlaceholder="Search orders, customers…"
    />
  );
}
