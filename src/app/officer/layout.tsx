import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Role } from "@/generated/prisma/enums";
import { AppHeader } from "@/components/app-header";

export default async function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || (session.role !== Role.OFFICER && session.role !== Role.ADMIN)) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <AppHeader title="Officer Console" roleLabel={session.role} email={session.email} />
      <nav className="flex gap-4 border-b px-6 py-2 text-sm">
        <Link href="/officer/dashboard" className="text-foreground/70 hover:text-foreground">
          Dashboard
        </Link>
        <Link href="/officer/queue" className="text-foreground/70 hover:text-foreground">
          Escalation Queue
        </Link>
      </nav>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
