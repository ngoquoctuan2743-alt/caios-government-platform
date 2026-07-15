import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import type { VdgAssetProps } from "../shared/types";

/**
 * 500: three disconnected node fragments with severed connecting lines --
 * "the system's own connections broke," distinct from 404's single missing
 * path. Defaults to the danger token since this is inherently an error
 * state, not a neutral one (still overridable via `primaryColor`).
 */
export function ServerErrorBackground({
  primaryColor = "var(--vdg-color-danger)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 600 400" opacity={opacity} className={className}>
      <defs>
        <radialGradient id={`vdg-500-glow-${gid}`} cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.08} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#vdg-500-glow-${gid})`} />
      <g opacity={0.16} stroke={primaryColor} strokeWidth={1.5}>
        <line x1="220" y1="180" x2="270" y2="190" strokeDasharray="3 6" />
        <line x1="330" y1="200" x2="380" y2="210" strokeDasharray="3 6" />
      </g>
      <g fill={primaryColor} opacity={0.16}>
        <circle cx="220" cy="180" r="6" />
        <circle cx="300" cy="195" r="6" />
        <circle cx="380" cy="210" r="6" />
      </g>
    </BackgroundFrame>
  );
}
