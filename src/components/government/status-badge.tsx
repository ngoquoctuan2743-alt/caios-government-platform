import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusTone = "primary" | "success" | "warning" | "danger" | "neutral"

const TONE_CLASS: Record<StatusTone, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]",
  warning: "bg-[var(--vdg-color-warning)]/10 text-[var(--vdg-color-warning)]",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
}

/** CAIOS's core Badge only has default/secondary/destructive/outline/ghost/link variants — this maps the demo's 5-tone status vocabulary onto it via className instead of adding new variants to the shared component. */
export function StatusBadge({ tone, className, children }: { tone: StatusTone; className?: string; children: React.ReactNode }) {
  return <Badge className={cn(TONE_CLASS[tone], className)}>{children}</Badge>
}
