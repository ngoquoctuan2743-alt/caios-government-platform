"use client";

import { useState } from "react";
import { ChevronDown, CircleCheck, FileText, Gavel, ListChecks, MessageCircleQuestion, ScanSearch, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SendMessageResult } from "./actions";

/**
 * Presentation only: every field read here is already returned by
 * `sendMessage` (itself a passthrough of the deterministic pipeline's own
 * output). Nothing is computed, inferred, or fabricated -- this only reshapes
 * already-produced values into badges and a step timeline for the chat UI.
 */

const CONFIDENCE_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

export function AiTurnMeta({ meta }: { meta: SendMessageResult }) {
  const [open, setOpen] = useState(false);
  const awaitingReply = meta.conversationStatus === "AWAITING_CLARIFICATION_REPLY";

  const steps = [
    { label: "Understood your message", icon: ScanSearch, done: true },
    { label: "Procedure recognized", icon: FileText, done: Boolean(meta.procedureId) },
    {
      label: awaitingReply ? "Asking a clarifying question" : "Clarification complete",
      icon: MessageCircleQuestion,
      done: !awaitingReply,
    },
    { label: "Checklist generated", icon: ListChecks, done: meta.checklistGenerated },
    { label: "Legal citations resolved", icon: Gavel, done: meta.citationCount > 0 },
    { label: "Response composed", icon: Sparkles, done: true },
  ];

  return (
    <div className="w-full space-y-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        {meta.procedureId && <Badge variant="outline">{meta.procedureId}</Badge>}
        {meta.aiConfidence && (
          <Badge variant={CONFIDENCE_VARIANT[meta.aiConfidence] ?? "outline"}>{meta.aiConfidence} confidence</Badge>
        )}
        {meta.citationCount > 0 && (
          <Badge variant="outline">
            {meta.citationCount} citation{meta.citationCount === 1 ? "" : "s"}
          </Badge>
        )}
        {meta.checklistGenerated && <Badge variant="outline">Checklist ready</Badge>}
        <Badge variant={meta.conversationStatus === "READY" ? "secondary" : "outline"}>
          {meta.conversationStatus === "READY" ? "Ready" : "Awaiting your reply"}
        </Badge>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex items-center gap-1 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-expanded={open}
        >
          AI steps
          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        </button>
      </div>

      {open && (
        <ol className="space-y-1 rounded-md border bg-muted/20 p-2.5 text-xs">
          {steps.map((step) => (
            <li key={step.label} className="flex items-center gap-2">
              {step.done ? (
                <CircleCheck className="size-3.5 shrink-0 text-primary" />
              ) : (
                <step.icon className="size-3.5 shrink-0 text-muted-foreground" />
              )}
              <span className={step.done ? "text-foreground" : "text-muted-foreground"}>{step.label}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
