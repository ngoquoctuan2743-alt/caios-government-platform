import { logout } from "@/app/logout/actions";

export function SignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        Sign out
      </button>
    </form>
  );
}
