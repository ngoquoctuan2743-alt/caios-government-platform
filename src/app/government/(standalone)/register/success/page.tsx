"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SuccessBackground } from "@/components/government/assets/backgrounds"
import { GOV_ROUTES } from "@/components/government/routes"

export default function RegisterSuccessPage() {
  const router = useRouter()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0">
        <SuccessBackground />
      </div>
      <Card className="relative w-full max-w-sm">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <h1 className="font-heading text-2xl font-bold">Tài khoản đã được tạo</h1>
          <p className="max-w-[32ch] text-sm text-muted-foreground">Bạn có thể đăng nhập ngay để bắt đầu sử dụng Cổng Dịch vụ công Số.</p>
          <div className="mt-4 flex w-full flex-col gap-2.5">
            <Button variant="default" className="w-full" onClick={() => router.push(GOV_ROUTES.login)}>
              Đăng nhập
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => router.push(GOV_ROUTES.home)}>
              Trang chủ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
