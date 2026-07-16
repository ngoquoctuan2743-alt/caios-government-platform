import { Suspense } from "react";
import { Landmark } from "lucide-react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Decorative glow -- pure CSS, no image, consistent with the Government
          Platform design system's "soft radial glow behind auth forms" motif
          (design-system/assets/backgrounds/AuthenticationBackground.tsx),
          reimplemented inline here rather than importing that package into
          the production app. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
      />

      <div className="relative flex w-full max-w-sm flex-col items-center">
        <div
          className="mb-8 flex items-center gap-2.5 text-[15px] font-semibold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary)_70%,black)] text-white shadow-soft">
            <Landmark className="size-4.5" strokeWidth={2} />
          </span>
          CAIOS — Citizen AI
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
