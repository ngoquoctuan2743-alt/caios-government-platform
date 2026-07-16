import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/**
 * Concentric-ring + radiating-line motif, in the spirit of the sunburst
 * tympanum found on Đông Sơn bronze drums -- reduced to plain geometry
 * (circles + rays), not a reproduction of any specific drum's engraving.
 */
export function DongSonPattern({
  id,
  size = 100,
  primaryColor = "var(--vdg-color-primary)",
  opacity = 0.04,
  animated = false,
  className,
}: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-dongson-${id ?? autoId}`;
  const c = size / 2;
  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const x2 = c + Math.cos(angle) * c * 0.9;
    const y2 = c + Math.sin(angle) * c * 0.9;
    return <line key={i} x1={c} y1={c} x2={x2} y2={y2} stroke={primaryColor} strokeWidth={1} opacity={opacity} />;
  });
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
          <g>
            {animated && (
              <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="60s" repeatCount="indefinite" />
            )}
            {rays}
            <circle cx={c} cy={c} r={c * 0.55} fill="none" stroke={primaryColor} strokeWidth={1} opacity={opacity} />
            <circle cx={c} cy={c} r={c * 0.2} fill="none" stroke={primaryColor} strokeWidth={1} opacity={opacity} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
