import {
  CheckCircle2,
  CircleDashed,
  FileText,
  Gavel,
  ListChecks,
  MessageSquareText,
  Save,
  ShieldCheck,
  SkipForward,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LEGAL_SOURCES } from "@/lib/knowledge/citation-data";
import type { getCaseForOfficer } from "@/lib/memory/case-memory";

/**
 * Sprint 03C -- AI Decision Trace & Explainability.
 *
 * Visualization only: every value below is read directly from an
 * already-persisted record already fetched by `getCaseForOfficer()`
 * (Sprint 03A/03B). Nothing here recomputes, infers, or fabricates a fact --
 * this component only reshapes already-fetched data into the 7-step
 * execution order this sprint requires. No new Prisma query, no new table.
 */

type CaseRecord = NonNullable<Awaited<ReturnType<typeof getCaseForOfficer>>>;

interface ConversationStateAuditPayload {
  currentProcedureId: string | null;
  knownFacts: { factName: string; value: unknown; sourceTurnNumber: number; capturedAt: string; confidence: string }[];
  missingFacts: string[];
  pendingQuestion: { question: string; missingFact: string; ruleId: string; traceability: string[] } | null;
}

interface EligibilityAuditPayload {
  status?: string;
  triggeredRules?: { ruleId: string; outcome: string; reason: string; confidence: string | null }[];
  missingInformation?: string[];
  confidence?: string | null;
}

export function AiDecisionTrace({ caseRecord }: { caseRecord: CaseRecord }) {
  const conversationStateEvents = caseRecord.auditEvents.filter(
    (event) => event.action === "conversation_state.advanced",
  );
  const eligibilityEvents = caseRecord.auditEvents.filter((event) => event.action === "eligibility.evaluated");

  // STEP 3 -- Clarification: every distinct question ever posed, in the
  // order it first appeared, plus the most recent (most complete) set of
  // captured facts -- both read directly from the same
  // "conversation_state.advanced" AuditEvent payloads Sprint 02D already
  // writes every turn; nothing here is a new computation.
  const questionsAsked: string[] = [];
  for (const event of conversationStateEvents) {
    const payload = event.payload as unknown as ConversationStateAuditPayload;
    const question = payload.pendingQuestion?.question;
    if (question && !questionsAsked.includes(question)) {
      questionsAsked.push(question);
    }
  }
  const latestConversationState = conversationStateEvents[conversationStateEvents.length - 1]?.payload as
    | unknown as ConversationStateAuditPayload
    | undefined;
  const capturedFacts = latestConversationState?.knownFacts ?? [];

  const latestEligibility = eligibilityEvents[eligibilityEvents.length - 1]?.payload as
    | unknown as EligibilityAuditPayload
    | undefined;

  const requiredDocuments = caseRecord.checklist.filter((item) => !item.optional);
  const optionalDocuments = caseRecord.checklist.filter((item) => item.optional);

  const hasTurns = caseRecord.conversationTurns.length > 0;
  const hasProcedure = caseRecord.procedureResolutions.length > 0;

  // Sprint 03D -- deterministic per-stage status, read only from whether a
  // stage's own persisted record(s) exist. No interpretation of *why* a
  // stage has no record -- COMPLETED means a record exists; SKIPPED means a
  // later stage nonetheless has a record (so this one was bypassed, not
  // pending); UNKNOWN means neither can be determined from persisted state.
  const stage1Status: StageStatus = hasTurns ? "COMPLETED" : "UNKNOWN";
  const stage2Status: StageStatus = hasProcedure ? "COMPLETED" : hasTurns ? "SKIPPED" : "UNKNOWN";
  const stage3Status: StageStatus =
    questionsAsked.length > 0 && capturedFacts.length > 0
      ? "COMPLETED"
      : questionsAsked.length === 0 && hasProcedure
        ? "SKIPPED"
        : "UNKNOWN";
  const stage4Status: StageStatus = eligibilityEvents.length > 0 ? "COMPLETED" : hasProcedure ? "UNKNOWN" : "SKIPPED";
  const stage5Status: StageStatus =
    caseRecord.checklist.length > 0 ? "COMPLETED" : hasProcedure ? "UNKNOWN" : "SKIPPED";
  const stage6Status: StageStatus =
    caseRecord.citationResolutions.length > 0 ? "COMPLETED" : hasProcedure ? "UNKNOWN" : "SKIPPED";
  const stage7Status: StageStatus = hasTurns ? "COMPLETED" : "UNKNOWN";

  return (
    <details open className="rounded-md border p-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-base font-semibold [&::-webkit-details-marker]:hidden">
        <Sparkles className="size-4 text-primary" />
        Why did AI decide this?
      </summary>
      <p className="mt-2 text-sm text-muted-foreground">
        Every value below is read directly from a persisted record for this Case -- nothing is recomputed, inferred,
        or generated for this view.
      </p>

      <div className="mt-5 space-y-0">
        <TraceStep number={1} title="Citizen Message" icon={MessageSquareText} status={stage1Status}>
          {caseRecord.conversationTurns.length === 0 ? (
            <Empty />
          ) : (
            <ul className="space-y-1 text-sm">
              {caseRecord.conversationTurns.map((turn) => (
                <li key={turn.id}>
                  <span className="text-muted-foreground">
                    Turn {turn.turnNumber} · {turn.createdAt.toLocaleString()}:
                  </span>{" "}
                  {turn.citizenMessage}
                </li>
              ))}
            </ul>
          )}
        </TraceStep>

        <TraceStep number={2} title="Recognized Procedure" icon={FileText} status={stage2Status}>
          {caseRecord.procedureResolutions.length === 0 ? (
            <Empty />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Procedure ID</TableHead>
                  <TableHead>Matched Phrase</TableHead>
                  <TableHead>Matched Source</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Traceability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseRecord.procedureResolutions.map((resolution) => (
                  <TableRow key={resolution.id}>
                    <TableCell>{resolution.procedureId}</TableCell>
                    <TableCell className="max-w-xs truncate">{resolution.matchedPhrase}</TableCell>
                    <TableCell>{resolution.source}</TableCell>
                    <TableCell>{resolution.confidence}</TableCell>
                    {/* No dedicated `traceability` field is persisted on
                        ProcedureResolution (unlike CitationResolution, which
                        has one) -- the authored phrase this match traces back
                        to is the same Matched Phrase value already shown. */}
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {resolution.matchedPhrase} (Sprint 01B deterministic match)
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TraceStep>

        <TraceStep number={3} title="Clarification" icon={MessageSquareText} status={stage3Status}>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Questions Asked</p>
              {questionsAsked.length === 0 ? <Empty /> : (
                <ul className="list-inside list-disc">
                  {questionsAsked.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Questions Answered / Captured Facts</p>
              {capturedFacts.length === 0 ? (
                <Empty />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fact</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Source Turn</TableHead>
                      <TableHead>Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capturedFacts.map((fact) => (
                      <TableRow key={fact.factName}>
                        <TableCell>{fact.factName}</TableCell>
                        <TableCell>{String(fact.value)}</TableCell>
                        <TableCell>{fact.sourceTurnNumber}</TableCell>
                        <TableCell>{fact.confidence}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </TraceStep>

        <TraceStep number={4} title="Eligibility" icon={ShieldCheck} status={stage4Status}>
          {!latestEligibility ? (
            <Empty />
          ) : (
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-4">
                <span>
                  <span className="text-xs font-medium text-muted-foreground">Status: </span>
                  <Badge>{latestEligibility.status ?? "—"}</Badge>
                </span>
                <span>
                  <span className="text-xs font-medium text-muted-foreground">Confidence: </span>
                  {latestEligibility.confidence ?? "—"}
                </span>
                <span>
                  <span className="text-xs font-medium text-muted-foreground">Missing Facts: </span>
                  {latestEligibility.missingInformation && latestEligibility.missingInformation.length > 0
                    ? latestEligibility.missingInformation.join("; ")
                    : "None"}
                </span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule ID</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(latestEligibility.triggeredRules ?? []).map((rule) => (
                    <TableRow key={rule.ruleId}>
                      <TableCell>{rule.ruleId}</TableCell>
                      <TableCell>{rule.outcome}</TableCell>
                      <TableCell className="max-w-sm truncate">{rule.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TraceStep>

        <TraceStep number={5} title="Checklist" icon={ListChecks} status={stage5Status}>
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Required Documents</p>
              {requiredDocuments.length === 0 ? (
                <Empty />
              ) : (
                <ul className="list-inside list-disc">
                  {requiredDocuments.map((item) => (
                    <li key={item.id}>
                      {item.documentType} — <span className="text-muted-foreground">{item.source ?? "—"}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Optional Documents</p>
              {optionalDocuments.length === 0 ? (
                <Empty />
              ) : (
                <ul className="list-inside list-disc">
                  {optionalDocuments.map((item) => (
                    <li key={item.id}>
                      {item.documentType} — <span className="text-muted-foreground">{item.source ?? "—"}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </TraceStep>

        <TraceStep number={6} title="Legal Citations" icon={Gavel} status={stage6Status}>
          {caseRecord.citationResolutions.length === 0 ? (
            <Empty />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Citation ID</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Citation Level</TableHead>
                  <TableHead>Verification Status</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseRecord.citationResolutions.map((citation) => (
                  <TableRow key={citation.id}>
                    <TableCell>{citation.citationId}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {LEGAL_SOURCES[citation.citationId]?.lawName ?? "—"}
                    </TableCell>
                    <TableCell>{citation.citationLevel}</TableCell>
                    <TableCell>{citation.verificationStatus}</TableCell>
                    <TableCell>{citation.confidence}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TraceStep>

        <TraceStep number={7} title="Persistence" icon={Save} status={stage7Status} isLast>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            <li>Conversation Turns: {caseRecord.conversationTurns.length} record(s)</li>
            <li>Checklist Items: {caseRecord.checklist.length} record(s)</li>
            <li>Procedure Resolutions: {caseRecord.procedureResolutions.length} record(s)</li>
            <li>Citation Resolutions: {caseRecord.citationResolutions.length} record(s)</li>
            <li>Audit Events: {caseRecord.auditEvents.length} record(s)</li>
          </ul>
        </TraceStep>
      </div>
    </details>
  );
}

type StageStatus = "COMPLETED" | "SKIPPED" | "UNKNOWN";

function stageStatusBadgeVariant(status: StageStatus): "default" | "secondary" | "outline" {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "SKIPPED":
      return "secondary";
    case "UNKNOWN":
    default:
      return "outline";
  }
}

const STAGE_STATUS_DOT: Record<StageStatus, string> = {
  COMPLETED: "bg-primary text-primary-foreground",
  SKIPPED: "bg-secondary text-secondary-foreground",
  UNKNOWN: "bg-muted text-muted-foreground",
};

function StageStatusIcon({ status }: { status: StageStatus }) {
  if (status === "COMPLETED") return <CheckCircle2 className="size-3.5" />;
  if (status === "SKIPPED") return <SkipForward className="size-3.5" />;
  return <CircleDashed className="size-3.5" />;
}

function TraceStep({
  number,
  title,
  icon: Icon,
  status,
  isLast = false,
  children,
}: {
  number: number;
  title: string;
  icon: LucideIcon;
  status: StageStatus;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && <span className="absolute top-8 bottom-0 left-4 w-px bg-border" aria-hidden />}
      <div
        className={cn(
          "z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-background",
          STAGE_STATUS_DOT[status]
        )}
      >
        <StageStatusIcon status={status} />
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Icon className="size-3.5 text-foreground/70" />
          Step {number} · {title}
          <Badge variant={stageStatusBadgeVariant(status)}>{status}</Badge>
        </p>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-muted-foreground">No persisted record yet.</p>;
}
