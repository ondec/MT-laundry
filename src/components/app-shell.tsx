import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, Calendar, Menu, Search, type LucideIcon } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTenantBrand } from "@/lib/tenant-brand";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

interface AppShellProps {
  /** Optional override; if omitted, uses the active tenant brand. */
  brand?: { name: string; tagline?: string; logoInitial?: string };
  nav: NavItem[];
  userName: string;
  userRole: string;
  promo?: {
    title: string;
    body: string;
    cta: string;
    href: string;
  };
  searchPlaceholder?: string;
  showDateRange?: boolean;
  /** Show the tenant switcher in the topbar (handy for the demo). */
  showTenantSwitcher?: boolean;
  topBar?: React.ReactNode;
}

export function AppShell({
  brand,
  nav,
  userName,
  userRole,
  promo,
  searchPlaceholder = "Search…",
  showDateRange = true,
  showTenantSwitcher = true,
  topBar,
}: AppShellProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { tenant } = useTenantBrand();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const brandName = brand?.name ?? tenant.name;
  const brandTagline = brand?.tagline ?? tenant.brand.tagline;
  const brandInitial = brand?.logoInitial ?? tenant.brand.logoInitial;

  const navList = (
    <nav className="flex flex-col gap-0.5">
      {nav.map((item) => {
        const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
              active
                ? "bg-ink text-ink-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const brandBlock = (
    <Link to="/" className="px-1 mb-7 mt-1 flex items-center gap-2.5">
      <div
        className="size-9 rounded-xl grid place-items-center font-display font-semibold text-sm"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        {brandInitial}
      </div>
      <div className="min-w-0">
        <div className="font-display text-base font-semibold tracking-tight truncate">{brandName}</div>
        {brandTagline && <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{brandTagline}</div>}
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background p-3 lg:p-4 flex gap-4">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col rounded-2xl bg-card border border-border p-4">
        {brandBlock}
        {navList}
        <div className="mt-auto">
          {promo && (
            <div className="rounded-2xl bg-ink text-ink-foreground p-4 mt-4">
              <div className="font-display font-semibold text-sm">{promo.title}</div>
              <p className="text-xs text-ink-foreground/70 mt-1 leading-relaxed">{promo.body}</p>
              <Link
                to={promo.href}
                className="mt-3 inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:opacity-90"
              >
                {promo.cta}
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
        {/* Top bar */}
        <header className="rounded-2xl bg-card border border-border px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
          {/* Mobile hamburger + brand */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden size-9 rounded-full border border-border grid place-items-center hover:bg-muted shrink-0" aria-label="Open menu">
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4 flex flex-col">
              <SheetHeader className="p-0 mb-4 text-left">
                <SheetTitle className="flex items-center gap-2.5">
                  <div
                    className="size-9 rounded-xl grid place-items-center font-display font-semibold text-sm"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    {brandInitial}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-base font-semibold tracking-tight truncate">{brandName}</div>
                    {brandTagline && <div className="text-[11px] text-muted-foreground font-normal mt-0.5 truncate">{brandTagline}</div>}
                  </div>
                </SheetTitle>
              </SheetHeader>
              {navList}
            </SheetContent>
          </Sheet>

          <div className="md:hidden flex items-center gap-2 min-w-0 flex-1">
            <div className="font-display text-sm font-semibold tracking-tight truncate">{brandName}</div>
          </div>

          <div className="hidden md:flex flex-1 items-center gap-3 min-w-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full bg-muted rounded-full pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">{topBar}</div>
            {showDateRange && (
              <button className="hidden lg:inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                <Calendar className="size-3.5" />
                1 Sep – 30 Sep 2025
              </button>
            )}
            <button className="size-9 rounded-full border border-border grid place-items-center hover:bg-muted">
              <Bell className="size-4" />
            </button>
            <div className="flex items-center gap-2 pl-1 sm:pl-2">
              <Avatar seed={userName} size={36} />
              <div className="hidden lg:block">
                <div className="text-sm font-medium leading-tight">{userName}</div>
                <div className="text-xs text-muted-foreground leading-tight">{userRole}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

