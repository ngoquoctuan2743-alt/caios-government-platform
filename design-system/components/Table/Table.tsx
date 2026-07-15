import * as React from "react";
import { cn } from "../../lib/cn";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)]">
      <table data-slot="vdg-table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="vdg-table-header"
      className={cn("bg-[var(--vdg-color-background)] [&_tr]:border-b [&_tr]:border-[var(--vdg-color-border)]", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="vdg-table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="vdg-table-row"
      className={cn(
        "border-b border-[var(--vdg-color-border)] transition-colors hover:bg-[var(--vdg-color-background)]",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="vdg-table-head"
      className={cn(
        "h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-[var(--vdg-color-text-secondary)]",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="vdg-table-cell"
      className={cn("px-4 py-3 align-middle text-[var(--vdg-color-text)]", className)}
      {...props}
    />
  );
}
