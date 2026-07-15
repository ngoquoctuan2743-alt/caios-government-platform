import { BackgroundFrame } from "../shared/BackgroundFrame";
import type { VdgAssetProps } from "../shared/types";

/** 404: a large, deliberately incomplete/broken ring -- geometric shorthand for "the path is missing" without a literal cracked-page illustration. */
export function NotFoundBackground({
  primaryColor = "var(--vdg-color-text-secondary)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  return (
    <BackgroundFrame viewBox="0 0 600 400" opacity={opacity} className={className}>
      <g transform="translate(300 190)" opacity={0.14}>
        <path d="M -100 20 A 100 100 0 1 1 60 92" fill="none" stroke={primaryColor} strokeWidth={2} strokeLinecap="round" />
        <circle cx="-100" cy="20" r="4" fill={primaryColor} />
        <circle cx="60" cy="92" r="4" fill={primaryColor} />
      </g>
    </BackgroundFrame>
  );
}
