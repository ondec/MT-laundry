import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ eyebrow, title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left — form */}
      <div className="flex flex-col px-6 sm:px-10 py-8">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="size-8 rounded-xl bg-ink text-ink-foreground grid place-items-center">
            <Sparkles className="size-4" />
          </div>
          <div className="font-display text-base font-semibold tracking-tight">MT Laundry</div>
        </Link>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-sm mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
              <span className="size-1.5 rounded-full bg-primary" />
              {eyebrow}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl tracking-tight font-semibold leading-[1.05]">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

            <div className="mt-8">{children}</div>

            {footer ? <div className="mt-6 text-sm text-muted-foreground">{footer}</div> : null}
          </div>
        </div>

        <div className="text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
          <span>© MT Laundry</span>
          <Link to="/" className="hover:text-foreground">Back to portals</Link>
        </div>
      </div>

      {/* Right — brand panel */}
      <div className="hidden lg:flex relative bg-ink text-ink-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "32px 32px, 40px 40px",
        }} />
        <div className="relative flex flex-col justify-between p-10 xl:p-14 w-full">
          <div className="flex items-center gap-2 text-xs text-ink-foreground/70">
            <span className="size-1.5 rounded-full bg-success" />
            Operating system for modern laundromats
          </div>
          <div>
            <div className="font-display text-3xl xl:text-4xl tracking-tight leading-[1.1] max-w-md">
              "We replaced four tools, two spreadsheets and one whiteboard with MT Laundry."
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="size-9 rounded-full bg-white/10 grid place-items-center text-sm font-medium">AM</div>
              <div className="text-sm">
                <div className="font-medium">Akosua Mensah</div>
                <div className="text-ink-foreground/60">Owner · Sparkle Wash, Accra</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { k: "12k+", v: "Orders / mo" },
              { k: "98%", v: "On-time" },
              { k: "4.9★", v: "CSAT" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="font-display text-xl font-semibold">{s.k}</div>
                <div className="text-[11px] text-ink-foreground/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
