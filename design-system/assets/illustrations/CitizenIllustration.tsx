import { IllustrationFrame } from "../shared/IllustrationFrame";
import { FlatPerson } from "../shared/FlatPerson";
import { DotMatrixPattern } from "../patterns/DotMatrixPattern";
import type { VdgAssetProps } from "../shared/types";

/** A citizen holding a document -- for the Citizen Portal landing/empty states. */
export function CitizenIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-gold)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Công dân đang giữ hồ sơ" className={className}>
      <svg x="20" y="20" width="280" height="280">
        <DotMatrixPattern primaryColor={secondaryColor} opacity={0.06} size={22} />
      </svg>
      <circle cx="160" cy="230" r="90" fill={primaryColor} opacity={0.07} />
      <FlatPerson x={150} y={230} scale={1.35} skinColor={secondaryColor} clothColor={primaryColor} />
      <g transform="translate(206 158)">
        <rect x="-24" y="-30" width="48" height="60" rx="4" fill="var(--vdg-color-surface)" stroke={primaryColor} strokeWidth={2} />
        <line x1="-14" y1="-14" x2="14" y2="-14" stroke={secondaryColor} strokeWidth={3} strokeLinecap="round" />
        <line x1="-14" y1="-2" x2="14" y2="-2" stroke={primaryColor} strokeWidth={3} strokeLinecap="round" opacity={0.4} />
        <line x1="-14" y1="10" x2="6" y2="10" stroke={primaryColor} strokeWidth={3} strokeLinecap="round" opacity={0.4} />
      </g>
    </IllustrationFrame>
  );
}
