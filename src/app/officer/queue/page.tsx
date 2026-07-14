import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/generated/prisma/enums";

export default async function EscalationQueuePage() {
  const session = await getSession();

  const escalations = await prisma.escalation.findMany({
    where: {
      status: { in: ["OPEN", "IN_REVIEW"] },
      ...(session!.role === Role.OFFICER && session!.jurisdiction
        ? { case: { citizen: { user: { jurisdiction: session!.jurisdiction } } } }
        : {}),
    },
    include: { case: { include: { procedure: true, citizen: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Escalation queue</h1>
        <p className="text-muted-foreground">
          Cases the AI agent routed to a human because of low confidence or a
          gap it could not resolve on its own.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case</TableHead>
            <TableHead>Procedure</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {escalations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No open escalations.
              </TableCell>
            </TableRow>
          ) : (
            escalations.map((e) => (
              <TableRow key={e.id}>
                <TableCell>
                  <Link className="underline underline-offset-2" href={`/officer/escalations/${e.id}`}>
                    {e.caseId.slice(0, 8)}
                  </Link>
                </TableCell>
                <TableCell>{e.case.procedure.name}</TableCell>
                <TableCell className="max-w-xs truncate">{e.reason}</TableCell>
                <TableCell>
                  {e.confidence != null ? `${Math.round(e.confidence * 100)}%` : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={e.status === "OPEN" ? "destructive" : "secondary"}>
                    {e.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
