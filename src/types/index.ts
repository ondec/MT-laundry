export type OrderStatus =
  | "received"
  | "washing"
  | "drying"
  | "folding"
  | "ready"
  | "delivered"
  | "cancelled";

export type ServiceType = "wash_fold" | "dry_clean" | "ironing" | "premium" | "shoes" | "bedding";

export interface TenantBrand {
  /** Two-letter monogram shown in the sidebar logo tile. */
  logoInitial: string;
  /** Hex accent color used for buttons, focus rings and chart highlights. */
  accent: string;
  /** Hex color used for text/icons on top of the accent. Defaults to white. */
  accentForeground: string;
  /** Public-facing name of the customer app (may differ from tenant name). */
  customerAppName: string;
  /** Short tagline shown beneath the logo. */
  tagline: string;
  /** Subdomain placeholder e.g. "sparkle" → sparkle.sudsly.app */
  subdomain: string;
}

export interface BranchServiceOverride {
  /** Overrides the tenant-wide price for this service at this branch. */
  pricePerUnit?: number;
  /** When true, the branch does not offer this service. */
  disabled?: boolean;
}

export interface Branch {
  id: string;
  tenantId: string;
  name: string;
  address: string;
  phone: string;
  /** Human readable opening hours, e.g. "Mon–Sat 8am–8pm". */
  hours: string;
  managerName: string;
  isDefault?: boolean;
  /** Per-service price/availability overrides, keyed by service id. */
  serviceOverrides: Record<string, BranchServiceOverride>;
}

export interface Tenant {
  id: string;
  name: string;
  plan: "starter" | "growth" | "scale";
  status: "active" | "trial" | "suspended";
  city: string;
  ownerName: string;
  ownerEmail: string;
  createdAt: string;
  monthlyOrders: number;
  monthlyRevenue: number;
  brand: TenantBrand;
  branches: Branch[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedAt: string;
  totalSpent: number;
  totalOrders: number;
  loyaltyPoints: number;
  tier: "bronze" | "silver" | "gold";
  avatarSeed: string;
}

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  unit: "kg" | "item" | "pair" | "set";
  pricePerUnit: number;
  turnaroundHours: number;
}

export interface OrderItem {
  serviceId: string;
  serviceName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

export interface Order {
  id: string;
  code: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  items: OrderItem[];
  amount: number;
  createdAt: string;
  pickupAt?: string;
  deliveryAt?: string;
  assignedStaffId?: string;
  paid: boolean;
  notes?: string;
  /** Branch slot (0..2) — resolved against the active tenant's branches list. */
  branchIndex: number;
}

export interface Staff {
  id: string;
  name: string;
  role: "manager" | "operator" | "driver" | "cashier";
  email: string;
  phone: string;
  shift: "morning" | "evening" | "full";
  activeOrders: number;
  avatarSeed: string;
  branchIndex: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "detergent" | "softener" | "packaging" | "supplies";
  stock: number;
  unit: string;
  reorderAt: number;
  unitCost: number;
  branchIndex: number;
}

export interface Invoice {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  issuedAt: string;
  status: "paid" | "pending" | "overdue";
}

export interface RevenuePoint {
  label: string;
  value: number;
}
