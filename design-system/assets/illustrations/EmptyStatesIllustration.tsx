import { IllustrationFrame } from "../shared/IllustrationFrame";
import type { VdgAssetProps } from "../shared/types";

/** An open, empty box -- the generic "nothing here yet" illustration used across list/table empty states. */
export function EmptyStatesIllustration({
  primaryColor = "var(--vdg-color-text-secondary)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Không có dữ liệu" className={className}>
      <g opacity={0.7}>
        <path d="M 100 170 L 160 150 L 220 170 L 220 220 Q 160 236 100 220 Z" fill="none" stroke={primaryColor} strokeWidth={2.5} strokeLinejoin="round" />
        <path d="M 100 170 L 160 190 L 220 170" fill="none" stroke={primaryColor} strokeWidth={2.5} strokeLinejoin="round" />
        <line x1="160" y1="190" x2="160" y2="236" stroke={primaryColor} strokeWidth={2.5} opacity={0.5} />
        <circle cx="160" cy="120" r="16" fill="none" stroke={primaryColor} strokeWidth={2} strokeDasharray="3 6" opacity={0.4} />
      </g>
    </IllustrationFrame>
  );
}
