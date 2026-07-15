import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { DotMatrixPattern } from "../patterns/DotMatrixPattern";
import { GovernmentSecurityPattern } from "../patterns/GovernmentSecurityPattern";
import type { VdgAssetProps } from "../shared/types";

/** Calm, centered composition for login/register screens: dot matrix field + a soft central glow behind where the form card sits, plus a faint security-shield watermark for trust signaling. */
export function AuthenticationBackground({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-text-secondary)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 900 900" opacity={opacity} className={className}>
      <defs>
        <radialGradient id={`vdg-auth-glow-${gid}`} cx="50%" cy="42%" r="42%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.08} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <svg width="900" height="900">
        <DotMatrixPattern id={`${gid}-dots`} primaryColor={secondaryColor} opacity={0.05} size={26} />
      </svg>
      <rect width="900" height="900" fill={`url(#vdg-auth-glow-${gid})`} />
      <svg x="620" y="60" width="220" height="220">
        <GovernmentSecurityPattern id={`${gid}-shield`} primaryColor={primaryColor} opacity={0.06} size={110} />
      </svg>
    </BackgroundFrame>
  );
}
