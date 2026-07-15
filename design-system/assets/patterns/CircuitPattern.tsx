import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Right-angle traces with junction nodes -- for AI / system-integration surfaces (Notification Center, Reporting Dashboard). */
export function CircuitPattern({ id, size = 64, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-circuit-${id ?? autoId}`;
  const s = size;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s} patternUnits="userSpaceOnUse">
          <path
            d={`M 0 ${s * 0.25} H ${s * 0.4} V ${s * 0.7} H ${s} M ${s * 0.7} 0 V ${s * 0.4} H ${s * 0.25} V ${s}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1}
            opacity={opacity}
          />
          <circle cx={s * 0.4} cy={s * 0.25} r={2} fill={primaryColor} opacity={opacity} />
          <circle cx={s * 0.7} cy={s * 0.7} r={2} fill={primaryColor} opacity={opacity} />
          <circle cx={s * 0.25} cy={s * 0.4} r={2} fill={primaryColor} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
