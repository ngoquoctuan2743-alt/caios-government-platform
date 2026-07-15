import { notFound } from "next/navigation";
import { FileClock, Gavel, ListChecks, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react";
import { getCaseForOfficer } from "@/lib/memory/case-memory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CASE_STAGE_LABEL, WORKFLOW_STATE_LABEL } from "@/lib/case/stages";
import { deriveDisplayCaseNumber } from "@/lib/case/case-summary";
import { LEGAL_SOURCES } from "@/lib/knowledge/citation-data";
import { AiDecisionTrace } from "./ai-decision-trace";
import { CollapsibleCard } from "./collapsible-card";

/**
 * Sprint 03A/03B/03C/03D -- Officer Case Detail (Case Summary Card, extended).
 * Read only, reuses the existing `getCaseForOfficer` mediator -- no new
 * Prisma query path, no schema change. Every section below renders only
 * already-persisted rows from Sprint 01F's tables and Sprint 02D's audit
 * trail; nothing is fabricated, inferred, or recalculated.
 *
 * Sprint 03D groups the page into 6 collapsible sections for readability
 * (Conversation, AI Decision, Eligibility, Checklist, Legal Citations,
 * Audit) and adds a compact Demo Summary panel -- presentation only, no data
 * change. The standalone "Procedure Resolution" card from Sprint 03B is
 * folded into the "AI Decision" group below, since `AiDecisionTrace`'s own
 * Step 2 already renders the identical persisted fields -- removing that
 * duplication is exactly this sprint's readability goal.
 */
export default async function OfficerCaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseRecord = await getCaseForOfficer(id);

  if (!caseRecord) notFound();

  const requiredDocuments = caseRecord.checklist.filter((item) => !item.optional);
  const optionalDocuments = caseRecord.checklist.filter((item) => item.optional);

  // Sprint 02D persists Eligibility results as an AuditEvent (no dedicated
  // table, per this sprint's own "no new tables" rule) -- the most recent
  // "eligibility.evaluated" event is read back as-is, fields only, never
  // recalculated.
  const eligibilityEvents = caseRecord.auditEvents.filter((event) => event.action === "eligibility.evaluated");
  const latestEligibility = eligibilityEvents[eligibilityEvents.length - 1];
  const eligibilityPayload = latestEligibility?.payload as
    | {
        status?: string;
        triggeredRules?: { ruleId: string; outcome: string; reason: string; confidence: string | null }[];
        missingInformation?: string[];
        confidence?: string | null;
      }
    | undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {deriveDisplayCaseNumber(caseRecord.id, caseRecord.createdAt)}
        </h1>
        <p className="text-muted-foreground">{caseRecord.procedure.name}</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Case Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <SummaryField label="Procedure" value={caseRecord.procedure.name} />
            <SummaryField label="Citizen" value={caseRecord.citizen.user.email} />
            <SummaryField label="Current Status" value={<Badge>{WORKFLOW_STATE_LABEL[caseRecord.workflowState]}</Badge>} />
            <SummaryField label="Workflow State" value={caseRecord.workflowState} />
            <SummaryField label="Case Stage" value={CASE_STAGE_LABEL[caseRecord.stage]} />
            <SummaryField label="Created Time" value={caseRecord.createdAt.toLocaleString()} />
            <SummaryField label="Updated Time" value={caseRecord.updatedAt.toLocaleString()} />
          </dl>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/[0.03] shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="size-4 text-primary" />
            Demo Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            <SummaryField label="Procedure" value={caseRecord.procedure.name} />
            <SummaryField label="Eligibility" value={eligibilityPayload?.status ?? "—"} />
            <SummaryField label="Checklist" value={`${caseRecord.checklist.length} item(s)`} />
            <SummaryField label="Legal Citations" value={`${caseRecord.citationResolutions.length} citation(s)`} />
            <SummaryField label="Current Workflow" value={caseRecord.workflowState} />
            <SummaryField label="Current Stage" value={CASE_STAGE_LABEL[caseRecord.stage]} />
            <SummaryField label="Audit Events" value={`${caseRecord.auditEvents.length} event(s)`} />
          </dl>
        </CardContent>
      </Card>

      <CollapsibleCard title="1. Conversation" icon={MessageSquareText}>
        <div className="space-y-4">
          {caseRecord.conversationTurns.length === 0 ? (
            <p className="text-sm text-muted-foreground">No conversation turns persisted yet.</p>
          ) : (
            caseRecord.conversationTurns.map((turn) => (
              <div key={turn.id} className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Turn {turn.turnNumber} · {turn.createdAt.toLocaleString()} · {turn.responseTimeMs}ms
                </p>
                <p className="text-sm">
                  <span className="font-medium">Citizen:</span> {turn.citizenMessage}
                </p>
                <p className="whitespace-pre-wrap text-sm">
                  <span className="font-medium">Assistant:</span> {turn.assistantResponse}
                </p>
              </div>
            ))
          )}
        </div>
      </CollapsibleCard>

      <CollapsibleCard title="2. AI Decision" icon={Sparkles}>
        <AiDecisionTrace caseRecord={caseRecord} />
      </CollapsibleCard>

      <CollapsibleCard title="3. Eligibility" icon={ShieldCheck}>
        {!eligibilityPayload ? (
          <p className="text-sm text-muted-foreground">No eligibility evaluation persisted yet.</p>
        ) : (
          <div className="space-y-3">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <SummaryField label="Status" value={<Badge>{eligibilityPayload.status ?? "—"}</Badge>} />
              <SummaryField label="Confidence" value={eligibilityPayload.confidence ?? "—"} />
              <SummaryField
                label="Missing Information"
                value={
                  eligibilityPayload.missingInformation && eligibilityPayload.missingInformation.length > 0
                    ? eligibilityPayload.missingInformation.join("; ")
                    : "None"
                }
              />
            </dl>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Triggered Rules</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule ID</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(eligibilityPayload.triggeredRules ?? []).map((rule) => (
                    <TableRow key={rule.ruleId}>
                      <TableCell>{rule.ruleId}</TableCell>
                      <TableCell>{rule.outcome}</TableCell>
                      <TableCell className="max-w-sm truncate">{rule.reason}</TableCell>
                      <TableCell>{rule.confidence ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CollapsibleCard>

      <CollapsibleCard title="4. Checklist" icon={ListChecks}>
        <div className="space-y-4">
          <ChecklistSection title="Required Documents" items={requiredDocuments} />
          <ChecklistSection title="Optional Documents" items={optionalDocuments} />
        </div>
      </CollapsibleCard>

      <CollapsibleCard title="5. Legal Citations" icon={Gavel}>
        {caseRecord.citationResolutions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No legal citations persisted yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Citation ID</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Citation Level</TableHead>
                <TableHead>Verification Status</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Traceability</TableHead>
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
                  <TableCell className="max-w-xs truncate">{citation.traceability.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CollapsibleCard>

      <CollapsibleCard title="6. Audit" icon={FileClock} defaultOpen={false}>
        <div className="space-y-3">
          {caseRecord.auditEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No audit events persisted yet.</p>
          ) : (
            caseRecord.auditEvents.map((event) => (
              <details key={event.id} className="rounded-md border p-3">
                <summary className="cursor-pointer text-sm font-medium">
                  {event.createdAt.toLocaleString()} · {event.actorType} · {event.action}
                </summary>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  {JSON.stringify(event.payload, null, 2)}
                </pre>
              </details>
            ))
          )}
        </div>
      </CollapsibleCard>
    </div>
  );
}

function SummaryField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  );
}

function ChecklistSection({
  title,
  items,
}: {
  title: string;
  items: { id: string; documentType: string; status: string }[];
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">{title}</p>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">None.</p>
      ) : (
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <span>{item.documentType}</span>
              <Badge variant={item.status === "VERIFIED" ? "secondary" : "outline"}>{item.status}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
