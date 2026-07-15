import { ChevronRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Sprint 03D -- Demo Polish. A collapsible wrapper around the existing Card
 * component (native <details>/<summary>, no new dependency, no animation) --
 * presentation only, used to group the Officer Case Detail page's sections
 * per this sprint's readability requirement. Renders no data of its own.
 *
 * UI-01 -- adds an optional leading icon; existing callers that omit it
 * render exactly as before.
 */
export function CollapsibleCard({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: React.ReactNode;
  icon?: LucideIcon;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <details open={defaultOpen} className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-(--card-spacing) py-3 text-base font-medium [&::-webkit-details-marker]:hidden">
          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
          {Icon && <Icon className="size-4 shrink-0 text-primary" />}
          {title}
        </summary>
        <CardContent>{children}</CardContent>
      </details>
    </Card>
  );
}
