"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BusinessPortalBackground } from "@/components/government/assets/backgrounds"
import { GOV_ROUTES } from "@/components/government/routes"

const SECTORS = ["Công nghệ thông tin", "Thương mại - Dịch vụ", "Xây dựng", "Sản xuất", "Nông nghiệp", "Khác"]

export default function BusinessRegisterPage() {
  const router = useRouter()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <BusinessPortalBackground />
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
              <h1 className="font-heading text-xl font-bold">Đăng ký tài khoản Doanh nghiệp</h1>
              <p className="mt-1 text-sm text-muted-foreground">Dùng thông tin đăng ký kinh doanh hợp lệ để xác thực tổ chức.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Mã số doanh nghiệp" placeholder="0312345678" />
              <Input label="Tên doanh nghiệp" placeholder="Công ty TNHH Công nghệ Sao Việt" />
              <Input label="Người đại diện pháp luật" placeholder="Nguyễn Văn A" />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="business-sector" className="text-sm font-medium">
                  Lĩnh vực hoạt động
                </label>
                <select
                  id="business-sector"
                  className="h-8 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring"
                >
                  {SECTORS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <Input label="Email" type="email" placeholder="lienhe@congty.vn" />
              <Input label="Số điện thoại" placeholder="0901 234 567" />
            </div>

            <Input label="Địa chỉ trụ sở" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
            <Input label="Mật khẩu" type="password" placeholder="••••••••" />

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => router.push(GOV_ROUTES.register)}>
                Quay lại
              </Button>
              <Button variant="default" className="flex-1" onClick={() => router.push(GOV_ROUTES.registerOtp)}>
                Tiếp tục
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
