import { useState, type ReactNode } from "react";
import { Moon, Sun, Bell, ShieldCheck, Monitor, Smartphone, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@ds/components";

/**
 * Local, unexported toggle switch -- deliberately not added to
 * design-system/components (Demo Freeze covers the core catalog). Styled
 * entirely from existing tokens (radius-full, primary/border colors), same
 * pattern already used for the raw checkbox/select in the registration
 * forms -- a native-input primitive styled inline, not a new design
 * language addition.
 */
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={
        "relative h-6 w-11 shrink-0 rounded-[var(--vdg-radius-full)] transition-colors " +
        (checked ? "bg-[var(--vdg-color-primary)]" : "bg-[var(--vdg-color-border)]")
      }
    >
      <span
        className={"absolute top-0.5 size-5 rounded-full bg-white shadow-[var(--vdg-shadow-sm)] transition-transform " + (checked ? "translate-x-5.5" : "translate-x-0.5")}
      />
    </button>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="mt-0.5 text-xs text-[var(--vdg-color-text-secondary)]">{description}</div>}
      </div>
      {children}
    </div>
  );
}

const SESSIONS = [
  { device: "Chrome trên Windows", icon: Monitor, location: "Hà Nội, Việt Nam", current: true },
  { device: "Safari trên iPhone", icon: Smartphone, location: "Hồ Chí Minh, Việt Nam", current: false },
];

export function SettingsPage({
  theme,
  onToggleTheme,
  locale,
  onToggleLocale,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  locale: "vi" | "en";
  onToggleLocale: () => void;
}) {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  const [sms, setSms] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [sessions, setSessions] = useState(SESSIONS);

  return (
    <div className="mx-auto max-w-[720px] space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
          Cài đặt
        </h1>
        <p className="mt-1 text-sm text-[var(--vdg-color-text-secondary)]">Quản lý giao diện, ngôn ngữ, thông báo và quyền riêng tư.</p>
      </div>

      <Card variant="solid">
        <CardHeader>
          <CardTitle>Giao diện &amp; Ngôn ngữ</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-[var(--vdg-color-border)]">
          <SettingRow label="Chế độ hiển thị" description={theme === "dark" ? "Đang bật: Tối" : "Đang bật: Sáng"}>
            <Button variant="secondary" size="sm" onClick={onToggleTheme} data-icon="inline-start">
              {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              {theme === "dark" ? "Sáng" : "Tối"}
            </Button>
          </SettingRow>
          <SettingRow label="Ngôn ngữ" description={locale === "vi" ? "Tiếng Việt" : "English"}>
            <Button variant="secondary" size="sm" onClick={onToggleLocale}>
              {locale === "vi" ? "🇻🇳 VI → 🇺🇸 EN" : "🇺🇸 EN → 🇻🇳 VI"}
            </Button>
          </SettingRow>
        </CardContent>
      </Card>

      <Card variant="solid">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-4 text-[var(--vdg-color-primary)]" /> Thông báo
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-[var(--vdg-color-border)]">
          <SettingRow label="Email" description="Nhận cập nhật hồ sơ qua email">
            <Toggle checked={email} onChange={setEmail} label="Thông báo qua email" />
          </SettingRow>
          <SettingRow label="Thông báo đẩy" description="Nhận thông báo trên trình duyệt/ứng dụng">
            <Toggle checked={push} onChange={setPush} label="Thông báo đẩy" />
          </SettingRow>
          <SettingRow label="SMS" description="Nhận mã OTP và cập nhật khẩn qua SMS">
            <Toggle checked={sms} onChange={setSms} label="Thông báo qua SMS" />
          </SettingRow>
        </CardContent>
      </Card>

      <Card variant="solid">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[var(--vdg-color-primary)]" /> Quyền riêng tư
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-[var(--vdg-color-border)]">
          <SettingRow label="Hiển thị hồ sơ với cán bộ thụ lý" description="Cán bộ xử lý hồ sơ có thể xem thông tin cơ bản">
            <Toggle checked={profileVisible} onChange={setProfileVisible} label="Hiển thị hồ sơ" />
          </SettingRow>
          <SettingRow label="Chia sẻ dữ liệu để cải thiện dịch vụ" description="Dữ liệu ẩn danh, không dùng cho mục đích khác">
            <Toggle checked={dataSharing} onChange={setDataSharing} label="Chia sẻ dữ liệu" />
          </SettingRow>
        </CardContent>
      </Card>

      <Card variant="solid">
        <CardHeader>
          <CardTitle>Quản lý phiên đăng nhập</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map((s) => (
            <div key={s.device} className="flex items-center justify-between gap-3 rounded-[var(--vdg-radius-sm)] border border-[var(--vdg-color-border)] px-3 py-2.5 text-sm">
              <span className="flex items-center gap-2.5">
                <s.icon className="size-4 text-[var(--vdg-color-text-secondary)]" />
                <span>
                  <span className="font-medium">{s.device}</span>
                  <span className="block text-xs text-[var(--vdg-color-text-secondary)]">{s.location}</span>
                </span>
              </span>
              {s.current ? (
                <span className="text-xs font-medium text-[var(--vdg-color-success)]">Phiên hiện tại</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setSessions((prev) => prev.filter((x) => x.device !== s.device))}
                  className="flex items-center gap-1 text-xs font-medium text-[var(--vdg-color-danger)] hover:underline"
                >
                  <X className="size-3.5" /> Đăng xuất
                </button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
