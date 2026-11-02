/** The four blades of the Mintcode symbol, in a 100×100 box. */
export const LEAF_PATHS = [
  "M0 100A100 100 0 0 1 21.25 38.37V97.72A100 100 0 0 1 0 100Z",
  "M26.25 32.47A100 100 0 0 1 47.5 14.89V88A100 100 0 0 1 26.25 96.49Z",
  "M52.5 12A100 100 0 0 1 73.75 3.51V67.53A100 100 0 0 1 52.5 85.11Z",
  "M78.75 2.28A100 100 0 0 1 100 0A100 100 0 0 1 78.75 61.63Z",
] as const;

/** LATAM palette. */
export const COLORS = {
  buganvilla: "#F2457F",
  mango: "#FFB21E",
  turquesa: "#00ADB8",
  jacaranda: "#6B4CE6",
  menta: "#7ED957",
  carbon: "#1C1C1C",
  oceano: "#0C4A6E",
  arena: "#FFF4E4",
} as const;

/** Symbol colors, "Fiesta" version (left to right). */
export const FIESTA = [COLORS.buganvilla, COLORS.mango, COLORS.turquesa, COLORS.menta] as const;

export function MintcodeSymbol({ colors = FIESTA }: { colors?: readonly string[] }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {LEAF_PATHS.map((d, i) => (
        <path key={d} fill={colors[i]} d={d} />
      ))}
    </svg>
  );
}

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "mc-logo mc-logo--sm" : "mc-logo"}>
      <MintcodeSymbol />
      <span>Mintcode</span>
    </span>
  );
}

/** Hidden SVG holding the symbol-shaped clip path used by `.mc-leaf`. */
export function LeafClipDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <clipPath id="mc-leaf" clipPathUnits="objectBoundingBox">
          {LEAF_PATHS.map((d) => (
            <path key={d} transform="scale(.01)" d={d} />
          ))}
        </clipPath>
      </defs>
    </svg>
  );
}

/** "Sol" graphic: concentric circles centred on the bottom-right corner. */
export function Sol({ radii, colors }: { radii: number[]; colors: readonly string[] }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      {radii.map((r, i) => (
        <circle key={r} cx="100" cy="100" r={r} fill={colors[i]} />
      ))}
    </svg>
  );
}
