import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Role } from "@/generated/prisma/enums";
import { AppHeader } from "@/components/app-header";

export default async function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || session.role !== Role.CITIZEN) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <AppHeader title="Citizen Portal" roleLabel="Citizen" email={session.email} />
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}
