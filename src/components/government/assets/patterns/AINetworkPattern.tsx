import { useId, type ReactNode } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Layered neural-network motif (3 columns of nodes, fully cross-connected column to column) -- denser than ConnectionsPattern, for AI-specific surfaces (AI Assistant, Smart Search). */
export function AINetworkPattern({
  id,
  size = 90,
  primaryColor = "var(--vdg-color-primary)",
  opacity = 0.04,
  animated = false,
  className,
}: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-ai-network-${id ?? autoId}`;
  const s = size;
  const colX = [s * 0.15, s * 0.5, s * 0.85];
  const layers = [
    [s * 0.2, s * 0.5, s * 0.8],
    [s * 0.15, s * 0.5, s * 0.85],
    [s * 0.3, s * 0.65],
  ];
  const lines: ReactNode[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    layers[l].forEach((y1, i) => {
      layers[l + 1].forEach((y2, j) => {
        lines.push(<line key={`${l}-${i}-${j}`} x1={colX[l]} y1={y1} x2={colX[l + 1]} y2={y2} stroke={primaryColor} strokeWidth={0.75} opacity={opacity} />);
      });
    });
  }
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s} patternUnits="userSpaceOnUse">
          {lines}
          {layers.map((col, l) =>
            col.map((y, i) => (
              <circle key={`n-${l}-${i}`} cx={colX[l]} cy={y} r={2} fill={primaryColor} opacity={opacity}>
                {animated && <animate attributeName="opacity" values={`${opacity};${opacity * 2.5};${opacity}`} dur="2.4s" begin={`${(l + i) * 0.2}s`} repeatCount="indefinite" />}
              </circle>
            ))
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
