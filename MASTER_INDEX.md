# MASTER_INDEX.md
### Citizen AI Operating System (CAIOS) — Master Index
**Version:** 2.16
**Status:** Approved
**Role:** Enterprise Documentation Architecture — the single source of truth for how every CAIOS document relates to every other one.
**Precedence:** This document is **Chapter 01 of `PROJECT_OPERATING_SYSTEM.md`**, the supreme governance document for the CAIOS project. Where POS defines project-wide governance authority, this index defines the documentation architecture that authority governs.

**Cross-Reference Chain:**
```
Project Operating System (POS)   — supreme governance authority
        │  (Chapter 01)
        ▼
Master Index (this document)     — documentation architecture & navigation (Volume 00)
        │  (Volume 01)
        ▼
Product Constitution              — root of product DNA and content
        │  (Volume 02)
        ▼
Vision Constitution                — the destination that DNA exists to reach
        │  (Volume 03)
        ▼
Trust Constitution                  — why that destination can be believed in along the way
        │  (Volume 36 — see ADR-0007)
        ▼
Success Metrics Constitution         — how we know the destination is actually being reached
```
Per `PROJECT_OPERATING_SYSTEM.md` Chapter 03, every future CAIOS document must reference all six of these — POS, this Master Index, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, and `SUCCESS_METRICS_CONSTITUTION.md` — by name in its own Companion Documents field, regardless of which volume it is.

**Scope note:** This index organizes and structures the documentation set. It does not define new product vision, features, or behavior — those live in the volumes it indexes. Where a volume referenced below does not yet exist as a written document, it is listed as **planned**, not invented; its content is not authored here.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 0.9 | Architecture Review cycle | Architecture Review + Red Team Review | Initial structure approved with 10 required improvements. |
| 1.0 | Prior revision | Architecture Review | Added Document Status, Ownership/RACI, Change Impact Matrix, Reading Order, AI Consumption Order, Relationship Diagram, ADR Index, Product Evolution Roadmap, AI Agent Map. Repository restructuring explicitly deferred per required improvement #10. Reclassified as Chapter 01 of the new `PROJECT_OPERATING_SYSTEM.md`. |
| 1.1 | Prior revision | Architecture Review | Volume 01 (Product Constitution) authored as `PRODUCT_CONSTITUTION.md`; Document Status updated from Draft to Approved and Architect role corrected to Chief Product Officer, per Acceptance Criterion 8/5's requirement that this index reflect a volume's status as part of its own approval. |
| 1.2 | Prior revision | Architecture Review 003 | Added explicit Cross-Reference Chain (POS → Master Index → Product Constitution) and the standing rule that every future document must reference all three by name, per Architecture Review 003's action items on `PRODUCT_CONSTITUTION.md`'s approval. |
| 1.3 | Prior revision | Architecture Review | Volume 02 reassigned from the historical Core Behavior Specification placeholder to `VISION_CONSTITUTION.md` (ADR-0005). Updated Traceability Matrix's Vision row, added Volume 02 to the Change Impact Matrix, and inserted Volume 02 into the Founder, Architect, Claude Code, and Judge reading orders. |
| 1.4 | Prior revision | Architecture Review 004 (Governance Verification) | Fixed a gap caught by the verification check: `VISION_CONSTITUTION.md` was missing from this document's own Cross-Reference Chain diagram in the header, despite being correctly referenced in every internal matrix and reading order. Added it, and extended the standing cross-reference rule from three required companion documents to four. |
| 1.5 | Prior revision | Architecture Review | Volume 03 reassigned from the historical System Architecture (Component Map) placeholder to `TRUST_CONSTITUTION.md` (ADR-0006). Updated Dependency Matrix (03 now depends on 01, 02), Change Impact Matrix, Cross-Reference Chain (extended to five required companion documents), and all reading/consumption orders to include Volume 03. |
| 1.6 | Prior revision | Architecture Review 005 | Recorded ADR-0007: Volume 04 (Technical PRD) is **not** reassigned, since it is a real, Approved, dependency-heavy Specification, unlike the two prior placeholder reassignments. Success Metrics Constitution is instead numbered Volume 36, extending the Startup Edition from 35 to 36 volumes. Added a Draft stub entry and Dependency Matrix row for Volume 36, pending its full authored content. |
| 1.7 | Prior revision | Architecture Review | `SUCCESS_METRICS_CONSTITUTION.md` fully authored and Approved. Volume 36's stub entry upgraded to its complete form, Change Impact Matrix row added, Cross-Reference Chain extended to six required companion documents, and Volume 36 inserted into all reading/consumption orders. |
| 1.8 | Prior revision | Architecture Review 006 | Recorded ADR-0008: Volumes 01–35 are permanently frozen against future renumbering or reassignment; the ADR-0005/0006 reassignment pattern is retired. Future Constitutional Extensions append sequentially from Volume 36 onward. Naming Conventions (§16) updated to state this rule explicitly. Constitutional Core (Volumes 01, 02, 03, 36) declared complete per Architecture Review 006's Strategic Direction; future documentation work returns to the Volume 04–35 Technical PRD roadmap. |
| 1.9 | Prior revision | Architecture Review | Recorded ADR-0009, generalizing the Volume 01–35 freeze from Constitutions to all document classes. `SYSTEM_ARCHITECTURE_SPECIFICATION.md` authored and Approved as Volume 37 — the first Specification-class document in the post-freeze sequence. Added its Dependency Matrix row, Change Impact Matrix row, and inserted it into the Architect and Developer reading orders. |
| 2.0 | Prior revision | Architecture Review 007 | **MAJOR:** recorded ADR-0010, introducing Epics as a fifth document class in §2's Document Hierarchy, sitting between Constitutions and Specifications. `EPIC_A_AI_CORE_ARCHITECTURE.md` authored and Approved as Volume 38, formally adopting Volumes 14–19 as its children. This is a binding-meaning change to the documentation hierarchy itself, warranting the MAJOR bump per this document's own Versioning Rules (§15). |
| 2.1 | Prior revision | Architecture Review 008 | Recorded ADR-0011: Epic becomes an execution and governance unit, requiring Deliverables/Milestones/Exit Criteria/Demo Criteria/Competition-Code-Test Readiness at Epic level only. `EPIC_A_EXECUTION_PLAN.md` authored and Approved as Volume 39, establishing the "Epic + Execution Plan" pairing pattern. Updated §2's Epic definition, added Volume 39's Dependency Matrix and Change Impact Matrix rows. |
| 2.2 | Prior revision | Architecture Review | Following the Competition First strategic direction, `ENGINEERING_SPRINT_01_SPECIFICATION.md` authored and Approved as Volume 40 — a lighter-touch entry, consistent with the current priority on execution over governance expansion. `DEMO_DIRECTOR_BOOK.md`, `MVD_IMPLEMENTATION_PLAN.md`, and `IMPLEMENTATION_ALIGNMENT_REVIEW.md` remain intentionally unnumbered — demo/delivery artifacts, not governed Volumes. |
| 2.3 | Prior revision | Architecture Review | `AI_REASONING_PIPELINE_SPECIFICATION.md` authored and Approved as Volume 41, the first Specification to consume all four `knowledge/` layers as a first-class input. Added its Dependency Matrix and Change Impact Matrix rows. |
| 2.4 | Prior revision | Architecture Review | `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` authored and Approved as Volume 42, closing Volume 41's flagged Missing Document Detection gap. Added its Dependency Matrix and Change Impact Matrix rows. |
| 2.5 | Prior revision | Architecture Review | `RULE_ENGINE_SPECIFICATION.md` authored and Approved, filling Volume 14's long-reserved slot for the first time (no ADR required — this is the slot's first content, not a reassignment). Updated Volume 14's entry, Dependency Matrix row, and Change Impact Matrix row accordingly. |
| 2.6 | Prior revision | Architecture Review | `RULE_PACK_CCCD_PILOT.md` authored and Approved as Volume 43 (not Volume 15, which remains reserved for the Legal Knowledge Base & RAG Ingestion Specification). Added its Dependency Matrix and Change Impact Matrix rows; updated Volume 14's Change Impact row to reference it. |
| 2.7 | Prior revision | Architecture Review | `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` authored and Approved, filling Volume 15's long-reserved slot — the label matched the reserved purpose exactly, no numbering resolution needed. Updated its Dependency Matrix and Change Impact Matrix rows. |
| 2.8 | Prior revision | Architecture Review | `LEGAL_CITATION_SPECIFICATION.md` authored and Approved as Volume 44 (not Volume 16, which remains reserved for the OCR & Document Intelligence Specification). Added its Dependency Matrix and Change Impact Matrix rows; updated Volume 43's Change Impact row to reference it. |
| 2.9 | Prior revision | Architecture Review | `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` authored and Approved, filling Volume 16's long-reserved slot — the label matched the reserved purpose exactly, no numbering resolution needed. Updated its Dependency Matrix row and Volume 42's Change Impact row to reflect the now-real extraction/reasoning relationship. |
| 2.10 | Prior revision | Architecture Review | `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` restructured to Version 2.0 (16 chapters, 10-state lifecycle, 10 document categories, five-level Confidence Model adding a human-only Verified state). Volume 16's Master Index entry, Dependency Matrix row (confirmed unchanged), and Change Impact Matrix rows (16 and 42) updated accordingly. Reading Order (§7) and AI Consumption Order (§8) updated for the first time to explicitly surface Volume 16 as real content rather than an implicit range member. No other Volume modified. |
| 2.11 | Prior revision | Architecture Review | `MEMORY_AND_CONVERSATION_SPECIFICATION.md` authored and Approved as Volume 45 (not Volume 17, which remains reserved for the Escalation & Human-in-the-Loop Operations Manual). Added its Dependency Matrix row and Change Impact Matrix row; updated Volume 16, 41, 42, and 44's Change Impact rows to reference it. Reading Order (§7) and AI Consumption Order (§8) updated to position Volume 45 explicitly between Volume 41 and Volume 42, since no existing range covered its number. No other Volume modified. |
| 2.12 | Prior revision | Architecture Review | `MEMORY_AND_CONVERSATION_SPECIFICATION.md` restructured to Version 2.0 (16 chapters: Conversation Lifecycle expanded to 8 states adding Paused/Escalated; Conversation Object Model rebuilt around a Participant object; a new Memory Lifecycle chapter added, deliberately distinct from Memory Trust Levels; Failure Handling expanded to 7 categories; Acceptance Criteria expanded to 9 tests adding Government Platform). Volume 45's Master Index entry refreshed; Dependency Matrix row (confirmed unchanged) and Reading Order (§7)/AI Consumption Order (§8) notes reconfirmed against the new content. Volume 17 and no other Volume modified; no ADR required, since no reassignment occurred. |
| 2.13 | Prior revision | Architecture Review | `CASE_MANAGEMENT_SPECIFICATION.md` authored and Approved as Volume 46 — the first genuinely unassigned sequential slot after Volume 45, requiring no reassignment and no ADR. Added its Dependency Matrix row and Change Impact Matrix row; updated Volume 45's Change Impact row to reference it. Reading Order (§7) and AI Consumption Order (§8) updated to position Volume 46 explicitly after Volume 45. Flagged, as a Known Risk in the new Specification itself, that its 9-state Case Lifecycle is now a third distinct case-status vocabulary alongside the existing `CaseStage` and `WorkflowState` enums, pending a unified reconciliation pass. No other Volume modified. |
| 2.14 | Prior revision | Architecture Review | `AI_ORCHESTRATION_SPECIFICATION.md` authored and Approved as Volume 47 — the first genuinely unassigned sequential slot after Volume 46, requiring no reassignment and no ADR. Formalizes the "orchestration layer" / "Planner Agent" concept `AI_OPERATING_SYSTEM.md` and this index's own AI Consumption Order already referenced without previously defining. Added its Dependency Matrix row and Change Impact Matrix row; updated Volume 46's Change Impact row to reference it. Reading Order (§7) and AI Consumption Order (§8) updated to position Volume 47 explicitly after Volume 46, last among the capability cluster. Flagged, as a Known Risk in the new Specification itself, a naming collision between this Specification's orchestration layer and the existing `src/lib/orchestration/workflow-state-machine.ts` Phase 0 component, which validates `WorkflowState` transitions and is a materially different concept. No other Volume modified. |
| 2.15 | Prior revision | Architecture Review | `NOTIFICATION_AND_COMMUNICATION_SPECIFICATION.md` authored and Approved as Volume 48 — the first genuinely unassigned sequential slot after Volume 47, requiring no reassignment and no ADR. Formally owns the "Notification" capability Volume 47's Capability Registry currently lists as jointly governed elsewhere; that Volume 47 cross-reference remains a pending, explicitly-flagged follow-up, not corrected in this revision. Added Volume 48's Dependency Matrix row and Change Impact Matrix row; updated Volume 47's Change Impact row to reference it. Reading Order (§7) and AI Consumption Order (§8) updated to position Volume 48 explicitly after Volume 47. No other Volume modified. |
| 2.16 | This revision | Architecture Review | Recorded **ADR-0012: Procedure Identity Strategy**, resolving the Knowledge-ID/Database-ID inconsistency flagged since Sprint 01B and left unresolved through Sprint 01F. Requested as "ADR-0010"; that number is already Accepted (Epics as a document class), so this is numbered ADR-0012, the next available sequential slot — no renumbering of ADR-0010 or any other existing ADR. First ADR authored as its own file (`ADR-0012-PROCEDURE-IDENTITY-STRATEGY.md`) rather than a single table row, since its content exceeds a summary paragraph; §10's ADR Index updated with both the summary row and this new authoring convention. Architecture decision only — no Volume, Prisma schema, or Sprint 01F code modified. |

---

## 1. Purpose of the Master Index

CAIOS is, by design, going to accumulate a large body of constitutional, specification, and operational documentation over its lifetime — the five constitutional documents that exist today are the beginning of that body, not its entirety. Without a master index, that body of knowledge degrades in three predictable ways: documents contradict each other without anyone noticing, new contributors cannot find the document that already answers their question, and the project loses the ability to prove that everything it has built actually traces back to the citizen need that justified building it.

The Master Index exists to prevent all three. It is:

- **A navigation map** — anyone joining the project, at any point in its life, can find the correct document for their question in under a minute.
- **A dependency ledger** — no volume is written, revised, or approved without knowing what it relies on and what relies on it.
- **A traceability guarantee** — every implementation detail can be walked backward, volume by volume, to the citizen need and vision statement that justified it.
- **A governance instrument** — it defines how documents are versioned, reviewed, named, stored, and accepted, so documentation quality does not depend on any one author's discipline.
- **An accountability register** — every volume now names who owns it, who can change it, and who must sign off before it binds anyone (§4a).

The Master Index itself is Volume 00 of the documentation set — the only volume with no dependencies, because everything else depends on it — and is, in turn, Chapter 01 of the Project Operating System, which governs how this index itself may change.

---

## 2. Document Hierarchy

CAIOS documentation exists in five classes, in strict order of authority. A lower class may never contradict a higher one; where an apparent contradiction is found, the lower-class document is wrong and must be corrected.

```
1. Constitutions        (highest authority — philosophy, permanent boundaries)
        │
2. Epics                 (architectural blueprints organizing a body of related work)
        │
3. Specifications        (how a constitution's principles become concrete design)
        │
4. Architecture Decision Records (ADRs)   (specific, dated decisions and their rationale)
        │
5. Knowledge Base          (living reference material: glossary, playbooks, FAQs)
```

**Constitutions** change rarely and only through the full committee-review process (§8). **Epics** (added per **ADR-0010**, Architecture Review 007) sit immediately beneath Constitutions: each is an architectural blueprint for one coherent body of work, translating Constitutional principles into a parent structure that one or more child Specifications, ADRs, and Knowledge Base entries are then produced under — an Epic does not itself specify implementation detail any more than a Constitution does; it defines the shape its children must fill in. **Specifications** translate a constitution's (or a parent Epic's) principles into concrete, buildable design and change more often, but must always be traceable to the constitutional principle they implement. **ADRs** record a single decision at a single point in time and why it was made — they do not restate philosophy, only apply it to a specific choice. The **Knowledge Base** is the living, frequently-updated layer — glossary terms, onboarding material, FAQs, playbooks — that must reflect the layers above it but carries no independent authority of its own.

Above all five classes sits the **Project Operating System (POS)** — not a sixth documentation class, but the governance authority that determines how classes 1–5 are amended, who owns them, and how conflicts between them are resolved. This index is POS Chapter 01.

**On Epics specifically:** an Epic is numbered as a Volume like any other document (per ADR-0008/0009's sequential-append rule) and is governed identically for versioning, review, and Red Team purposes. What distinguishes it structurally is that its own Dependency Matrix row lists Constitutions (never Specifications) as dependencies, while its Change Impact Matrix row lists the child Specifications it parents as directly affected — an Epic is authored *before* its children, not extracted from them after the fact.

**Per ADR-0011 (Architecture Review 008), an Epic is an execution and governance unit, not merely an architectural document.** Every Epic must define, at Epic level only: Deliverables, Milestones, Exit Criteria, Demo Criteria, Competition Readiness, Code Readiness, and Test Readiness — either within the Epic itself or within a paired **Execution Plan** companion volume (the standing pattern, established by `EPIC_A_EXECUTION_PLAN.md`). None of these seven items may be duplicated or independently redefined by a child Specification; every Specification, ADR, and Knowledge Base entry belongs to exactly one Epic and inherits these items from it.

---

## 3. The Startup Edition — 36 Volumes in 7 Phases

*(Originally scoped at 35 volumes; extended to 36 by ADR-0007 to accommodate `SUCCESS_METRICS_CONSTITUTION.md` at Volume 36 without disturbing Volume 04's real, load-bearing position. Volume 36 is documented at the end of Phase G, §3g, since it falls outside the original 7-phase grouping by number but is governed identically to every other Constitution.)*

Every volume below now carries a **Document Status** — one of `Draft`, `Review`, `Approved`, `Deprecated`, `Superseded`, `Archived` — and an **Ownership** record. For Volumes 01–09, ownership is recorded individually, since these are the volumes already in force. For Volumes 10–35, which are planned rather than authored, ownership defaults to the **Phase Ownership Table** in §4a rather than being repeated 26 times individually; an individual volume overrides its phase default only once that volume actually enters Draft.

### Phase A — Vision & Constitutional Foundation (Volumes 01–09)

**Volume 01 — Product Constitution**
- Objective: Establish the founding vision, mission, non-goals, and definition of success for CAIOS.
- Main Deliverables: Vision statement, mission statement, explicit non-goals, national success metrics.
- Dependencies: None (foundational).
- Expected Outputs: The reference every other volume's purpose must trace back to.
- Document Status: **Approved** (`PRODUCT_CONSTITUTION.md`) — authored after Volumes 05–09, and confirmed consistent with all of them at authorship rather than retrofitted.
- Ownership: Owner — Government Program Sponsor · Architect — Chief Product Officer · Reviewer — Constitutional Design Committee · Implementation Owner — N/A (vision document, no direct implementation) · Approval Authority — National Steering Committee.

**Volume 02 — Vision Constitution (`VISION_CONSTITUTION.md`)**
- Objective: Define the decades-long societal destination CAIOS exists to reach — future citizen, government, and officer experience; timeless digital public service principles; public trust and human-AI collaboration vision; national and international impact vision; vision boundaries and risks.
- Main Deliverables: 15-chapter Vision spanning future citizen/government/officer experience, digital public service principles, public trust vision, human+AI collaboration vision, national impact vision, international reference vision, vision boundaries, vision risks, vision validation signals, and forward dependencies for future Constitutions.
- Dependencies: Volume 01.
- Expected Outputs: The binding, decades-long destination every other Constitution's own long-term evolution chapter is a more granular expression of.
- Document Status: **Approved.**
- Ownership: Owner — Chief Vision Officer · Architect — Chief Strategy Officer / National GovTech Strategist · Reviewer — Constitutional Design Committee · Implementation Owner — N/A (vision document) · Approval Authority — National Steering Committee.
- Numbering note: Volume 02 previously referred, as a placeholder, to a "Core Behavior Specification" that was never independently authored before being absorbed into Volume 05 (`AI_OPERATING_SYSTEM.md`) at that document's own authorship. Per **ADR-0005** (§10), Volume 02 is formally reassigned to this Vision Constitution; the historical placeholder is retained here as a footnote, not as a competing numbered volume, since it never existed as a standalone file to supersede.

**Volume 03 — Trust Constitution (`TRUST_CONSTITUTION.md`)**
- Objective: Define trust as a permanent, measurable, governable constitutional principle — what it means across citizen/government/officer/institutional relationships, its principles, lifecycle, by-design mechanisms, boundaries, risks, recovery process, and metrics.
- Main Deliverables: 12-chapter Trust Constitution covering the four trust relationships, 7 trust principles, trust lifecycle, Trust by Design (unifying legal citation, escalation, auditability, traceability, evidence, consistency), trust boundaries, 7 trust risks, trust recovery process, trust metrics, ethical commitments, and forward dependencies.
- Dependencies: Volumes 01, 02.
- Expected Outputs: The single authoritative source reconciling the trust-related chapters already present in Volumes 05, 08, and 09 as consistent domain applications of one principle.
- Document Status: **Approved.**
- Ownership: Owner — Chief Trust Officer · Architect — AI Governance Architect / GovTech Ethics Architect · Reviewer — Constitutional Design Committee · Implementation Owner — N/A (constitutional document) · Approval Authority — National Steering Committee.
- Numbering note: Volume 03 previously referred, as a placeholder, to a "System Architecture (Component Map)" that was never independently authored before being absorbed into Volume 04 (`TECHNICAL_PRD`) at that document's own authorship. Per **ADR-0006** (§10), Volume 03 is formally reassigned to this Trust Constitution; the historical placeholder is retained here as a footnote, not as a competing numbered volume, since it never existed as a standalone file to supersede.

**Volume 04 — Technical PRD (Citizen AI Case Manager)**
- Objective: Specify the technology stack, architecture layering, data model direction, and non-functional requirements.
- Main Deliverables: Stack-to-architecture mapping, Prisma data model direction, security/RBAC/audit requirements, phased delivery plan.
- Dependencies: Volumes 01–03.
- Expected Outputs: The technical foundation Phase 0 of engineering delivery was built against (see the project's `prisma/schema.prisma`, RBAC middleware, and audit log implementation, which already instantiate this volume).
- Document Status: **Approved.**
- Ownership: Owner — Enterprise Architect · Architect — Enterprise Architect · Reviewer — Security Expert + AI Governance Expert · Implementation Owner — Engineering Lead · Approval Authority — Technical Steering Committee.

**Volume 05 — AI Operating System (`AI_OPERATING_SYSTEM.md`)**
- Objective: Define the AI's philosophy, thinking process, agent architecture, memory model, decision rules, trust layer, safety principles, and human-in-the-loop boundaries.
- Main Deliverables: AI Philosophy; 11-step Thinking Process; 12-agent architecture; memory taxonomy; decision rules; Trust Layer; Safety principles; 5 worked workflow examples; human-in-the-loop trigger list; 5-year evolution.
- Dependencies: Volumes 01, 04.
- Expected Outputs: The binding "mind" every future AI Agent, prompt, and reasoning process must conform to.
- Document Status: **Approved.**
- Ownership: Owner — Chief AI Architect · Architect — Chief AI Architect · Reviewer — AI Governance Expert + Constitutional Design Committee · Implementation Owner — AI/ML Engineering Lead · Approval Authority — National Steering Committee.

**Volume 06 — Workflow Constitution (`WORKFLOW_CONSTITUTION.md`)**
- Objective: Define the universal citizen journey and the universal AI workflow underlying every administrative procedure.
- Main Deliverables: 8-stage Universal Citizen Journey; 16-step Universal AI Workflow; 7 Workflow Principles; 13-state state machine; exception handling; government workflow rules; human-in-the-loop mapping; citizen/officer experience tables; future evolution.
- Dependencies: Volumes 01, 05.
- Expected Outputs: The binding workflow shape every procedure configuration must instantiate.
- Document Status: **Approved.**
- Ownership: Owner — Chief Workflow Architect · Architect — Chief Workflow Architect · Reviewer — Senior Public Administration Expert · Implementation Owner — Product/Workflow Engineering Lead · Approval Authority — National Steering Committee.

**Volume 07 — Legal Intelligence Constitution (`LEGAL_INTELLIGENCE_CONSTITUTION.md`)**
- Objective: Define how the AI is permitted to reason about Vietnamese law — hierarchy, lifecycle, reasoning engine, citation standard, conflict resolution, uncertainty management, safety, officer collaboration.
- Main Deliverables: Legal source hierarchy; 6-stage knowledge lifecycle; 11-step legal reasoning engine; national citation standard; conflict-resolution table; uncertainty rules; legal safety mechanisms; officer collaboration model; 20-year evolution.
- Dependencies: Volumes 01, 05, 06.
- Expected Outputs: The binding constraint every legal claim the system makes must satisfy.
- Document Status: **Approved.**
- Ownership: Owner — Chief Legal Intelligence Architect · Architect — Chief Legal Intelligence Architect · Reviewer — Administrative Law Expert · Implementation Owner — Legal Knowledge Engineering Lead · Approval Authority — National Steering Committee, with Ministry of Justice liaison sign-off.

**Volume 08 — Citizen Constitution (`CITIZEN_CONSTITUTION.md`)**
- Objective: Define who the citizen is, their personas, emotional journey, inclusion requirements, communication principles, trust expectations, accessibility needs, failure experience, and success metrics.
- Main Deliverables: Full citizen model; 14 personas; 8-stage emotional journey; digital inclusion principles; 12 communication principles; trust framework; accessibility principles; graceful-failure standard; 10 national success metrics; 2035 vision.
- Dependencies: Volumes 01, 05, 06.
- Expected Outputs: The binding definition of who every other volume must be designed for.
- Document Status: **Approved.**
- Ownership: Owner — Chief Citizen Experience Architect · Architect — Chief Citizen Experience Architect · Reviewer — Accessibility Expert + Senior Public Administration Expert · Implementation Owner — Product/Design Lead · Approval Authority — National Steering Committee.

**Volume 09 — Government Constitution (`GOVERNMENT_CONSTITUTION.md`)**
- Objective: Define why government exists, public service principles, the stratified role of AI inside government, officer authority, institutional trust, risk management, ethics, public trust, interoperability governance, and the 2035 institutional vision.
- Main Deliverables: Government role chain; 10 public service principles; 8-tier AI responsibility ceiling; officer authority model; governance trust framework; 11-risk register; AI Ethics Charter; public trust framework; interoperability principles; multi-perspective constitutional review.
- Dependencies: Volumes 01, 05, 06, 07, 08.
- Expected Outputs: The binding institutional boundary every AI capability must operate inside, permanently.
- Document Status: **Approved.**
- Ownership: Owner — Constitutional Design Committee (collectively) · Architect — Government Digital Transformation Architect · Reviewer — all eight committee perspectives named in the document's drafting record · Implementation Owner — Program Management Office · Approval Authority — National Steering Committee, with Government Sponsor sign-off.

### Phase B — Experience & Design (Volumes 10–13)

**Volume 10 — Citizen Experience Design System**
- Objective: Translate Volume 08's principles into a concrete design language (tone, layout, interaction patterns) for the citizen portal.
- Main Deliverables: Voice-and-tone guide, interaction pattern library, plain-language style guide.
- Dependencies: Volumes 06, 08.
- Expected Outputs: The reference every citizen-facing screen and message is designed against.
- Document Status: **Draft — Not Started.**

**Volume 11 — Officer Workspace Design Specification**
- Objective: Translate Volume 09's officer-authority principles into a concrete design for the officer console (escalation queue, case review, override recording).
- Main Deliverables: Officer console information architecture; case-summary and context-package layout; override-capture flow.
- Dependencies: Volumes 06, 09.
- Expected Outputs: The reference the officer console (already scaffolded at `src/app/officer/`) is built and extended against.
- Document Status: **Draft — Partially Instantiated** (a working scaffold exists in code; the formal design specification itself has not been written).

**Volume 12 — Accessibility & Digital Inclusion Compliance Specification**
- Objective: Turn Volume 08 Chapters 4 and 7 into testable, auditable compliance criteria.
- Main Deliverables: WCAG-aligned compliance checklist; assistive-technology compatibility requirements; low-bandwidth/offline-tolerance requirements.
- Dependencies: Volume 08.
- Expected Outputs: The checklist every release is audited against before shipping to citizens.
- Document Status: **Draft — Not Started.**

**Volume 13 — Multi-Language & Localization Strategy**
- Objective: Define how Vietnamese (standard and regional), ethnic minority languages, and foreign-resident languages are supported across the platform.
- Main Deliverables: Language coverage roadmap; translation and legal-terminology consistency process.
- Dependencies: Volumes 07, 08.
- Expected Outputs: The reference governing every localization effort.
- Document Status: **Draft — Not Started.**

### Phase C — AI Subsystem Specifications (Volumes 14–19)

*Per **ADR-0010** and `EPIC_A_AI_CORE_ARCHITECTURE.md` (Volume 38), all six volumes in this phase are formally adopted as children of **Epic A**. Each must trace to Epic A's subsystem map (its Chapter 5), interaction model (Chapter 6), decision model (Chapter 7), and human-in-the-loop model (Chapter 8) — none may define its own independent AI Core architecture.*

**Volume 14 — Rule Engine Specification (`RULE_ENGINE_SPECIFICATION.md`)**
- Objective: Specify the Constitutional Rule Engine — the single deterministic core shared by Stage 06 (Eligibility Evaluation, Volume 41) and the Document Gap Analysis Engine (Volume 42) — its 10 rule categories, 12-field rule template, evaluation pipeline, conflict/priority resolution, rule chaining, versioning, and lifecycle.
- Main Deliverables: Rule categories and template; evaluation pipeline; Conflict Resolution Matrix; rule dependency graph (worked example); versioning and 5-stage lifecycle; human override; legal traceability; audit flow; performance budget; future rule-editor and government-rule-import notes; Competition Demo mapping.
- Dependencies: Volumes 01, 05, 06, 07, 09, 37, 38, 41, 42.
- Expected Outputs: The reference every procedure's eligibility and requirement logic is authored and evaluated against.
- Document Status: **Approved.** *(First content authored in this slot — no ADR required, since Volume 14 was reserved but never previously assigned; see the document's own Precedence note.)*
- Ownership: Owner — Chief Rule Architect · Architect — Government Decision Designer / Enterprise AI Architect · Reviewer — Technical Steering Committee + Administrative Law Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

**Volume 15 — Legal Knowledge Base & RAG Ingestion Specification (`LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md`)**
- Objective: Operationalize Volume 07's Legal Knowledge Hierarchy and Lifecycle into a concrete, technology-independent ingestion, classification, chunking, and retrieval specification.
- Main Deliverables: 9 knowledge sources; 10-class classification taxonomy; 15-field Knowledge Object Model; 6-stage authoring lifecycle; 4 reviewer roles; chunking and retrieval principles; citation preservation; versioning; the Law→Procedure→Rule→Checklist→Citizen Response dependency graph; auditability; technology-independence acceptance criteria.
- Dependencies: Volumes 01, 05, 06, 07, 09, 14, 41, 42, 43, plus `knowledge/citations/` and `knowledge/procedures/`.
- Expected Outputs: The reference for maintaining the legal corpus over time, and the knowledge-layer contract every future retrieval implementation must conform to.
- Document Status: **Approved.**
- Ownership: Owner — Chief Knowledge Architect · Architect — Legal Knowledge Engineer / RAG Systems Designer · Reviewer — Technical Steering Committee + Administrative Law Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

**Volume 16 — OCR & Document Intelligence Specification (`OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md`)**
- Objective: Specify the OCR Agent's extraction-only design — document lifecycle, document categories, classification, field extraction model, validation and normalization layers, confidence model, human verification, and interfaces — clearly separated from the Validation Agent's reasoning already specified in Volume 42.
- Main Deliverables: 10-state Document Lifecycle with an explicit Rejected exception branch; 10 durable Document Categories; classification rules for unknown/multi-candidate documents; conceptual Field Extraction Model (including Machine Readable Zone); structural Validation Layer (including impossible values and future-date anomalies); Normalization Layer; five-level Confidence Model (Unknown/Low/Medium/High/Verified) with an explicit rule that Verified is reachable only through human verification, never through extraction alone; Human Verification chapter; defined Interfaces to Rule Engine/Document Gap Analysis/Case/Audit/Knowledge Base with an explicit no-direct-LLM-contact rule; Failure Handling; Trust by Design Mapping; Traceability; technology-independence acceptance criteria extended to storage, UI, and government-platform substitution.
- Dependencies: Volumes 01, 05, 09, 14, 15, 37, 38, 41, 42, 44, plus `knowledge/documents/`. *(Reviewed against this revision's expanded content — unchanged.)*
- Expected Outputs: The reference for document extraction behavior, and the defined shape of the existing `ChecklistItem.ocrExtract` field.
- Document Status: **Approved.** *(Version 2.0 — restructured into 16 chapters; see the document's own Changelog.)*
- Ownership: Owner — Chief AI Architect · Architect — Document Intelligence Designer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

**Volume 17 — Escalation & Human-in-the-Loop Operations Manual**
- Objective: Operationalize the escalation triggers defined across Volumes 05, 06, 07, and 09 into a concrete officer-facing operations manual.
- Main Deliverables: Escalation queue SLA policy; context-package completeness standard; jurisdiction routing rules.
- Dependencies: Volumes 05, 06, 07, 09, 11.
- Expected Outputs: The reference governing day-to-day escalation handling.
- Document Status: **Draft — Not Started.**

**Volume 18 — Analytics & AI Quality Dashboard Specification**
- Objective: Specify the Analytics Agent's (Volume 05) metrics, aggregation rules, and reporting cadence.
- Main Deliverables: Metric definitions consistent with Volume 08 §9 and Volume 09 §2; aggregation and anonymization rules.
- Dependencies: Volumes 05, 08, 09.
- Expected Outputs: The reference for every operational and executive dashboard.
- Document Status: **Draft — Not Started.**

**Volume 19 — Conversation & Agent Orchestration Specification**
- Objective: Specify how the Planner Agent sequences the other agents (Volume 05) against the workflow state machine (Volume 06) in practice.
- Main Deliverables: Agent invocation sequencing rules; state-transition-to-agent-call mapping.
- Dependencies: Volumes 05, 06.
- Expected Outputs: The reference for orchestration-layer behavior, independent of any specific orchestration technology.
- Document Status: **Draft — Not Started.**

### Phase D — Data Governance & Security (Volumes 20–23)

**Volume 20 — Data Governance & Privacy Framework**
- Objective: Operationalize the memory and privacy principles of Volumes 05 and 08 into concrete data-handling policy.
- Main Deliverables: Data classification standard; retention schedule per memory type; cross-citizen isolation guarantees.
- Dependencies: Volumes 05, 08, 09.
- Expected Outputs: The reference every data-handling decision is checked against.
- Document Status: **Draft — Not Started.**

**Volume 21 — Security Architecture & Threat Model**
- Objective: Operationalize Volume 09's risk register (Chapter 6) into a concrete threat model and control set.
- Main Deliverables: Threat model; control mapping per identified risk; prompt-injection and tampering defenses per Volume 07 Chapter 8.
- Dependencies: Volumes 07, 09.
- Expected Outputs: The reference for every security review and audit.
- Document Status: **Draft — Not Started.**

**Volume 22 — Identity & Access Management Policy**
- Objective: Specify the RBAC model (already scaffolded in the codebase) and its relationship to national digital identity integration.
- Main Deliverables: Role/permission matrix; national digital identity integration policy.
- Dependencies: Volumes 04, 09, 20, 21.
- Expected Outputs: The reference governing every access-control decision.
- Document Status: **Draft — Partially Instantiated** (RBAC scaffold exists in code; formal policy document does not).

**Volume 23 — Data Residency & Compliance Dossier**
- Objective: Resolve the data-residency open question raised in Volume 04 and document the applicable compliance posture.
- Main Deliverables: Data residency determination; retention-period legal justification; compliance sign-off record.
- Dependencies: Volumes 04, 09, 20.
- Expected Outputs: The reference required before any production launch involving citizen ID data.
- Document Status: **Draft — Not Started** — **flagged as a launch-blocking gap** (see Product Evolution Roadmap, §9).

### Phase E — Quality, Testing & Operations (Volumes 24–27)

**Volume 24 — Quality Assurance & Testing Strategy**
- Objective: Define how every constitutional guarantee (no hallucination, no uncited claim, no skipped stage) is verified continuously, not just at launch.
- Main Deliverables: Test strategy per constitutional guarantee; citation-accuracy audit methodology.
- Dependencies: Volumes 05, 06, 07.
- Expected Outputs: The reference every release is validated against.
- Document Status: **Draft — Not Started.**

**Volume 25 — Rule Engine Regression & Legal Change Management Playbook**
- Objective: Operationalize the CI/CD "Rule Engine regression tests" requirement from Volume 04 and the legal lifecycle from Volume 07.
- Main Deliverables: Regression test suite policy; legal-change rollout checklist.
- Dependencies: Volumes 04, 07, 14, 15, 24.
- Expected Outputs: The reference preventing a bad rule or legal update from silently breaking eligibility.
- Document Status: **Draft — Not Started.**

**Volume 26 — DevOps, Deployment & Release Management Playbook**
- Objective: Operationalize the Docker/Kubernetes/CI-CD foundation from Volume 04 into a concrete release process.
- Main Deliverables: Release checklist; rollback policy; namespace-scaling operations guide.
- Dependencies: Volume 04.
- Expected Outputs: The reference for every deployment (already partially instantiated by the project's `Dockerfile`, `docker-compose.yml`, and `k8s/` manifests).
- Document Status: **Draft — Partially Instantiated** (implementation artifacts exist; formal playbook does not).

**Volume 27 — Incident Response & Business Continuity Plan**
- Objective: Operationalize Volume 09 Chapter 6's cyberattack/outage rows into a concrete response plan.
- Main Deliverables: Incident classification; response roles; citizen-communication protocol during an incident.
- Dependencies: Volumes 09, 21, 26.
- Expected Outputs: The reference invoked the moment a real incident occurs.
- Document Status: **Draft — Not Started.**

### Phase F — Pilot & Rollout (Volumes 28–31)

**Volume 28 — Phase 1 Pilot Playbook (ID Card Renewal)**
- Objective: Apply every prior volume to the single pilot procedure recommended in Volume 04 §11.
- Main Deliverables: Fully configured procedure (eligibility rules, checklist, legal source set) for ID Card Renewal; pilot success criteria.
- Dependencies: Volumes 05–09, 14, 15, 16.
- Expected Outputs: The first real, end-to-end operating instance of the platform.
- Document Status: **Draft — Partially Instantiated** (the project's seed data at `prisma/seed.ts` already instantiates this procedure as a demo case).

**Volume 29 — Officer Training & Enablement Program**
- Objective: Prepare officers to work alongside the AI per Volume 09 Chapter 4.
- Main Deliverables: Training curriculum; override-recording practice guide; escalation-handling training.
- Dependencies: Volumes 09, 11, 17.
- Expected Outputs: The reference for onboarding every officer who will use the system.
- Document Status: **Draft — Not Started.**

**Volume 30 — Provincial & Ministry Onboarding Playbook**
- Objective: Operationalize Volume 06 Chapter 6 and Volume 09 Chapter 9 into a concrete process for adding a new jurisdiction or agency.
- Main Deliverables: Onboarding checklist; jurisdiction-parameter configuration guide.
- Dependencies: Volumes 06, 09.
- Expected Outputs: The reference used every time the platform expands to a new province or ministry.
- Document Status: **Draft — Not Started.**

**Volume 31 — Public Communication & Trust Report Framework**
- Objective: Operationalize Volume 09 Chapter 8's public trust framework into a recurring public accountability report.
- Main Deliverables: Public trust report template; escalation-rate and citation-accuracy public disclosure policy.
- Dependencies: Volumes 08, 09, 18.
- Expected Outputs: The reference for periodic public transparency reporting.
- Document Status: **Draft — Not Started.**

### Phase G — Governance & Continuity (Volumes 32–35)

**Volume 32 — Architecture Decision Records (ADR) Log**
- Objective: Maintain the running log of specific, dated technical and product decisions and their rationale.
- Main Deliverables: ADR index; ADR template.
- Dependencies: All prior volumes as context.
- Expected Outputs: A permanent, growing decision record, never retroactively rewritten.
- Document Status: **Draft — Initialized** (see the ADR Index seeded in §10 of this document).

**Volume 33 — Glossary & Terminology Standard**
- Objective: Maintain one authoritative definition per term used across all volumes (citizen, case, procedure, escalation, confidence, etc.).
- Main Deliverables: Canonical glossary.
- Dependencies: All prior volumes.
- Expected Outputs: Prevents terminology drift between documents authored at different times.
- Document Status: **Draft — Not Started.**

**Volume 34 — Knowledge Base Maintenance & Legal Update Cadence**
- Objective: Define the recurring operational cadence for keeping Volumes 07, 15, and 33 current.
- Main Deliverables: Review cadence calendar; ownership assignment per knowledge domain.
- Dependencies: Volumes 07, 15, 33.
- Expected Outputs: The reference preventing the documentation set from silently going stale the way the legal corpus itself must never go stale.
- Document Status: **Draft — Not Started.**

**Volume 35 — Post-Launch Evolution & 5-Year Roadmap Consolidation**
- Objective: Consolidate the future-evolution chapters already written across Volumes 05, 06, 07, 08, and 09 into one coherent, cross-referenced roadmap.
- Main Deliverables: Consolidated 5-to-20-year roadmap; cross-volume evolution dependency map.
- Dependencies: Volumes 05, 06, 07, 08, 09.
- Expected Outputs: The single reference for "what changes next" without re-reading five separate closing chapters.
- Document Status: **Draft — Not Started.**

### Phase G (extended) — Constitutional Layer Continuation

**Volume 36 — Success Metrics Constitution (`SUCCESS_METRICS_CONSTITUTION.md`)**
- Objective: Define the constitutional framework for how CAIOS measures itself — measurement philosophy, the North Star's supporting principles, and the full citizen/government/officer/national KPI taxonomy — building directly on `PRODUCT_CONSTITUTION.md` Chapter 10 and `TRUST_CONSTITUTION.md` Chapter 08 rather than redefining either.
- Main Deliverables: 12-chapter Constitution covering measurement philosophy, North Star supporting principles, citizen/government/officer/national impact metrics, trust metrics incorporation-by-reference, measurement boundaries (anti-gaming), constitutional dashboards, and forward dependencies.
- Dependencies: Volumes 01, 02, 03.
- Expected Outputs: The single authoritative source for every metric referenced across the constitutional series, reconciled rather than duplicated.
- Document Status: **Approved.**
- Ownership: Owner — Chief Strategy Officer · Architect — Chief Performance Architect / GovTech Measurement Architect · Reviewer — Constitutional Design Committee · Implementation Owner — N/A (Volume 18 is its downstream implementation) · Approval Authority — National Steering Committee.
- Numbering note: assigned per **ADR-0007** — Volume 04 remains Technical PRD; this is a new volume extending the Startup Edition to 36, not a reassignment of any existing slot. The authoring brief referred to it as "Volume 04," reconciled to 36 in the document's own title block without reopening the already-recorded decision.

**Volume 37 — System Architecture Specification (`SYSTEM_ARCHITECTURE_SPECIFICATION.md`)**
- Objective: Translate the Constitutional Core into architectural structure — goals, principles, bounded contexts, domain architecture, AI subsystem placement, human interaction layer, government integration layer, security, scalability, and reliability strategy — entirely independent of any specific framework or vendor.
- Main Deliverables: 14-section Specification covering architecture goals/principles, system context, 7 bounded contexts, domain architecture, 7 AI subsystems, human interaction layer, government integration layer, security architecture, scalability/reliability strategy, full traceability to the Constitutional Core, and ADR references.
- Dependencies: Volumes 01, 02, 03, 04, 05, 06, 07, 08, 09, 36.
- Expected Outputs: The architectural reference every future Specification (Rule Engine, Legal Knowledge ingestion, OCR, Escalation Ops) is a further refinement of.
- Document Status: **Approved.**
- Ownership: Owner — Enterprise Architect · Architect — Chief Enterprise Architect / Solution Architect / GovTech Platform Architect · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: assigned per **ADR-0009**, which generalizes ADR-0008's Volume 01–35 freeze from Constitutions specifically to every future volume. This is the first Specification-class document in the post-freeze sequence (36 = Constitution, 37 = Specification), confirming the sequential-append rule applies regardless of document class.

**Volume 38 — Epic A: AI Core Architecture (`EPIC_A_AI_CORE_ARCHITECTURE.md`)**
- Objective: The architectural blueprint parenting every AI-related Specification — AI capability map, subsystem map, interaction/decision/human-in-the-loop models, trust integration, security considerations — that Volumes 14–19 must each trace to rather than independently design.
- Main Deliverables: 13-section Epic covering epic overview, business objectives, architectural scope, AI capability map, AI subsystem map, interaction model, decision model, human-in-the-loop model, trust integration, security considerations, dependencies, ADR candidates, and the formal adoption of Volumes 14–19 as its children.
- Dependencies: Volumes 01, 02, 03, 05, 06, 07, 09, 36, 37.
- Expected Outputs: The single shared architecture Volumes 14–19 are built against, preventing six independently-designed interpretations of the same AI Core.
- Document Status: **Approved.**
- Ownership: Owner — Chief AI Architect · Architect — Enterprise Solution Architect / GovTech Platform Architect / AI Systems Designer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: assigned per **ADR-0010**, which introduces Epics as a fifth document class (§2) and numbers Epic A as the next sequential volume after 37.

**Volume 39 — Epic A: Execution Plan (`EPIC_A_EXECUTION_PLAN.md`)**
- Objective: Turn Epic A's architecture into a sequenced, gated engineering roadmap — deliverables, milestones, demo checkpoints, testing gates, and readiness checklists for Volumes 14–19, per ADR-0011's requirement that these items live at Epic level only.
- Main Deliverables: 14-section execution plan covering deliverables, specification/ADR/knowledge-base mapping, 6 engineering milestones, 3 demo milestones, 5 testing gates, implementation/competition/production readiness checklists, risks, exit criteria, and a milestone-level traceability matrix.
- Dependencies: Volume 38 (its parent Epic), and transitively every Constitution Epic A depends on.
- Expected Outputs: The master engineering roadmap Volumes 14–19 are implemented against.
- Document Status: **Approved.**
- Ownership: Owner — Chief Delivery Architect · Architect — Technical Program Manager / Enterprise Engineering Manager / GovTech Solution Delivery Lead · Reviewer — Technical Steering Committee · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: assigned per **ADR-0011**, establishing the "Epic + Execution Plan" pairing pattern for all future Epics.

**Volume 40 — Engineering Sprint 01 Specification: Conversation Experience (`ENGINEERING_SPRINT_01_SPECIFICATION.md`)**
- Objective: The first implementation-ready, technology-independent Specification — enables a citizen to complete one grounded first conversation turn (procedure match, eligibility, citation, checklist) per the MVD's Conversation screen.
- Main Deliverables: 20-section sprint specification covering flow, states, edge/failure cases, AI decision points, logging/audit/security/performance/accessibility requirements, DoD, and traceability.
- Dependencies: Volumes 01, 03, 07, 09, 37, 38, 39 (and the non-numbered `DEMO_DIRECTOR_BOOK.md` / `MVD_IMPLEMENTATION_PLAN.md` / `IMPLEMENTATION_ALIGNMENT_REVIEW.md`).
- Expected Outputs: The authoritative brief Sprint 01's implementation is built and checked against.
- Document Status: **Approved.**
- Ownership: Owner — Chief Software Architect · Architect — Engineering Manager / Lead Frontend Engineer / Lead Backend Engineer · Reviewer — Technical Steering Committee · Implementation Owner — Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: next sequential volume after 39, per the standing append rule (ADR-0008/0009).

**Volume 41 — AI Reasoning Pipeline Specification (`AI_REASONING_PIPELINE_SPECIFICATION.md`)**
- Objective: Describe the 12-stage reasoning pipeline (Intent Detection → Case Initialization) that consumes the four-layer Knowledge Graph and produces a grounded citizen response, concretizing Epic A's Interaction/Decision/Human-in-the-Loop models stage by stage.
- Main Deliverables: Full per-stage Purpose/Inputs/Outputs/Decision/Failure/Confidence/Escalation/Future-Model/Dependency/Constitution/Specification breakdown for all 12 stages, plus pipeline/sequence/state-transition/failure-recovery diagrams, confidence propagation, Trust by Design mapping, audit design, performance budget, and Competition Demo mapping.
- Dependencies: Volumes 01, 03, 05, 06, 07, 09, 37, 38, 39, 40, plus the four `knowledge/` layers.
- Expected Outputs: The authoritative reasoning-shape brief for implementing Stages 01–05 (Sprint 01B/01C territory) and beyond.
- Document Status: **Approved.**
- Ownership: Owner — Chief AI Architect · Architect — System Reasoning Designer / Enterprise AI Engineer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: next sequential volume after 40, per the standing append rule (ADR-0008/0009).

**Volume 42 — Document Gap Analysis Engine Specification (`DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md`)**
- Objective: Design the reasoning engine (distinct from OCR extraction) that determines Complete/Missing/Optional/Invalid/Expired/Conflicting status for a case's checklist — the reasoning core behind Volume 41's flagged "Stage 13: Missing Document Detection" gap and `DEMO_DIRECTOR_BOOK.md`'s central demo moment.
- Main Deliverables: Architecture, decision flow, rule evaluation, conflict resolution, confidence model, Trust mapping, failure modes, audit design, human override, future OCR/RAG/multi-document integration notes, Competition Demo mapping, performance budget.
- Dependencies: Volumes 01, 05, 06, 07, 09, 37, 38, 41, plus `knowledge/procedures/` and `knowledge/documents/`.
- Expected Outputs: The authoritative reasoning-shape brief for implementing document gap analysis, ahead of any real OCR integration.
- Document Status: **Approved.**
- Ownership: Owner — Chief AI Architect · Architect — Knowledge Engineer / Document Intelligence Designer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: next sequential volume after 41, per the standing append rule (ADR-0008/0009).

**Volume 43 — Rule Pack: CCCD Pilot (`RULE_PACK_CCCD_PILOT.md`)**
- Objective: Fill `RULE_ENGINE_SPECIFICATION.md` (Volume 14)'s template with real rule content for the four CCCD pilot procedures — a 7-rule Shared Rule Library plus 18 procedure-specific rules.
- Main Deliverables: Per-procedure overview, documents, and rules (Eligibility/Exception/Validation/Age/Fee), rule dependency graphs, Cross Procedure Matrix, Rule Statistics, Coverage Report.
- Dependencies: Volumes 01, 05, 06, 07, 09, 14, 37, 41, 42, plus `knowledge/procedures/`, `knowledge/documents/`, `knowledge/citations/`.
- Expected Outputs: The first real, evaluable rule content Stage 06 (Volume 41) and the Document Gap Analysis Engine (Volume 42) can run against.
- Document Status: **Approved.**
- Ownership: Owner — Chief Rule Architect · Architect — Government Decision Designer · Reviewer — Technical Steering Committee + Administrative Law Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: next sequential volume after 42, per the standing append rule (ADR-0008/0009) — **not Volume 15**, which remains reserved for the Legal Knowledge Base & RAG Ingestion Specification.

**Volume 44 — Legal Citation Specification (`LEGAL_CITATION_SPECIFICATION.md`)**
- Objective: Define the universal, technology-independent citation standard — the Citation Object, six Citation Levels, four audience-specific rendering rules, missing/conflicting citation policies, and citation traceability — that every legal claim, eligibility decision, checklist item, exception, deadline, fee, and mandatory document must satisfy.
- Main Deliverables: Citation Philosophy; universal Citation Requirements; 15-field Citation Object; 6 Citation Levels (Verified/Official/Historical/Pending Verification/Unknown/Deprecated); Citizen/Officer/Audit/System rendering rules; Missing and Conflicting Citation Policies; citation traceability chain; audit requirements; technology-independence acceptance criteria (valid even with no LLM).
- Dependencies: Volumes 01, 05, 07, 09, 14, 15, 41, 43, plus `knowledge/citations/`.
- Expected Outputs: The reference every future legal-claim-producing component is checked against.
- Document Status: **Approved.**
- Ownership: Owner — Chief Knowledge Architect · Architect — Legal Citation Standards Designer · Reviewer — Technical Steering Committee + Administrative Law Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: next sequential volume after 43, per the standing append rule (ADR-0008/0009) — **not Volume 16**, which remains reserved for the OCR & Document Intelligence Specification.

**Volume 45 — Memory & Conversation Specification (`MEMORY_AND_CONVERSATION_SPECIFICATION.md`)**
- Objective: Define the complete, technology-independent architecture for conversational and case memory — how a conversation becomes durable, structured, trustworthy memory that the Rule Engine, Document Gap Analysis Engine, and AI Reasoning Pipeline can rely on without knowing how it was captured or stored.
- Main Deliverables: Memory Philosophy (never imagination, prediction, or assumption); 10 Memory Domains; 8-state Conversation Lifecycle (Started/Active/Paused/Escalated/Closed/Archived/Reopened/Retired); 13-object Conversation Object Model (built around a Participant object, Context retired as a standalone object); a distinct 7-stage Memory Lifecycle (Created/Updated/Verified/Referenced/Superseded/Archived/Retired — nothing silently deleted), deliberately kept separate from the 6-level Memory Trust scale (Unknown/Observed/Confirmed/Verified/Superseded/Retired); one-directional Context Propagation (Conversation→Case→Citizen→Organization) under three rules (no duplication, no contradiction, no hidden transformation); traceable Conversation Summaries that never outrank the original record; 5-part Human Review; 7 defined Interfaces with an explicit no-direct-AI-model rule; 7-category Failure Handling; Trust by Design Mapping; technology-independence acceptance criteria extended to Conversation Engine, Organization, and Government Platform substitution (9 tests total).
- Dependencies: Volumes 01, 03, 05, 06, 07, 08, 09, 14, 15, 16, 37, 38, 41, 42, 44. *(Reviewed against this revision's expanded content — unchanged.)*
- Expected Outputs: The reference for what a case is permitted to remember, and how much it may trust what it remembers.
- Document Status: **Approved.** *(Version 2.0 — restructured into 16 chapters; see the document's own Changelog.)*
- Ownership: Owner — Chief AI Architect · Architect — Memory Systems Designer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: next sequential volume after 44, per the standing append rule (ADR-0008/0009) — **not Volume 17**, which remains reserved for the Escalation & Human-in-the-Loop Operations Manual. No ADR required; no reassignment occurs.

**Volume 46 — Case Management Specification (`CASE_MANAGEMENT_SPECIFICATION.md`)**
- Objective: Define the complete, technology-independent lifecycle, structure, ownership, and interfaces of a Case — the single authoritative record for one citizen request, independent of conversation, AI implementation, or government platform.
- Main Deliverables: Case Philosophy (Case as single source of truth, authoritative above evolving conversation/memory/reasoning); 9-state Case Lifecycle (Created/In Progress/Waiting Citizen/Waiting Government/Escalated/Resolved/Closed/Archived/Retired); 13-object Case Object Model; Case Ownership and Transfer Rules (Citizen/Officer/Organization/Shared Responsibility); 8 named Case Relationships; Case State Management (allowed/forbidden transitions, Rollback, Recovery, Reopen); Evidence Management that deliberately reuses Volume 45's Memory Trust Levels and Volume 16's Confidence Model rather than inventing a fourth trust scale; Decision Recording bound to the existing three-outcome Decision Model with a never-overwrite rule; 4-tier Human Review (Citizen/Officer/Supervisor/Administrator); 6 defined Interfaces; 6-category Failure Handling including Merge and Split; Trust by Design Mapping; technology-independence acceptance criteria (7 tests).
- Dependencies: Volumes 01, 05, 06, 07, 08, 09, 14, 15, 16, 37, 38, 41, 42, 45.
- Expected Outputs: The reference for what a Case is, what it must always remain authoritative over, and how it relates to every other CAIOS component.
- Document Status: **Approved.**
- Ownership: Owner — Chief Workflow Architect · Architect — Case Systems Designer · Reviewer — Technical Steering Committee + Government Officer Representative · Implementation Owner — Platform Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: the first genuinely unassigned sequential slot after Volume 45 — no reassignment, no ADR required.

**Volume 47 — AI Orchestration Specification (`AI_ORCHESTRATION_SPECIFICATION.md`)**
- Objective: Define how every AI-adjacent capability inside CAIOS is coordinated — formalizing the "orchestration layer" / "Planner Agent" concept already referenced by `AI_OPERATING_SYSTEM.md` and this index's own AI Consumption Order — without itself performing reasoning, legal knowledge retrieval, document extraction, memory management, or rule evaluation.
- Main Deliverables: Orchestration Philosophy (components cooperate, none owns the whole workflow); 8-stage Orchestration Lifecycle (Request Received/Capability Selection/Task Distribution/Execution/Validation/Aggregation/Human Review/Completion); 10-entry Capability Registry mapping each capability to its owning Specification; 6 Execution patterns (Sequential/Parallel/Conditional/Fallback/Retry/Cancellation); 5 Task Coordination rules deferring priority entirely to Workflow/Case rules; Context Sharing strictly by reference, never duplication; 5-part Failure Strategy preserving Partial Success; Human-in-the-loop routing to each capability's own existing override mechanism; mandatory per-stage Auditability; Trust by Design Mapping; 3 permanent Known Architectural Constraints (orchestration may never replace Rule Engine, Case Management, or Human Authority); technology-independence acceptance criteria (7 tests).
- Dependencies: Volumes 01, 05, 06, 07, 09, 14, 15, 16, 37, 38, 41, 42, 45, 46.
- Expected Outputs: The reference for how AI capabilities are coordinated, and the permanent boundary preventing orchestration from absorbing any capability's own authority.
- Document Status: **Approved.**
- Ownership: Owner — Chief AI Architect · Architect — AI Orchestration Designer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: the first genuinely unassigned sequential slot after Volume 46 — no reassignment, no ADR required.

**Volume 48 — Notification & Communication Specification (`NOTIFICATION_AND_COMMUNICATION_SPECIFICATION.md`)**
- Objective: Define every notification, communication, and information delivery inside CAIOS — what is communicated, when, why, and under what authority — independent of any specific delivery technology, channel, or platform. Formally owns the "Notification" capability that Volume 47's Capability Registry currently lists as jointly governed elsewhere (see this Volume's own Known Risks for the pending Volume 47 cross-reference update).
- Main Deliverables: Communication Philosophy (notification is never the source of truth, never fabricates urgency); 7-state Notification Lifecycle with a Failed exception branch; 8 Notification Types each declaring its own Acknowledgement requirement; 4 logical Communication Channels (Direct/Delegated/Internal/Broadcast); 4 Recipients (Citizen/Officer/Supervisor/Organization) scoped to authorized relationship; Delivery Policies (authorization-first, least disclosure, no redundant delivery); 4-tier Priority Model kept distinct from every existing trust/confidence scale; Delivered/Acknowledged distinction with mandatory escalation on unacknowledged Critical notifications; Escalation Notifications guaranteeing a human is never left uninformed; Trust by Design Mapping; Known Constraints; technology-independence acceptance criteria (8 tests).
- Dependencies: Volumes 01, 05, 06, 08, 09, 37, 38, 41, 42, 45, 46, 47.
- Expected Outputs: The reference for what CAIOS communicates and under what authority, independent of delivery technology.
- Document Status: **Approved.**
- Ownership: Owner — Chief Citizen Experience Architect · Architect — Communication Systems Designer · Reviewer — Technical Steering Committee + Accessibility Expert · Implementation Owner — Platform Engineering Lead · Approval Authority — Technical Steering Committee.
- Numbering note: the first genuinely unassigned sequential slot after Volume 47 — no reassignment, no ADR required.

---

## 4. Dependency Matrix

| Volume | Depends On |
|---|---|
| 00 | None |
| 01 | None |
| 02 | 01 |
| 03 | 01, 02 |
| 04 | 01, 02, 03 |
| 05 | 01, 04 |
| 06 | 01, 05 |
| 07 | 01, 05, 06 |
| 08 | 01, 05, 06 |
| 09 | 01, 05, 06, 07, 08 |
| 10 | 06, 08 |
| 11 | 06, 09 |
| 12 | 08 |
| 13 | 07, 08 |
| 14 | 01, 05, 06, 07, 09, 37, 38, 41, 42 |
| 15 | 01, 05, 06, 07, 09, 14, 41, 42, 43 |
| 16 | 01, 05, 09, 14, 15, 37, 38, 41, 42, 44 |
| 17 | 05, 06, 07, 09, 11 |
| 18 | 05, 08, 09 |
| 19 | 05, 06 |
| 20 | 05, 08, 09 |
| 21 | 07, 09 |
| 22 | 04, 09, 20, 21 |
| 23 | 04, 09, 20 |
| 24 | 05, 06, 07 |
| 25 | 04, 07, 14, 15, 24 |
| 26 | 04 |
| 27 | 09, 21, 26 |
| 28 | 05, 06, 07, 08, 09, 14, 15, 16 |
| 29 | 09, 11, 17 |
| 30 | 06, 09 |
| 31 | 08, 09, 18 |
| 32 | All prior (context only, no hard blocking dependency) |
| 33 | All prior |
| 34 | 07, 15, 33 |
| 35 | 05, 06, 07, 08, 09 |
| 36 | 01, 02, 03 |
| 37 | 01, 02, 03, 04, 05, 06, 07, 08, 09, 36 |
| 38 | 01, 02, 03, 05, 06, 07, 09, 36, 37 |
| 39 | 38 |
| 40 | 01, 03, 07, 09, 37, 38, 39 |
| 41 | 01, 03, 05, 06, 07, 09, 37, 38, 39, 40 |
| 42 | 01, 05, 06, 07, 09, 37, 38, 41 |
| 43 | 01, 05, 06, 07, 09, 14, 37, 41, 42 |
| 44 | 01, 05, 07, 09, 14, 15, 41, 43 |
| 45 | 01, 03, 05, 06, 07, 08, 09, 14, 15, 16, 37, 38, 41, 42, 44 |
| 46 | 01, 05, 06, 07, 08, 09, 14, 15, 16, 37, 38, 41, 42, 45 |
| 47 | 01, 05, 06, 07, 09, 14, 15, 16, 37, 38, 41, 42, 45, 46 |
| 48 | 01, 05, 06, 08, 09, 37, 38, 41, 42, 45, 46, 47 |

**Reading rule:** a volume may enter Draft status without all its dependencies being finalized, but it may not reach Approved status until every volume it depends on is itself Approved — a specification cannot be finalized on top of a constitutional principle that is still being debated.

---

## 4a. Ownership Model (RACI) — Phase Defaults

Volumes 01–09 carry individual ownership records above. For planned Volumes 10–35, repeating an identical five-role RACI block 26 times would create maintenance burden without adding real information before those volumes exist. Instead, each phase carries a default RACI, which an individual volume overrides the moment it enters Draft with its own specifics.

| Phase | Owner (default) | Architect (default) | Reviewer (default) | Implementation Owner (default) | Approval Authority (default) |
|---|---|---|---|---|---|
| B — Experience & Design (10–13) | Chief Citizen Experience Architect | Design System Lead | Accessibility Expert | Frontend Engineering Lead | Product Steering Committee |
| C — AI Subsystems (14–19) | Chief AI Architect | Relevant subsystem lead | AI Governance Expert | AI/ML Engineering Lead | Technical Steering Committee |
| D — Data & Security (20–23) | Security & Compliance Lead | Security Architect | Legal + Compliance reviewers | Platform Engineering Lead | Security & Compliance Steering Committee |
| E — Quality & Operations (24–27) | Engineering Lead | Enterprise Architect | QA Lead | DevOps Lead | Technical Steering Committee |
| F — Pilot & Rollout (28–31) | Program Management Office | Chief Workflow Architect | Government Officer representative | Pilot Program Manager | National Steering Committee + Pilot Sponsor |
| G — Governance & Continuity (32–35) | Enterprise Architect | Documentation Architect | Constitutional Design Committee | Program Management Office | National Steering Committee |

The standing bodies referenced here (National Steering Committee, Technical Steering Committee, Security & Compliance Steering Committee, Product Steering Committee, Program Management Office) are defined in full in `PROJECT_OPERATING_SYSTEM.md` Chapter 03.

---

## 5. Traceability Matrix

Every implementation detail in CAIOS must be walkable, backward, through this chain without a missing link.

| Layer | Answers | Primary Volumes | What breaks if this link is missing |
|---|---|---|---|
| **Vision** | Why does CAIOS exist at all, and what future is it working toward? | 01, 02 | Every other layer optimizes for the wrong thing, or for the right thing over the wrong time horizon. |
| **Citizen Needs** | What does the citizen actually need, and who are they? | 08 | Design serves an imagined citizen instead of the real one. |
| **Product Features** | What capability does the platform offer to meet that need? | 04, 06 | Features exist with no traceable justification, inviting scope creep. |
| **Workflow** | What sequence of steps delivers that feature correctly, every time? | 06 | Behavior becomes inconsistent case to case. |
| **AI Agents** | Which specialized reasoning role executes each workflow step? | 05, 07 | Responsibility for a decision becomes untraceable. |
| **Implementation** | What code, schema, or configuration actually realizes the agent's behavior? | 04 and the codebase itself | The documented design and the running system silently diverge. |
| **Demo** | Can we show a real citizen case moving correctly through the whole chain? | 28 | The chain's correctness is asserted but never actually verified end-to-end. |

Any new capability proposed for CAIOS must be able to fill in every row of this table before it is approved for implementation.

---

## 6. Change Impact Matrix

This is the Dependency Matrix (§4) read in reverse: for a given volume, which other volumes are directly affected if it changes, and how severely. Severity is **High** for any Constitution (a change ripples into every dependent specification's assumptions), **Medium** for widely-depended specifications, and **Low** for leaf volumes nothing else currently depends on.

| If This Volume Changes | Directly Affected Volumes | Impact Severity |
|---|---|---|
| 01 — Product Constitution | 02–09 (all Phase A volumes cite it directly) | High |
| 02 — Vision Constitution | 03 directly; 04 directly; 05–09 transitively through 04, and directly in spirit per `VISION_CONSTITUTION.md` Chapter 13 | High |
| 03 — Trust Constitution | 04 directly; 36 directly; future Officer and Interoperability Constitutions; Volumes 18, 21, 31 | High |
| 36 — Success Metrics Constitution | Volume 18 directly; Volume 31 directly; future Quality, Risk, Officer, and Ethics Constitutions | High |
| 37 — System Architecture Specification | Every future Specification (14–19, 20–23, 24–27) that concretizes a bounded context or subsystem defined here | High |
| 38 — Epic A: AI Core Architecture | Volumes 14, 15, 16, 17, 18, 19 (formally adopted as children); Volume 39 (its Execution Plan) | High |
| 39 — Epic A: Execution Plan | Volumes 14, 15, 16, 17, 18, 19 (their milestone sequencing) | Medium |
| 40 — Engineering Sprint 01 Specification | Sprint 02 and Sprint 03 (not yet numbered), whichever code implements this sprint | Medium |
| 41 — AI Reasoning Pipeline Specification | Future Sprint 01B/01C implementations of Stages 01-05; Volume 42; Volume 45 (formalizes its conversational/case memory assumptions) | High |
| 42 — Document Gap Analysis Engine Specification | Volume 14 (Rule Engine), Volume 16 (OCR & Document Intelligence, its extraction input source, now at Version 2.0), Volume 45 (its case memory input source) | High |
| 16 — OCR & Document Intelligence Specification | Volume 42 (its extraction input source), Volume 44 (Verified-level evidence feeding citation confidence), Volume 45 (its extracted Evidence objects feed Case Memory), future real OCR implementation against `ChecklistItem.ocrExtract` | High |
| 43 — Rule Pack: CCCD Pilot | Volume 28 (Pilot Playbook), future Sprint 01B/01C implementations, Volume 44 (citation re-leveling) | Medium |
| 44 — Legal Citation Specification | Every future legal-claim-producing component; Volume 14, Volume 15, Volume 43 (all reference its Citation Object/Levels), Volume 45 (its Verified Citation Level feeds Memory Trust) | High |
| 45 — Memory & Conversation Specification | Future implementation of `src/lib/memory/case-memory.ts` against its Memory Types/Objects; Volume 41 and Volume 42 (both now formally consume its Memory Trust levels); Volume 46 (its Evidence Management inherits Memory Trust Levels directly) | High |
| 46 — Case Management Specification | Future reconciliation of `CaseStage`/`WorkflowState` against its Case Lifecycle; Volume 41 and Volume 42 (both operate over the Case this Specification defines); Volume 47 (orchestrates calls that trigger Case transitions through its interfaces) | High |
| 47 — AI Orchestration Specification | Every Approved capability in its Registry (Volumes 14, 15, 16, 41, 42, 45, 46) whenever orchestrated interaction between them changes; future reconciliation with `src/lib/orchestration/workflow-state-machine.ts`'s naming collision; Volume 48 (pending Capability Registry correction naming it as Notification's owner) | High |
| 48 — Notification & Communication Specification | Volume 47 (its Capability Registry's stale Notification entry, pending correction); every capability whose triggering facts produce a notification (Volumes 14, 41, 45, 46) | Medium |
| 04 — Technical PRD | 05, 22, 23, 25, 26 | High |
| 05 — AI Operating System | 06, 07, 08, 09, 14, 16, 17, 18, 19, 20, 24, 28, 35 | High |
| 06 — Workflow Constitution | 07, 08, 09, 10, 11, 17, 19, 24, 28, 30, 35 | High |
| 07 — Legal Intelligence Constitution | 09, 13, 14, 15, 17, 21, 24, 25, 28, 34, 35 | High |
| 08 — Citizen Constitution | 09, 10, 12, 13, 16, 18, 20, 28, 31, 35 | High |
| 09 — Government Constitution | 11, 17, 18, 20, 21, 22, 23, 27, 29, 30, 31, 35 | High |
| 10 — Citizen Experience Design System | 16 | Medium |
| 11 — Officer Workspace Design Spec | 17, 29 | Medium |
| 14 — Rule Engine Specification | 25, 28, 41 (Stage 06 implementation), 42 (its evaluation pipeline), 43 (its first Rule Pack content) | High |
| 15 — Legal Knowledge Base & RAG Ingestion | 25, 28, 34, 14, 41, 42, 43 (all consume its knowledge-object contract) | High |
| 20 — Data Governance & Privacy Framework | 22, 23 | Medium |
| 21 — Security Architecture & Threat Model | 22, 27 | Medium |
| 18 — Analytics & AI Quality Dashboard | 31 | Low |
| 24 — QA & Testing Strategy | 25 | Low |
| 26 — DevOps & Release Playbook | 27 | Low |
| 12, 13, 19, 22, 23, 27, 29, 30, 31 | None currently downstream | Low |

**Governance rule (see `PROJECT_OPERATING_SYSTEM.md` Chapter 05):** any change to a High-severity volume automatically opens a review task against every volume listed as directly affected — this is not discretionary; the Change Impact Matrix exists specifically so that a Constitution amendment cannot quietly leave a dependent specification inconsistent with it.

---

## 7. Reading Order by Audience

Different readers need different sequences through the same 35-volume set. None of these sequences skip a Constitution that governs the reader's area of concern.

- **Founder:** 01 → 02 → 03 → 36 → 08 → 09 → 05 → 06 → 07 → 04 → (this Master Index, in full) → 35.
- **Enterprise/Technical Architect:** 00 (this index) → 01 → 02 → 03 → 36 → 04 → 37 → 05 → 06 → 07 → 09 → 20–23 → 14–19 → 32.
- **Developer:** 04 → 37 → 05 → 06 → whichever of 14–19 covers their task → the codebase itself → 24 → 26.
- **Claude Code (AI coding agent operating on this repository):** 00 → 01 → 02 → 03 → 36 → 04 → 05 → 06 → 07 → 08 → 09 → the specific Specification volume relevant to the current task → the codebase. This is, concretely, the order these documents were actually produced and consumed in this project's own history.
- **Judge / External Evaluator:** 01 → 02 → 03 → 36 → 08 → 00 (this index, as proof of structural rigor) → 09 → 28 → live demo.
- **Government Officer:** Volume 09 Chapter 4 (Role of Officers) → 11 → 17 → 29. Officers do not need the full constitutional stack — only the operationally relevant subset that governs their own authority and workflow.

**Volume 16 note:** every "14–19" range above, and the Developer order's "whichever of 14–19 covers their task," now resolves to real, Approved content for document-extraction tasks — Volume 16 (`OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md`) is no longer a Draft placeholder inside that range. A reader whose task touches document upload, extraction, or confidence should read Volume 16 directly, immediately after whichever Constitution(s) their audience row already requires.

**Volume 45 note:** Volume 45 (`MEMORY_AND_CONVERSATION_SPECIFICATION.md`, now at Version 2.0) sits outside the 14–19 range entirely (it is numbered sequentially after 44, alongside 37–44), so no existing range above implicitly covers it. A reader whose task touches conversation handling, case memory, or memory trust should read Volume 45 directly, positioned in every audience order immediately after Volume 41 (AI Reasoning Pipeline) and before Volume 42 (Document Gap Analysis) — since Volume 45 formalizes the memory assumptions the former makes and supplies the case-memory input the latter consumes. This positioning is confirmed unchanged by the Version 2.0 restructuring.

**Volume 46 note:** Volume 46 (`CASE_MANAGEMENT_SPECIFICATION.md`) likewise sits outside the 14–19 range, numbered sequentially after 45. A reader whose task touches Case state, ownership, evidence, or decision recording should read Volume 46 directly, positioned immediately after Volume 45 in every audience order — Volume 46 defines the Case that Volume 45's Case Memory is scoped to, so reading Volume 45 first and Volume 46 second follows the same dependency direction the Dependency Matrix (§4) already records.

**Volume 47 note:** Volume 47 (`AI_ORCHESTRATION_SPECIFICATION.md`) sits outside the 14–19 range as well, numbered sequentially after 46. Because it coordinates every capability in Volumes 14, 15, 16, 41, 42, 45, and 46 without owning any of them, it should be read last among this cluster in every audience order — immediately after Volume 46 — so a reader already understands each capability's own authority before reading how those capabilities are called upon together.

**Volume 48 note:** Volume 48 (`NOTIFICATION_AND_COMMUNICATION_SPECIFICATION.md`) sits outside the 14–19 range as well, numbered sequentially after 47. A reader whose task touches what is communicated to a citizen or officer, or when, should read Volume 48 directly, positioned immediately after Volume 47 in every audience order — Volume 48 is triggered by facts recorded in Volumes 14, 41, 45, and 46, so it reads most coherently once those are already understood.

---

## 8. AI Consumption Order

CAIOS is built and, in places, run by AI systems, not only documented for human readers. Different AI tools have different roles and different context scopes, so "which documents should an AI load, and when" is itself a governance question, not an implementation detail.

**Universal principle:** Constitutional documents always load before Specifications; Specifications always load before raw code. No AI system is ever handed code to modify without also being given the Constitution that governs the area the code implements — this is what prevents an AI coding tool from silently reintroducing a violation (e.g., quietly adding a code path where the AI issues a final decision, which Volume 09 Chapter 3 permanently forbids).

- **Claude** (conversational engagement with the project): the full constitutional stack (01, 02, 03, 36, 05, 06, 07, 08, 09) plus this Master Index and `PROJECT_OPERATING_SYSTEM.md`, loaded once per project engagement and held for the duration of the conversation, referenced for every subsequent design or content decision.
- **Claude Code** (coding agent operating directly on this repository): this Master Index → the Constitution(s) relevant to the current task → the relevant Specification volume → the actual code. Never code-first.
- **Cursor** (in-editor AI pair programmer, typically operating at file/function scope with less full-project context by default): should not be expected to load the entire stack every session. Instead, it is pointed to a lightweight, file-scoped rule referencing which single Constitution chapter governs the code area currently open — a targeted pointer, not the full document, matched to its narrower working context.
- **Gemini / OpenAI or any other third-party model integrated as a swappable backend behind a specific agent** (e.g., an OCR or embedding provider per Volume 04's config-driven provider requirement): **never receives the constitutional stack as conversational context at all.** It receives only the narrow instruction and data relevant to the single tool call it is performing. Per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 8, instructions must never be conflated with data, and handing a swappable vendor model the full constitutional stack as an implicit "system prompt" would misattribute governance authority to a component that Volume 09 Chapter 3 explicitly denies any decision authority to. **Governance lives in the orchestration layer (the Planner Agent), never in whichever specific LLM vendor happens to be plugged in underneath a given agent** — this is precisely what makes the vendor swappable in the first place without a governance rewrite. This is also, concretely, why Volume 16 Chapter 12 requires that no OCR or document-recognition provider ever receives or produces anything beyond the narrow extraction task itself: whatever vendor sits behind the OCR Agent is exactly this category of swappable backend, never a party to conversational or constitutional context.
- **Volume 16 note:** any AI tool whose current task touches document upload, extraction, classification, or confidence should load `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` as the relevant Specification volume in the Claude Code row above — it is now real, Approved content, not a Draft stub, and it is the single reference for what an OCR-adjacent agent is and is not permitted to do.
- **Volume 45 note:** any AI tool whose current task touches conversation handling, case memory, or memory trust should load `MEMORY_AND_CONVERSATION_SPECIFICATION.md` (now at Version 2.0) as the relevant Specification volume in the Claude Code row above. This is also the concrete instance of the Claude row's constitutional-stack rule and the third-party-model row's narrow-instruction rule working together: Claude (conversational engagement) may hold a citizen's full conversational context for the duration of an engagement, but any swappable conversational or generative model plugged in underneath a specific agent still never receives the constitutional stack itself — Volume 45 Chapter 12's "never communicate directly with AI models" rule is what keeps that boundary intact even as memory grows richer.
- **Volume 46 note:** any AI tool whose current task touches Case state, ownership, evidence, or decision recording should load `CASE_MANAGEMENT_SPECIFICATION.md` as the relevant Specification volume in the Claude Code row above, immediately alongside Volume 45 — a coding agent asked to modify Case-adjacent code should never load one without the other, since Volume 46 defines the authoritative record Volume 45's Case Memory is scoped to.
- **Volume 47 note:** any AI tool whose current task touches coordination between two or more capabilities (for example, wiring Document Intelligence output into Rule Engine input) should load `AI_ORCHESTRATION_SPECIFICATION.md` as the relevant Specification volume in the Claude Code row above, in addition to — never instead of — whichever individual capability Specifications the task touches; Volume 47 governs the calling discipline between capabilities, not any capability's own internal logic, so it is never sufficient reading on its own for a task that modifies a capability's internals.
- **Volume 48 note:** any AI tool whose current task touches what is communicated to a citizen or officer, or when, should load `NOTIFICATION_AND_COMMUNICATION_SPECIFICATION.md` as the relevant Specification volume in the Claude Code row above. A coding agent implementing any notification-triggering path (Case transitions, Decisions, Corrections, Escalations) should load Volume 48 alongside whichever of Volumes 14, 41, 45, or 46 is producing the underlying fact, never Volume 48 alone — Volume 48 governs the notification's content and authority, not the fact being reported.

---

## 9. Relationship Diagram

A conceptual map of how the core entities relate — not a database schema, a governance-level picture of how responsibility flows.

```
                     ┌───────────┐
                     │  CITIZEN  │
                     └─────┬─────┘
                           │ initiates
                           ▼
                     ┌───────────┐        cites        ┌───────────┐
                     │   CASE    │◄────────────────────►│   LEGAL   │
                     └─────┬─────┘                     └───────────┘
                           │ moves through
                           ▼
                     ┌───────────┐        triggers      ┌───────────────┐
                     │ WORKFLOW  │──────────────────────►│ NOTIFICATION  │
                     └─────┬─────┘                       └───────┬───────┘
                           │ routes to (escalation / decision)    │ informs
                           ▼                                       ▼
                     ┌───────────┐                            ┌──────────┐
                     │  OFFICER  │───────────updates case─────►│   CASE   │ (loop back)
                     └─────┬─────┘                            └──────────┘
                           │ actions & decisions feed
                           ▼
                     ┌───────────┐
                     │ DASHBOARD │  (aggregated, never exposes another citizen's case)
                     └───────────┘
```

A **Citizen** initiates a **Case**. The **Case** moves through **Workflow** (the state machine defined in Volume 06), which continuously cites **Legal** sources (Volume 07) to validate eligibility and requirements. Workflow state changes trigger **Notification** back to the citizen. Where the workflow reaches a decision point or an escalation trigger, it routes to an **Officer** (Volume 09 Chapter 4), whose actions update the Case directly. Every Case, Workflow, and Officer action feeds the **Dashboard** (Volume 18) in aggregated form only — the Dashboard never exposes one citizen's case to anyone other than that citizen and their assigned officer.

---

## 10. ADR Index

Architecture Decision Records are numbered sequentially, never renumbered or reused even when superseded. This is the seed of Volume 32's full log.

| ID | Title | Status | Supersedes |
|---|---|---|---|
| ADR-0001 | Adopt Prisma 7's driver-adapter model (`@prisma/adapter-pg`) rather than the legacy connection-string-only client | Accepted | — |
| ADR-0002 | Use a custom cookie-based JWT session (via `jose`) for RBAC instead of a third-party auth provider, to keep the citizen/officer/admin role model fully under this project's control | Accepted | — |
| ADR-0003 | Split Kubernetes namespaces by audience (`citizen-facing`, `officer-facing`, `internal-admin`) with independent scaling policies, per `GOVERNMENT_CONSTITUTION.md` §9's citizen/officer load-pattern distinction | Accepted | — |
| ADR-0004 | Defer LangGraph, MCP, RAG/vector database, and OCR implementation to Phase 1; Phase 0 scaffolds structure only (schema, RBAC, audit log, portal shells) | Accepted | — |
| ADR-0005 | Reassign Volume 02 from the historical "Core Behavior Specification" placeholder — never independently authored, absorbed into Volume 05 at that document's own authorship — to `VISION_CONSTITUTION.md`. The placeholder is retained as a footnote on Volume 02's entry in §3, not as a competing numbered volume, since it never existed as a standalone file to formally supersede. | Accepted | — |
| ADR-0006 | Reassign Volume 03 from the historical "System Architecture (Component Map)" placeholder — never independently authored, absorbed into Volume 04 at that document's own authorship — to `TRUST_CONSTITUTION.md`. The placeholder is retained as a footnote on Volume 03's entry in §3, not as a competing numbered volume, for the same reason as ADR-0005. | Accepted | — |
| ADR-0007 | Volume 04 (`TECHNICAL_PRD`) is **not** reassigned to Success Metrics Constitution, unlike ADR-0005/0006's placeholder reassignments — Volume 04 is a real, Approved Specification with live dependents (05, 22, 23, 25, 26) and instantiated code (`prisma/schema.prisma`, RBAC, Docker/K8s). Reassigning it would break real dependency references, not merely a historical placeholder. Success Metrics Constitution is instead numbered **Volume 36**, extending the Startup Edition documented in §3 from 35 to 36 volumes. | Accepted | — |
| ADR-0008 | **Permanent numbering freeze (Architecture Review 006):** the original 35-volume numbering (Volumes 01–35) is permanently frozen — no future document may ever renumber or reassign an Approved volume, even a placeholder one, the way ADR-0005 and ADR-0006 did. Historical continuity is established as more important than numerical tidiness. Future Constitutional Extensions are appended sequentially from Volume 36 onward (36, 37, 38, ...), never inserted into or reassigned within 01–35. This ADR itself supersedes the *practice* (not the historical record) established by ADR-0005 and ADR-0006 — those remain Accepted and archived exactly as written, but their reassignment pattern is not to be repeated. | Accepted | — |
| ADR-0009 | **Generalize the numbering freeze to Specifications.** `SYSTEM_ARCHITECTURE_SPECIFICATION.md`'s authoring brief referred to it as "Volume 04," which remains the real, Approved `TECHNICAL_PRD` per ADR-0007. ADR-0008 froze 01–35 and directed *Constitutional Extensions* to append from 36 onward; this ADR clarifies the same rule applies to *any* new volume regardless of class — Specification, ADR-log entry, or future Constitution alike. The System Architecture Specification is numbered **Volume 37**, the next sequential slot after Volume 36. | Accepted | — |
| ADR-0010 | **Introduce Epics as a fifth document class (Architecture Review 007's Strategic Change).** Effective this ADR, architecture work is organized by Epics — architectural blueprints that parent multiple child Specifications, ADRs, and Knowledge Base entries — inserted into `MASTER_INDEX.md` §2's Document Hierarchy immediately beneath Constitutions and above Specifications. Epics are numbered as Volumes per the same sequential-append rule as ADR-0008/0009. Epic A (`EPIC_A_AI_CORE_ARCHITECTURE.md`) is the first, numbered **Volume 38**. | Accepted | — |
| ADR-0011 | **Epic becomes an execution and governance unit (Architecture Review 008).** Every Epic must additionally define: Deliverables, Milestones, Exit Criteria, Demo Criteria, Competition Readiness, Code Readiness, and Test Readiness. These items live at Epic level (in the Epic itself or its paired Execution Plan) and must never be duplicated by a child Specification. Every Specification, ADR, Knowledge Base entry, and implementation milestone must belong to exactly one Epic. Epic A's execution planning is delivered as a paired companion document, `EPIC_A_EXECUTION_PLAN.md` (Volume 39), establishing "Epic + Execution Plan" as the standing pattern for all future Epics. | Accepted | — |
| ADR-0012 | **Procedure Identity Strategy.** Resolves the Procedure Identity inconsistency flagged since Sprint 01B (Knowledge Library IDs like `CCCD_RENEWAL` vs. the seeded Database ID `ID_CARD_RENEWAL`, unlinked in Sprint 01F's persistence layer). Adopts a Canonical Identity Layer (Option C of three evaluated): the Knowledge Library's existing `procedureId` becomes the Canonical ID; `Procedure` gains an explicit `canonicalId` field and a future `governmentProcedureCode` field, additively, with no destructive rename of the existing seeded row. Requested as "ADR-0010" — that number is already Accepted (Epics as a document class); numbered ADR-0012, the next available sequential slot. First ADR extensive enough to warrant its own file: see `ADR-0012-PROCEDURE-IDENTITY-STRATEGY.md`. | Accepted | — |

The full ADR template and ongoing log ownership are defined in Volume 32; this index seeds it with the decisions already made during Phase 0 so the log begins accurate rather than starting from a blank slate that omits real history. As of ADR-0012, an ADR whose content exceeds a single summary paragraph is authored as its own file, referenced by ID from this table — this table remains the authoritative index and ordering, even for ADRs with a dedicated file.

---

## 11. Product Evolution Roadmap

```
Startup
   │
   ▼
 Pilot
   │
   ▼
Province
   │
   ▼
National
   │
   ▼
Enterprise
```

- **Startup** (current stage): a single repository, one configured pilot procedure, a small team, all nine Phase A constitutional volumes in force. **Gate to Pilot:** Volumes 01–09 Approved; Volume 23 (Data Residency) resolved, since it is explicitly launch-blocking; Volume 28's pilot procedure configured and demoed end-to-end.
- **Pilot:** Volume 28 executed for real citizens on ID Card Renewal, in one office, human-in-the-loop deliberately heavy, baseline metrics (Volume 08 §9) established. **Gate to Province:** pilot success criteria met; officer training (Volume 29) proven with real officers; no unresolved High-severity risk from Volume 09's risk register.
- **Province:** the pilot procedure, and a small number of additional procedures, roll out across a full province. Volume 30's onboarding playbook is exercised for the first time against a real jurisdiction. **Gate to National:** onboarding playbook validated across more than one jurisdiction; interoperability principles (Volume 09 Chapter 9) proven against at least one real partner system.
- **National:** multi-province, multi-ministry operation; full interoperability with national digital identity and other government systems; Volume 22's identity integration matured beyond policy into working practice. **Gate to Enterprise:** sustained public trust metrics (Volume 09 Chapter 8) over a multi-year period; the legal and workflow architecture proven general enough to onboard a new ministry without redesigning the platform (per `WORKFLOW_CONSTITUTION.md` and `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 10 future-evolution guarantees).
- **Enterprise:** the platform becomes reusable public-sector infrastructure — a foundation potentially adapted to additional government functions beyond its original procedure set, with a maturing library of specialized agents (see §12) available to be composed into new procedures without reinventing governance each time.

No stage is entered by declaration; each gate above is a concrete, checkable condition, consistent with this constitutional series' standing rule that a case (or, here, a platform) never silently progresses to a stage it has not actually earned.

---

## 12. AI Agent Map

`AI_OPERATING_SYSTEM.md` Chapter 3 defines twelve agents at full operational detail. For governance and onboarding purposes, this simplified map groups them into the eight functional roles most relevant to a reader who needs the shape of the system, not its full internal detail — every name below is reconciled explicitly against the canonical twelve so the two documents never silently diverge.

| Governance-Map Name | Canonical Agent(s) in `AI_OPERATING_SYSTEM.md` §3 | Role |
|---|---|---|
| Citizen Agent | Citizen Agent | The one voice the citizen hears; translates between plain language and every other agent. |
| Officer Agent | Escalation Agent | Prepares and routes the context package a human officer acts on. |
| Legal Agent | Legal Agent + Citation Agent | Retrieves and cites what the law says; gates every legal claim. |
| Document Agent | OCR Agent + Validation Agent | Extracts and deterministically verifies documents and eligibility. |
| Case Agent | Planner Agent | Owns the case's position in the workflow lifecycle; the conductor. |
| Notification Agent | Notification Agent | Manages timing and channel of every outbound message. |
| Analytics Agent | Analytics Agent | Aggregates system-wide patterns for operators, never exposing individual cases. |
| Future Agents | Procedure Agent, Risk Agent, Memory Agent (present today, not separately surfaced at this zoom level) + any agent added under future evolution | Reserved category — new specialized reasoning roles are added here as the platform matures, always plugging into the existing pipeline per `WORKFLOW_CONSTITUTION.md` Chapter 10, never requiring the pipeline itself to be redesigned. |

This map is a **projection** of the canonical agent architecture for readers who need the governance-level shape, not a competing definition — where the two documents could be read differently, `AI_OPERATING_SYSTEM.md` §3 is authoritative per the Document Hierarchy (§2).

---

## 13. Knowledge Map

```
                     ┌─────────────────────┐
                     │    CONSTITUTIONS     │   (Volumes 01, 05, 06, 07, 08, 09)
                     │  philosophy & limits │
                     └──────────┬──────────┘
                                │ govern
                                ▼
                     ┌─────────────────────┐
                     │    SPECIFICATIONS     │   (Volumes 04, 10–19, 22–26, 30)
                     │  concrete design      │
                     └──────────┬──────────┘
                                │ get applied through
                                ▼
                     ┌─────────────────────┐
                     │         ADRs           │   (Volume 32, growing continuously)
                     │  specific decisions    │
                     └──────────┬──────────┘
                                │ get distilled into
                                ▼
                     ┌─────────────────────┐
                     │   KNOWLEDGE BASE       │   (Volumes 29, 31, 33, 34, 35)
                     │  living reference      │
                     └─────────────────────┘
```

**Constitutions** answer "why" and "never." **Specifications** answer "how, concretely." **ADRs** answer "why did we choose X over Y, on this date, given what we knew then" — they are never rewritten after the fact, even if the decision is later reversed (a reversal gets its own new ADR). The **Knowledge Base** is what a new team member or officer actually reads day to day.

---

## 14. Documentation Lifecycle

```
   Draft
     │
     ▼
   Review
     │
     ▼
Red Team Review
     │
     ▼
  Approved
     │
     ▼
Implementation
     │
     ▼
 Maintenance
```

- **Draft** — An author produces a first complete version, marking any referenced planned volume clearly as such.
- **Review** — At least one qualified reviewer per relevant perspective checks the draft for internal correctness and consistency with every higher-authority document (§2).
- **Red Team Review** — Mandatory for Constitutions and any citizen/security-impacting Specification: an adversarial pass tries to find how the document's rules could be gamed or misused. Findings are resolved or explicitly, visibly accepted as documented residual risk.
- **Approved** — The document is versioned (§15) and becomes binding on every dependent volume.
- **Implementation** — Work is built to conform to the approved document; deviations trigger a correction or a new revision cycle, never a silent divergence.
- **Maintenance** — The document is periodically re-checked for currency and revised through the same lifecycle when it needs to change.

Beyond the six lifecycle stages, a document's **status field** (used throughout §3) also includes `Deprecated` (superseded in practice but not yet formally replaced), `Superseded` (formally replaced by a named successor volume), and `Archived` (retained permanently for historical traceability, per Volume 07's own Retirement principle applied reflexively to the documentation set itself).

---

## 15. Versioning Rules

Every CAIOS document carries a version in the form **MAJOR.MINOR**.

- **MAJOR** increments when a change alters the document's binding meaning. Always requires the full lifecycle in §14, including Red Team Review.
- **MINOR** increments for clarifications, added examples, or corrections that do not change what is required or permitted. Requires Review but not necessarily a fresh Red Team pass.
- Every version bump carries a changelog entry: version, date, reviewer, and a one-sentence description of what changed and why.
- A document is never silently edited without a version bump — this applies even to Approved Constitutions.
- **Deprecation:** a superseded document is never deleted. It is marked `SUPERSEDED BY <volume/version>` and retained permanently.

---

## 16. Naming Conventions

- **Constitutions** use `SCREAMING_SNAKE_CASE` ending in `_CONSTITUTION.md`, or `AI_OPERATING_SYSTEM.md` for the foundational exception already established by precedent.
- **Specifications** end in `_SPECIFICATION.md`.
- **Playbooks / operational manuals** end in `_PLAYBOOK.md` or `_MANUAL.md`.
- **ADRs** use `ADR-NNNN-short-kebab-case-title.md`, numbered sequentially and never renumbered or reused.
- **Volume numbers** are two-digit, zero-padded, referenced in prose as "Volume NN," and are stable identifiers independent of eventual filename. **Per ADR-0008, Volumes 01–35 are permanently frozen** — no future document may renumber or reassign any Approved volume in that range, including a placeholder (the ADR-0005/0006 pattern is retired, not to be repeated). Constitutional Extensions beyond the original Startup Edition are appended sequentially from **Volume 36 onward**.
- **Every document's title block** states its Volume number, matching this index.

---

## 17. Folder Structure

```
docs/
├── 00-master-index/
│   └── MASTER_INDEX.md
├── 01-constitutions/
├── 02-specifications/
├── 03-adr/
├── 04-knowledge-base/
└── 05-operations/
```

**This is the target state only.** Per required improvement #10 from the Architecture Review: **no file is to be relocated yet.** Every document currently in force (`AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `MASTER_INDEX.md`, and the forthcoming `PROJECT_OPERATING_SYSTEM.md`) remains exactly where it is today, at the project root. Repository restructuring is deferred and requires its own explicit authorization once the Governance Documents (this index and the Project Operating System) are both formally Approved — the exact trigger condition for lifting this freeze is defined in `PROJECT_OPERATING_SYSTEM.md` Chapter 06.

---

## 18. Document Templates

Every new volume begins from this skeleton, regardless of class:

```markdown
# <FILENAME>.md
### <Human-readable title> — Volume <NN>
**Version:** <MAJOR.MINOR>
**Status:** <Draft | Review | Red Team Review | Approved | Deprecated | Superseded | Archived>
**Precedence:** <what this document overrides or is overridden by, per §2>
**Companion documents:** <cross-references, by volume number and filename>
**Ownership:** Owner — <role> · Architect — <role> · Reviewer — <role> · Implementation Owner — <role> · Approval Authority — <body>

---

## Changelog
| Version | Date | Reviewer | Change |
|---|---|---|---|

## Preface
<Why this document exists, referencing the citizen or institutional need it traces back to per §5.>

## <Chapter 1...N>
<Body content>

## Closing Note
<How this document relates to the rest of the constitutional/specification set.>
```

ADRs use a shorter, decision-specific template: Title, Status, Context, Decision, Consequences, Alternatives Considered.

---

## 19. Review Checklist

Before any document advances from Draft to Review:

- [ ] Every dependency listed in the Dependency Matrix (§4) is either Approved or explicitly marked as a known gap.
- [ ] Nothing in the document contradicts a higher-authority document in the hierarchy (§2).
- [ ] Every claim about citizen experience is consistent with Volume 08.
- [ ] Every claim about legal reasoning is consistent with Volume 07's citation standard.
- [ ] Every claim about AI capability boundaries is consistent with Volume 09 Chapter 3's stratification.
- [ ] The document contains no implementation detail inappropriate to its class.
- [ ] Accessibility and digital inclusion implications have been considered, per Volume 08.
- [ ] Security and privacy implications have been considered, per Volume 09 Chapter 6.
- [ ] Document Status, Ownership, and changelog entry are all present and correctly filled in.
- [ ] The document's title block volume number matches this Master Index.

Before any document advances from Review to Red Team Review:

- [ ] At least one reviewer has explicitly attempted to find a way the document's rules could be misapplied or gamed.
- [ ] Every finding is either resolved or recorded as an accepted residual risk, visibly, in the document itself.

---

## 20. Acceptance Criteria for Every Future Document

A document is only **Approved** — and therefore binding — when all of the following are true:

1. It has passed every stage of the Documentation Lifecycle (§14) applicable to its class.
2. It satisfies every item in the Review Checklist (§19).
3. It is traceable, without a missing link, through the Traceability Matrix (§5) back to Volume 01's vision.
4. It does not contradict any Approved document ranked above it in the Document Hierarchy (§2); any apparent tension is resolved and documented explicitly, in the style of `GOVERNMENT_CONSTITUTION.md`'s Constitutional Review.
5. It carries a correct version number and changelog entry, Document Status, and Ownership record (§15, §18).
6. It follows the naming convention (§16) and is recorded at its correct future location once the folder structure (§17) is adopted.
7. It uses the standard template (§18).
8. Its entry in this Master Index (§3, §4, §6) is updated as part of its own approval — a document is not Approved until Volume 00 reflects it.

---

## Closing Note

This Master Index is Chapter 01 of `PROJECT_OPERATING_SYSTEM.md`. Nine volumes are authored today: the Technical PRD (04) and the five constitutional documents (05–09) that together define how CAIOS thinks, moves, reasons about law, understands its citizens, and operates inside government. The remaining twenty-six volumes are planned, not invented — each one's objective, dependencies, ownership default, and expected output are specified here precisely so that whoever writes it next inherits a fully-defined slot in the architecture rather than a blank page. As each new volume is authored, this index is the first document updated, and — per Acceptance Criterion 8 — the last document anyone should ever find out of date.
