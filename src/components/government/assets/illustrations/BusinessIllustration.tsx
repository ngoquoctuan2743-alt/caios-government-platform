import { IllustrationFrame } from "../shared/IllustrationFrame";
import { FlatPerson } from "../shared/FlatPerson";
import { HexagonPattern } from "../patterns/HexagonPattern";
import type { VdgAssetProps } from "../shared/types";

/** A businessperson beside a building glyph -- for the Business Portal (registration, licensing). */
export function BusinessIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-blue)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Doanh nghiệp và toà nhà văn phòng" className={className}>
      <svg x="20" y="20" width="280" height="280">
        <HexagonPattern primaryColor={secondaryColor} opacity={0.06} size={40} />
      </svg>
      <circle cx="160" cy="230" r="90" fill={secondaryColor} opacity={0.07} />
      <g transform="translate(200 210)">
        <rect x="-40" y="-90" width="80" height="130" rx="4" fill="var(--vdg-color-surface)" stroke={secondaryColor} strokeWidth={2} />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect key={`${row}-${col}`} x={-28 + col * 32} y={-76 + row * 32} width="16" height="16" rx="2" fill={secondaryColor} opacity={0.35} />
          ))
        )}
      </g>
      <FlatPerson x={110} y={230} scale={1.25} skinColor={secondaryColor} clothColor={primaryColor} />
    </IllustrationFrame>
  );
}
