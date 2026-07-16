import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import type { VdgAssetProps } from "../shared/types";

/** Warning: soft glow + a rounded triangle outline, defaulting to the warning token. */
export function WarningBackground({
  primaryColor = "var(--vdg-color-warning)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 600 400" opacity={opacity} className={className}>
      <defs>
        <radialGradient id={`vdg-warning-glow-${gid}`} cx="50%" cy="45%" r="38%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.1} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#vdg-warning-glow-${gid})`} />
      <path
        d="M 300 130 L 360 230 Q 364 238 355 238 L 245 238 Q 236 238 240 230 Z"
        fill="none"
        stroke={primaryColor}
        strokeWidth={2.5}
        strokeLinejoin="round"
        opacity={0.18}
      />
      <line x1="300" y1="168" x2="300" y2="198" stroke={primaryColor} strokeWidth={3} strokeLinecap="round" opacity={0.2} />
      <circle cx="300" cy="216" r="2.5" fill={primaryColor} opacity={0.2} />
    </BackgroundFrame>
  );
}
