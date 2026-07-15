import {
  CitizenIllustration,
  BusinessIllustration,
  GovernmentOfficerIllustration,
  AIAssistantIllustration,
  WorkflowIllustration,
  DigitalDocumentsIllustration,
  DigitalSignatureIllustration,
  PaymentIllustration,
  NotificationIllustration,
  AnalyticsIllustration,
  AuthenticationIllustration,
  EmptyStatesIllustration,
  SmartSearchIllustration,
  SupportCenterIllustration,
  SmartCityIllustration,
  NationalDataPlatformIllustration,
} from "@ds/assets/illustrations";
import type { ComponentType } from "react";
import type { VdgAssetProps } from "@ds/assets/illustrations";

const ILLUSTRATIONS: { name: string; Component: ComponentType<VdgAssetProps> }[] = [
  { name: "Citizen", Component: CitizenIllustration },
  { name: "Business", Component: BusinessIllustration },
  { name: "Government Officer", Component: GovernmentOfficerIllustration },
  { name: "AI Assistant", Component: AIAssistantIllustration },
  { name: "Workflow", Component: WorkflowIllustration },
  { name: "Digital Documents", Component: DigitalDocumentsIllustration },
  { name: "Digital Signature", Component: DigitalSignatureIllustration },
  { name: "Payment", Component: PaymentIllustration },
  { name: "Notification", Component: NotificationIllustration },
  { name: "Analytics", Component: AnalyticsIllustration },
  { name: "Authentication", Component: AuthenticationIllustration },
  { name: "Empty States", Component: EmptyStatesIllustration },
  { name: "Smart Search", Component: SmartSearchIllustration },
  { name: "Support Center", Component: SupportCenterIllustration },
  { name: "Smart City", Component: SmartCityIllustration },
  { name: "National Data Platform", Component: NationalDataPlatformIllustration },
];

export function IllustrationSection() {
  return (
    <section className="border-b border-[var(--vdg-color-border)] py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              08 — Phase 2C · Illustration Library
            </span>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Illustrations
            </h2>
          </div>
          <p className="max-w-[40ch] text-sm text-[var(--vdg-color-text-secondary)]">
            16 flat SVG illustrations — mỗi cái tái sử dụng ít nhất một pattern đã tạo ở trên, không phải stock art.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
          {ILLUSTRATIONS.map(({ name, Component }) => (
            <div key={name} className="overflow-hidden rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)]">
              <div className="aspect-square p-3">
                <Component />
              </div>
              <div className="border-t border-[var(--vdg-color-border)] p-2.5 text-xs font-medium">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
