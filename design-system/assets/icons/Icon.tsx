import type { LucideIcon } from "lucide-react";

const SIZE_PX = { sm: 20, md: 24, lg: 32 } as const;

export interface IconProps {
  icon: LucideIcon;
  /** @default "md" (24px) -- the three sizes named in the brief. */
  size?: keyof typeof SIZE_PX;
  className?: string;
  "aria-label"?: string;
}

/**
 * Enforces the icon system rule set from the brief at the call site instead
 * of trusting every usage to remember it by hand: outline style (lucide-react
 * icons are outline-only already), 2px stroke, and one of exactly three
 * sizes (20 / 24 / 32px) -- no arbitrary in-between sizes.
 */
export function Icon({ icon: LucideIconComponent, size = "md", className, "aria-label": ariaLabel }: IconProps) {
  return (
    <LucideIconComponent
      size={SIZE_PX[size]}
      strokeWidth={2}
      className={className}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    />
  );
}
