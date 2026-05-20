import { cn } from "@/lib/utils";

interface AvatarProps {
  seed: string;
  size?: number;
  className?: string;
}

const palette = ["#2563eb", "#0d0d0d", "#22c55e", "#f59e0b", "#a855f7", "#0ea5e9", "#ef4444"];

export function Avatar({ seed, size = 36, className }: AvatarProps) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const bg = palette[h % palette.length];
  const initials = seed
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={cn("inline-flex items-center justify-center rounded-full font-medium text-white shrink-0", className)}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
