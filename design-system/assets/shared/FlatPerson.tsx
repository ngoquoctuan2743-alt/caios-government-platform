/**
 * Shared geometric figure (circle head + rounded trapezoid body) reused by
 * every illustration that includes a person (Citizen, Business, Government
 * Officer, Support Center, Authentication) -- this is what keeps their
 * proportions and stroke language identical instead of each illustration
 * drawing its own person from scratch.
 */
export function FlatPerson({
  x = 0,
  y = 0,
  scale = 1,
  skinColor,
  clothColor,
  flip = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  skinColor: string;
  clothColor: string;
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale}, ${scale})`}>
      <circle cx={0} cy={-46} r={17} fill={skinColor} />
      <path d="M -24 8 Q -24 -24 0 -24 Q 24 -24 24 8 L 24 48 Q 0 58 -24 48 Z" fill={clothColor} />
    </g>
  );
}
