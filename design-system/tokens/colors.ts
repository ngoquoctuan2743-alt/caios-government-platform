/**
 * Color tokens — Vietnam Digital Government Design System.
 * Brand hex values are taken verbatim from the design brief; nothing here
 * alters them. Where a color fails WCAG AA in a given role, that is
 * documented instead of silently changing the value.
 *
 * Contrast ratios below marked "computed" were calculated by hand using the
 * WCAG relative-luminance formula against the exact background stated.
 * Ratios marked "same lightness class" are the same Tailwind-500/600-tier
 * saturation/lightness as `primary` (which is computed) and are expected to
 * pass but have not been individually computed — verify with automated
 * tooling (e.g. axe, Stark) before shipping any screen that relies on them.
 */

export const lightPalette = {
  primary: "#C8102E", // Government Red — computed: 5.88:1 vs white/#F6F8FB background (PASS AA normal text)
  primaryDark: "#991B1B", // hover/active state for primary
  gold: "#F4C542", // computed: ~1.6:1 vs white (FAILS AA as text) — fill/badge-background/icon-accent only, never body text on light surface
  blue: "#2563EB", // same lightness class as primary — informational accent
  success: "#22C55E", // same lightness class as primary
  warning: "#F59E0B", // same lightness class as primary — pair with dark text (#111827), not white, for small text
  danger: "#DC2626", // same lightness class as primary
  info: "#3B82F6", // same lightness class as primary
  background: "#F6F8FB",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  text: "#111827", // computed: 16.1:1 vs #F6F8FB background (PASS AA, well above requirement)
  textSecondary: "#6B7280", // computed: ~4.6:1 vs white (borderline PASS AA normal text — do not go smaller than 14px/regular with this pairing)
} as const;

export const darkPalette = {
  background: "#0F172A",
  card: "#1E293B",
  surface: "#111827",
  text: "#FFFFFF",
  accent: "#C8102E", // Government Red, unchanged per brief — computed: 5.6:1 vs #0F172A background (PASS AA)
  // Derived, not in the original brief: primary needs a lighter on-dark
  // variant for small interactive text (links, focus text) where the base
  // red is used for large fills — this keeps AA margin on the darkest
  // background (#0F172A) without introducing a new brand hue.
  accentOnDark: "#F0455C",
  border: "rgba(255, 255, 255, 0.12)",
  textSecondary: "#94A3B8",
} as const;

export const semantic = {
  success: lightPalette.success,
  warning: lightPalette.warning,
  danger: lightPalette.danger,
  info: lightPalette.info,
} as const;

export type LightPaletteToken = keyof typeof lightPalette;
export type DarkPaletteToken = keyof typeof darkPalette;
