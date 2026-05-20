/** Tiny SVG sparkline — no external dep, deterministic, brand-colored. */
export function Sparkline({ values, height = 28, width = 100, stroke = "var(--primary)" }: {
  values: number[];
  height?: number;
  width?: number;
  stroke?: string;
}) {
  if (values.length === 0) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1 || 1);
  const points = values
    .map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`)
    .join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(values.length - 1) * step} cy={height - ((values[values.length - 1] - min) / range) * (height - 4) - 2} r={2.5} fill={stroke} />
    </svg>
  );
}
