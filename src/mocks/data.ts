import type {
  Branch,
  Customer,
  InventoryItem,
  Invoice,
  Order,
  OrderStatus,
  RevenuePoint,
  Service,
  Staff,
  Tenant,
} from "@/types";

export const services: Service[] = [
  { id: "svc-1", name: "Wash & Fold", type: "wash_fold", description: "Everyday laundry, washed, dried and neatly folded.", unit: "kg", pricePerUnit: 20, turnaroundHours: 24 },
  { id: "svc-2", name: "Dry Cleaning", type: "dry_clean", description: "Solvent cleaning for suits, dresses and delicates.", unit: "item", pricePerUnit: 45, turnaroundHours: 48 },
  { id: "svc-3", name: "Ironing Only", type: "ironing", description: "Professional pressing without washing.", unit: "item", pricePerUnit: 12, turnaroundHours: 24 },
  { id: "svc-4", name: "Premium Care", type: "premium", description: "Hand-finished, eco-friendly detergents.", unit: "kg", pricePerUnit: 38, turnaroundHours: 48 },
  { id: "svc-5", name: "Shoe Cleaning", type: "shoes", description: "Sneaker & leather restoration.", unit: "pair", pricePerUnit: 65, turnaroundHours: 72 },
  { id: "svc-6", name: "Bedding & Linens", type: "bedding", description: "Sheets, duvets, comforters.", unit: "set", pricePerUnit: 95, turnaroundHours: 48 },
];

const firstNames = ["Kwame", "Akosua", "Nana", "Yaa", "Kojo", "Ama", "Kwaku", "Adwoa", "Kofi", "Esi", "Abena", "Kwesi", "Afia", "Yaw", "Akua", "Joseph", "Grace", "Samuel", "Linda", "Daniel"];
const lastNames = ["Mensah", "Owusu", "Boateng", "Asante", "Adjei", "Darko", "Ofori", "Appiah", "Agyeman", "Nyarko", "Quartey", "Sarpong", "Annan", "Acheampong", "Frimpong", "Bonsu", "Tetteh", "Addo", "Aidoo", "Osei"];
const streets = ["Oxford", "Independence", "Liberation", "Spintex", "Ring", "Beach", "Castle", "High"];
const accraNeighborhoods = ["Osu", "East Legon", "Spintex", "Madina", "Labone", "Airport Res.", "Adabraka", "Dansoman"];
const mobilePrefixes = ["24", "20", "55", "27", "54"];

const seeded = (i: number) => Math.abs(Math.sin(i * 9301 + 49297) * 233280) % 1;

export const customers: Customer[] = Array.from({ length: 24 }, (_, i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[(i * 3) % lastNames.length];
  const totalOrders = Math.floor(seeded(i) * 40) + 2;
  const totalSpent = Math.round(totalOrders * (60 + seeded(i + 1) * 180));
  const points = totalOrders * 12;
  const prefix = mobilePrefixes[i % mobilePrefixes.length];
  const phoneTail = String(2000000 + Math.floor(seeded(i + 4) * 7999999)).slice(0, 7);
  return {
    id: `cus-${i + 1}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@mail.gh`,
    phone: `+233 ${prefix} ${phoneTail.slice(0, 3)} ${phoneTail.slice(3)}`,
    address: `${Math.floor(seeded(i + 2) * 90) + 10} ${streets[i % streets.length]} Rd, ${accraNeighborhoods[i % accraNeighborhoods.length]}, Accra`,
    joinedAt: new Date(Date.now() - (i * 12 + 30) * 86400000).toISOString(),
    totalSpent,
    totalOrders,
    loyaltyPoints: points,
    tier: points > 300 ? "gold" : points > 120 ? "silver" : "bronze",
    avatarSeed: `${first}${last}`,
  };
});

export const orders: Order[] = Array.from({ length: 38 }, (_, i) => {
  const cust = customers[i % customers.length];
  const svc = services[i % services.length];
  const qty = Math.floor(seeded(i + 5) * 8) + 1;
  const status: OrderStatus =
    i < 6 ? "received" : i < 12 ? "washing" : i < 17 ? "drying" : i < 22 ? "folding" : i < 28 ? "ready" : "delivered";
  const amount = +(svc.pricePerUnit * qty).toFixed(2);
  const created = new Date(Date.now() - i * 3600000 * 6).toISOString();
  return {
    id: `ord-${i + 1}`,
    code: `#SW${(34567 + i).toString()}`,
    customerId: cust.id,
    customerName: cust.name,
    status,
    items: [
      { serviceId: svc.id, serviceName: svc.name, quantity: qty, unit: svc.unit, pricePerUnit: svc.pricePerUnit },
    ],
    amount,
    createdAt: created,
    pickupAt: created,
    deliveryAt: new Date(new Date(created).getTime() + svc.turnaroundHours * 3600000).toISOString(),
    paid: status !== "received",
    notes: i % 5 === 0 ? "Handle with care — kente." : undefined,
    branchIndex: i % 3,
  };
});

export const staff: Staff[] = [
  { id: "stf-1", name: "Akosua Mensah", role: "manager", email: "akosua@sparkle.gh", phone: "+233 24 555 0900", shift: "full", activeOrders: 12, avatarSeed: "Akosua", branchIndex: 0 },
  { id: "stf-2", name: "Kwame Boateng", role: "operator", email: "kwame@sparkle.gh", phone: "+233 20 555 0901", shift: "morning", activeOrders: 6, avatarSeed: "Kwame", branchIndex: 0 },
  { id: "stf-3", name: "Grace Owusu", role: "operator", email: "grace@sparkle.gh", phone: "+233 55 555 0902", shift: "morning", activeOrders: 8, avatarSeed: "Grace", branchIndex: 1 },
  { id: "stf-4", name: "Joseph Adjei", role: "operator", email: "joseph@sparkle.gh", phone: "+233 24 555 0903", shift: "evening", activeOrders: 5, avatarSeed: "Joseph", branchIndex: 2 },
  { id: "stf-5", name: "Yaw Darko", role: "driver", email: "yaw@sparkle.gh", phone: "+233 20 555 0904", shift: "morning", activeOrders: 4, avatarSeed: "Yaw", branchIndex: 1 },
  { id: "stf-6", name: "Ama Sarpong", role: "driver", email: "ama@sparkle.gh", phone: "+233 55 555 0905", shift: "evening", activeOrders: 3, avatarSeed: "Ama", branchIndex: 0 },
  { id: "stf-7", name: "Samuel Ofori", role: "cashier", email: "samuel@sparkle.gh", phone: "+233 24 555 0906", shift: "full", activeOrders: 0, avatarSeed: "Samuel", branchIndex: 2 },
  { id: "stf-8", name: "Linda Appiah", role: "cashier", email: "linda@sparkle.gh", phone: "+233 20 555 0907", shift: "evening", activeOrders: 0, avatarSeed: "Linda", branchIndex: 1 },
];

export const inventory: InventoryItem[] = [
  { id: "inv-1", name: "Eco Detergent (5L)", category: "detergent", stock: 24, unit: "bottle", reorderAt: 10, unitCost: 95, branchIndex: 0 },
  { id: "inv-2", name: "Wool Wash", category: "detergent", stock: 8, unit: "bottle", reorderAt: 6, unitCost: 70, branchIndex: 0 },
  { id: "inv-3", name: "Lavender Softener", category: "softener", stock: 15, unit: "bottle", reorderAt: 8, unitCost: 48, branchIndex: 1 },
  { id: "inv-4", name: "Hangers (pk 50)", category: "supplies", stock: 6, unit: "pack", reorderAt: 5, unitCost: 60, branchIndex: 1 },
  { id: "inv-5", name: "Garment Bags", category: "packaging", stock: 320, unit: "bag", reorderAt: 100, unitCost: 1.5, branchIndex: 2 },
  { id: "inv-6", name: "Stain Remover", category: "detergent", stock: 4, unit: "bottle", reorderAt: 6, unitCost: 38, branchIndex: 2 },
  { id: "inv-7", name: "Receipt Paper", category: "supplies", stock: 22, unit: "roll", reorderAt: 10, unitCost: 12, branchIndex: 0 },
];

export const invoices: Invoice[] = orders.slice(0, 14).map((o, i) => ({
  id: `inv-${i + 1}`,
  orderId: o.id,
  customerName: o.customerName,
  amount: o.amount,
  issuedAt: o.createdAt,
  status: i % 6 === 0 ? "pending" : i % 9 === 0 ? "overdue" : "paid",
}));

export const revenueByMonth: RevenuePoint[] = [
  { label: "Jan", value: 32000 }, { label: "Feb", value: 26000 }, { label: "Mar", value: 46000 },
  { label: "Apr", value: 37000 }, { label: "May", value: 40500 }, { label: "Jun", value: 52000 },
];
export const revenueByWeek: RevenuePoint[] = [
  { label: "Mon", value: 6000 }, { label: "Tue", value: 7250 }, { label: "Wed", value: 5900 },
  { label: "Thu", value: 8100 }, { label: "Fri", value: 9100 }, { label: "Sat", value: 10500 }, { label: "Sun", value: 4900 },
];
export const revenueByDay: RevenuePoint[] = [
  { label: "8a", value: 600 }, { label: "10a", value: 1200 }, { label: "12p", value: 1900 },
  { label: "2p", value: 1450 }, { label: "4p", value: 2050 }, { label: "6p", value: 2550 }, { label: "8p", value: 1150 },
];
export const revenueByYear: RevenuePoint[] = [
  { label: "2021", value: 310000 }, { label: "2022", value: 370000 },
  { label: "2023", value: 475000 }, { label: "2024", value: 640000 }, { label: "2025", value: 735000 },
];

/**
 * Branch slot templates — each tenant gets three branches built from these
 * templates plus city-specific naming. The slot index lines up with the
 * `branchIndex` stamped on orders, staff and inventory so the same record
 * map naturally onto whichever tenant is being demoed.
 */
const branchTemplates: {
  hours: string;
  managerName: string;
  isDefault?: boolean;
  serviceOverrides: Record<string, { pricePerUnit?: number; disabled?: boolean }>;
}[] = [
  { hours: "Mon–Sat · 7am–9pm", managerName: "Akosua Mensah", isDefault: true, serviceOverrides: {} },
  { hours: "Mon–Sun · 8am–8pm", managerName: "Grace Owusu", serviceOverrides: { "svc-2": { pricePerUnit: 55 }, "svc-4": { pricePerUnit: 42 } } },
  { hours: "Tue–Sun · 9am–7pm", managerName: "Joseph Adjei", serviceOverrides: { "svc-5": { disabled: true }, "svc-1": { pricePerUnit: 22 } } },
];

const branchNamesByCity: Record<string, string[]> = {
  "Accra": ["Osu", "East Legon", "Spintex"],
  "Kumasi": ["Adum", "Asokwa", "Bantama"],
  "Takoradi": ["Beach Road", "Anaji", "Effia"],
  "Tema": ["Community 1", "Community 11", "Sakumono"],
  "Tamale": ["Lamashegu", "Sakasaka", "Vittin"],
  "Cape Coast": ["Pedu", "Abura", "Adisadel"],
  "Koforidua": ["Adweso", "Srodae", "Effiduase"],
};

function buildBranches(tenantId: string, city: string): Branch[] {
  const names = branchNamesByCity[city] ?? ["Central", "North", "South"];
  return branchTemplates.map((tpl, i) => ({
    id: `${tenantId}-b${i + 1}`,
    tenantId,
    name: names[i],
    address: `${10 + i * 17} ${streets[i % streets.length]} Rd, ${names[i]}, ${city}`,
    phone: `+233 30 ${String(2000 + i * 113).padStart(4, "0")} ${String(100 + i * 47).padStart(4, "0")}`,
    hours: tpl.hours,
    managerName: tpl.managerName,
    isDefault: tpl.isDefault,
    serviceOverrides: tpl.serviceOverrides,
  }));
}

const baseTenants: Omit<Tenant, "branches">[] = [
  { id: "t-1", name: "Sparkle Wash", plan: "scale", status: "active", city: "Accra", ownerName: "Akosua Mensah", ownerEmail: "akosua@sparkle.gh", createdAt: "2024-02-12", monthlyOrders: 412, monthlyRevenue: 86402,
    brand: { logoInitial: "SW", accent: "#2563eb", accentForeground: "#ffffff", customerAppName: "Sparkle", tagline: "Accra's everyday clean", subdomain: "sparkle" } },
  { id: "t-2", name: "Foam & Fold", plan: "growth", status: "active", city: "Kumasi", ownerName: "Kojo Asante", ownerEmail: "kojo@foamfold.gh", createdAt: "2024-05-04", monthlyOrders: 268, monthlyRevenue: 52820,
    brand: { logoInitial: "FF", accent: "#16a34a", accentForeground: "#ffffff", customerAppName: "Foam", tagline: "Kumasi wash & fold", subdomain: "foamfold" } },
  { id: "t-3", name: "Tide Cleaners", plan: "growth", status: "active", city: "Takoradi", ownerName: "Esi Quartey", ownerEmail: "esi@tide.gh", createdAt: "2024-07-19", monthlyOrders: 198, monthlyRevenue: 41200,
    brand: { logoInitial: "TC", accent: "#0891b2", accentForeground: "#ffffff", customerAppName: "Tide", tagline: "Coastal fabric care", subdomain: "tide" } },
  { id: "t-4", name: "Bubble Bros", plan: "starter", status: "trial", city: "Tema", ownerName: "Yaw Frimpong", ownerEmail: "yaw@bubblebros.gh", createdAt: "2025-04-22", monthlyOrders: 42, monthlyRevenue: 6980,
    brand: { logoInitial: "BB", accent: "#9333ea", accentForeground: "#ffffff", customerAppName: "Bubble", tagline: "Harbour-side laundry", subdomain: "bubblebros" } },
  { id: "t-5", name: "Pristine Linens", plan: "scale", status: "active", city: "Tamale", ownerName: "Abena Sarpong", ownerEmail: "abena@pristine.gh", createdAt: "2023-11-08", monthlyOrders: 521, monthlyRevenue: 112400,
    brand: { logoInitial: "PL", accent: "#0d0d0d", accentForeground: "#ffffff", customerAppName: "Pristine", tagline: "Hotel-grade linen service", subdomain: "pristine" } },
  { id: "t-6", name: "Crisp Co.", plan: "starter", status: "suspended", city: "Cape Coast", ownerName: "Daniel Tetteh", ownerEmail: "daniel@crisp.gh", createdAt: "2024-01-30", monthlyOrders: 0, monthlyRevenue: 0,
    brand: { logoInitial: "CC", accent: "#dc2626", accentForeground: "#ffffff", customerAppName: "Crisp", tagline: "Cape Coast press & fold", subdomain: "crisp" } },
  { id: "t-7", name: "Linen Lab", plan: "growth", status: "active", city: "Koforidua", ownerName: "Nana Addo", ownerEmail: "nana@linenlab.gh", createdAt: "2024-09-14", monthlyOrders: 184, monthlyRevenue: 34600,
    brand: { logoInitial: "LL", accent: "#d97706", accentForeground: "#ffffff", customerAppName: "Linen", tagline: "Eastern Region fabric care", subdomain: "linenlab" } },
];

export const tenants: Tenant[] = baseTenants.map((t) => ({
  ...t,
  branches: buildBranches(t.id, t.city),
}));

export const currentTenant = tenants[0];
export const currentCustomer = customers[1];

/**
 * Resolve the effective price-list for the given branch by merging the global
 * service catalog with the branch's overrides. When `branch` is null, the
 * untouched tenant-wide catalog is returned.
 */
export function getBranchServices(branch: Branch | null): Service[] {
  if (!branch) return services;
  return services
    .map((s) => {
      const ov = branch.serviceOverrides[s.id];
      if (!ov) return s;
      if (ov.disabled) return null;
      return ov.pricePerUnit != null ? { ...s, pricePerUnit: ov.pricePerUnit } : s;
    })
    .filter((s): s is Service => s !== null);
}

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", maximumFractionDigits: 0 }).format(n);
}
export function formatMoney2(n: number) {
  return new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(n);
}
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
}
export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
