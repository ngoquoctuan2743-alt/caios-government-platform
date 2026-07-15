import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { listCasesForCitizen } from "@/lib/memory/case-memory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CASE_STAGE_LABEL } from "@/lib/case/stages";

export default async function CitizenDashboardPage() {
  const session = await getSession();
  const cases = await listCasesForCitizen(session!.sub);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Your cases</h1>
          <p className="text-muted-foreground">
            Track every procedure you have open with the government, end to end.
          </p>
        </div>
        <Button render={<Link href="/citizen/cases/new" />}>Start a new case</Button>
      </div>

      {cases.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
            <p>You don&apos;t have any open cases yet.</p>
            <Button variant="outline" render={<Link href="/citizen/cases/new" />}>
              Start your first case
            </Button>
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
