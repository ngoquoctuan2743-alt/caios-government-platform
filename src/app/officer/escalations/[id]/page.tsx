import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function EscalationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const escalation = await prisma.escalation.findUnique({
    where: { id },
    include: { case: { include: { procedure: true, citizen: true } } },
  });

  if (!escalation) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{escalation.case.procedure.name}</h1>
        <p className="text-muted-foreground">Escalation {escalation.id}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            Reason
            <Badge variant={escalation.status === "OPEN" ? "destructive" : "secondary"}>
              {escalation.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">{escalation.reason}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Context package</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
            {JSON.stringify(escalation.contextPackage, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
