function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function forestLine(
  width: number,
  baseY: number,
  segments: number,
  minHeight: number,
  maxHeight: number,
  seed: number
) {
  const seg = width / segments;
  let d = `M 0 ${baseY} `;
  for (let i = 0; i < segments; i++) {
    const x0 = i * seg;
    const x1 = (i + 0.5) * seg + (seeded(seed + i * 3) - 0.5) * seg * 0.3;
    const x2 = (i + 1) * seg;
    const h = minHeight + seeded(seed + i) * (maxHeight - minHeight);
    d += `L ${x0.toFixed(1)} ${baseY} L ${x1.toFixed(1)} ${(baseY - h).toFixed(1)} L ${x2.toFixed(1)} ${baseY} `;
  }
  d += `L ${width} ${baseY + 60} L 0 ${baseY + 60} Z`;
  return d;
}

export function ForestSilhouette({ className }: { className?: string }) {
  const W = 1600;
  const H = 260;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={forestLine(W, H - 30, 60, 30, 110, 7)}
        fill="var(--tree-back)"
        opacity="0.55"
      />
      <path
        d={forestLine(W, H - 10, 50, 50, 150, 23)}
        fill="var(--tree-mid)"
        opacity="0.85"
      />
      <path
        d={forestLine(W, H + 10, 40, 60, 180, 41)}
        fill="var(--tree-front)"
      />
    </svg>
  );
}
