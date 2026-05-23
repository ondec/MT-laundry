import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, type LucideIcon } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { AppShell, type NavItem } from "@/components/app-shell";
import { useTenantBrand } from "@/lib/tenant-brand";
import { cn } from "@/lib/utils";

interface MobileAppShellProps {
  nav: NavItem[];
  userName: string;
  userRole: string;
  promo?: {
    title: string;
    body: string;
    cta: string;
    href: string;
  };
}

export function MobileAppShell({ nav, userName, userRole, promo }: MobileAppShellProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { tenant } = useTenantBrand();

  return (
    <>
      {/* Desktop / tablet — reuse the standard shell */}
      <div className="hidden md:block">
        <AppShell
          brand={{
            name: tenant.brand.customerAppName,
            tagline: "Customer app",
            logoInitial: tenant.brand.logoInitial,
          }}
          nav={nav}
          userName={userName}
          userRole={userRole}
          searchPlaceholder="Search your orders…"
          showDateRange={false}
          promo={promo}
        />
      </div>

      {/* Mobile — native-app-like shell */}
      <div className="md:hidden min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border px-4 pt-[max(env(safe-area-inset-top),0.5rem)] pb-2.5 flex items-center gap-3">
          <div
            className="size-9 rounded-xl grid place-items-center font-display font-semibold text-sm shrink-0"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            {tenant.brand.logoInitial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-base font-semibold tracking-tight truncate leading-tight">
              {tenant.brand.customerAppName}
            </div>
            <div className="text-[11px] text-muted-foreground truncate leading-tight">Hi, {userName.split(" ")[0]}</div>
          </div>
          <button className="size-9 rounded-full border border-border grid place-items-center hover:bg-muted shrink-0">
            <Bell className="size-4" />
          </button>
          <Avatar seed={userName} size={36} />
        </header>

        <main className="flex-1 min-w-0 px-4 pt-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
          <Outlet />
        </main>

        {/* Floating pill nav */}
        <nav
          className="fixed inset-x-0 z-40 flex justify-center pointer-events-none px-4"
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
        >
          <ul className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-ink text-ink-foreground/70 px-2 py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.45)] backdrop-blur-md">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.to
                : pathname === item.to || pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-label={item.label}
                    className={cn(
                      "grid place-items-center size-11 rounded-full transition-all",
                      active
                        ? "bg-background text-foreground shadow-sm scale-105"
                        : "text-ink-foreground/60 hover:text-ink-foreground",
                    )}
                  >
                    <Icon className="size-[18px]" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
