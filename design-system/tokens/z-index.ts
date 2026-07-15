/** Z-index tokens — a fixed scale prevents ad-hoc z-50/z-9999 escalation across an enterprise app. */
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  aiAssistant: 700, // persistent floating assistant stays above everything except a true system alert
  tooltip: 800,
} as const;

export type ZIndexToken = keyof typeof zIndex;
