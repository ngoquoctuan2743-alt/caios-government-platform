"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="vdg-accordion"
      className={cn("flex flex-col divide-y divide-[var(--vdg-color-border)] rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)]", className)}
      {...props}
    />
  );
}

export function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item data-slot="vdg-accordion-item" className={cn("group/vdg-item", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="vdg-accordion-trigger"
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-[var(--vdg-color-text)] outline-none transition-colors hover:bg-[var(--vdg-color-background)] focus-visible:shadow-[var(--vdg-focus-ring)]",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-[var(--vdg-color-text-secondary)] transition-transform group-data-open/vdg-item:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionPanel({ className, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="vdg-accordion-panel"
      className={cn("overflow-hidden px-4 pb-4 text-sm text-[var(--vdg-color-text-secondary)]", className)}
      {...props}
    />
  );
}
