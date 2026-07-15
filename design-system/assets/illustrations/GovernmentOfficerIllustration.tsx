import { IllustrationFrame } from "../shared/IllustrationFrame";
import { FlatPerson } from "../shared/FlatPerson";
import { GovernmentSecurityPattern } from "../patterns/GovernmentSecurityPattern";
import type { VdgAssetProps } from "../shared/types";

/** An officer figure with a shield-of-authority badge -- for the Officer console. */
export function GovernmentOfficerIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-gold)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Cán bộ nhà nước" className={className}>
      <svg x="20" y="20" width="280" height="280">
        <GovernmentSecurityPattern primaryColor={primaryColor} opacity={0.05} size={50} />
      </svg>
      <circle cx="160" cy="230" r="90" fill={primaryColor} opacity={0.07} />
      <FlatPerson x={160} y={230} scale={1.4} skinColor={secondaryColor} clothColor={primaryColor} />
      <g transform="translate(160 190)">
        <path
          d="M -16 -14 L 0 -20 L 16 -14 V 6 Q 16 20 0 26 Q -16 20 -16 6 Z"
          fill="var(--vdg-color-surface)"
          stroke={secondaryColor}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <path d="M -7 3 L -1 11 L 9 -5" fill="none" stroke={secondaryColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </IllustrationFrame>
  );
}
