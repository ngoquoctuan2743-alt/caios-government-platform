import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { LotusPattern } from "../patterns/LotusPattern";
import type { VdgAssetProps } from "../shared/types";

/** Warm, approachable surface for the Citizen Portal: lotus watermark + a single soft corner glow. */
export function CitizenPortalBackground({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-gold)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <defs>
        <radialGradient id={`vdg-citizen-glow-${gid}`} cx="85%" cy="80%" r="50%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.1} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="1200" height="700" fill={`url(#vdg-citizen-glow-${gid})`} />
      <svg width="1200" height="700">
        <LotusPattern id={`${gid}-lotus`} primaryColor={primaryColor} opacity={0.03} size={110} />
      </svg>
    </BackgroundFrame>
  );
}
