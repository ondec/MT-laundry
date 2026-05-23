import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Truck, Users } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";
import { LockedBranchChip } from "@/components/branch-switcher";
import { TenantBrandProvider, useTenantBrand } from "@/lib/tenant-brand";
import { STAFF_BRANCH_INDEX } from "@/lib/staff-context";

export const Route = createFileRoute("/staff")({
  component: StaffLayout,
});

const nav: NavItem[] = [
  { to: "/staff", label: "Today's Queue", icon: LayoutDashboard, exact: true },
  { to: "/staff/pickups", label: "Pickups & Delivery", icon: Truck },
  { to: "/staff/customers", label: "Customer Lookup", icon: Users },
];

function StaffLayoutInner() {
  const { tenant } = useTenantBrand();
  const branch = tenant.branches[STAFF_BRANCH_INDEX] ?? tenant.branches[0];
  return (
    <AppShell
      nav={nav}
      userName="Kwame Boateng"
      userRole={`Operator · ${branch.name}`}
      searchPlaceholder="Search a ticket #"
      showDateRange={false}
      topBar={<LockedBranchChip branchName={branch.name} />}
      promo={{
        title: "End-of-shift checklist",
        body: "Tap to review what still needs to move before you clock out.",
        cta: "Open checklist",
        href: "/staff",
      }}
    />
  );
}

function StaffLayout() {
  return (
    <TenantBrandProvider>
      <StaffLayoutInner />
    </TenantBrandProvider>
  );
}
