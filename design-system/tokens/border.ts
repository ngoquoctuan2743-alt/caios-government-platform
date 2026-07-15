/** Border-width tokens. Border *color* lives in `colors.ts` (`border` / dark `border`) — this is width only. */
export const borderWidth = {
  0: "0px",
  hairline: "1px", // default for cards, inputs, dividers
  thick: "2px", // icon strokes (per brief: 2px stroke), focus rings, selected states
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
