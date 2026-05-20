import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Building2, LayoutDashboard, Package, ShoppingBag, Sparkles, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { customers, orders } from "@/mocks/data";
import { useTenantBrand } from "@/lib/tenant-brand";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { tenant } = useTenantBrand();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const recentOrders = useMemo(() => orders.slice(0, 8), []);
  const topCustomers = useMemo(() => customers.slice(0, 6), []);

  const go = (to: string) => {
    setOpen(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search orders, customers, branches…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>

        <CommandGroup heading="Jump to">
          <CommandItem onSelect={() => go("/admin")}><LayoutDashboard className="size-4" /> Dashboard</CommandItem>
          <CommandItem onSelect={() => go("/admin/orders")}><ShoppingBag className="size-4" /> Orders</CommandItem>
          <CommandItem onSelect={() => go("/admin/customers")}><User className="size-4" /> Customers</CommandItem>
          <CommandItem onSelect={() => go("/admin/services")}><Sparkles className="size-4" /> Services</CommandItem>
          <CommandItem onSelect={() => go("/admin/branches")}><Building2 className="size-4" /> Branches</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Branches">
          {tenant.branches.map((b) => (
            <CommandItem key={b.id} value={`branch ${b.name}`} onSelect={() => go("/admin/branches")}>
              <Building2 className="size-4" />
              <span>{b.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{b.hours}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent orders">
          {recentOrders.map((o) => (
            <CommandItem
              key={o.id}
              value={`${o.code} ${o.customerName}`}
              onSelect={() => go("/admin/orders")}
            >
              <Package className="size-4" />
              <span>{o.code}</span>
              <span className="text-xs text-muted-foreground">· {o.customerName}</span>
              <span className="ml-auto text-xs capitalize text-muted-foreground">{o.status}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Customers">
          {topCustomers.map((c) => (
            <CommandItem key={c.id} value={`customer ${c.name}`} onSelect={() => go("/admin/customers")}>
              <User className="size-4" />
              <span>{c.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{c.tier}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
