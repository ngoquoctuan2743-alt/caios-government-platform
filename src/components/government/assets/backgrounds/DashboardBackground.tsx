import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { GridPattern } from "../patterns/GridPattern";
import type { VdgAssetProps } from "../shared/types";

/** Dense, data-appropriate: full-bleed grid + a single quiet gradient wash in the top corner so it never competes with real dashboard content. */
export function DashboardBackground({
  primaryColor = "var(--vdg-color-primary)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <defs>
        <linearGradient id={`vdg-dash-wash-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.06} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <svg width="1200" height="700">
        <GridPattern id={`${gid}-grid`} primaryColor={primaryColor} opacity={0.035} size={40} />
      </svg>
      <rect width="1200" height="260" fill={`url(#vdg-dash-wash-${gid})`} />
    </BackgroundFrame>
  );
}
