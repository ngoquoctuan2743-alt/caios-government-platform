import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import type { VdgAssetProps } from "../shared/types";

/** Success: soft glow + a simple checkmark stroke, defaulting to the success token (still overridable). */
export function SuccessBackground({
  primaryColor = "var(--vdg-color-success)",
  opacity = 1,
  animated = false,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 600 400" opacity={opacity} className={className}>
      <defs>
        <radialGradient id={`vdg-success-glow-${gid}`} cx="50%" cy="45%" r="38%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.1} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#vdg-success-glow-${gid})`} />
      <circle cx="300" cy="180" r="70" fill="none" stroke={primaryColor} strokeWidth={1.5} opacity={0.16} />
      <path
        d="M 270 182 L 292 202 L 334 156"
        fill="none"
        stroke={primaryColor}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.2}
        strokeDasharray={animated ? "90" : undefined}
        strokeDashoffset={animated ? "90" : undefined}
      >
        {animated && <animate attributeName="stroke-dashoffset" from="90" to="0" dur="0.6s" fill="freeze" />}
      </path>
    </BackgroundFrame>
  );
}
