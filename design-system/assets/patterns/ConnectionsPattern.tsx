import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Nodes joined by thin connecting lines -- the network-graph motif for AI Assistant / data-platform surfaces. */
export function ConnectionsPattern({
  id,
  size = 96,
  primaryColor = "var(--vdg-color-primary)",
  opacity = 0.04,
  animated = false,
  className,
}: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-connections-${id ?? autoId}`;
  const s = size;
  const nodes: [number, number][] = [
    [s * 0.15, s * 0.2],
    [s * 0.7, s * 0.1],
    [s * 0.5, s * 0.55],
    [s * 0.9, s * 0.65],
    [s * 0.2, s * 0.85],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
  ];
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s} patternUnits="userSpaceOnUse">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={primaryColor} strokeWidth={1} opacity={opacity} />
          ))}
          {nodes.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={2} fill={primaryColor} opacity={opacity}>
              {animated && (
                <animate attributeName="r" values="2;3;2" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
