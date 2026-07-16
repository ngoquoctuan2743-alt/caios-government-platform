import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { DotMatrixPattern } from "../patterns/DotMatrixPattern";
import type { VdgAssetProps } from "../shared/types";

/** Search surfaces: dot field plus a single soft concentric "radar ring" motif suggesting a query radiating outward, without drawing a literal magnifying glass (that's the Search icon's job). */
export function SearchBackground({
  primaryColor = "var(--vdg-color-primary)",
  opacity = 1,
  animated = false,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <svg width="1200" height="700">
        <DotMatrixPattern id={`${gid}-dots`} primaryColor={primaryColor} opacity={0.035} size={28} />
      </svg>
      <g transform="translate(600 350)">
        {[80, 140, 200].map((r, i) => (
          <circle key={r} r={r} fill="none" stroke={primaryColor} strokeWidth={1} opacity={0.06}>
            {animated && <animate attributeName="r" values={`${r};${r + 20};${r}`} dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />}
          </circle>
        ))}
      </g>
    </BackgroundFrame>
  );
}
