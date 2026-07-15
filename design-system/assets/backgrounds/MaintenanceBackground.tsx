import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { CircuitPattern } from "../patterns/CircuitPattern";
import type { VdgAssetProps } from "../shared/types";

/** Maintenance: circuit texture field + a large notched-ring "gear" abstraction (12 notches, not a literal cog icon). */
export function MaintenanceBackground({
  primaryColor = "var(--vdg-color-text-secondary)",
  opacity = 1,
  animated = false,
  className,
}: VdgAssetProps) {
  const gid = useId();
  const notches = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const r1 = 78;
    const r2 = 92;
    return (
      <line
        key={i}
        x1={300 + Math.cos(angle) * r1}
        y1={180 + Math.sin(angle) * r1}
        x2={300 + Math.cos(angle) * r2}
        y2={180 + Math.sin(angle) * r2}
        stroke={primaryColor}
        strokeWidth={3}
        strokeLinecap="round"
      />
    );
  });
  return (
    <BackgroundFrame viewBox="0 0 600 400" opacity={opacity} className={className}>
      <svg width="600" height="400">
        <CircuitPattern id={`${gid}-circuit`} primaryColor={primaryColor} opacity={0.03} size={56} />
      </svg>
      <g opacity={0.15}>
        <circle cx="300" cy="180" r="60" fill="none" stroke={primaryColor} strokeWidth={2}>
          {animated && <animateTransform attributeName="transform" type="rotate" from="0 300 180" to="360 300 180" dur="12s" repeatCount="indefinite" />}
        </circle>
        <g>
          {notches}
          {animated && <animateTransform attributeName="transform" type="rotate" from="0 300 180" to="360 300 180" dur="12s" repeatCount="indefinite" />}
        </g>
      </g>
    </BackgroundFrame>
  );
}
