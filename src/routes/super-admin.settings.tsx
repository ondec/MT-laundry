import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/super-admin/settings")({
  head: () => ({ meta: [{ title: "Settings · MT Laundry HQ" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-5">
      <PageHeader title="Platform settings" subtitle="Global configuration for the MT Laundry platform." />
      <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
        <Row label="Platform name" value="MT Laundry" />
        <Row label="Default trial" value="14 days" />
        <Row label="Support email" value="support@mtlaundry.io" />
        <Row label="Region" value="North America" />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
