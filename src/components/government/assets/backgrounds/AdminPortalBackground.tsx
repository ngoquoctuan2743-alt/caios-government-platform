import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { CircuitPattern } from "../patterns/CircuitPattern";
import type { VdgAssetProps } from "../shared/types";

/** Systems/control-room feel for the Admin console: full-bleed circuit trace texture, no gradient (the busiest console screen shouldn't compete with a glow). */
export function AdminPortalBackground({
  primaryColor = "var(--vdg-color-primary)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <svg width="1200" height="700">
        <CircuitPattern id={`${gid}-circuit`} primaryColor={primaryColor} opacity={0.04} size={72} />
      </svg>
    </BackgroundFrame>
  );
}
