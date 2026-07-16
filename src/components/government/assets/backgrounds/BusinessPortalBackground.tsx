import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { HexagonPattern } from "../patterns/HexagonPattern";
import type { VdgAssetProps } from "../shared/types";

/** Structured, enterprise-leaning surface for the Business Portal: hexagon tessellation + a cool blue corner wash. */
export function BusinessPortalBackground({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-blue)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <defs>
        <linearGradient id={`vdg-biz-wash-${gid}`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.08} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" fill={`url(#vdg-biz-wash-${gid})`} />
      <svg width="1200" height="700">
        <HexagonPattern id={`${gid}-hex`} primaryColor={primaryColor} opacity={0.035} size={56} />
      </svg>
    </BackgroundFrame>
  );
}
