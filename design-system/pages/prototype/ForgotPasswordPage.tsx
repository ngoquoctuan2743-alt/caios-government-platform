import { useState } from "react";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button, Input, Card, CardContent } from "@ds/components";
import { AuthenticationBackground } from "@ds/assets/backgrounds";

export function ForgotPasswordPage({ onBack }: { onBack: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute inset-0 opacity-50">
        <AuthenticationBackground />
      </div>
      <Card variant="elevated" className="relative w-full max-w-sm">
        <CardContent className="py-10">
          <button type="button" onClick={onBack} className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[var(--vdg-color-text-secondary)] hover:text-[var(--vdg-color-text)]">
            <ArrowLeft className="size-4" /> Quay lại đăng nhập
          </button>

          {sent ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]">
                <CheckCircle2 className="size-6" strokeWidth={2} />
              </span>
              <div>
                <h1 className="text-xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                  Đã gửi liên kết
                </h1>
                <p className="mt-1.5 max-w-[32ch] text-sm text-[var(--vdg-color-text-secondary)]">
                  Kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
                </p>
              </div>
              <Button variant="secondary" className="w-full" onClick={onBack}>
                Quay lại đăng nhập
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                Quên mật khẩu
              </h1>
              <p className="mt-1.5 text-sm text-[var(--vdg-color-text-secondary)]">
                Nhập email đã đăng ký — chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
              </p>
              <div className="mt-6 space-y-4">
                <Input label="Email" placeholder="ban@vidu.vn" startIcon={<Mail className="size-4" />} />
                <Button variant="primary" className="w-full" onClick={() => setSent(true)}>
                  Gửi liên kết đặt lại
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
