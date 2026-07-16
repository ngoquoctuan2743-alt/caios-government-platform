"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Landmark, ScanLine, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AuthenticationBackground } from "@/components/government/assets/backgrounds"
import { AuthenticationIllustration } from "@/components/government/assets/illustrations"
import { GridPattern } from "@/components/government/assets/patterns"
import { GOV_ROUTES } from "@/components/government/routes"

export default function GovernmentLoginPage() {
  const router = useRouter()
  const [method, setMethod] = useState<"password" | "identity">("password")

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-background lg:block">
        <div className="absolute inset-0">
          <AuthenticationBackground />
        </div>
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href={GOV_ROUTES.home} className="flex items-center gap-2.5 font-heading text-[15px] font-bold">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),black_25%)] text-primary-foreground">
              <Landmark className="size-4.5" strokeWidth={2} />
            </span>
            Cổng Dịch vụ công Số
          </Link>
          <div className="mx-auto w-full max-w-sm">
            <AuthenticationIllustration />
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Định danh và xác thực điện tử quốc gia — một tài khoản, kết nối mọi dịch vụ công.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="font-heading text-2xl font-bold">Đăng nhập</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Truy cập tài khoản dịch vụ công của bạn.</p>

          <Tabs value={method} onValueChange={(v) => setMethod(v as "password" | "identity")} className="mt-8">
            <TabsList>
              <TabsTrigger value="password">Mật khẩu</TabsTrigger>
              <TabsTrigger value="identity">Định danh điện tử</TabsTrigger>
            </TabsList>

            <TabsContent value="password" className="mt-6 space-y-4">
              <Input label="Số định danh cá nhân hoặc email" placeholder="012345678901" startIcon={<Mail className="size-4" />} />
              <Input label="Mật khẩu" type="password" placeholder="••••••••" startIcon={<Lock className="size-4" />} />
              <div className="flex justify-end">
                <Link href={GOV_ROUTES.forgotPassword} className="text-xs font-medium text-primary hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button variant="default" className="w-full" onClick={() => router.push(GOV_ROUTES.mfa)}>
                Đăng nhập
              </Button>
            </TabsContent>

            <TabsContent value="identity">
              <div className="flex flex-col items-center gap-4 rounded-lg border border-border p-6">
                <div className="relative size-40 overflow-hidden rounded-md border border-border">
                  <GridPattern size={16} opacity={0.6} />
                  <ScanLine className="absolute inset-0 m-auto size-8 text-primary" />
                </div>
                <p className="text-center text-sm text-muted-foreground">Mở ứng dụng Định danh điện tử và quét mã để đăng nhập.</p>
                <Button variant="default" className="w-full" onClick={() => router.push(GOV_ROUTES.mfa)}>
                  Tôi đã quét mã
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link href={GOV_ROUTES.register} className="font-medium text-primary">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
