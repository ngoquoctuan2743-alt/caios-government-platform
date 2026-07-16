"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthenticationBackground } from "@/components/government/assets/backgrounds"
import { GOV_ROUTES } from "@/components/government/routes"

const DEMO_OTP = "123456"
const RESEND_SECONDS = 45

/** Registration OTP step. Demo code is always `123456` — any other 6 digits shows a real inline error instead of silently succeeding. */
export default function RegisterOtpPage() {
  const router = useRouter()
  const [digits, setDigits] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState(false)
  const [verified, setVerified] = useState(false)
  const [countdown, setCountdown] = useState(RESEND_SECONDS)

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  function handleChange(i: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1)
    setError(false)
    setDigits((prev) => prev.map((d, idx) => (idx === i ? v : d)))
    if (v && i < 5) document.getElementById(`reg-otp-${i + 1}`)?.focus()
  }

  function handleVerify() {
    const code = digits.join("")
    if (code !== DEMO_OTP) {
      setError(true)
      return
    }
    setVerified(true)
    setTimeout(() => router.push(GOV_ROUTES.registerSuccess), 700)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <AuthenticationBackground />
      </div>
      <Card className="relative w-full max-w-sm">
        <CardContent className="flex flex-col items-center gap-5 py-10 text-center">
          {verified ? (
            <>
              <span className="flex size-14 items-center justify-center rounded-full bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]">
                <CheckCircle2 className="size-7" strokeWidth={2} />
              </span>
              <h1 className="font-heading text-xl font-bold">Xác thực thành công</h1>
            </>
          ) : (
            <>
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="size-6" strokeWidth={2} />
              </span>
              <div>
                <h1 className="font-heading text-xl font-bold">Xác thực OTP</h1>
                <p className="mt-1.5 max-w-[30ch] text-sm text-muted-foreground">
                  Nhập mã 6 số vừa được gửi tới email/số điện thoại đăng ký. (Demo: <code className="font-mono">123456</code>)
                </p>
              </div>
              <div className="flex gap-2">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    id={`reg-otp-${i}`}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    inputMode="numeric"
                    maxLength={1}
                    className={
                      "size-11 rounded-md border bg-background text-center text-lg font-semibold outline-none transition-colors focus-visible:border-primary " +
                      (error ? "border-destructive" : "border-border")
                    }
                  />
                ))}
              </div>
              {error && <p className="text-sm text-destructive">Mã OTP không đúng, vui lòng thử lại.</p>}
              <Button variant="default" className="w-full" onClick={handleVerify}>
                Xác nhận
              </Button>
              <button
                type="button"
                disabled={countdown > 0}
                onClick={() => setCountdown(RESEND_SECONDS)}
                className="text-xs font-medium text-primary disabled:text-muted-foreground"
              >
                {countdown > 0 ? `Gửi lại mã (0:${countdown.toString().padStart(2, "0")})` : "Gửi lại mã"}
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
