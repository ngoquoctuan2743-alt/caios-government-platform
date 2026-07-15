import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button, Card, CardContent } from "@ds/components";
import { AuthenticationBackground } from "@ds/assets/backgrounds";

/** Second factor step after password/identity login — 6-digit OTP sent to the citizen's registered phone. */
export function MfaPage({ onVerify }: { onVerify: () => void }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);

  function handleChange(i: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => prev.map((d, idx) => (idx === i ? v : d)));
    if (v && i < 5) {
      document.getElementById(`mfa-${i + 1}`)?.focus();
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute inset-0 opacity-50">
        <AuthenticationBackground />
      </div>
      <Card variant="elevated" className="relative w-full max-w-sm">
        <CardContent className="flex flex-col items-center gap-5 py-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]">
            <ShieldCheck className="size-6" strokeWidth={2} />
          </span>
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Xác thực 2 lớp
            </h1>
            <p className="mt-1.5 max-w-[30ch] text-sm text-[var(--vdg-color-text-secondary)]">
              Nhập mã 6 số vừa được gửi tới số điện thoại kết thúc bằng •••92.
            </p>
          </div>
          <div className="flex gap-2">
            {digits.map((d, i) => (
              <input
                key={i}
                id={`mfa-${i}`}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                inputMode="numeric"
                maxLength={1}
                className="size-11 rounded-[var(--vdg-radius-sm)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] text-center text-lg font-semibold outline-none focus-visible:border-[var(--vdg-color-primary)] focus-visible:shadow-[var(--vdg-focus-ring)]"
              />
            ))}
          </div>
          <Button variant="primary" className="w-full" onClick={onVerify}>
            Xác nhận
          </Button>
          <button type="button" className="text-xs font-medium text-[var(--vdg-color-primary)] hover:underline">
            Gửi lại mã (0:47)
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
