/**
 * Typography tokens. Vietnamese-optimized: all three families must be
 * loaded with the `vietnamese` subset (Google Fonts) so diacritics
 * (ơ, ư, ệ, ễ, etc.) render with correct metrics instead of a fallback
 * glyph. See implementation-guide.md for the exact `next/font/google` setup.
 */

export const fontFamily = {
  heading: "var(--vdg-font-heading)",
  body: "var(--vdg-font-body)",
  code: "var(--vdg-font-code)",
} as const;

/**
 * Fluid type scale using clamp(min, preferred, max) so headings scale
 * smoothly between mobile and desktop instead of jumping at breakpoints.
 * Values in rem; line-height as a unitless ratio.
 */
export const fontSize = {
  xs: { size: "0.75rem", lineHeight: 1.5 }, // 12px — captions, table meta
  sm: { size: "0.875rem", lineHeight: 1.5 }, // 14px — secondary body
  base: { size: "1rem", lineHeight: 1.6 }, // 16px — body default
  lg: { size: "1.125rem", lineHeight: 1.6 }, // 18px — lead paragraph
  xl: { size: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)", lineHeight: 1.4 }, // h4
  "2xl": { size: "clamp(1.5rem, 1.3rem + 0.9vw, 1.875rem)", lineHeight: 1.3 }, // h3
  "3xl": { size: "clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)", lineHeight: 1.2 }, // h2
  "4xl": { size: "clamp(2.25rem, 1.7rem + 2.2vw, 3.25rem)", lineHeight: 1.1 }, // h1 / hero
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export type FontSizeToken = keyof typeof fontSize;
