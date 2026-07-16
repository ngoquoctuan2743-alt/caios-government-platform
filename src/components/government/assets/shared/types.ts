/**
 * Shared prop contract for every visual asset in the design system --
 * patterns, backgrounds, and illustrations all accept exactly this shape.
 * This is what makes them behave like `<LotusPattern opacity={0.03} />`
 * instead of `<img src="lotus.svg">`: no raw SVG import, automatic
 * light/dark adaptation (colors default to the theme's CSS custom
 * properties, not a hardcoded hex), and standard React tree-shaking since
 * each asset is its own named export, not a sprite sheet.
 */
export interface VdgAssetProps {
  /**
   * Main ink color. Defaults to `var(--vdg-color-primary)` -- change theme
   * (`.vdg-light` / `.vdg-dark`) and every asset using the default
   * repaints automatically, no JS theme detection involved.
   */
  primaryColor?: string;
  /** Secondary/accent ink color. Defaults to `var(--vdg-color-text-secondary)`. */
  secondaryColor?: string;
  /** Overall opacity multiplier. Meaning differs by asset: patterns use it as the watermark strength; backgrounds/illustrations use it as a straight fade. */
  opacity?: number;
  /** Enables the asset's built-in micro-interaction (a slow pulse/dash/drift), where one is defined. No-op on assets with no motion designed for them -- documented per component, never silently ignored without a reason. */
  animated?: boolean;
  className?: string;
}

/** Every pattern needs a unique SVG `<pattern>` id when more than one instance renders on the same page. Auto-generated via `useId()` when omitted -- an explicit `id` is only needed to force a stable id (e.g. server-rendered snapshot tests). */
export interface VdgPatternProps extends VdgAssetProps {
  id?: string;
  size?: number;
}
