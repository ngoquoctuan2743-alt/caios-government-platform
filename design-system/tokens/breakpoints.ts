/** Breakpoints — mobile-first; each key is a `min-width`. Matches Tailwind's default scale for drop-in compatibility. */
export const breakpoints = {
  mobile: "0px",
  tablet: "640px",
  laptop: "1024px",
  desktop: "1280px",
  wide: "1536px",
} as const;

export type BreakpointToken = keyof typeof breakpoints;
