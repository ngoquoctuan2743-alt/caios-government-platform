import { useState } from "react";
import { Landmark, ScanLine, Lock, Mail } from "lucide-react";
import { Button, Input, Tabs, TabsList, TabsTrigger, TabsPanel } from "@ds/components";
import { AuthenticationBackground } from "@ds/assets/backgrounds";
import { AuthenticationIllustration } from "@ds/assets/illustrations";
import { GridPattern } from "@ds/assets/patterns";

export function AuthPage({
  onLogin,
  onForgotPassword,
}: {
  onLogin: () => void;
  onForgotPassword: () => void;
}) {
  const [method, setMethod] = useState<"password" | "identity">("password");

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden overflow-hidden bg-[var(--vdg-color-background)] lg:block">
        <div className="absolute inset-0">
          <AuthenticationBackground />
        </div>
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2.5 text-[15px] font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--vdg-color-primary)] to-[var(--vdg-color-primary-dark)] text-white">
              <Landmark className="size-4.5" strokeWidth={2} />
            </span>
            Cổng Dịch vụ công Số
          </div>
          <div className="mx-auto w-full max-w-sm">
            <AuthenticationIllustration />
          </div>
          <p className="max-w-sm text-sm text-[var(--vdg-color-text-secondary)]">
            Định danh và xác thực điện tử quốc gia — một tài khoản, kết nối mọi dịch vụ công.
          </p>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
            Đăng nhập
          </h1>
          <p className="mt-1.5 text-sm text-[var(--vdg-color-text-secondary)]">Truy cập tài khoản dịch vụ công của bạn.</p>

          <Tabs value={method} onValueChange={(v) => setMethod(v as "password" | "identity")} className="mt-8">
            <TabsList>
              <TabsTrigger value="password">Mật khẩu</TabsTrigger>
              <TabsTrigger value="identity">Định danh điện tử</TabsTrigger>
            </TabsList>

            <TabsPanel value="password" className="mt-6 space-y-4">
              <Input label="Số định danh cá nhân hoặc email" placeholder="012345678901" startIcon={<Mail className="size-4" />} />
              <Input label="Mật khẩu" type="password" placeholder="••••••••" startIcon={<Lock className="size-4" />} />
              <div className="flex justify-end">
                <button type="button" onClick={onForgotPassword} className="text-xs font-medium text-[var(--vdg-color-primary)] hover:underline">
                  Quên mật khẩu?
                </button>
              </div>
              <Button variant="primary" className="w-full" onClick={onLogin}>
                Đăng nhập
              </Button>
            </TabsPanel>

            <TabsPanel value="identity" className="mt-6">
              <div className="flex flex-col items-center gap-4 rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] p-6">
                <div className="relative size-40 overflow-hidden rounded-[var(--vdg-radius-md)] border border-[var(--vdg-color-border)]">
                  <GridPattern size={16} opacity={0.6} />
                  <ScanLine className="absolute inset-0 m-auto size-8 text-[var(--vdg-color-primary)]" />
                </div>
                <p className="text-center text-sm text-[var(--vdg-color-text-secondary)]">
                  Mở ứng dụng Định danh điện tử và quét mã để đăng nhập.
                </p>
                <Button variant="primary" className="w-full" onClick={onLogin}>
                  Tôi đã quét mã
                </Button>
              </div>
            </TabsPanel>
          </Tabs>

          <p className="mt-8 text-center text-xs text-[var(--vdg-color-text-secondary)]">
            Chưa có tài khoản? <span className="font-medium text-[var(--vdg-color-primary)]">Đăng ký ngay</span>
          </p>
        </div>
      </div>
    </div>
  );
}
