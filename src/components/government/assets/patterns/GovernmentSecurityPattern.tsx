import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Repeating shield outline -- for security/trust-signaling surfaces (Digital Signature, Authentication, Admin). */
export function GovernmentSecurityPattern({
  id,
  size = 64,
  primaryColor = "var(--vdg-color-primary)",
  opacity = 0.04,
  className,
}: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-security-${id ?? autoId}`;
  const s = size;
  const w = s * 0.36;
  const shield = `M ${-w} ${-s * 0.32}
    L 0 ${-s * 0.4} L ${w} ${-s * 0.32}
    V ${s * 0.05}
    Q ${w} ${s * 0.3} 0 ${s * 0.42}
    Q ${-w} ${s * 0.3} ${-w} ${s * 0.05}
    Z`;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s} patternUnits="userSpaceOnUse">
          <g transform={`translate(${s / 2}, ${s / 2})`}>
            <path d={shield} fill="none" stroke={primaryColor} strokeWidth={1} strokeLinejoin="round" opacity={opacity} />
            <path d={`M ${-w * 0.35} ${-s * 0.02} L ${-w * 0.1} ${s * 0.15} L ${w * 0.4} ${-s * 0.15}`} fill="none" stroke={primaryColor} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
