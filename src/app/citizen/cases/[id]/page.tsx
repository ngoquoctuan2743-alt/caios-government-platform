import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getCaseForCitizen } from "@/lib/memory/case-memory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CASE_STAGE_LABEL,
  CASE_STAGE_ORDER,
  stageIndex,
  WORKFLOW_STATE_LABEL,
} from "@/lib/case/stages";

export default async function CaseTimelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  const citizenCase = await getCaseForCitizen(id, session!.sub);

  if (!citizenCase) notFound();

  const currentIndex = stageIndex(citizenCase.stage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{citizenCase.procedure.name}</h1>
          <p className="text-muted-foreground">Case {citizenCase.id}</p>
        </div>
        <Badge variant="outline">{WORKFLOW_STATE_LABEL[citizenCase.workflowState]}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-wrap gap-2">
            {CASE_STAGE_ORDER.map((stage, i) => (
              <li key={stage}>
                <Badge variant={i <= currentIndex ? "default" : "outline"}>
                  {CASE_STAGE_LABEL[stage]}
                </Badge>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          {citizenCase.checklist.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No documents required yet — checklist is generated after eligibility is confirmed.
            </p>
          ) : (
            <ul className="space-y-2">
              {citizenCase.checklist.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
                  <span>{item.documentType}</span>
                  <Badge variant="secondary">{item.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {citizenCase.escalations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Escalations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {citizenCase.escalations.map((e) => (
              <div key={e.id} className="text-sm">
                <span className="font-medium">{e.status}</span> — {e.reason}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
