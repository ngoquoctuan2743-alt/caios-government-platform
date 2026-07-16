"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthenticationBackground } from "@/components/government/assets/backgrounds"
import { GOV_ROUTES } from "@/components/government/routes"

/** Second factor after password/identity login — 6-digit OTP, demo accepts any input. */
export default function GovernmentMfaPage() {
  const router = useRouter()
  const [digits, setDigits] = useState(["", "", "", "", "", ""])

  function handleChange(i: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1)
    setDigits((prev) => prev.map((d, idx) => (idx === i ? v : d)))
    if (v && i < 5) document.getElementById(`mfa-${i + 1}`)?.focus()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute inset-0 opacity-50">
        <AuthenticationBackground />
      </div>
      <Card className="relative w-full max-w-sm">
        <CardContent className="flex flex-col items-center gap-5 py-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-6" strokeWidth={2} />
          </span>
          <div>
            <h1 className="font-heading text-xl font-bold">Xác thực 2 lớp</h1>
            <p className="mt-1.5 max-w-[30ch] text-sm text-muted-foreground">
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
                className="size-11 rounded-md border border-border bg-background text-center text-lg font-semibold outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            ))}
          </div>
          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              router.push(GOV_ROUTES.citizen)
            }}
          >
            Xác nhận
          </Button>
          <button type="button" className="text-xs font-medium text-primary hover:underline">
            Gửi lại mã (0:47)
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
