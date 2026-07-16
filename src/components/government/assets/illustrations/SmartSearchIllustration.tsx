import { IllustrationFrame } from "../shared/IllustrationFrame";
import { DotMatrixPattern } from "../patterns/DotMatrixPattern";
import type { VdgAssetProps } from "../shared/types";

/** A magnifier over a dot field with an AI sparkle -- "search, assisted" rather than a plain search icon blown up. */
export function SmartSearchIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-gold)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Tìm kiếm thông minh" className={className}>
      <svg x="60" y="60" width="200" height="200">
        <DotMatrixPattern primaryColor={primaryColor} opacity={0.08} size={20} />
      </svg>
      <g transform="translate(150 150)">
        <circle r="56" fill="var(--vdg-color-surface)" stroke={primaryColor} strokeWidth={4} />
        <line x1="40" y1="40" x2="76" y2="76" stroke={primaryColor} strokeWidth={8} strokeLinecap="round" />
      </g>
      <path d="M 216 96 l 5 14 14 5 -14 5 -5 14 -5 -14 -14 -5 14 -5 z" fill={secondaryColor} />
    </IllustrationFrame>
  );
}
