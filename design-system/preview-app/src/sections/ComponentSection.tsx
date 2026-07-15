import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import {
  Avatar,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Badge,
  Button,
  Card,
  CardContent,
  EmptyState,
  Input,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalClose,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanel,
} from "@ds/components";

/** Every control below is the real, imported component — nothing here is a re-drawn CSS mockup. */
export function ComponentSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              04 — Component lõi
            </span>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Components
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm text-[var(--vdg-color-text-secondary)]">
            Import trực tiếp từ <code>design-system/components</code> — kiểm tra bằng bàn phím (Tab) để tự đánh giá khả năng tiếp cận.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          <DemoCard title="Button">
            <div className="flex flex-wrap gap-2.5">
              <Button variant="primary">Nộp hồ sơ</Button>
              <Button variant="secondary">Lưu nháp</Button>
              <Button variant="outline">Xem chi tiết</Button>
              <Button variant="ghost">Huỷ</Button>
              <Button variant="danger">Từ chối</Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              <Button variant="primary" loading>
                Đang gửi
              </Button>
              <Button variant="primary" disabled>
                Vô hiệu hoá
              </Button>
            </div>
          </DemoCard>

          <DemoCard title="Badge / Tag">
            <div className="flex flex-wrap gap-2">
              <Badge variant="neutral">Bản nháp</Badge>
              <Badge variant="primary">Đang xử lý</Badge>
              <Badge variant="success">Đã duyệt</Badge>
              <Badge variant="warning">Cần bổ sung</Badge>
              <Badge variant="danger">Từ chối</Badge>
              <Badge variant="info">Thông tin</Badge>
              <Badge variant="gold">Ưu tiên</Badge>
            </div>
          </DemoCard>

          <DemoCard title="Input">
            <div className="flex flex-col gap-4">
              <Input label="Số định danh cá nhân" placeholder="012345678901" helperText="Gồm 12 chữ số, in trên CCCD" />
              <Input label="Email liên hệ" defaultValue="khong-hop-le" errorText="Địa chỉ email không hợp lệ" />
            </div>
          </DemoCard>

          <DemoCard title="Avatar">
            <div className="flex items-center gap-3">
              <Avatar fallback="NV" />
              <Avatar fallback="CB" className="bg-[color-mix(in_srgb,var(--vdg-color-primary)_12%,transparent)] text-[var(--vdg-color-primary)]" />
              <Avatar size="sm" fallback="DN" />
              <Avatar size="xl" fallback="AI" />
            </div>
          </DemoCard>

          <DemoCardTabs />

          <DemoCard title="Empty State">
            <EmptyState
              icon={<Inbox className="size-5" />}
              title="Chưa có hồ sơ nào"
              description="Hồ sơ sẽ hiện tại đây khi công dân bắt đầu yêu cầu."
            />
          </DemoCard>

          <DemoCard title="Table" span2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã hồ sơ</TableHead>
                  <TableHead>Công dân</TableHead>
                  <TableHead>Thủ tục</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">CP-2026-014822</TableCell>
                  <TableCell>Nguyễn Văn A</TableCell>
                  <TableCell>Cấp lại CCCD</TableCell>
                  <TableCell>
                    <Badge variant="success">Đã duyệt</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">CP-2026-014901</TableCell>
                  <TableCell>Trần Thị B</TableCell>
                  <TableCell>Đăng ký kinh doanh</TableCell>
                  <TableCell>
                    <Badge variant="primary">Đang xử lý</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">CP-2026-015002</TableCell>
                  <TableCell>Lê Văn C</TableCell>
                  <TableCell>Đổi hộ khẩu</TableCell>
                  <TableCell>
                    <Badge variant="warning">Cần bổ sung</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DemoCard>

          <DemoCard title="Skeleton">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-[70%]" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-[40%]" />
            </div>
          </DemoCard>

          <DemoCard title="Accordion">
            <Accordion>
              <AccordionItem value="docs">
                <AccordionTrigger>Hồ sơ cần chuẩn bị gì?</AccordionTrigger>
                <AccordionPanel>CCCD hiện tại, ảnh chân dung 4x6, tờ khai theo mẫu.</AccordionPanel>
              </AccordionItem>
              <AccordionItem value="time">
                <AccordionTrigger>Thời gian xử lý bao lâu?</AccordionTrigger>
                <AccordionPanel>7 ngày làm việc kể từ khi hồ sơ hợp lệ.</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DemoCard>

          <DemoCard title="Card variants" span2>
            <div className="flex flex-wrap items-stretch gap-3">
              <Card variant="solid" className="min-w-[180px] flex-1">
                <CardContent>
                  <div className="text-sm font-semibold">Solid</div>
                  <div className="mt-1 text-xs text-[var(--vdg-color-text-secondary)]">Nền + viền + bóng nhẹ</div>
                </CardContent>
              </Card>
              <Card variant="elevated" className="min-w-[180px] flex-1">
                <CardContent>
                  <div className="text-sm font-semibold">Elevated</div>
                  <div className="mt-1 text-xs text-[var(--vdg-color-text-secondary)]">Không viền, bóng sâu hơn</div>
                </CardContent>
              </Card>
              <Card variant="glass" className="min-w-[180px] flex-1">
                <CardContent>
                  <div className="text-sm font-semibold">Glass (chỉ light mode)</div>
                  <div className="mt-1 text-xs text-[var(--vdg-color-text-secondary)]">Tự chuyển phẳng ở dark mode</div>
                </CardContent>
              </Card>
            </div>
          </DemoCard>

          <DemoCard title="Modal" span2>
            <Modal>
              <ModalTrigger render={<Button variant="primary" />}>Mở modal xác nhận</ModalTrigger>
              <ModalContent title="Xác nhận nộp hồ sơ" description="Hồ sơ sẽ được gửi tới cán bộ thụ lý sau khi xác nhận.">
                <div className="flex gap-2.5">
                  <ModalClose render={<Button variant="primary" size="sm" />}>Xác nhận</ModalClose>
                  <ModalClose render={<Button variant="secondary" size="sm" />}>Huỷ</ModalClose>
                </div>
              </ModalContent>
            </Modal>
          </DemoCard>
        </div>
      </div>
    </section>
  );
}

function DemoCardTabs() {
  return (
    <DemoCard title="Tabs">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="workflow">Quy trình</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
        </TabsList>
        <TabsPanel value="profile" className="pt-3 text-[var(--vdg-color-text-secondary)]">
          Thông tin cá nhân, giấy tờ tuỳ thân.
        </TabsPanel>
        <TabsPanel value="workflow" className="pt-3 text-[var(--vdg-color-text-secondary)]">
          Các bước xử lý hồ sơ hiện tại.
        </TabsPanel>
        <TabsPanel value="history" className="pt-3 text-[var(--vdg-color-text-secondary)]">
          Lịch sử thao tác trên hồ sơ.
        </TabsPanel>
      </Tabs>
    </DemoCard>
  );
}

function DemoCard({ title, span2, children }: { title: string; span2?: boolean; children: ReactNode }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] p-6"
      style={span2 ? { gridColumn: "span 2" } : undefined}
    >
      <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--vdg-color-text-secondary)]">{title}</h4>
      {children}
    </div>
  );
}
