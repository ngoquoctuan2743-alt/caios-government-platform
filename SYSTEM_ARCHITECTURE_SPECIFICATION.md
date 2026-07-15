# SYSTEM_ARCHITECTURE_SPECIFICATION.md
### The System Architecture Specification — Volume 37
**Version:** 1.0
**Status:** Approved
**Class:** Specification — **not** a Constitution. This document translates the Constitutional Core into architectural structure; it does not establish new principles, and where any architectural choice below appears to conflict with a Constitution, the Constitution governs and this document is revised.
**Precedence:** Numbered Volume 37 per **ADR-0009** rather than Volume 04 — Volume 04 remains the real, Approved `TECHNICAL_PRD`, frozen per ADR-0007/0008. This document's authoring brief referred to it as "Volume 04"; ADR-0009 generalizes the Volume 01–35 freeze established for Constitutions (ADR-0008) to Specifications as well, so this is a new, sequentially appended volume, not a reassignment.
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, and Volume 04 (`TECHNICAL_PRD`), whose stack-specific choices this document deliberately does not restate or depend on.
**Ownership:** Owner — Enterprise Architect · Architect — Chief Enterprise Architect / Solution Architect / GovTech Platform Architect · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | This revision | Architecture Review | Initial authorship. Authoring brief referred to this as "Volume 04"; reconciled to Volume 37 per newly-recorded ADR-0009, which generalizes the Volume 01–35 freeze (ADR-0008) from Constitutions specifically to every future volume, Constitution or Specification alike. |

---

## Preface

Volume 04 (`TECHNICAL_PRD`) already made the necessary early stack choices — Next.js, Prisma, LangGraph, a vector database, and the rest — so that Phase 0 could actually be built. This document is deliberately not a rewrite of that choice. It is the layer above it: the bounded contexts, domain model, subsystem boundaries, and cross-cutting architectural strategies that must remain true **even if every one of Volume 04's specific technology choices is later replaced**, per `PRODUCT_CONSTITUTION.md` Chapter 12's requirement that architecture survive a full technology swap.

Where Volume 04 answers "what do we build this with," this Specification answers "what shape does the system have, and why" — a shape derived entirely from the Constitutional Core, never from any framework's own conventions.

---

## 1. Architecture Goals

Derived directly from the Constitutional Core, not asserted independently:

- **Never permit a code path where AI output becomes binding without a human officer's action in between** (`GOVERNMENT_CONSTITUTION.md` Chapter 3; `PRODUCT_CONSTITUTION.md` Chapter 12).
- **Make every legal or factual claim structurally traceable to a retrieved source** — a property of the architecture's data flow, not a convention any single component is trusted to uphold voluntarily (`LEGAL_INTELLIGENCE_CONSTITUTION.md`).
- **Add a new administrative procedure through configuration, never through a new code path** (`WORKFLOW_CONSTITUTION.md`; `PRODUCT_CONSTITUTION.md` Chapter 11).
- **Keep every AI model or vendor swappable without a governance rewrite** (`PRODUCT_CONSTITUTION.md` Chapter 12; `MASTER_INDEX.md` §8).
- **Scale citizen-facing and officer-facing surfaces independently**, matching their genuinely different load patterns (`GOVERNMENT_CONSTITUTION.md` Chapter 9).
- **Make every action attributable and auditable by default**, not as an opt-in capability (`GOVERNMENT_CONSTITUTION.md` Chapter 5; `TRUST_CONSTITUTION.md` Chapter 4).
- **Never require a citizen to have a smartphone, literacy, or fluent Vietnamese to complete a procedure** (`CITIZEN_CONSTITUTION.md` Chapter 4) — an architectural constraint on every citizen-facing surface, not a design preference.

## 2. Architecture Principles

Operationalizing `PRODUCT_CONSTITUTION.md` Chapter 12, plus architecture-specific additions:

- **Prefer reversible decisions** — favor integration patterns and data contracts that can be changed later over ones that lock in irreversibly.
- **Configuration over new code paths** — a procedure, jurisdiction, or rule is data consumed by a generic engine, never a bespoke branch of logic.
- **No governance dependency on a vendor choice** — every external AI provider, cloud service, or database is replaceable behind a stable internal contract.
- **Survive a full technology swap** — an architectural decision that would need to be re-justified after replacing the model, database, or hosting platform was never really an architecture decision.
- **Explicit bounded contexts** — each major domain (Chapter 4) owns its own model and vocabulary; no context reaches into another's internal data structures directly.
- **Contract-first integration boundaries** — every boundary between subsystems, and between CAIOS and any external government system, is defined by an explicit, stable contract, never by incidental behavior one side happens to rely on.
- **Defense in depth** — no single layer is trusted as the sole enforcement point for a security or governance guarantee already established constitutionally.
- **Observability as a first-class concern** — every subsystem emits enough signal to support the audit, traceability, and trust-metric requirements of `TRUST_CONSTITUTION.md` and `SUCCESS_METRICS_CONSTITUTION.md`, not added after the fact.

## 3. High-Level System Context

```
                    ┌─────────────┐
                    │   Citizen    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────────────────────────┐
                    │        CAIOS Platform            │
                    │  (Case Management + AI + Human    │
                    │   Interaction + Government         │
                    │   Integration layers)              │
                    └──┬──────────┬──────────┬──────────┘
                       │          │          │
                ┌──────▼───┐ ┌────▼─────┐ ┌──▼─────────────┐
                │  Officer  │ │  Legal    │ │ National Digital │
                │ (via      │ │  Source    │ │ Identity /       │
                │ Console)  │ │  Authority │ │ Other Gov Systems │
                └───────────┘ └───────────┘ └───────────────────┘
```

CAIOS sits between the citizen and the institutions of government, never in place of either. Every external actor in this context — the citizen, the officer, the legal source authority, and any partner government system — retains its own authority; CAIOS mediates, prepares, and routes, per the relationship chain in `GOVERNMENT_CONSTITUTION.md` Chapter 1.

## 4. Bounded Contexts

Each context owns its own model and exposes only a stable contract to the others — no context reaches into another's internal structures.

- **Case Management Context** — the citizen's case, its lifecycle state, and checklist; the system of record for "where is this case right now."
- **Legal Knowledge Context** — the legal source corpus, its hierarchy, versioning, and citation formatting; owns nothing about any specific citizen's case.
- **Identity & Access Context** — citizens, officers, admins, and their roles; the sole authority on "who is allowed to do what."
- **Officer Workspace Context** — escalation queues, context packages, and override records; consumes Case Management and Legal Knowledge, owns neither.
- **Notification Context** — channel selection and delivery timing; consumes case-state changes, owns no case data itself.
- **Analytics & Reporting Context** — aggregated, anonymized signal only; structurally forbidden from exposing any single citizen's case, per `AI_OPERATING_SYSTEM.md` Chapter 4.
- **Escalation Context** — the trigger detection and context-package assembly that hands a case from AI preparation to human judgment.

## 5. Domain Architecture

The core domain concepts — Citizen, Case, Procedure, Checklist Item, Legal Source, Escalation, Audit Event, User/Role — relate exactly as described in `WORKFLOW_CONSTITUTION.md` §9's Relationship Diagram and `MASTER_INDEX.md` §9. This Specification adds one architectural requirement to that model: every one of these domain concepts is owned by exactly one bounded context (Chapter 4 above), and every cross-context reference (e.g., a Case referencing a Legal Source) is by stable identifier, never by direct structural coupling — this is what allows the Legal Knowledge Context to evolve its internal representation without forcing a change on Case Management, and vice versa.

## 6. AI Subsystems

The twelve agents defined in `AI_OPERATING_SYSTEM.md` Chapter 3 map onto seven architectural subsystems. This chapter places them in the architecture; it does not redefine their behavior, which remains exclusively governed by `AI_OPERATING_SYSTEM.md`.

- **Orchestration Subsystem** — the Planner Agent; the only subsystem permitted to sequence calls to every other AI subsystem, enforcing the workflow state machine (`WORKFLOW_CONSTITUTION.md`).
- **Legal Reasoning Subsystem** — the Legal Agent and Citation Agent; the only subsystem permitted to assert a legal claim, always gated by retrieval.
- **Document Intelligence Subsystem** — the OCR Agent and Validation Agent; the only subsystem permitted to mark a document or eligibility fact as verified.
- **Risk & Analytics Subsystem** — the Risk Agent and Analytics Agent; produces flags and aggregate signal, never a citizen-facing accusation or an individually-identifying report.
- **Communication Subsystem** — the Citizen Agent and Notification Agent; the only subsystems permitted to generate citizen-facing language, ensuring one consistent voice.
- **Escalation Subsystem** — the Escalation Agent; the sole path by which a case crosses from AI preparation into human decision-making.
- **Memory Subsystem** — the Memory Agent; the sole mediator of every read and write to case, citizen, conversation, and legal memory, enforcing the isolation and retention rules in `AI_OPERATING_SYSTEM.md` Chapter 4.

No subsystem above calls an external AI model directly without going through this layering — this is what keeps any specific vendor swappable per Architecture Goal 4, and what keeps `MASTER_INDEX.md` §8's AI Consumption Order enforceable in practice, not just on paper.

## 7. Human Interaction Layer

Three distinct presentation surfaces, each scoped to its own bounded context and role, never sharing a direct path to an AI subsystem that bypasses the Orchestration Subsystem:

- **Citizen Portal** — surfaces Case Management and Notification context data only, built to the accessibility floor in `CITIZEN_CONSTITUTION.md` Chapter 4.
- **Officer Console** — surfaces Officer Workspace and Escalation context data, gated by Identity & Access role checks, never exposing another officer's or citizen's unrelated case.
- **Admin Console** — surfaces Legal Knowledge and Analytics context data for procedure and legal-source management, restricted to the Admin role per `GOVERNMENT_CONSTITUTION.md` Chapter 6.

Every surface authenticates and authorizes through the Identity & Access Context before reaching any other context — there is no direct path from a presentation surface to a domain context that skips this check.

## 8. Government Integration Layer

The layer responsible for `GOVERNMENT_CONSTITUTION.md` Chapter 9's interoperability principles: every external government system (national digital identity, other ministries, provincial systems) is treated as the single source of truth within its own domain. CAIOS never maintains a competing, independently-authoritative copy of data another system already owns — it references and verifies against that authority. Where an external system is unavailable, the citizen's case degrades gracefully (a clearly communicated delay or alternative path), per `WORKFLOW_CONSTITUTION.md` Chapter 5, rather than failing opaquely or blocking the citizen outright.

## 9. Security Architecture

- **Least privilege by identity** — the AI system's own service identity is scoped to only the tool calls `GOVERNMENT_CONSTITUTION.md` Chapter 6.1 permits it; it cannot grant itself broader access or approve its own escalations.
- **Defense in depth** — no single layer (network, identity, application logic) is trusted as the sole enforcement point for a constitutional guarantee; RBAC, audit logging, and the AI's own structural boundaries each independently enforce the human-authority line in Chapter 1 above.
- **Data protection at rest and in transit** — sensitive identifiers are hashed or encrypted per `AI_OPERATING_SYSTEM.md` Chapter 4; raw values never appear in logs, traces, or analytics.
- **Tamper detection on the legal corpus** — every legal source's provenance is tracked from ingestion, and unauthorized modification after validation is treated as a security incident, per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 8.
- **Immutable audit trail** — the append-only audit log is architecturally incapable of exposing an update or delete path at the application layer, per `GOVERNMENT_CONSTITUTION.md` Chapter 5.
- Full threat modeling and control mapping is deferred to `MASTER_INDEX.md` Volume 21, which this Specification's Security Architecture is a direct input to.

## 10. Scalability Strategy

Scaling is planned against the editions in `PROJECT_OPERATING_SYSTEM.md` Chapter 09 (Startup → Competition → Pilot → Provincial → Enterprise), not against a single fixed load target:

- Citizen-facing and officer-facing surfaces scale independently, matching their genuinely different load patterns — bursty around deadlines for citizens, steady business-hours for officers (`GOVERNMENT_CONSTITUTION.md` Chapter 9, already reflected in ADR-0003's namespace split).
- The Orchestration Subsystem is designed stateless at the request level, with all durable state owned by the Case Management Context, so horizontal scaling of orchestration never risks losing a case mid-workflow.
- New procedures, jurisdictions, and ministries scale the system through configuration volume, not through new architectural capacity classes — the same procedure-as-configuration principle from Chapter 2 applied to scale specifically.

## 11. Reliability Strategy

- **No assumed state during an outage** — per `WORKFLOW_CONSTITUTION.md` Chapter 5, a case's state is only ever advanced on confirmed data; recovery reconciles from the last confirmed state and communicates any delay transparently rather than presenting a falsely current status.
- **Redundancy at every layer that a citizen's case depends on** — no single-instance component sits between a citizen and their ability to see accurate case status.
- **Graceful degradation for external dependencies** — an unavailable legal source feed, identity system, or AI provider degrades the specific capability it supports, never the citizen's ability to at least see their case's last known state.
- Full incident classification and response is deferred to `MASTER_INDEX.md` Volume 27, which this Specification's Reliability Strategy is a direct input to.

## 12. Traceability to Constitutional Core

| Architectural Element | Traces To |
|---|---|
| Human-authority boundary (Ch. 1, 6, 7) | `GOVERNMENT_CONSTITUTION.md` Ch. 3; `PRODUCT_CONSTITUTION.md` Ch. 12 |
| Retrieval-gated legal claims (Ch. 1, 6) | `LEGAL_INTELLIGENCE_CONSTITUTION.md` |
| Configuration-over-code (Ch. 1, 2, 5, 10) | `WORKFLOW_CONSTITUTION.md`; `PRODUCT_CONSTITUTION.md` Ch. 11–12 |
| Vendor-swappable AI (Ch. 2, 6) | `PRODUCT_CONSTITUTION.md` Ch. 12; `MASTER_INDEX.md` §8 |
| Independent citizen/officer scaling (Ch. 10) | `GOVERNMENT_CONSTITUTION.md` Ch. 9 |
| Auditability by default (Ch. 9) | `GOVERNMENT_CONSTITUTION.md` Ch. 5; `TRUST_CONSTITUTION.md` Ch. 4 |
| Accessibility floor on every surface (Ch. 7) | `CITIZEN_CONSTITUTION.md` Ch. 4 |
| Cross-citizen isolation (Ch. 4, 6, 7) | `AI_OPERATING_SYSTEM.md` Ch. 4 |
| Graceful external degradation (Ch. 8, 11) | `WORKFLOW_CONSTITUTION.md` Ch. 5; `GOVERNMENT_CONSTITUTION.md` Ch. 9 |

Any architectural element proposed in a future revision of this Specification that cannot fill in a row of this table has not yet earned a place in this document.

## 13. Architecture Decision Records References

This Specification is consistent with, and does not contradict, every ADR recorded to date: ADR-0001 through ADR-0004 (Phase 0 technology and infrastructure decisions in Volume 04), and ADR-0005 through ADR-0009 (documentation numbering governance, culminating in this document's own Volume 37 assignment). Future architectural decisions that concretize any chapter above — a specific integration pattern, a specific scaling mechanism — are recorded as new ADRs referencing the relevant chapter here, never as silent edits to this Specification's principles.

## 14. Acceptance Criteria

This Specification, and any future revision of it, is valid only if:

1. It contains no framework-, vendor-, or database-specific design decision — those belong exclusively to Volume 04 and its successors.
2. Every architectural element traces to a specific Constitution and chapter per Chapter 12 above.
3. It does not contradict `PROJECT_OPERATING_SYSTEM.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, or `SUCCESS_METRICS_CONSTITUTION.md`.
4. It remains true after a complete replacement of the underlying technology stack described in Volume 04 — the specific test `PRODUCT_CONSTITUTION.md` Chapter 12 already requires of any architecture decision.
5. Its entry in `MASTER_INDEX.md` §3 reflects its current status as part of its own approval.

---

## Closing Note

This is Volume 37 — the first Specification in the constitutional series, and proof that the Constitutional Core (Volumes 01, 02, 03, 36, plus 05–09) can actually constrain a concrete architecture rather than merely describing one in the abstract. Every future Specification — the Rule Engine, the Legal Knowledge ingestion pipeline, the OCR and Escalation operations manuals — is built as a further refinement of the bounded contexts and subsystems defined here, never as an independent architecture answering to nothing above it.
