import { createFileRoute } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/app/loyalty")({
  head: () => ({ meta: [{ title: "Loyalty · Sparkle" }] }),
  component: Loyalty,
});

const rewards = [
  { points: 100, title: "10% off next order", unlocked: true },
  { points: 250, title: "Free pickup & delivery", unlocked: true },
  { points: 500, title: "Free premium upgrade", unlocked: false },
  { points: 1000, title: "Month of unlimited wash & fold", unlocked: false },
];

function Loyalty() {
  const points = 312;
  const next = rewards.find((r) => !r.unlocked)!;
  const pct = Math.min(100, (points / next.points) * 100);

  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Loyalty" subtitle="Wash more. Earn more. Pay less." />

      <div className="rounded-2xl bg-ink text-ink-foreground p-6">
        <div className="text-xs text-ink-foreground/60 uppercase tracking-wider">Your balance</div>
        <div className="font-display text-5xl font-semibold mt-2">{points} <span className="text-base text-ink-foreground/60 font-normal">pts</span></div>
        <div className="mt-5">
          <div className="flex justify-between text-xs text-ink-foreground/70 mb-2">
            <span>Next reward: {next.title}</span>
            <span>{next.points - points} pts to go</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rewards.map((r) => (
          <div key={r.points} className={`rounded-2xl border p-4 flex items-center gap-3 ${r.unlocked ? "border-primary/40 bg-card" : "border-border bg-card opacity-70"}`}>
            <div className="size-10 rounded-xl bg-muted grid place-items-center"><Gift className="size-5" /></div>
            <div className="flex-1">
              <div className="text-sm font-medium">{r.title}</div>
              <div className="text-xs text-muted-foreground">{r.points} pts</div>
            </div>
            {r.unlocked && <button className="text-xs rounded-full bg-primary text-primary-foreground px-3 py-1.5">Redeem</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
