import { IllustrationFrame } from "../shared/IllustrationFrame";
import { FlatPerson } from "../shared/FlatPerson";
import type { VdgAssetProps } from "../shared/types";

/** A support agent figure wearing a headset -- for the Help Center. */
export function SupportCenterIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-info)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Trung tâm hỗ trợ" className={className}>
      <circle cx="160" cy="230" r="90" fill={secondaryColor} opacity={0.07} />
      <FlatPerson x={160} y={230} scale={1.4} skinColor={secondaryColor} clothColor={primaryColor} />
      <g transform="translate(160 182)" stroke={primaryColor} strokeWidth={3} fill="none" strokeLinecap="round">
        <path d="M -19 4 A 19 19 0 0 1 19 4" />
        <path d="M -19 4 V 12 Q -19 18 -13 18" />
        <path d="M 19 4 V 12 Q 19 18 13 18" />
        <circle cx="-19" cy="6" r="4" fill={primaryColor} stroke="none" />
        <circle cx="19" cy="6" r="4" fill={primaryColor} stroke="none" />
      </g>
    </IllustrationFrame>
  );
}
