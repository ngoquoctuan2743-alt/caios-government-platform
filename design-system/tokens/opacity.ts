/** Opacity tokens, including the 2%/4% "watermark" levels used by decorative SVG patterns (Phase 3). */
export const opacity = {
  0: 0,
  disabled: 0.4,
  hover: 0.08,
  pressed: 0.12,
  watermarkLow: 0.02,
  watermarkHigh: 0.04,
  overlay: 0.5,
  full: 1,
} as const;

export type OpacityToken = keyof typeof opacity;
