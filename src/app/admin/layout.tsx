import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Role } from "@/generated/prisma/enums";
import { AppHeader } from "@/components/app-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || session.role !== Role.ADMIN) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <AppHeader title="Admin" roleLabel="Admin" email={session.email} />
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
