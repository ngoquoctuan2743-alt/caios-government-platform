import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { WavesPattern } from "../patterns/WavesPattern";
import { LotusPattern } from "../patterns/LotusPattern";
import type { VdgAssetProps } from "../shared/types";

/** Large hero surface: soft top-right glow, a faint lotus watermark top-left, waves along the bottom edge. */
export function HeroBackground({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-gold)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <defs>
        <radialGradient id={`vdg-hero-glow-${gid}`} cx="78%" cy="18%" r="55%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.14} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`vdg-hero-glow2-${gid}`} cx="15%" cy="85%" r="45%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.12} />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="1200" height="700" fill={`url(#vdg-hero-glow-${gid})`} />
      <rect width="1200" height="700" fill={`url(#vdg-hero-glow2-${gid})`} />
      {/* Nested <svg> establishes its own viewport, so the pattern components
          (which always render width="100%" height="100%") can be placed at
          a specific region of this background instead of covering it whole. */}
      <svg x="0" y="500" width="1200" height="200">
        <WavesPattern id={`${gid}-waves`} primaryColor={primaryColor} opacity={0.05} size={160} />
      </svg>
      <svg x="0" y="0" width="260" height="260">
        <LotusPattern id={`${gid}-lotus`} primaryColor={secondaryColor} opacity={0.05} size={130} />
      </svg>
    </BackgroundFrame>
  );
}
