"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "../../lib/cn";

const sizeClass = {
  sm: "size-6 text-xs",
  md: "size-8 text-sm",
  lg: "size-10 text-base",
  xl: "size-14 text-lg",
} as const;

export interface AvatarProps extends AvatarPrimitive.Root.Props {
  size?: keyof typeof sizeClass;
  src?: string;
  alt?: string;
  /** Shown while `src` is loading/missing. Prefer 1-2 initials — never a generic silhouette icon, per the "trust" principle: an official record should always show a concrete identifier. */
  fallback: React.ReactNode;
}

export function Avatar({ className, size = "md", src, alt, fallback, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="vdg-avatar"
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--vdg-radius-full)] bg-[var(--vdg-color-border)] font-medium text-[var(--vdg-color-text)]",
        sizeClass[size],
        className
      )}
      {...props}
    >
      {src && <AvatarPrimitive.Image src={src} alt={alt ?? ""} className="size-full object-cover" />}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center">
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
