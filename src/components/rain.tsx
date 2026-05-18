function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function Rain({ count = 70 }: { count?: number }) {
  const drops = Array.from({ length: count }).map((_, i) => {
    const left = seeded(i + 1) * 100;
    const duration = 0.7 + seeded(i + 2) * 0.8;
    const delay = -seeded(i + 3) * 2;
    const height = 14 + seeded(i + 4) * 22;
    const opacity = 0.25 + seeded(i + 5) * 0.55;
    return (
      <span
        key={i}
        style={{
          left: `${left}%`,
          animationDuration: `${duration.toFixed(3)}s`,
          animationDelay: `${delay.toFixed(3)}s`,
          height: `${height.toFixed(1)}px`,
          opacity,
        }}
      />
    );
  });
  return (
    <div className="rain" aria-hidden="true">
      {drops}
    </div>
  );
}
