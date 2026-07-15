"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "../../lib/cn";

export function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="vdg-tabs" className={cn("flex flex-col gap-3", className)} {...props} />;
}

export function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="vdg-tabs-list"
      className={cn(
        "relative flex w-fit items-center gap-1 rounded-[var(--vdg-radius-md)] bg-[var(--vdg-color-border)]/50 p-1",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="vdg-tabs-trigger"
      className={cn(
        "relative rounded-[var(--vdg-radius-sm)] px-3 py-1.5 text-sm font-medium text-[var(--vdg-color-text-secondary)] outline-none transition-colors data-active:bg-[var(--vdg-color-surface)] data-active:text-[var(--vdg-color-primary)] data-active:shadow-[var(--vdg-shadow-sm)] hover:text-[var(--vdg-color-text)] focus-visible:shadow-[var(--vdg-focus-ring)]",
        className
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    // Verified live (Vite dev server, React 19): the outgoing panel's
    // `data-hidden`/native `hidden` never actually got set -- its
    // mount-tracking promise chain (base-ui's useAnimationsFinished, keyed
    // off transitionend/getAnimations()) did not resolve in this setup for
    // reasons not worth reverse-engineering further, so both panels stayed
    // visible and stacked after switching tabs. `inert` on the outgoing
    // panel DID update correctly and immediately (confirmed via
    // `element.inert`), so hiding is driven off that instead -- it is set
    // synchronously with tab selection, unlike the animation-gated
    // `data-hidden`.
    <TabsPrimitive.Panel
      data-slot="vdg-tabs-panel"
      className={cn("text-sm [&[inert]]:hidden", className)}
      {...props}
    />
  );
}
