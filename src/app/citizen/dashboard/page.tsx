import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CASE_STAGE_LABEL } from "@/lib/case/stages";

export default async function CitizenDashboardPage() {
  const session = await getSession();
  const citizen = await prisma.citizen.findUnique({
    where: { userId: session!.sub },
    include: { cases: { include: { procedure: true }, orderBy: { updatedAt: "desc" } } },
  });

  const cases = citizen?.cases ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Your cases</h1>
        <p className="text-muted-foreground">
          Track every procedure you have open with the government, end to end.
        </p>
      </div>

      {cases.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            You don&apos;t have any open cases yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {cases.map((c) => (
            <Link key={c.id} href={`/citizen/cases/${c.id}`}>
              <Card className="transition hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    {c.procedure.name}
                    <Badge>{CASE_STAGE_LABEL[c.stage]}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Updated {c.updatedAt.toLocaleDateString()}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
