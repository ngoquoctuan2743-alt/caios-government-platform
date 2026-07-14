import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminHomePage() {
  const [procedureCount, legalSourceCount, openEscalations] = await Promise.all([
    prisma.procedure.count(),
    prisma.legalSource.count(),
    prisma.escalation.count({ where: { status: "OPEN" } }),
  ]);

  const stats = [
    { label: "Procedures", value: procedureCount },
    { label: "Legal sources", value: legalSourceCount },
    { label: "Open escalations", value: openEscalations },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-muted-foreground">
          Procedure definitions, rule sets, and legal source ingestion (Phase 3+).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{s.value}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
