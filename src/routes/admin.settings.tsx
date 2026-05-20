import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings · Sparkle Wash" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Settings" subtitle="Workspace, branding, billing and integrations." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Workspace">
          <Field label="Workspace name" value="Sparkle Wash" />
          <Field label="Industry" value="Retail laundromat" />
          <Field label="Timezone" value="America/New_York" />
        </Section>
        <Section title="Owner">
          <Field label="Name" value="Maretta Daniel" />
          <Field label="Email" value="maretta@sparkle.co" />
          <Field label="Phone" value="+1 555-0900" />
        </Section>
        <Section title="Plan">
          <div className="rounded-xl bg-ink text-ink-foreground p-4">
            <div className="text-xs text-ink-foreground/70">Current plan</div>
            <div className="font-display text-2xl font-semibold mt-1">Scale · $149/mo</div>
            <p className="text-xs text-ink-foreground/70 mt-2">Unlimited orders, advanced reports, multi-location, branded customer app.</p>
            <button className="mt-3 inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:opacity-90">
              Manage plan
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
      <h3 className="font-display font-semibold">{title}</h3>
      {children}
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
