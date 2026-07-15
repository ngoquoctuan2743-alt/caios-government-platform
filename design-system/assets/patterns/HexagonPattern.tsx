import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Hexagonal tessellation outline -- reads as "structured, cellular, national infrastructure" without being literal. */
export function HexagonPattern({ id, size = 48, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-hex-${id ?? autoId}`;
  const w = size;
  const h = size * 1.1547;
  const points = [
    [w / 2, 0],
    [w, h * 0.25],
    [w, h * 0.75],
    [w / 2, h],
    [0, h * 0.75],
    [0, h * 0.25],
  ]
    .map((p) => p.join(","))
    .join(" ");
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={w} height={h} patternUnits="userSpaceOnUse">
          <polygon points={points} fill="none" stroke={primaryColor} strokeWidth={1} opacity={opacity} />
          <polygon points={points} fill="none" stroke={primaryColor} strokeWidth={1} opacity={opacity} transform={`translate(${w / 2}, ${h / 2})`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
