import { IllustrationFrame } from "../shared/IllustrationFrame";
import type { VdgAssetProps } from "../shared/types";

/** A document with a signature flourish and pen -- for e-signature surfaces. */
export function DigitalSignatureIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-gold)",
  animated = false,
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Chữ ký số" className={className}>
      <circle cx="160" cy="160" r="110" fill={primaryColor} opacity={0.06} />
      <rect x="90" y="70" width="140" height="180" rx="8" fill="var(--vdg-color-surface)" stroke={primaryColor} strokeWidth={2} />
      <line x1="112" y1="104" x2="208" y2="104" stroke={primaryColor} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
      <line x1="112" y1="124" x2="190" y2="124" stroke={primaryColor} strokeWidth={3} strokeLinecap="round" opacity={0.35} />
      <path
        d="M 108 200 Q 122 176 136 200 T 164 200 Q 172 186 184 200 T 208 196"
        fill="none"
        stroke={secondaryColor}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={animated ? "160" : undefined}
        strokeDashoffset={animated ? "160" : undefined}
      >
        {animated && <animate attributeName="stroke-dashoffset" from="160" to="0" dur="1.2s" fill="freeze" />}
      </path>
      <g transform="translate(214 176) rotate(45)">
        <rect x="-4" y="-40" width="8" height="40" rx="4" fill={primaryColor} />
        <path d="M -4 0 L 4 0 L 0 12 Z" fill={primaryColor} />
      </g>
    </IllustrationFrame>
  );
}
