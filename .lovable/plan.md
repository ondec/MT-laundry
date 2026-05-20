
# Multi-Tenant Laundry Management System — Frontend Plan

Build a frontend-only prototype with four portals, mock data, and a hybrid visual style: mono/minimal base (Skillset) with a single bold blue accent (Fingoals).

## 1. Design System

- **Palette:** off-white background `#fcfbf8`, near-black text `#0d0d0d`, neutral gray surfaces, single electric blue accent `#2563eb` for CTAs, active nav, charts, status pills.
- **Typography:** Space Grotesk (display/headings) + Inter (body).
- **Surfaces:** soft rounded cards (`rounded-2xl`), thin borders, generous whitespace, dashed/textured bars in charts (Skillset feel).
- **Components:** sidebar with rounded "Upgrade" promo card, top bar with search + date range + avatar, KPI cards with delta arrows, segmented period switcher (Day/Week/Month/Year).
- All tokens defined in `src/styles.css` (oklch) — no hardcoded colors in components.

## 2. Portals & Routes

Each portal is a layout route with its own sidebar and protected child routes. A landing `/` lets you pick a portal (demo switcher — no real auth).

```text
/                              landing / portal switcher
/super-admin                   layout (sidebar)
  /super-admin                 overview (MRR, tenants, churn)
  /super-admin/tenants         tenant list + detail
  /super-admin/plans           subscription plans
  /super-admin/billing         platform billing
  /super-admin/settings

/admin                         tenant admin layout
  /admin                       dashboard (revenue, orders, customers KPIs)
  /admin/orders                orders table + detail drawer
  /admin/customers             customers + loyalty
  /admin/services              service catalog & pricing
  /admin/inventory             detergents/supplies stock
  /admin/staff                 staff list + roles
  /admin/finance               revenue/expenses/invoices
  /admin/reports               analytics
  /admin/settings

/staff                         operator layout
  /staff                       today's queue (kanban: Received → Wash → Dry → Fold → Ready → Delivered)
  /staff/pickups               pickup/delivery routes
  /staff/orders/$orderId       ticket detail (update status, add notes)
  /staff/customers             quick lookup

/app                           customer portal layout
  /app                         home (active orders, quick reorder)
  /app/new-order               place order wizard (services → items → pickup slot)
  /app/orders                  history
  /app/orders/$orderId         tracking timeline + invoice
  /app/loyalty                 points & rewards
  /app/profile                 addresses, payment methods (mock)
```

## 3. Modules per Portal

**Super Admin:** tenants table, plan/feature matrix, platform KPIs (MRR, active tenants, total orders, growth chart), recent signups.

**Tenant Admin dashboard mirrors reference images:**
- Top: 4 KPI cards (Total Revenue, Active Orders, New Customers, Total Staff) with % delta.
- Mid-left: Revenue bar chart with period switcher.
- Mid-right: Calendar widget + "Operational efficiency" radial gauge.
- Bottom: Recent Orders table (Order #, Customer, Service, Items, Amount, Status pill).

**Staff:** kanban board for the day, route list for pickups/deliveries, ticket detail.

**Customer:** order placement wizard, live status timeline, loyalty progress ring, invoices.

## 4. Mock Data Layer

- `src/mocks/` with typed fixtures: `tenants.ts`, `customers.ts`, `orders.ts`, `services.ts`, `staff.ts`, `inventory.ts`, `invoices.ts`, `metrics.ts`.
- Shared types in `src/types/`.
- Thin hooks (`useOrders`, `useTenants`, …) wrapping fixtures so swapping to a real backend later is mechanical. No persistence this iteration.
- One demo tenant ("Sparkle Wash") seeded with ~30 orders, 20 customers, 6 services, 8 staff.

## 5. Shared UI

- `AppShell` (sidebar + header) reused across the 4 portals with portal-specific nav items and brand mark.
- `KpiCard`, `StatusPill`, `PeriodSwitcher`, `DataTable` (sortable, paginated), `OrderTimeline`, `KanbanBoard`, `EmptyState`, `PageHeader`.
- Charts via Recharts (already aligned with the design tokens) — bar, line, radial.

## 6. Build Order

1. Tokens + typography + base components (`KpiCard`, `StatusPill`, `AppShell`).
2. Landing portal switcher.
3. Tenant Admin (full dashboard + Orders + Customers) — the showcase surface.
4. Staff portal (kanban + ticket detail).
5. Customer portal (home + new-order wizard + tracking).
6. Super Admin (tenants + plans + overview).
7. Polish pass: empty states, loading skeletons, responsive checks.

## Technical Details

- TanStack Start file-based routing under `src/routes/`; one layout file per portal (e.g. `src/routes/admin.tsx` with `<Outlet />`, children as `admin.orders.tsx` etc.).
- Each route sets its own `head()` meta.
- shadcn sidebar with `collapsible="icon"`, active route via `useRouterState`.
- All color/spacing tokens in `src/styles.css`; no hex literals in components.
- No backend, no auth — portal switch is a simple link from `/`.
- Desktop-first layouts (dashboards), responsive down to tablet; customer portal fully mobile-friendly.
