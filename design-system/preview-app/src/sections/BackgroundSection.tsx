import {
  HeroBackground,
  DashboardBackground,
  AuthenticationBackground,
  WorkflowBackground,
  CitizenPortalBackground,
  BusinessPortalBackground,
  OfficerPortalBackground,
  AdminPortalBackground,
  SearchBackground,
  ReportsBackground,
  AIAssistantBackground,
  EmptyStateBackground,
  NotFoundBackground,
  ServerErrorBackground,
  SuccessBackground,
  WarningBackground,
  MaintenanceBackground,
} from "@ds/assets/backgrounds";
import type { ComponentType } from "react";
import type { VdgAssetProps } from "@ds/assets/backgrounds";

const BACKGROUNDS: { name: string; Component: ComponentType<VdgAssetProps> }[] = [
  { name: "Hero", Component: HeroBackground },
  { name: "Dashboard", Component: DashboardBackground },
  { name: "Authentication", Component: AuthenticationBackground },
  { name: "Workflow", Component: WorkflowBackground },
  { name: "Citizen Portal", Component: CitizenPortalBackground },
  { name: "Business Portal", Component: BusinessPortalBackground },
  { name: "Officer Portal", Component: OfficerPortalBackground },
  { name: "Admin Portal", Component: AdminPortalBackground },
  { name: "Search", Component: SearchBackground },
  { name: "Reports", Component: ReportsBackground },
  { name: "AI Assistant", Component: AIAssistantBackground },
  { name: "Empty State", Component: EmptyStateBackground },
  { name: "404", Component: NotFoundBackground },
  { name: "500", Component: ServerErrorBackground },
  { name: "Success", Component: SuccessBackground },
  { name: "Warning", Component: WarningBackground },
  { name: "Maintenance", Component: MaintenanceBackground },
];

export function BackgroundSection() {
  return (
    <section className="border-b border-[var(--vdg-color-border)] py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              05 — Phase 2A · SVG Background Library
            </span>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Backgrounds
            </h2>
          </div>
          <p className="max-w-[40ch] text-sm text-[var(--vdg-color-text-secondary)]">
            17 full-scene SVG React components — responsive (<code>viewBox</code> + <code>preserveAspectRatio</code>),
            theme-aware by default. Hiển thị đúng độ mờ thật sự dùng trong sản phẩm (không phóng đại).
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {BACKGROUNDS.map(({ name, Component }) => (
            <div key={name} className="overflow-hidden rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-background)]">
              <div className="relative h-36">
                <Component />
              </div>
              <div className="border-t border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] p-2.5 text-xs font-medium">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
