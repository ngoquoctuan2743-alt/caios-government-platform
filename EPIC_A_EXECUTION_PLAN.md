# EPIC_A_EXECUTION_PLAN.md
### Epic A — Execution Plan — Volume 39
**Version:** 1.0
**Status:** Approved
**Class:** Epic companion (per **ADR-0011**) — the execution and governance layer paired with `EPIC_A_AI_CORE_ARCHITECTURE.md` (Volume 38). This document carries Epic A's Deliverables, Milestones, Exit Criteria, Demo Criteria, and Competition/Code/Test Readiness — per ADR-0011, none of these seven items may be duplicated or independently redefined by Volumes 14–19.
**Precedence:** Subordinate to Epic A (Volume 38) and every Constitution; superordinate to the milestone-level execution of Volumes 14–19. Numbered Volume 39, the next sequential slot after Volume 38.
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Volume 37), `EPIC_A_AI_CORE_ARCHITECTURE.md` (Volume 38, the parent this plan executes).
**Ownership:** Owner — Chief Delivery Architect · Architect — Technical Program Manager / Enterprise Engineering Manager / GovTech Solution Delivery Lead · Reviewer — Technical Steering Committee · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | This revision | Architecture Review | Initial authorship, establishing the "Epic + Execution Plan" pairing pattern per ADR-0011. |

---

## 1. Executive Summary

Epic A (Volume 38) defined the AI Core's architecture — subsystems, interaction, decision, and human-in-the-loop models. This plan turns that architecture into a sequenced, gated engineering roadmap for the six Specifications it parents (Volumes 14–19), without prescribing any code, API, or database design. It exists so that "build the AI Core" becomes a series of checkable, demonstrable milestones rather than one undifferentiated block of work six teams could interpret six different ways.

## 2. Epic Deliverables

- A working Orchestration layer that enforces `WORKFLOW_CONSTITUTION.md`'s state machine and Epic A's Interaction Model (Volume 38 Ch. 6).
- A working Legal Reasoning capability, scoped initially to the pilot procedure's legal source set (`MASTER_INDEX.md` Volume 28, ID Card Renewal).
- A working Document Intelligence capability covering the pilot procedure's required documents.
- A working Risk & Analytics capability at MVP depth — sufficient to flag, not yet to fully calibrate.
- An Escalation capability integrated with the already-scaffolded officer console (`src/app/officer/`).
- A working Communication capability giving the Citizen Agent a real conversational surface over the above.
- One complete, demonstrable end-to-end case (ID Card Renewal) moving through every subsystem correctly.

## 3. Specification Mapping

| Volume | Title | Epic A Section It Implements | Status |
|---|---|---|---|
| 14 | Rule Engine Specification | Decision Model (Ch. 7) — deterministic evaluation | Draft — Not Started |
| 15 | Legal Knowledge Base & RAG Ingestion Specification | Legal Reasoning Subsystem (Ch. 5, 6) | Draft — Not Started |
| 16 | OCR & Document Intelligence Specification | Document Intelligence Subsystem (Ch. 5, 6) | Draft — Partially Instantiated |
| 17 | Escalation & Human-in-the-Loop Operations Manual | Human-in-the-Loop Model (Ch. 8) | Draft — Not Started |
| 18 | Analytics & AI Quality Dashboard Specification | Risk & Analytics Subsystem (Ch. 5, 6) | Draft — Not Started |
| 19 | Conversation & Agent Orchestration Specification | Orchestration Subsystem, Interaction Model (Ch. 5, 6) | Draft — Not Started |

No new Specification is introduced by this plan — all six already existed in `MASTER_INDEX.md` Phase C and are formally re-confirmed here as Epic A's children per ADR-0010.

## 4. ADR Mapping

Epic A Chapter 12's ADR Candidates, mapped to the milestone that must resolve each before implementation proceeds past it:

| ADR Candidate | Required Before | Owning Specification |
|---|---|---|
| Orchestration control-flow pattern | Milestone M1 | Volume 19 |
| Confidence-threshold calibration methodology | Milestone M2/M3 | Volumes 14, 15 |
| Memory persistence and retention-expiry mechanism | Milestone M1 | Volume 20 (Data Governance, a dependency of this Epic's memory needs though not itself an Epic A child) |
| Communication channel-selection mechanism | Milestone M5 | Volume 13 (Localization, likewise a cross-cutting dependency, not an Epic A child) |

## 5. Knowledge Base Mapping

- **Volume 33 (Glossary)** — needed early, before M1, so all six Specifications being drafted in the same window use one consistent vocabulary for shared terms (case, checklist, confidence, escalation).
- **Volume 29 (Officer Training)** — needed before M4/M6, once the Escalation capability has anything real for an officer to review.
- **Volume 34 (Knowledge Base Maintenance)** — needed once Legal Knowledge ingestion (M2) goes live, so the pilot's legal source set has an owner and a review cadence from day one, not retrofitted later.

## 6. Engineering Milestones

Sequential, each depending on the last:

- **M1 — Orchestration & Memory Foundation:** the state machine and Memory Subsystem operate correctly on stubbed/manual data, with no real legal or document reasoning yet — proves the skeleton before any subsystem's real intelligence is added.
- **M2 — Legal Reasoning (Pilot Scope):** the Legal Agent and Citation Agent operate correctly against the pilot procedure's legal source set only, citation-gated per `LEGAL_INTELLIGENCE_CONSTITUTION.md`.
- **M3 — Document Intelligence (Pilot Scope):** OCR and Validation operate correctly against the pilot procedure's three required documents.
- **M4 — Risk, Analytics & Escalation:** Risk flagging reaches MVP depth, and the Escalation Subsystem hands a case to the existing officer console with a complete context package.
- **M5 — Communication:** the Citizen Agent presents the outputs of M1–M4 in plain, honest language across the citizen portal.
- **M6 — End-to-End Pilot Case:** a complete ID Card Renewal case moves correctly through every subsystem, matching Epic A's Interaction and Decision Models exactly, ready for `MASTER_INDEX.md` Volume 28's Pilot Playbook.

## 7. Demo Milestones

- **After M1:** demonstrate a case advancing through every lifecycle state on stubbed data — proves the workflow shape, not yet the intelligence.
- **After M2 + M3:** demonstrate one real citizen fact being verified against a real legal citation and one real document being validated — the first genuinely trustworthy output the AI Core produces.
- **After M6:** the full live demo — a complete, correct, first-submission-ready ID Card Renewal case, end to end. This is the demo this Epic is ultimately accountable for.

## 8. Testing Gates

| Gate | Checks | Invoked At |
|---|---|---|
| Architecture Review | Conformance to Epic A's subsystem, interaction, and decision models | End of every milestone (M1–M6) |
| Security Review | Least-privilege boundaries, data isolation, prompt-injection resistance | Before M4 (Risk/Escalation touches the most sensitive data) and again before M6 |
| Trust Review | Citation gating, confidence labeling, escalation completeness against `TRUST_CONSTITUTION.md` | Before any citizen-facing demo (after M3 and after M5) |
| Performance Review | Latency and throughput against `TECHNICAL_PRD`'s non-functional requirements | Before M6 and before Pilot Readiness (§11) |
| Red Team Review | Adversarial attempt to break citation gating, escalation triggers, or the human-authority boundary | Before Production Readiness (§11); mandatory, not optional |

## 9. Implementation Readiness Checklist

- [ ] Epic A (Volume 38) and this Execution Plan are both Approved.
- [ ] Volumes 14–19 have each passed at least Draft → Review for the specific milestone being implemented.
- [ ] Every ADR Candidate required before the current milestone (§4) is Accepted.
- [ ] `SYSTEM_ARCHITECTURE_SPECIFICATION.md`'s bounded-context boundaries (Volume 37 Ch. 4) are respected by the concrete design about to be implemented.

## 10. Competition Readiness Checklist

Per `PROJECT_OPERATING_SYSTEM.md` Chapter 09's Competition Edition principle — disclosed scope, never hidden gaps:

- [ ] M1–M3 demo achievable, showing real legal citation and real document verification.
- [ ] Governance and structural-compliance metrics (citation accuracy, escalation trigger coverage) visible on the Competition Dashboard (`SUCCESS_METRICS_CONSTITUTION.md` Ch. 9).
- [ ] Every production-only gate not yet closed (Volume 23 Data Residency chief among them) is explicitly and honestly disclosed alongside the demo, never omitted.

## 11. Production Readiness Checklist

- [ ] All milestones M1–M6 complete and passed every applicable Testing Gate (§8).
- [ ] Volume 23 (Data Residency & Compliance Dossier) resolved — the standing launch-blocking gate from `MASTER_INDEX.md` §11.
- [ ] Security & Compliance Steering Committee sign-off obtained.
- [ ] Officer training (Volume 29) completed for at least the pilot office's officers.
- [ ] Red Team Review passed with no unresolved finding.

## 12. Risks and Mitigations

- **Schedule risk** — six Specifications developed in parallel could drift from Epic A's shared blueprint. *Mitigation:* the Architecture Review gate at every milestone boundary (§8), not only at the end.
- **Integration risk** — subsystems built independently might not respect the bounded contexts in Volume 37. *Mitigation:* contract-first integration boundaries (Volume 37 Ch. 2) checked at each Architecture Review.
- **Scope creep risk** — a Specification quietly exceeding Epic A's boundary (e.g., a Rule Engine that starts making eligibility *decisions* rather than deterministic *evaluations*). *Mitigation:* the Decision Model's three-outcome discipline (Volume 38 Ch. 7) is a mandatory Architecture Review checklist item, not an assumption.
- **Trust erosion risk** — an early, imperfect demo (M1–M3) being mistaken for production readiness. *Mitigation:* the Competition Readiness Checklist's explicit disclosure requirement (§10).

## 13. Exit Criteria

Epic A is considered complete when:

1. All six child Specifications (Volumes 14–19) are Approved.
2. All six Engineering Milestones (§6) are complete.
3. The pilot procedure runs end-to-end per M6, verified against `MASTER_INDEX.md` Volume 28's Pilot Playbook.
4. Every Testing Gate (§8) has passed with no unresolved finding.
5. No open ADR Candidate (§4) remains unresolved.

## 14. Traceability Matrix

| Milestone | Constitutions | Epic | Specifications | ADRs |
|---|---|---|---|---|
| M1 | `WORKFLOW_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md` Ch. 4 | Epic A Ch. 5, 6 | Volume 19 | Orchestration pattern, Memory mechanism |
| M2 | `LEGAL_INTELLIGENCE_CONSTITUTION.md` | Epic A Ch. 5, 6, 9 | Volume 15 | Confidence-threshold methodology |
| M3 | `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md` Ch. 4 | Epic A Ch. 5, 6 | Volume 16 | — |
| M4 | `GOVERNMENT_CONSTITUTION.md` Ch. 3–4, `TRUST_CONSTITUTION.md` Ch. 6 | Epic A Ch. 8, 9 | Volumes 17, 18 | — |
| M5 | `CITIZEN_CONSTITUTION.md` | Epic A Ch. 5, 6 | Volume 19 | Channel-selection mechanism |
| M6 | All nine Constitutions | Epic A (whole) | Volumes 14–19 | All resolved |

---

## Closing Note

This is Volume 39 — the first Execution Plan, pairing with the first Epic, per the pattern ADR-0011 establishes for every Epic to come. Epic A's architecture and this plan's milestones are now the two halves of one accountable unit: nothing in Volumes 14–19 is implemented without tracing to both.
