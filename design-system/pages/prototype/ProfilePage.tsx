import { Pencil, KeyRound, LogOut, IdCard, MapPin, Mail, Phone } from "lucide-react";
import { Avatar, Badge, Button, Card, CardHeader, CardTitle, CardContent } from "@ds/components";

const PERSONAL = [
  { label: "Họ và tên", value: "Nguyễn Văn A" },
  { label: "Ngày sinh", value: "12/05/1990" },
  { label: "Giới tính", value: "Nam" },
];

const CCCD = [
  { label: "Số CCCD", value: "012345678901" },
  { label: "Ngày cấp", value: "15/03/2021" },
  { label: "Nơi cấp", value: "Cục Cảnh sát QLHC về TTXH" },
];

const CONTACT = [
  { icon: MapPin, label: "Địa chỉ", value: "12 Láng Hạ, Ba Đình, Hà Nội" },
  { icon: Mail, label: "Email", value: "nguyenvana@vidu.vn" },
  { icon: Phone, label: "Điện thoại", value: "0901 234 567" },
];

export function ProfilePage({ onChangePassword, onLogout }: { onChangePassword: () => void; onLogout: () => void }) {
  return (
    <div className="mx-auto max-w-[840px] space-y-6 px-6 py-10">
      <Card variant="solid">
        <CardContent className="flex flex-wrap items-center gap-5 py-8">
          <Avatar size="xl" fallback="A" />
          <div className="flex-1">
            <h1 className="text-xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Nguyễn Văn A
            </h1>
            <p className="text-sm text-[var(--vdg-color-text-secondary)]">nguyenvana@vidu.vn</p>
            <Badge variant="success" className="mt-2">
              Đã xác thực Định danh điện tử
            </Badge>
          </div>
          <div className="flex gap-2.5">
            <Button variant="secondary" data-icon="inline-start">
              <Pencil className="size-4" /> Chỉnh sửa
            </Button>
            <Button variant="outline" onClick={onChangePassword} data-icon="inline-start">
              <KeyRound className="size-4" /> Đổi mật khẩu
            </Button>
            <Button variant="danger" onClick={onLogout} data-icon="inline-start">
              <LogOut className="size-4" /> Đăng xuất
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="solid">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PERSONAL.map((f) => (
              <div key={f.label} className="flex items-center justify-between text-sm">
                <span className="text-[var(--vdg-color-text-secondary)]">{f.label}</span>
                <span className="font-medium">{f.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card variant="solid">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdCard className="size-4 text-[var(--vdg-color-primary)]" /> Thông tin CCCD
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {CCCD.map((f) => (
              <div key={f.label} className="flex items-center justify-between text-sm">
                <span className="text-[var(--vdg-color-text-secondary)]">{f.label}</span>
                <span className="font-medium">{f.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card variant="solid">
        <CardHeader>
          <CardTitle>Thông tin liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {CONTACT.map((c) => (
            <div key={c.label} className="flex items-center gap-3 text-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]">
                <c.icon className="size-3.5" />
              </span>
              <span className="w-24 shrink-0 text-[var(--vdg-color-text-secondary)]">{c.label}</span>
              <span className="font-medium">{c.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
