import { Button, Card, CardContent } from "@ds/components";
import { SuccessBackground } from "@ds/assets/backgrounds";

export function RegisterSuccessPage({ onLogin, onHome }: { onLogin: () => void; onHome: () => void }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0">
        <SuccessBackground />
      </div>
      <Card variant="elevated" className="vdg-in relative w-full max-w-sm">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
            Tài khoản đã được tạo
          </h1>
          <p className="max-w-[32ch] text-sm text-[var(--vdg-color-text-secondary)]">
            Bạn có thể đăng nhập ngay để bắt đầu sử dụng Cổng Dịch vụ công Số.
          </p>
          <div className="mt-4 flex w-full flex-col gap-2.5">
            <Button variant="primary" className="w-full" onClick={onLogin}>
              Đăng nhập
            </Button>
            <Button variant="secondary" className="w-full" onClick={onHome}>
              Trang chủ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
