"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

export function ModalContent({
  className,
  children,
  title,
  description,
  ...props
}: DialogPrimitive.Popup.Props & { title: string; description?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="vdg-modal-backdrop"
        className="fixed inset-0 z-[var(--vdg-z-overlay,300)] bg-black/40 backdrop-blur-[2px] transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
      />
      <DialogPrimitive.Popup
        data-slot="vdg-modal-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-[var(--vdg-z-modal,400)] w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[var(--vdg-radius-xl)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] p-6 shadow-[var(--vdg-shadow-xl)] transition-all data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className
        )}
        {...props}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <DialogPrimitive.Title className="text-lg font-semibold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              {title}
            </DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="mt-1 text-sm text-[var(--vdg-color-text-secondary)]">
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
          <DialogPrimitive.Close
            aria-label="Đóng"
            className="rounded-[var(--vdg-radius-sm)] p-1 text-[var(--vdg-color-text-secondary)] transition-colors hover:bg-[var(--vdg-color-border)]/60 hover:text-[var(--vdg-color-text)] focus-visible:shadow-[var(--vdg-focus-ring)]"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        </div>
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}
