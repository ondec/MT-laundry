import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Globe, Paintbrush } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useTenantBrand } from "@/lib/tenant-brand";

export const Route = createFileRoute("/admin/branding")({
  head: () => ({ meta: [{ title: "Branding · Tenant Admin" }] }),
  component: BrandingPage,
});

const presetAccents = [
  "#2563eb", "#16a34a", "#0891b2", "#9333ea",
  "#dc2626", "#d97706", "#db2777", "#0d0d0d",
];

function BrandingPage() {
  const { tenant } = useTenantBrand();
  const [accent, setAccent] = useState(tenant.brand.accent);
  const [appName, setAppName] = useState(tenant.brand.customerAppName);
  const [tagline, setTagline] = useState(tenant.brand.tagline);
  const [initial, setInitial] = useState(tenant.brand.logoInitial);

  // Live-apply accent locally on this page for preview.
  const previewStyle = {
    ["--primary" as string]: accent,
    ["--ring" as string]: accent,
  } as React.CSSProperties;

  return (
    <div className="space-y-5" style={previewStyle}>
      <PageHeader
        title="Branding"
        subtitle="Make every screen — admin, staff and customer app — feel like your laundromat."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card title="Identity" icon={<Paintbrush className="size-4" />}>
            <Field label="Display name">
              <input
                className="input"
                value={tenant.name}
                disabled
                title="Change in Settings"
              />
            </Field>
            <Field label="Customer app name" hint="Shown in the consumer app sidebar.">
              <input
                className="input"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </Field>
            <Field label="Tagline">
              <input
                className="input"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </Field>
            <Field label="Logo monogram" hint="1–2 letters used inside the logo tile.">
              <input
                className="input w-24"
                maxLength={2}
                value={initial}
                onChange={(e) => setInitial(e.target.value.toUpperCase())}
              />
            </Field>
          </Card>

          <Card title="Accent color" icon={<Paintbrush className="size-4" />}>
            <p className="text-xs text-muted-foreground -mt-1 mb-1">
              The accent drives buttons, focus rings, status highlights and chart bars across the workspace.
            </p>
            <div className="flex flex-wrap gap-2">
              {presetAccents.map((c) => (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className="size-9 rounded-xl border border-border grid place-items-center hover:scale-105 transition"
                  style={{ background: c }}
                  title={c}
                >
                  {accent === c && <Check className="size-4 text-white" />}
                </button>
              ))}
              <label className="size-9 rounded-xl border border-dashed border-border grid place-items-center cursor-pointer hover:bg-muted">
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="opacity-0 absolute size-0"
                />
                <span className="text-[10px] text-muted-foreground">Custom</span>
              </label>
            </div>
            <div className="mt-3 text-xs text-muted-foreground font-mono">{accent}</div>
          </Card>

          <Card title="Domain" icon={<Globe className="size-4" />}>
            <Field label="Subdomain">
              <div className="flex items-center gap-2">
                <input className="input" value={tenant.brand.subdomain} disabled />
                <span className="text-sm text-muted-foreground">.sudsly.app</span>
              </div>
            </Field>
            <Field label="Custom domain" hint="Available on the Scale plan.">
              <input className="input" placeholder="e.g. orders.sparklewash.com" />
            </Field>
          </Card>

          <div className="flex items-center gap-2">
            <button className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
              Save branding
            </button>
            <button className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
              Reset
            </button>
            <span className="text-xs text-muted-foreground ml-1">Preview only — mock data.</span>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Sidebar preview
            </div>
            <div className="rounded-xl border border-border p-3 flex items-center gap-2.5">
              <div
                className="size-9 rounded-xl grid place-items-center font-display font-semibold text-sm"
                style={{ background: accent, color: "#fff" }}
              >
                {initial || "·"}
              </div>
              <div className="min-w-0">
                <div className="font-display text-base font-semibold tracking-tight truncate">
                  {tenant.name}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">{tagline}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Buttons
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="rounded-full px-4 py-2 text-sm font-medium"
                style={{ background: accent, color: "#fff" }}
              >
                Primary action
              </button>
              <button className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
                Secondary
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
              Customer app
            </div>
            <div className="rounded-xl border border-border p-4">
              <div className="text-xs text-muted-foreground">App name</div>
              <div className="font-display text-lg font-semibold">{appName || tenant.name}</div>
              <div
                className="mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{ background: accent + "22", color: accent }}
              >
                Silver member
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: var(--muted);
          border: 1px solid transparent;
          border-radius: 0.625rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus { border-color: var(--primary); background: var(--card); }
        .input:disabled { color: var(--muted-foreground); }
      `}</style>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
      <h3 className="font-display font-semibold flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-muted-foreground mb-1">{label}</div>
      {children}
      {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
    </label>
  );
}
