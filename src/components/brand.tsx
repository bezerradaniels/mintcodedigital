/** The four leaf blades of the Mintcode symbol, in a 100×100 box. */
export const LEAF_PATHS = [
  "M0 100A100 100 0 0 1 21.25 38.37V97.72A100 100 0 0 1 0 100Z",
  "M26.25 32.47A100 100 0 0 1 47.5 14.89V88A100 100 0 0 1 26.25 96.49Z",
  "M52.5 12A100 100 0 0 1 73.75 3.51V67.53A100 100 0 0 1 52.5 85.11Z",
  "M78.75 2.28A100 100 0 0 1 100 0A100 100 0 0 1 78.75 61.63Z",
] as const;

/** Negative (on-dark) leaf colors, left to right. */
export const LEAF_COLORS_NEGATIVE = ["#2890c4", "#00adb8", "#00c89d", "#7ed957"] as const;
/** Positive (on-light) leaf colors, left to right. */
export const LEAF_COLORS_POSITIVE = ["#0c4a6e", "#007a85", "#00ad8a", "#7ed957"] as const;

export function MintcodeSymbol({
  colors = LEAF_COLORS_NEGATIVE,
}: {
  colors?: readonly string[];
}) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {LEAF_PATHS.map((d, i) => (
        <path key={d} fill={colors[i]} d={d} />
      ))}
    </svg>
  );
}

/** Hidden SVG holding the leaf-shaped clip path used by `.mc-leaf`. */
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
