import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, ShieldCheck, Sparkles, Truck, User } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MT Laundry — Pick a workspace" },
      { name: "description", content: "Four roles, one operating system for laundromats. Step into the experience built for you." },
    ],
  }),
  component: Landing,
});

const portals = [
  {
    to: "/admin",
    label: "Tenant Admin",
    title: "Owner's cockpit",
    desc: "Run the floor. Revenue, orders, staff, inventory, finance — all in one place.",
    icon: Building2,
    dark: true,
  },
  {
    to: "/staff",
    label: "Staff & Operators",
    title: "Today's queue",
    desc: "Move tickets through wash, dry, fold and out the door without losing one.",
    icon: Truck,
    dark: false,
  },
  {
    to: "/app",
    label: "Customer",
    title: "Drop, track, pay",
    desc: "Place an order in 30 seconds. Watch it move. Tap to pay.",
    icon: User,
    dark: false,
  },
  {
    to: "/super-admin",
    label: "Super Admin",
    title: "Platform HQ",
    desc: "Manage tenants, plans and platform-wide growth across every laundromat.",
    icon: ShieldCheck,
    dark: false,
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10 lg:py-16">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-ink text-ink-foreground grid place-items-center">
              <Sparkles className="size-4" />
            </div>
            <div className="font-display text-lg font-semibold tracking-tight">MT Laundry</div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Link to="/login" className="text-muted-foreground hover:text-foreground">Sign in</Link>
            <Link to="/signup" className="inline-flex items-center rounded-full bg-ink text-ink-foreground px-3 py-1.5 hover:bg-ink/90">
              Get started
            </Link>
          </div>
        </header>

        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-5">
            <span className="size-1.5 rounded-full bg-primary" />
            Multi-tenant laundry operating system
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight font-semibold leading-[1.05]">
            One platform.<br />
            <span className="text-muted-foreground">Four very different days.</span>
          </h1>
          <p className="mt-5 text-base text-muted-foreground max-w-xl">
            MT Laundry powers every seat in a modern laundromat — from the owner watching revenue, to the
            operator folding a comforter, to the customer tracking their order from the couch.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.to}
                to={p.to}
                className={`group rounded-2xl border p-6 lg:p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  p.dark
                    ? "bg-ink text-ink-foreground border-ink"
                    : "bg-card border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`size-11 rounded-xl grid place-items-center ${p.dark ? "bg-white/10" : "bg-muted"}`}>
                    <Icon className="size-5" />
                  </div>
                  <ArrowUpRight className={`size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${p.dark ? "text-ink-foreground/70" : "text-muted-foreground"}`} />
                </div>
                <div className={`mt-6 text-xs uppercase tracking-wider ${p.dark ? "text-ink-foreground/60" : "text-muted-foreground"}`}>
                  {p.label}
                </div>
                <div className="mt-1 font-display text-2xl font-semibold tracking-tight">{p.title}</div>
                <p className={`mt-2 text-sm leading-relaxed ${p.dark ? "text-ink-foreground/70" : "text-muted-foreground"}`}>
                  {p.desc}
                </p>
              </Link>
            );
          })}
        </div>

        <footer className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>Frontend prototype · mock data, no backend yet.</div>
          <div>Demo tenant: <span className="text-foreground font-medium">Sparkle Wash · Brooklyn, NY</span></div>
        </footer>
      </div>
    </div>
  );
}
