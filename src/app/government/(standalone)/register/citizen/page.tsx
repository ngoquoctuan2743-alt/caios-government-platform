"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AuthenticationBackground } from "@/components/government/assets/backgrounds"
import { GOV_ROUTES } from "@/components/government/routes"

export default function CitizenRegisterPage() {
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <AuthenticationBackground />
      </div>
      <div className="relative w-full max-w-xl">
        <button
          type="button"
          onClick={() => router.push(GOV_ROUTES.register)}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Quay lại
        </button>

        <Card className="shadow-xl">
          <CardContent className="space-y-5 py-8">
            <div>
              <h1 className="font-heading text-xl font-bold">Đăng ký tài khoản Công dân</h1>
              <p className="mt-1 text-sm text-muted-foreground">Thông tin sẽ được đối chiếu với Cơ sở dữ liệu quốc gia về dân cư.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Số CCCD" placeholder="012345678901" />
              <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
              <Input label="Ngày sinh" type="date" />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="citizen-gender" className="text-sm font-medium">
                  Giới tính
                </label>
                <select
                  id="citizen-gender"
                  className="h-8 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring"
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
              <Input label="Email" type="email" placeholder="ban@vidu.vn" />
              <Input label="Số điện thoại" placeholder="0901 234 567" />
            </div>

            <Input label="Địa chỉ thường trú" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Mật khẩu" type="password" placeholder="••••••••" />
              <Input label="Xác nhận mật khẩu" type="password" placeholder="••••••••" />
            </div>

            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-primary"
              />
              Tôi đồng ý với <span className="font-medium text-primary">Điều khoản sử dụng</span> và{" "}
              <span className="font-medium text-primary">Chính sách bảo mật</span>.
            </label>

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => router.push(GOV_ROUTES.register)}>
                Quay lại
              </Button>
              <Button variant="default" className="flex-1" disabled={!agreed} onClick={() => router.push(GOV_ROUTES.registerOtp)}>
                Tiếp tục
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
