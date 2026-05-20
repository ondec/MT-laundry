import type {
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
  { id: "svc-1", name: "Wash & Fold", type: "wash_fold", description: "Everyday laundry, washed, dried and neatly folded.", unit: "kg", pricePerUnit: 3.5, turnaroundHours: 24 },
  { id: "svc-2", name: "Dry Cleaning", type: "dry_clean", description: "Solvent cleaning for suits, dresses and delicates.", unit: "item", pricePerUnit: 8, turnaroundHours: 48 },
  { id: "svc-3", name: "Ironing Only", type: "ironing", description: "Professional pressing without washing.", unit: "item", pricePerUnit: 2, turnaroundHours: 24 },
  { id: "svc-4", name: "Premium Care", type: "premium", description: "Hand-finished, eco-friendly detergents.", unit: "kg", pricePerUnit: 6.5, turnaroundHours: 48 },
  { id: "svc-5", name: "Shoe Cleaning", type: "shoes", description: "Sneaker & leather restoration.", unit: "pair", pricePerUnit: 12, turnaroundHours: 72 },
  { id: "svc-6", name: "Bedding & Linens", type: "bedding", description: "Sheets, duvets, comforters.", unit: "set", pricePerUnit: 18, turnaroundHours: 48 },
];

const firstNames = ["Aria", "Liam", "Maretta", "Noah", "Sofia", "Ethan", "Zara", "Kai", "Maya", "Owen", "Iris", "Jude", "Nora", "Leo", "Eva", "Jonas", "Amina", "Yusuf", "Lina", "Theo"];
const lastNames = ["Chen", "Daniel", "Okafor", "Rivera", "Park", "Hassan", "Murphy", "Kowalski", "Silva", "Bauer", "Nakamura", "Adeyemi", "Ferreira", "Singh", "Romano", "Vasquez", "Klein", "Tanaka", "Petrov", "Lindqvist"];
const streets = ["Oak", "Cedar", "Maple", "Linden", "Birch", "Elm", "Ash", "Willow"];

const seeded = (i: number) => Math.abs(Math.sin(i * 9301 + 49297) * 233280) % 1;

export const customers: Customer[] = Array.from({ length: 24 }, (_, i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[(i * 3) % lastNames.length];
  const totalOrders = Math.floor(seeded(i) * 40) + 2;
  const totalSpent = Math.round(totalOrders * (15 + seeded(i + 1) * 35));
  const points = totalOrders * 12;
  return {
    id: `cus-${i + 1}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@mail.com`,
    phone: `+1 555-0${100 + i}`,
    address: `${Math.floor(seeded(i + 2) * 900) + 100} ${streets[i % streets.length]} St, Apt ${i + 1}`,
    joinedAt: new Date(Date.now() - (i * 12 + 30) * 86400000).toISOString(),
    totalSpent,
    totalOrders,
    loyaltyPoints: points,
    tier: points > 300 ? "gold" : points > 120 ? "silver" : "bronze",
    avatarSeed: `${first}${last}`,
  };
});

const statuses: OrderStatus[] = ["received", "washing", "drying", "folding", "ready", "delivered"];

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
    notes: i % 5 === 0 ? "Handle with care — silk." : undefined,
  };
});

export const staff: Staff[] = [
  { id: "stf-1", name: "Maretta Daniel", role: "manager", email: "maretta@sparkle.co", phone: "+1 555-0900", shift: "full", activeOrders: 12, avatarSeed: "Maretta" },
  { id: "stf-2", name: "Jonas Bauer", role: "operator", email: "jonas@sparkle.co", phone: "+1 555-0901", shift: "morning", activeOrders: 6, avatarSeed: "Jonas" },
  { id: "stf-3", name: "Amina Hassan", role: "operator", email: "amina@sparkle.co", phone: "+1 555-0902", shift: "morning", activeOrders: 8, avatarSeed: "Amina" },
  { id: "stf-4", name: "Theo Romano", role: "operator", email: "theo@sparkle.co", phone: "+1 555-0903", shift: "evening", activeOrders: 5, avatarSeed: "Theo" },
  { id: "stf-5", name: "Leo Silva", role: "driver", email: "leo@sparkle.co", phone: "+1 555-0904", shift: "morning", activeOrders: 4, avatarSeed: "Leo" },
  { id: "stf-6", name: "Iris Park", role: "driver", email: "iris@sparkle.co", phone: "+1 555-0905", shift: "evening", activeOrders: 3, avatarSeed: "Iris" },
  { id: "stf-7", name: "Yusuf Adeyemi", role: "cashier", email: "yusuf@sparkle.co", phone: "+1 555-0906", shift: "full", activeOrders: 0, avatarSeed: "Yusuf" },
  { id: "stf-8", name: "Nora Klein", role: "cashier", email: "nora@sparkle.co", phone: "+1 555-0907", shift: "evening", activeOrders: 0, avatarSeed: "Nora" },
];

export const inventory: InventoryItem[] = [
  { id: "inv-1", name: "Eco Detergent (5L)", category: "detergent", stock: 24, unit: "bottle", reorderAt: 10, unitCost: 18 },
  { id: "inv-2", name: "Wool Wash", category: "detergent", stock: 8, unit: "bottle", reorderAt: 6, unitCost: 14 },
  { id: "inv-3", name: "Lavender Softener", category: "softener", stock: 15, unit: "bottle", reorderAt: 8, unitCost: 9 },
  { id: "inv-4", name: "Hangers (pk 50)", category: "supplies", stock: 6, unit: "pack", reorderAt: 5, unitCost: 12 },
  { id: "inv-5", name: "Garment Bags", category: "packaging", stock: 320, unit: "bag", reorderAt: 100, unitCost: 0.25 },
  { id: "inv-6", name: "Stain Remover", category: "detergent", stock: 4, unit: "bottle", reorderAt: 6, unitCost: 7 },
  { id: "inv-7", name: "Receipt Paper", category: "supplies", stock: 22, unit: "roll", reorderAt: 10, unitCost: 2 },
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
  { label: "Jan", value: 6400 }, { label: "Feb", value: 5200 }, { label: "Mar", value: 9200 },
  { label: "Apr", value: 7400 }, { label: "May", value: 8100 }, { label: "Jun", value: 10400 },
];
export const revenueByWeek: RevenuePoint[] = [
  { label: "Mon", value: 1200 }, { label: "Tue", value: 1450 }, { label: "Wed", value: 1180 },
  { label: "Thu", value: 1620 }, { label: "Fri", value: 1820 }, { label: "Sat", value: 2100 }, { label: "Sun", value: 980 },
];
export const revenueByDay: RevenuePoint[] = [
  { label: "8a", value: 120 }, { label: "10a", value: 240 }, { label: "12p", value: 380 },
  { label: "2p", value: 290 }, { label: "4p", value: 410 }, { label: "6p", value: 510 }, { label: "8p", value: 230 },
];
export const revenueByYear: RevenuePoint[] = [
  { label: "2021", value: 62000 }, { label: "2022", value: 74000 },
  { label: "2023", value: 95000 }, { label: "2024", value: 128000 }, { label: "2025", value: 147000 },
];

export const tenants: Tenant[] = [
  { id: "t-1", name: "Sparkle Wash", plan: "scale", status: "active", city: "Brooklyn, NY", ownerName: "Maretta Daniel", ownerEmail: "maretta@sparkle.co", createdAt: "2024-02-12", monthlyOrders: 412, monthlyRevenue: 23902,
    brand: { logoInitial: "SW", accent: "#2563eb", accentForeground: "#ffffff", customerAppName: "Sparkle", tagline: "Brooklyn's everyday clean", subdomain: "sparkle" } },
  { id: "t-2", name: "Foam & Fold", plan: "growth", status: "active", city: "Austin, TX", ownerName: "Carlos Vega", ownerEmail: "carlos@foamfold.com", createdAt: "2024-05-04", monthlyOrders: 268, monthlyRevenue: 14820,
    brand: { logoInitial: "FF", accent: "#16a34a", accentForeground: "#ffffff", customerAppName: "Foam", tagline: "Austin wash & fold", subdomain: "foamfold" } },
  { id: "t-3", name: "Tide Cleaners", plan: "growth", status: "active", city: "Seattle, WA", ownerName: "Hana Ito", ownerEmail: "hana@tide.io", createdAt: "2024-07-19", monthlyOrders: 198, monthlyRevenue: 11200,
    brand: { logoInitial: "TC", accent: "#0891b2", accentForeground: "#ffffff", customerAppName: "Tide", tagline: "Pacific Northwest care", subdomain: "tide" } },
  { id: "t-4", name: "Bubble Bros", plan: "starter", status: "trial", city: "Denver, CO", ownerName: "Marcus Reed", ownerEmail: "m.reed@bubblebros.co", createdAt: "2025-04-22", monthlyOrders: 42, monthlyRevenue: 1980,
    brand: { logoInitial: "BB", accent: "#9333ea", accentForeground: "#ffffff", customerAppName: "Bubble", tagline: "Mile-high laundry", subdomain: "bubblebros" } },
  { id: "t-5", name: "Pristine Linens", plan: "scale", status: "active", city: "Chicago, IL", ownerName: "Sofia Russo", ownerEmail: "sofia@pristine.com", createdAt: "2023-11-08", monthlyOrders: 521, monthlyRevenue: 31400,
    brand: { logoInitial: "PL", accent: "#0d0d0d", accentForeground: "#ffffff", customerAppName: "Pristine", tagline: "Hotel-grade linen service", subdomain: "pristine" } },
  { id: "t-6", name: "Crisp Co.", plan: "starter", status: "suspended", city: "Miami, FL", ownerName: "Diego Ortiz", ownerEmail: "diego@crisp.fl", createdAt: "2024-01-30", monthlyOrders: 0, monthlyRevenue: 0,
    brand: { logoInitial: "CC", accent: "#dc2626", accentForeground: "#ffffff", customerAppName: "Crisp", tagline: "Miami press & fold", subdomain: "crisp" } },
  { id: "t-7", name: "Linen Lab", plan: "growth", status: "active", city: "Portland, OR", ownerName: "Avery Quinn", ownerEmail: "avery@linenlab.co", createdAt: "2024-09-14", monthlyOrders: 184, monthlyRevenue: 9600,
    brand: { logoInitial: "LL", accent: "#d97706", accentForeground: "#ffffff", customerAppName: "Linen", tagline: "Portland fabric care", subdomain: "linenlab" } },
];

export const currentTenant = tenants[0];
export const currentCustomer = customers[1];

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
export function formatMoney2(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
