import { SignOutButton } from "@/components/sign-out-button";
import { Badge } from "@/components/ui/badge";

export function AppHeader({
  title,
  roleLabel,
  email,
}: {
  title: string;
  roleLabel: string;
  email: string;
}) {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-3">
        <span className="font-semibold">OAK Citizen AI</span>
        <Badge variant="secondary">{title}</Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {email} · {roleLabel}
        </span>
        <SignOutButton />
      </div>
    </header>
  );
}
