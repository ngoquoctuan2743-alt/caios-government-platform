/**
 * Motion tokens for Framer Motion / CSS transitions. "Subtle, no excessive
 * animation" per the brief — durations stay under 300ms, easing avoids
 * bounce/elastic curves.
 */
export const duration = {
  instant: 100,
  fast: 150,
  base: 200,
  slow: 300,
} as const;

export const easing = {
  standard: [0.4, 0, 0.2, 1] as const, // Material-style standard ease
  decelerate: [0, 0, 0.2, 1] as const, // entrances
  accelerate: [0.4, 0, 1, 1] as const, // exits
} as const;

/** Ready-to-spread Framer Motion variant presets for the micro-interactions named in the brief. */
export const motionPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.base / 1000, ease: easing.standard },
  },
  slideUp: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: { duration: duration.base / 1000, ease: easing.decelerate },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { duration: duration.fast / 1000, ease: easing.standard },
  },
  lift: {
    whileHover: { y: -2 },
    whileTap: { y: 0 },
    transition: { duration: duration.fast / 1000, ease: easing.standard },
  },
} as const;
