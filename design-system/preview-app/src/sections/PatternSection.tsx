import {
  GridPattern,
  HexagonPattern,
  DotMatrixPattern,
  DigitalMeshPattern,
  CircuitPattern,
  NodesPattern,
  ConnectionsPattern,
  WorkflowLinesPattern,
  AbstractVietnamPattern,
  LotusPattern,
  DongSonPattern,
  WavesPattern,
  CloudPattern,
  AINetworkPattern,
  GovernmentSecurityPattern,
  DataFlowPattern,
} from "@ds/assets/patterns";
import type { ComponentType } from "react";
import type { VdgPatternProps } from "@ds/assets/patterns";

const PATTERNS: { name: string; Component: ComponentType<VdgPatternProps> }[] = [
  { name: "Grid", Component: GridPattern },
  { name: "Hexagon", Component: HexagonPattern },
  { name: "Dot Matrix", Component: DotMatrixPattern },
  { name: "Digital Mesh", Component: DigitalMeshPattern },
  { name: "Circuit", Component: CircuitPattern },
  { name: "Nodes", Component: NodesPattern },
  { name: "Connections", Component: ConnectionsPattern },
  { name: "Workflow Lines", Component: WorkflowLinesPattern },
  { name: "Abstract Vietnam", Component: AbstractVietnamPattern },
  { name: "Lotus", Component: LotusPattern },
  { name: "Đông Sơn Geometry", Component: DongSonPattern },
  { name: "Waves", Component: WavesPattern },
  { name: "Cloud", Component: CloudPattern },
  { name: "AI Network", Component: AINetworkPattern },
  { name: "Government Security", Component: GovernmentSecurityPattern },
  { name: "Data Flow", Component: DataFlowPattern },
];

export function PatternSection() {
  return (
    <section className="border-b border-[var(--vdg-color-border)] py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              06 — Phase 2B · SVG Pattern Library
            </span>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Patterns
            </h2>
          </div>
          <p className="max-w-[40ch] text-sm text-[var(--vdg-color-text-secondary)]">
            16 tileable SVG <code>&lt;pattern&gt;</code> React components — no <code>id</code> prop required (auto via{" "}
            <code>useId()</code>). Opacity nâng lên 25% chỉ để xem thử — dùng thật ở 2–4% làm watermark nền.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3.5">
          {PATTERNS.map(({ name, Component }) => (
            <div key={name} className="overflow-hidden rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)]">
              <div className="relative h-24">
                <Component opacity={0.25} />
              </div>
              <div className="border-t border-[var(--vdg-color-border)] p-2.5 text-xs font-medium">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
