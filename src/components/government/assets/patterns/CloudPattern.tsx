import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Layered soft cloud outlines -- for cloud-services / national-data-platform surfaces. */
export function CloudPattern({ id, size = 140, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-cloud-${id ?? autoId}`;
  const s = size;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s * 0.6} patternUnits="userSpaceOnUse">
          <path
            d={`M ${s * 0.1} ${s * 0.35}
                a ${s * 0.08} ${s * 0.08} 0 0 1 ${s * 0.05} -${s * 0.1}
                a ${s * 0.1} ${s * 0.1} 0 0 1 ${s * 0.19} -${s * 0.02}
                a ${s * 0.07} ${s * 0.07} 0 0 1 ${s * 0.1} ${s * 0.09}
                a ${s * 0.06} ${s * 0.06} 0 0 1 -${s * 0.02} ${s * 0.12}
                h -${s * 0.3}
                a ${s * 0.06} ${s * 0.06} 0 0 1 -${s * 0.02} -${s * 0.09}
                z`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1.2}
            strokeLinejoin="round"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
