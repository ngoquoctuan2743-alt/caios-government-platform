import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button, Input, Card, CardContent } from "@ds/components";
import { AuthenticationBackground } from "@ds/assets/backgrounds";

export function CitizenRegisterPage({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <AuthenticationBackground />
      </div>
      <div className="relative w-full max-w-xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[var(--vdg-color-text-secondary)] hover:text-[var(--vdg-color-text)]"
        >
          <ArrowLeft className="size-4" /> Quay lại
        </button>

        <Card variant="solid" className="shadow-[var(--vdg-shadow-xl)]">
          <CardContent className="space-y-5 py-8">
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                Đăng ký tài khoản Công dân
              </h1>
              <p className="mt-1 text-sm text-[var(--vdg-color-text-secondary)]">Thông tin sẽ được đối chiếu với Cơ sở dữ liệu quốc gia về dân cư.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Số CCCD" placeholder="012345678901" />
              <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
              <Input label="Ngày sinh" type="date" />
              <div className="space-y-1.5">
                <label htmlFor="citizen-gender" className="text-sm font-medium">
                  Giới tính
                </label>
                <select
                  id="citizen-gender"
                  className="h-10 w-full rounded-[var(--vdg-radius-sm)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] px-3 text-sm outline-none focus-visible:border-[var(--vdg-color-primary)]"
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

            <label className="flex items-start gap-2.5 text-sm text-[var(--vdg-color-text-secondary)]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[var(--vdg-color-primary)]"
              />
              Tôi đồng ý với{" "}
              <span className="font-medium text-[var(--vdg-color-primary)]">Điều khoản sử dụng</span> và{" "}
              <span className="font-medium text-[var(--vdg-color-primary)]">Chính sách bảo mật</span>.
            </label>

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={onBack}>
                Quay lại
              </Button>
              <Button variant="primary" className="flex-1" disabled={!agreed} onClick={onContinue}>
                Tiếp tục
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
