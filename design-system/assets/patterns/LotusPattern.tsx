import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/**
 * Simplified lotus-flower outline (Vietnam's national flower) -- six
 * petal outlines radiating from a center point, drawn from scratch as
 * generic vesica-shaped petals, not traced from any existing artwork.
 */
export function LotusPattern({ id, size = 96, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-lotus-${id ?? autoId}`;
  const r = size * 0.36;
  const w = size * 0.14;
  const petal = `M 0,0 Q ${-w},${-r * 0.55} 0,${-r} Q ${w},${-r * 0.55} 0,0 Z`;
  const petals = Array.from({ length: 6 }, (_, i) => (
    <path key={i} d={petal} fill="none" stroke={primaryColor} strokeWidth={1} opacity={opacity} transform={`rotate(${i * 60})`} />
  ));
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
          <g transform={`translate(${size / 2}, ${size / 2})`}>{petals}</g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
