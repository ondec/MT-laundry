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

        <main className="flex-1 min-w-0 px-4 pt-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
          <Outlet />
        </main>

        <nav
          className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <ul className="grid grid-cols-5">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.to
                : pathname === item.to || pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "grid place-items-center size-9 rounded-full transition-colors",
                        active && "bg-ink text-ink-foreground",
                      )}
                    >
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="truncate max-w-[64px]">{item.label}</span>
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
