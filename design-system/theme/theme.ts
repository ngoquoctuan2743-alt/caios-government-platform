import { darkPalette, lightPalette } from "../tokens/colors";
import { shadowDark, shadowLight } from "../tokens/shadow";
import { radius } from "../tokens/radius";

/**
 * Programmatic mirror of theme/light/theme.css and theme/dark/theme.css —
 * for contexts that can't read CSS custom properties directly (chart color
 * arrays, canvas/SVG fills, Framer Motion inline color transitions). The
 * CSS files remain the source of truth for anything rendered in the DOM;
 * keep these two in sync by hand when either changes (Phase 1 scale is
 * small enough that a codegen step isn't justified yet).
 */
export const lightTheme = {
  colors: lightPalette,
  shadow: shadowLight,
  radius,
} as const;

export const darkTheme = {
  colors: darkPalette,
  shadow: shadowDark,
  radius,
} as const;

export type Theme = typeof lightTheme;
export type ThemeMode = "light" | "dark";
