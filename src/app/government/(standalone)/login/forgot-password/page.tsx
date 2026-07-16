"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AuthenticationBackground } from "@/components/government/assets/backgrounds"
import { GOV_ROUTES } from "@/components/government/routes"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [sent, setSent] = useState(false)

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute inset-0 opacity-50">
        <AuthenticationBackground />
      </div>
      <Card className="relative w-full max-w-sm">
        <CardContent className="py-10">
          <button
            type="button"
            onClick={() => router.push(GOV_ROUTES.login)}
            className="mb-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Quay lại đăng nhập
          </button>

          {sent ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]">
                <CheckCircle2 className="size-6" strokeWidth={2} />
              </span>
              <div>
                <h1 className="font-heading text-xl font-bold">Đã gửi liên kết</h1>
                <p className="mt-1.5 max-w-[32ch] text-sm text-muted-foreground">
                  Kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
                </p>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => router.push(GOV_ROUTES.login)}>
                Quay lại đăng nhập
              </Button>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-xl font-bold">Quên mật khẩu</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">Nhập email đã đăng ký — chúng tôi sẽ gửi liên kết đặt lại mật khẩu.</p>
              <div className="mt-6 space-y-4">
                <Input label="Email" placeholder="ban@vidu.vn" startIcon={<Mail className="size-4" />} />
                <Button variant="default" className="w-full" onClick={() => setSent(true)}>
                  Gửi liên kết đặt lại
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
