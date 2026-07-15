import Link from "next/link";
import {
  AlertTriangle,
  Archive,
  CheckCircle2,
  Clock,
  Eye,
  Inbox,
  LayoutGrid,
  Search,
} from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { listCasesForOfficer } from "@/lib/memory/case-memory";
import { Role } from "@/generated/prisma/enums";
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
import { cn } from "@/lib/utils";
import { CASE_STAGE_LABEL } from "@/lib/case/stages";
import { deriveDisplayCaseNumber } from "@/lib/case/case-summary";
import {
  bucketForWorkflowState,
  CASE_BUCKET_LABEL,
  deriveDemoStatus,
  DEMO_STATUS_LABEL,
  type CaseBucket,
  type DemoStatus,
} from "@/lib/case/officer-dashboard";

const QUICK_FILTERS: (CaseBucket | "ALL")[] = ["PENDING", "IN_REVIEW", "ESCALATED", "COMPLETED", "ALL"];

const QUICK_FILTER_ICON: Record<CaseBucket | "ALL", typeof LayoutGrid> = {
  ALL: LayoutGrid,
  PENDING: Clock,
  IN_REVIEW: Eye,
  ESCALATED: AlertTriangle,
  COMPLETED: CheckCircle2,
  CLOSED: Archive,
};

const STAT_CARD_ICON: Record<CaseBucket | "TOTAL", typeof LayoutGrid> = {
  TOTAL: LayoutGrid,
  PENDING: Clock,
  IN_REVIEW: Eye,
  ESCALATED: AlertTriangle,
  COMPLETED: CheckCircle2,
  CLOSED: Archive,
};

/**
 * Sprint 03D -- color only, no new status: each of the 6 requested demo
 * statuses maps to one of this design system's existing Badge variants.
 */
function demoStatusBadgeVariant(status: DemoStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "ESCALATED":
      return "destructive";
    case "IN_REVIEW":
      return "default";
    case "READY":
    case "COMPLETED":
    case "CLOSED":
      return "secondary";
    case "CLARIFICATION":
    case "PENDING":
    default:
      return "outline";
  }
}

export default async function OfficerDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; q?: string }>;
}) {
  const { filter, q } = await searchParams;
  const session = await getSession();

  const jurisdiction = session!.role === Role.OFFICER ? session!.jurisdiction ?? undefined : undefined;
  const cases = await listCasesForOfficer(jurisdiction);

  // Sprint 03D -- a single, targeted, batched read (not a change to
  // `case-memory.ts`) of each case's own latest already-persisted
  // "conversation_state.advanced" AuditEvent, used only to color-refine the
  // existing PENDING bucket for display -- see `deriveDemoStatus`.
  const latestConversationStateEvents =
    cases.length === 0
      ? []
      : await prisma.auditEvent.findMany({
          where: { caseId: { in: cases.map((c) => c.id) }, action: "conversation_state.advanced" },
          orderBy: { createdAt: "desc" },
          distinct: ["caseId"],
        });
  const demoStatusByCaseId = new Map<string, DemoStatus>();
  for (const c of cases) {
    const event = latestConversationStateEvents.find((e) => e.caseId === c.id);
    const payload = event?.payload as
      | { conversationStatus?: "READY" | "AWAITING_CLARIFICATION_REPLY"; currentProcedureId?: string | null }
      | undefined;
    demoStatusByCaseId.set(
      c.id,
      deriveDemoStatus(c.workflowState, payload?.conversationStatus ?? null, Boolean(payload?.currentProcedureId)),
    );
  }

  // Stats always reflect this officer's full jurisdiction scope -- never the
  // currently applied filter/search, so the counts stay stable reference
  // points while browsing.
  const stats: Record<CaseBucket, number> = {
    PENDING: 0,
    IN_REVIEW: 0,
    ESCALATED: 0,
    COMPLETED: 0,
    CLOSED: 0,
  };
  for (const c of cases) {
    stats[bucketForWorkflowState(c.workflowState)] += 1;
  }

  const activeFilter = (filter ?? "ALL").toUpperCase();
  const searchTerm = (q ?? "").trim().toLowerCase();

  const visibleCases = cases.filter((c) => {
    if (activeFilter !== "ALL" && bucketForWorkflowState(c.workflowState) !== activeFilter) {
      return false;
    }
    if (searchTerm.length === 0) return true;
    const caseNumber = deriveDisplayCaseNumber(c.id, c.createdAt).toLowerCase();
    const citizenEmail = c.citizen.user.email.toLowerCase();
    const procedureName = c.procedure.name.toLowerCase();
    return (
      caseNumber.includes(searchTerm) || citizenEmail.includes(searchTerm) || procedureName.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Officer Dashboard</h1>
        <p className="text-muted-foreground">
          Cases the AI agent has prepared, ready for government officer review.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total Cases" value={cases.length} bucket="TOTAL" />
        <StatCard label="Pending" value={stats.PENDING} bucket="PENDING" />
        <StatCard label="In Review" value={stats.IN_REVIEW} bucket="IN_REVIEW" />
        <StatCard label="Escalated" value={stats.ESCALATED} bucket="ESCALATED" />
        <StatCard label="Completed" value={stats.COMPLETED} bucket="COMPLETED" />
        <StatCard label="Closed" value={stats.CLOSED} bucket="CLOSED" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex flex-wrap gap-1.5" aria-label="Quick filters">
          {QUICK_FILTERS.map((bucket) => {
            const isActive = activeFilter === bucket;
            const label = bucket === "ALL" ? "All" : CASE_BUCKET_LABEL[bucket];
            const href = bucket === "ALL" ? "/officer/dashboard" : `/officer/dashboard?filter=${bucket}`;
            const Icon = QUICK_FILTER_ICON[bucket];
            return (
              <Link
                key={bucket}
                href={href}
                data-icon="inline-start"
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground/70 hover:bg-muted"
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <form className="relative flex items-center" action="/officer/dashboard">
          {activeFilter !== "ALL" && <input type="hidden" name="filter" value={activeFilter} />}
          <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search case number, citizen, or procedure"
            aria-label="Search cases"
            className="h-9 w-72 rounded-full border bg-background pr-3 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </form>
      </div>

      {cases.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-14 text-center text-muted-foreground">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Inbox className="size-6" />
            </div>
            <p className="font-medium text-foreground">No cases yet.</p>
            <p className="max-w-sm text-sm">Cases will appear here once citizens begin conversations with the AI agent.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Cases</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case Number</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead>Procedure</TableHead>
                  <TableHead>Current Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Officer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No cases match this filter or search.
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleCases.map((c) => {
                    const demoStatus = demoStatusByCaseId.get(c.id) ?? "PENDING";
                    return (
                      <TableRow key={c.id}>
                        <TableCell>
                          <Link
                            className="font-medium text-primary underline-offset-2 hover:underline"
                            href={`/officer/cases/${c.id}`}
                          >
                            {deriveDisplayCaseNumber(c.id, c.createdAt)}
                          </Link>
                        </TableCell>
                        <TableCell>{c.citizen.user.email}</TableCell>
                        <TableCell>{c.procedure.name}</TableCell>
                        <TableCell>{CASE_STAGE_LABEL[c.stage]}</TableCell>
                        <TableCell>
                          <Badge variant={demoStatusBadgeVariant(demoStatus)}>{DEMO_STATUS_LABEL[demoStatus]}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{c.createdAt.toLocaleDateString()}</TableCell>
                        {/* Priority and Officer are not persisted fields on Case
                            today -- honestly shown as unassigned rather than a
                            fabricated value; see the sprint report's Known Issues. */}
                        <TableCell className="text-muted-foreground">Not tracked</TableCell>
                        <TableCell className="text-muted-foreground">Unassigned</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  bucket,
}: {
  label: string;
  value: number;
  bucket: CaseBucket | "TOTAL";
}) {
  const Icon = STAT_CARD_ICON[bucket];
  return (
    <Card size="sm" className="shadow-soft">
      <CardContent className="flex items-center gap-3 py-1">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            bucket === "ESCALATED" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
          )}
        >
          <Icon className="size-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold leading-none">{value}</span>
          <span className="mt-1 text-xs text-muted-foreground">{label}</span>
        </div>
      </CardContent>
    </Card>
  );
}
