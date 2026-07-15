"use client";

import { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/case/case-summary";
import type { CaseSummary } from "./case-init";

export function CaseSummaryCard({ summary }: { summary: CaseSummary }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-3 shadow-soft">
      <CardContent className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <FolderOpen className="size-4 text-primary" />
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Case</p>
            <p className="font-medium">{summary.displayNumber}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
            <Badge variant="secondary">{summary.status}</Badge>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Stage</p>
            <p className="font-medium">{summary.stage}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Created</p>
            <p className="font-medium">{formatRelativeTime(summary.createdAt, now)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
