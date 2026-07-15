import { IllustrationFrame } from "../shared/IllustrationFrame";
import type { VdgAssetProps } from "../shared/types";

/** A payment card with a confirmed transaction check -- for fee-payment surfaces. */
export function PaymentIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-success)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Thanh toán trực tuyến" className={className}>
      <circle cx="160" cy="160" r="110" fill={primaryColor} opacity={0.06} />
      <g transform="translate(160 150) rotate(-6)">
        <rect x="-80" y="-50" width="160" height="100" rx="12" fill={primaryColor} />
        <rect x="-80" y="-24" width="160" height="18" fill="var(--vdg-color-surface)" opacity={0.85} />
        <rect x="-60" y="14" width="46" height="10" rx="5" fill="var(--vdg-color-surface)" opacity={0.7} />
      </g>
      <g transform="translate(214 218)">
        <circle r="30" fill="var(--vdg-color-surface)" stroke={secondaryColor} strokeWidth={3} />
        <path d="M -12 0 L -3 10 L 14 -10" fill="none" stroke={secondaryColor} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </IllustrationFrame>
  );
}
