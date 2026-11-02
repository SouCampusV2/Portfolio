/**
 * Isometric blocks, the "builder" motif. `heights[x][y]` = how many blocks are
 * stacked on that cell. `wire` draws outlines only, like a drawing.
 */
export function IsoBlocks({
  heights,
  size = 44,
  wire,
  drop,
  className = "",
}: {
  heights: number[][];
  size?: number;
  wire?: boolean;
  /** Blocks fall into place one by one. */
  drop?: boolean;
  className?: string;
}) {
  const w = size * 0.866;
  const h = size * 0.5;
  const pt = (x: number, y: number, z: number) => [(x - y) * w, (x + y) * h - z * size] as const;
  const poly = (pts: (readonly [number, number])[]) => pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");

  const cubes: { x: number; y: number; z: number }[] = [];
  heights.forEach((row, x) => row.forEach((n, y) => { for (let z = 0; z < n; z++) cubes.push({ x, y, z }); }));
  cubes.sort((a, b) => a.x + a.y - (b.x + b.y) || a.z - b.z);

  const nx = heights.length;
  const ny = Math.max(...heights.map((r) => r.length));
  const nz = Math.max(...heights.flat());
  const minX = -ny * w;
  const minY = -nz * size;
  const width = (nx + ny) * w;
  const height = (nx + ny) * h + nz * size;

  const faces = wire
    ? ["none", "none", "none"]
    : [
        "color-mix(in oklab, var(--block) 55%, white)",
        "var(--block)",
        "color-mix(in oklab, var(--block) 72%, black)",
      ];
  const stroke = wire ? "var(--block)" : "color-mix(in oklab, var(--block) 45%, black)";

  return (
    <svg
      aria-hidden="true"
      viewBox={`${minX - 2} ${minY - 2} ${width + 4} ${height + 4}`}
      className={className}
      style={{ ["--block" as string]: "var(--accent)" }}
    >
      {cubes.map(({ x, y, z }, i) => (
        <g
          key={`${x}-${y}-${z}`}
          className={drop ? "block-fall" : undefined}
          style={drop ? { animationDelay: `${i * 45}ms` } : undefined}
          stroke={stroke}
          strokeWidth={wire ? 1 : 0.75}
          strokeLinejoin="round"
        >
          <polygon fill={faces[0]} points={poly([pt(x, y, z + 1), pt(x + 1, y, z + 1), pt(x + 1, y + 1, z + 1), pt(x, y + 1, z + 1)])} />
          <polygon fill={faces[1]} points={poly([pt(x, y + 1, z + 1), pt(x + 1, y + 1, z + 1), pt(x + 1, y + 1, z), pt(x, y + 1, z)])} />
          <polygon fill={faces[2]} points={poly([pt(x + 1, y, z + 1), pt(x + 1, y + 1, z + 1), pt(x + 1, y + 1, z), pt(x + 1, y, z)])} />
        </g>
      ))}
    </svg>
  );
}

/** The default build: a small stepped structure. */
export const build = [
  [4, 3, 1, 1],
  [3, 2, 2, 0],
  [1, 2, 1, 1],
  [1, 0, 1, 0],
];
