# CASE_MANAGEMENT_SPECIFICATION.md
### The Case Management Specification — Volume 46
**Version:** 1.0
**Status:** Approved
**Class:** Specification — architecture only. No programming language, software framework, database technology, cloud vendor, AI vendor, or generative model is named or implied anywhere in this document; every principle here must remain true regardless of which such technology eventually implements it.
**Precedence:** Numbered Volume 46, the next actually-available sequential slot — the first genuinely unassigned number after Volume 45, requiring no reassignment and no ADR. Subordinate to every Constitution. Defines the Case as the single authoritative record a conversation (`MEMORY_AND_CONVERSATION_SPECIFICATION.md`, Vol. 45), a reasoning pipeline (`AI_REASONING_PIPELINE_SPECIFICATION.md`, Vol. 41), and a document intelligence subsystem (`OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md`, Vol. 16) all serve, without itself performing conversation, reasoning, or extraction. Does not modify `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42), or `MEMORY_AND_CONVERSATION_SPECIFICATION.md` (Vol. 45).
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Vol. 37), `EPIC_A_AI_CORE_ARCHITECTURE.md` (Vol. 38), `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` (Vol. 16), `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42), `MEMORY_AND_CONVERSATION_SPECIFICATION.md` (Vol. 45).
**Ownership:** Owner — Chief Workflow Architect · Architect — Case Systems Designer · Reviewer — Technical Steering Committee + Government Officer Representative · Implementation Owner — Platform Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | This revision | Architecture Review | Initial authorship. Numbered Volume 46, the first genuinely unassigned sequential slot — no reassignment, no ADR required. |

---

## Preface

A conversation ends. Memory of it persists. A document is extracted, validated, superseded, corrected. Reasoning runs, recommends, escalates. Through all of it, exactly one thing must never drift, fork, or lose track of itself: the Case. This Specification defines the Case not as a database row or a workflow instance, but as a governing concept — the single authoritative record of one citizen's request, standing apart from and above every component that reads from it or writes to it. Conversations may be Reopened, memory may be Superseded, reasoning may be re-run — the Case is what remains constant while all of that happens around it.

---

## 01. Purpose

Define the complete, technology-independent lifecycle, structure, ownership, and interfaces of a Case inside CAIOS — the single authoritative record for one citizen request, independent of which conversation produced it, which AI implementation reasoned over it, or which government platform it is ultimately fulfilled through.

## 02. Scope

**In scope:** what a Case is and what it is composed of; the states a Case moves through and which transitions between them are permitted; who owns a Case and how that ownership can change; how a Case relates to every other component in this architecture; how evidence attached to a Case is managed; how decisions about a Case are permanently recorded; how a human re-enters Case handling; and how Case-level failures are handled without ever losing the citizen's original request.

**Out of scope, by design:** holding a conversation (`MEMORY_AND_CONVERSATION_SPECIFICATION.md`), evaluating eligibility (`RULE_ENGINE_SPECIFICATION.md`), extracting documents (`OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md`), and reasoning about gaps or conflicts (`DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md`). This Specification defines what a Case *is* and what must remain true of it — it never itself converses, reasons, or extracts.

## 03. Case Philosophy

- **A Case is the single source of truth.** For one citizen request, there is exactly one Case, and everything anyone — citizen, officer, or system component — needs to know about that request's current, authoritative status is derivable from it.
- **Conversation may evolve.** Conversations are Reopened, Paused, Escalated, and Retired (`MEMORY_AND_CONVERSATION_SPECIFICATION.md` Chapter 05) — none of that changes what the Case itself authoritatively records.
- **Memory may evolve.** Facts held in memory are Confirmed, Verified, Superseded (`MEMORY_AND_CONVERSATION_SPECIFICATION.md` Chapter 09) — the Case reflects the current state of that evolution without itself being a second, competing memory store.
- **Reasoning may evolve.** A reasoning pipeline may be re-run, its rule pack updated, its recommendation revised — the Case records the outcome of reasoning, not a duplicate of the reasoning itself.
- **The Case remains authoritative.** When any two components disagree about the current status of a citizen's request, the Case is what settles the disagreement — never the other way around.

## 04. Case Lifecycle

Nine states:

```
Created → In Progress ──┬──→ Waiting Citizen ──┐
                         ├──→ Waiting Government ┤
                         └──→ Escalated ─────────┘
                                                 │
                              (all three return to In Progress)
                                                 │
                                                 ▼
                                             Resolved → Closed → Archived
                                                                     │
                                                        ┌────────────┘
                                                        ▼
                                                   Retired (terminal)

Reopen: Closed or Archived → In Progress (per Chapter 08)
```

- **Created** — the Case exists and has a Case Identifier (Chapter 05), but substantive work has not yet begun.
- **In Progress** — the case is under active work, by a citizen, an officer, or a system component acting on the case.
- **Waiting Citizen** — the case cannot progress until the citizen provides something (information, a document, a confirmation); this is a state of the Case, distinct from and outlasting any single Conversation's own Paused state.
- **Waiting Government** — the case cannot progress until an external government process or office acts; this state exists specifically to make an externally-blocked case visible as such, rather than indistinguishable from ordinary In Progress work.
- **Escalated** — the case requires human handling beyond ordinary processing, per the escalation triggers defined in `GOVERNMENT_CONSTITUTION.md` and `WORKFLOW_CONSTITUTION.md`; it returns to In Progress once the escalation is resolved.
- **Resolved** — a determination has been reached on the citizen's request; the case has an Outcome (Chapter 05) but has not yet been formally closed.
- **Closed** — the case is formally concluded; still available for Reopening (Chapter 08).
- **Archived** — the case is retained in full per this project's permanence discipline, no longer expected to require further action in the ordinary course.
- **Retired** — a terminal state, reachable only from Archived: the case is no longer relevant to any active or foreseeable activity, but preserved permanently for audit.

This Case Lifecycle is a conceptual model, not a replacement for any existing execution-level state machine already governed by `WORKFLOW_CONSTITUTION.md`. See Known Risks for the reconciliation this creates.

## 05. Case Object Model

Thirteen object types make up the vocabulary of a Case in this Specification:

| Object | Description |
|---|---|
| Case | The overall authoritative record for one citizen request |
| Case Identifier | A stable, unique identifier for the Case, never reused, never reassigned to a different request |
| Citizen | The person the Case is on behalf of |
| Officer | The government staff member(s) assigned to or acting on the Case |
| Procedure | The specific government procedure this Case pursues, per `knowledge/procedures/` |
| Checklist | The set of requirements this Case's Procedure demands, and their current satisfaction status |
| Decision | A determination reached about the Case, per Chapter 10 |
| Evidence | A fact or document offered in support of the Case's Checklist or a Decision, per Chapter 09 |
| Document | A specific uploaded or provided document associated with the Case, per `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` |
| Conversation | A specific conversation associated with the Case, per `MEMORY_AND_CONVERSATION_SPECIFICATION.md` |
| Audit | The immutable record of everything that happened to the Case and why |
| History | The ordered sequence of every state transition, Decision, and correction the Case has undergone |
| Outcome | The final determination reached once the Case is Resolved |

A Case is the sum of these objects, not a container that merely references them elsewhere — losing the ability to reconstruct any one of these thirteen objects for a given Case is a defect in whatever system implements this Specification.

## 06. Case Ownership

- **Citizen** — the citizen the Case is on behalf of has a permanent, non-transferable relationship to it: a Case may change which officer or organization handles it, but never whose request it is.
- **Officer** — an officer may be assigned responsibility for actively working a Case; officer assignment is transferable, per Transfer Rules below.
- **Organization** — the government body or office ultimately accountable for the Case's Procedure; organizational assignment may change (for example, on jurisdiction correction) without changing citizen or officer assignment.
- **Shared Responsibility** — a Case may have more than one Officer or span more than one Organization at once (for example, during a jurisdictional handoff); shared responsibility is recorded explicitly, never left implicit or ambiguous about who is currently accountable.
- **Transfer Rules** — any change of Officer or Organization assignment is a recorded event in History (Chapter 05), never a silent reassignment; the citizen's own relationship to the Case (above) is never a party to any transfer.

## 07. Case Relationships

A Case relates to, but is never subsumed by, the following:

- **Conversation** (`MEMORY_AND_CONVERSATION_SPECIFICATION.md`, Vol. 45) — a Case may have many Conversations over its lifetime; the Case outlives any single one of them.
- **Memory** (Vol. 45) — Case Memory is the durable memory domain scoped to this Case specifically; the Case is what that memory domain is scoped to, not a duplicate of it.
- **Rule Engine** (`RULE_ENGINE_SPECIFICATION.md`, Vol. 14) — the Case's Checklist and Decisions are evaluated against rules, never authored by the Case itself.
- **Document Intelligence** (`OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md`, Vol. 16) — Documents associated with the Case are extracted by this subsystem; the Case holds the resulting structured fact, not the extraction process.
- **Reasoning Pipeline** (`AI_REASONING_PIPELINE_SPECIFICATION.md`, Vol. 41) — reasoning runs over a Case's accumulated Memory, Evidence, and Checklist to produce Decisions; the Case is the pipeline's input and the repository of its output, never the reasoning itself.
- **Knowledge Base** (`LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md`, Vol. 15) — a Case's Procedure and Checklist are grounded in Knowledge Objects; the Case references them, never re-authors them.
- **Notification** — a Case's state transitions and Decisions may trigger citizen- or officer-facing notification.
- **Audit** — every relationship above writes to the Case's own Audit object (Chapter 05) whenever it is exercised.

## 08. Case State Management

- **Allowed transitions** — exactly the arrows drawn in Chapter 04's Case Lifecycle diagram; no other transition is valid.
- **Forbidden transitions** — any transition not drawn in Chapter 04 is forbidden by definition, including any transition that would skip Resolved on the way to Closed, or that would move directly from Created to Closed without passing through In Progress.
- **Rollback** — a Case may be moved back to a previous state only through an explicit, recorded action (typically a correction under Chapter 11), never as an automatic reaction to an error; a rollback is itself a History (Chapter 05) entry, not an erasure of the states that came after it.
- **Recovery** — where a Case's recorded state is found to be inconsistent with its own History (for example, after a Corrupted Case per Chapter 13), the Case is restored to the last state its History can fully support, and the inconsistency itself is recorded, never silently discarded.
- **Reopen** — a Closed or Archived Case may return to In Progress when new information or a new need arises; this is the Case-level counterpart to a Conversation's own Reopened state (`MEMORY_AND_CONVERSATION_SPECIFICATION.md` Chapter 05), and the two are related but distinct — reopening a Case may or may not require reopening any specific past Conversation within it.

## 09. Evidence Management

This Specification does not introduce a new trust or confidence scale for Evidence — a Case's Evidence inherits whatever trust or confidence level it already carries from its origin: `MEMORY_AND_CONVERSATION_SPECIFICATION.md`'s Memory Trust Levels if it originated in a conversation, or `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md`'s Confidence Model if it originated in a document. The Case's job is to hold Evidence and know what it requires, never to re-score it.

- **Required evidence** — the set of Evidence a Case's Checklist demands, per its Procedure.
- **Optional evidence** — Evidence that strengthens a Case but is not required by the Checklist; never treated as if it were required, and never used to lower the bar for what is.
- **Missing evidence** — required Evidence that has not yet been provided; recorded as an open Checklist item, never silently ignored.
- **Conflicting evidence** — two pieces of Evidence bearing on the same fact disagree; both are retained, flagged, and resolved only through Chapter 11's human review or a subsequent higher-trust fact that supersedes both — consistent with `MEMORY_AND_CONVERSATION_SPECIFICATION.md` Chapter 08's no-contradiction rule.
- **Superseded evidence** — Evidence that has been replaced by newer information; retained, marked Superseded, never deleted, mirroring `MEMORY_AND_CONVERSATION_SPECIFICATION.md` Chapter 07's Memory Lifecycle.

## 10. Decision Recording

Every Decision recorded against a Case resolves to exactly one of the three outcomes already established by this project's Decision Model (`EPIC_A_AI_CORE_ARCHITECTURE.md`): **Verified Fact, Recommendation, or Escalation.** This Specification does not introduce a fourth category.

- **Recommendations** — a proposed course of action, always attributed to whoever or whatever proposed it, never presented as if it were already a final determination.
- **Officer Decisions** — a determination made by an officer; carries the officer's identity and is the only kind of Decision that can move a Case to Resolved (Chapter 04) on its own authority, per `GOVERNMENT_CONSTITUTION.md` Chapter 3's permanent officer-authority requirement.
- **Citizen Decisions** — a choice made by the citizen (for example, confirming or withdrawing a request); recorded distinctly from an Officer Decision, since the two carry different authority.
- **AI Recommendations** — output from the Reasoning Pipeline (Vol. 41); always recorded as a Recommendation or an Escalation, never as a Decision with final authority, per this project's permanent constitutional prohibition on AI holding final decision authority.
- **Never overwrite history.** A later Decision on the same question does not replace an earlier one in the record — it supersedes it, and both remain visible in History (Chapter 05), so the full sequence of what was decided, by whom, and when is always reconstructable.

## 11. Human Review

- **Citizen** — may review the Case's current status, Evidence, and Decisions concerning them, and dispute or correct what they find, per `CITIZEN_CONSTITUTION.md`.
- **Officer** — may review and correct any aspect of a Case they are assigned to, with every correction recorded per Chapter 10's never-overwrite rule.
- **Supervisor** — may review a Case beyond an individual officer's own authority, typically at Escalation (Chapter 04) or where a correction affects Case Ownership (Chapter 06).
- **Administrator** — may correct a systemic issue affecting Case handling across multiple cases, through an explicit, audited administrative action, never a quiet data patch.

## 12. Interfaces

A Case hands structured data to, and receives structured data from, the following components only — it never reasons, extracts, or converses on its own behalf.

- **Memory** (Vol. 45) — the Case is the scope Case Memory is defined against.
- **Rule Engine** (Vol. 14) — the Case's Checklist and Evidence are evaluated as rule inputs.
- **Reasoning** (Vol. 41) — the Case's accumulated state is the pipeline's input; its output becomes a Decision (Chapter 10).
- **Notification** — a Case state transition or Decision may trigger a notification.
- **Audit** — every Case object creation, transition, and correction writes an audit event.
- **Knowledge Base** (Vol. 15) — the Case's Procedure and Checklist reference Knowledge Objects, never re-author them.

## 13. Failure Handling

- **Lost Case** — a reference to a Case cannot be resolved; this is never treated as if the underlying citizen request never existed — the Case Identifier (Chapter 05) is retained and the failure is flagged for recovery (Chapter 08).
- **Duplicate Case** — the same citizen request appears to have produced two Cases; both are retained, one marked as the duplicate of the other, and Chapter 11's human review determines whether and how they should be merged.
- **Merged Case** — two Cases are combined into one following human review; the merge itself, and the two original Case Identifiers, are permanently retained in History (Chapter 05), never collapsed into an untraceable single record.
- **Split Case** — one Case is divided into more than one (for example, where a single request actually covers two distinct Procedures); each resulting Case retains a Reference back to the original, per the same traceability discipline as a Merge.
- **Corrupted Case** — a Case's recorded state is found inconsistent with its own History; Chapter 08's Recovery procedure applies, and the inconsistency itself is permanently recorded, never quietly repaired without a trace.
- **Incomplete Case** — a Case is missing an object Chapter 05 requires (for example, no Procedure yet assigned); this is a valid, recorded condition of an early-lifecycle Case, distinct from corruption, and blocks only the specific transitions that object is required for.

## 14. Trust by Design

Every chapter of this Specification traces to one or more of `TRUST_CONSTITUTION.md`'s six mechanisms:

| Trust Mechanism | How this Specification satisfies it |
|---|---|
| Legal Citation | A Case's Checklist and Procedure reference Knowledge Objects and citations (Chapter 07) rather than restating legal claims independently, so every legal basis a Case relies on remains traceable to `LEGAL_CITATION_SPECIFICATION.md`'s standard. |
| Human Escalation | Chapter 11 is the permanent, structural point at which a human corrects or reviews a Case; the Escalated lifecycle state (Chapter 04) and Chapter 13's failure paths both route to it. |
| Auditability | Chapter 05's Audit and History objects, and Chapter 10's never-overwrite rule, ensure every Case action is permanently and separately recorded. |
| Traceability | Chapter 05's object model and Chapter 13's Merge/Split rules preserve a path from any current Case fact back to its origin, even across a merge or split. |
| Evidence | Chapter 09 ensures every fact a Case relies on carries an honest, inherited trust or confidence level rather than an invented Case-specific one. |
| Consistency | Chapter 04's fixed lifecycle and Chapter 08's allowed/forbidden transition rule ensure every Case, regardless of citizen, procedure, or organization, behaves according to the same state model. |

## 15. Traceability

This Specification depends on, and must be read alongside:

- `PRODUCT_CONSTITUTION.md`
- `CITIZEN_CONSTITUTION.md`
- `GOVERNMENT_CONSTITUTION.md`
- `TRUST_CONSTITUTION.md`
- `AI_OPERATING_SYSTEM.md`
- `RULE_ENGINE_SPECIFICATION.md` (Volume 14)
- `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Volume 15)
- `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` (Volume 16)
- `AI_REASONING_PIPELINE_SPECIFICATION.md` (Volume 41)
- `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Volume 42)
- `MEMORY_AND_CONVERSATION_SPECIFICATION.md` (Volume 45)

A change to any of these eleven documents that touches case state, evidence, decisions, or ownership must be checked against this Specification for continued consistency, and vice versa.

## 16. Acceptance Criteria

This Specification remains valid only if every rule in it still holds after any of the following changes, individually or in combination:

1. **AI Model** — no principle depends on a specific reasoning or generative model's capability, provider, or generation.
2. **Programming Language** — no principle presumes a specific implementation language.
3. **Framework** — no principle presumes a specific software framework.
4. **Database** — no principle presumes a specific storage engine or schema technology.
5. **Cloud** — no principle presumes a specific hosting provider or infrastructure.
6. **Organization** — no principle presumes a specific government office structure.
7. **Government Platform** — no principle presumes integration with any specific government system, portal, or national platform.

A future reviewer who finds a single rule in this document that would stop making sense after any one of these seven substitutions has found a defect in this Specification, to be corrected at that time.

---

## Architecture Summary

This Specification defines the Case as the one authoritative record standing above every component that serves it: a nine-state Case Lifecycle (Chapter 04), a thirteen-object Case Object Model (Chapter 05), explicit Ownership and Transfer Rules distinguishing Citizen/Officer/Organization accountability (Chapter 06), eight named Relationships to the rest of the architecture without ever being subsumed by any of them (Chapter 07), disciplined State Management with Rollback and Recovery (Chapter 08), Evidence Management that deliberately reuses existing trust and confidence scales rather than inventing a new one (Chapter 09), Decision Recording bound to this project's existing three-outcome Decision Model with a permanent never-overwrite rule (Chapter 10), a four-tier Human Review path (Chapter 11), six defined Interfaces (Chapter 12), and six named failure categories including Merge and Split, both permanently traceable (Chapter 13).

## Case Lifecycle

`Created → In Progress → {Waiting Citizen | Waiting Government | Escalated} → In Progress → Resolved → Closed → Archived → Retired`, with Reopen returning any Closed or Archived Case to In Progress — nine states, every transition traceable in History.

## Known Risks

- **This Specification's nine-state Case Lifecycle (Chapter 04) is now a third distinct case-status vocabulary in this project**, alongside the existing Prisma `CaseStage` enum (7 values) and the `WorkflowState` enum and state machine (13 values, governed by `WORKFLOW_CONSTITUTION.md` and implemented in `src/lib/orchestration/workflow-state-machine.ts`) — this Specification's own duality risk, flagged previously between `CaseStage` and `WorkflowState` alone, now extends to three layers. This Specification's Case Lifecycle is intended as the conceptual, authoritative model that both existing enums should be checked against and eventually mapped onto — not a fourth, competing implementation-level state machine — but that mapping has not yet been performed.
- **No existing schema field has been identified as the home for the Case Object Model's thirteen objects** (Chapter 05), particularly History and Outcome, which do not clearly correspond to any existing Prisma model.
- **Merge and Split (Chapter 13) have no precedent anywhere in the current implementation** — Sprint 01A/01A.1's `initializeCase()` always creates exactly one Case with no merge or split path; this Specification's requirement that both remain permanently traceable is untested against real data volume.
- **Evidence Management (Chapter 09)'s reuse of Volume 45's Memory Trust Levels and Volume 16's Confidence Model, rather than a Case-specific scale, depends on both of those Specifications continuing to expose a trust/confidence value on every Evidence object they hand off** — if either Specification's Evidence-adjacent object ever lost that field, Chapter 09 would have nothing to inherit.

## Recommendation

Perform one unified reconciliation pass mapping `CaseStage` → `WorkflowState` → this Specification's nine-state Case Lifecycle, producing a single explicit crosswalk table, before authoring any further Case-adjacent Volume — this closes the three-layer duality flagged above deliberately, rather than allowing a fourth implementation-level state model to be built against this Specification without ever being checked against the two that already exist in code.
