# AI_REASONING_PIPELINE_SPECIFICATION.md
### The AI Reasoning Pipeline Specification — Volume 41
**Version:** 1.1
**Status:** Approved
**Class:** Specification — architecture only. No implementation, framework, API, or database is prescribed here; this document describes the reasoning shape every future implementation must conform to.
**Precedence:** Subordinate to every Constitution and to `EPIC_A_AI_CORE_ARCHITECTURE.md` (Volume 38), whose Interaction, Decision, and Human-in-the-Loop models this Specification makes concrete, stage by stage. Where this pipeline appears to conflict with Epic A, Epic A governs and this document is revised.
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Vol. 37), `EPIC_A_AI_CORE_ARCHITECTURE.md` (Vol. 38), `EPIC_A_EXECUTION_PLAN.md` (Vol. 39), `ENGINEERING_SPRINT_01_SPECIFICATION.md` (Vol. 40), `SPRINT_BREAKDOWN.md`, and the four `knowledge/` layers (procedures, life-events, affected-assets, goals).
**Ownership:** Owner — Chief AI Architect · Architect — System Reasoning Designer / Enterprise AI Engineer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | Prior revision | Architecture Review | Initial authorship. First Specification to consume the completed four-layer Knowledge Graph (Goals → Life Events → Affected Assets → Procedures) as a first-class architectural input rather than an unstructured data source. |
| 1.1 | This revision | Architecture Review | Noted in Known Risks that the Missing Document Detection gap is resolved by `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Volume 42). |

---

## Preface

Every prior sprint built one piece: a UI shell, a case object, four layers of structured knowledge. None of them yet describe how a citizen's raw sentence actually becomes a government action. This Specification is that description — twelve stages, each with a narrow mandate, each capable of stopping the pipeline honestly rather than guessing past what it doesn't know. It is the concrete shape of Epic A's Interaction and Decision Models, now with the Knowledge Graph wired in as the substance those models reason over.

---

## The Twelve Stages

### Stage 01 — Intent Detection
- **Purpose:** Determine what kind of interaction this is before attempting to understand its content in detail.
- **Inputs:** Raw citizen message, active session/case context.
- **Outputs:** `{new_case | continue_existing_case | status_question | out_of_scope | ambiguous}`.
- **Decision Rules:** An open case for this citizen is preferred over starting a new one; a message unrelated to any government procedure is classified `out_of_scope` immediately, not carried further.
- **Failure Modes:** Misreading a follow-up as a new case, losing context; treating an out-of-scope request as in-scope.
- **Confidence Rules:** Reflects how unambiguous the classification is; below threshold, Stage 11 asks directly which applies rather than guessing.
- **Escalation Rules:** Not triggered here directly; repeated ambiguity across turns is what escalates (loop detection), not a single ambiguous turn.
- **Future AI Model:** A lightweight intent classifier (embedding similarity or a small model call) — unspecified by design, per this document's "no framework" rule.
- **Dependencies:** None — first stage.
- **Related Constitution:** `AI_OPERATING_SYSTEM.md` (Thinking Process, Intent Detection); `CITIZEN_CONSTITUTION.md` (plain language).
- **Related Specification:** `ENGINEERING_SPRINT_01_SPECIFICATION.md` §5, §7.

### Stage 02 — Goal Resolution
- **Purpose:** Match the citizen's expressed need to a Citizen Goal (`knowledge/goals/`), the highest semantic layer in the Knowledge Graph.
- **Inputs:** Intent classification, message text, `goals/index.json`.
- **Outputs:** A matched `goalId`, or `no_goal_matched`.
- **Decision Rules:** Matched against each goal's `typicalExpressions`; a goal with an empty downstream chain (per `goals/index.json`'s `coverageGaps`) is still returned as matched — the gap is Stage 10's problem to disclose, not this stage's to hide.
- **Failure Modes:** Matching a goal with no real downstream resolution and letting a later stage fail silently instead of surfacing the gap now.
- **Confidence Rules:** High for a close match to a stated expression; Low for an inferred, loosely-worded match.
- **Escalation Rules:** No goal match after one clarifying attempt escalates as a novel situation.
- **Future AI Model:** Same matching approach as Stage 01, applied to a richer, curated expression set.
- **Dependencies:** Stage 01.
- **Related Constitution:** `VISION_CONSTITUTION.md` (citizens think in goals, not procedures).
- **Related Specification:** `knowledge/goals/` (Sprint 01K.3).

### Stage 03 — Life Event Resolution
- **Purpose:** Resolve the matched Goal (or the raw intent, on the fallback path) down to a specific Life Event.
- **Inputs:** `goalId` (or message text directly), `goals/index.json`'s `goalChain`, `life-events/index.json`.
- **Outputs:** Matched `lifeEventId`(s).
- **Decision Rules:** Uses the Goal's precomputed chain when a Goal matched; falls back to direct Life Event expression matching when no Goal did — this fallback path is load-bearing, since three of the ten current Goals have zero Life Event coverage.
- **Failure Modes:** Choosing the wrong Life Event among several with overlapping surface phrasing (e.g., "my ID" could mean `EXPIRED_CITIZEN_ID` or `LOST_WALLET`).
- **Confidence Rules:** High for a single unambiguous match; ambiguity between two equally plausible Life Events forces a clarifying question, never a coin-flip.
- **Escalation Rules:** Unresolved ambiguity after clarification.
- **Future AI Model:** Same matching approach as Stage 02, one layer down.
- **Dependencies:** Stage 02 (or Stage 01 directly, on the fallback path).
- **Related Constitution:** `WORKFLOW_CONSTITUTION.md` Chapter 1 (Universal Citizen Journey).
- **Related Specification:** `knowledge/life-events/` (Sprint 01K.1).

### Stage 04 — Affected Asset Resolution
- **Purpose:** Identify the concrete, government-held asset(s) the resolved Life Event implicates.
- **Inputs:** `lifeEventId`(s), `affected-assets/index.json`.
- **Outputs:** A list of `assetId`s, each tagged `in_scope` or `out_of_scope` (e.g., `BANK_CARDS`).
- **Decision Rules:** Out-of-scope assets are carried forward for an explicit disclosure at Stage 11, never silently dropped.
- **Failure Modes:** Dropping an out-of-scope asset instead of acknowledging it — the one behavior this stage exists specifically to prevent.
- **Confidence Rules:** Inherits the Life Event's confidence; this stage is a deterministic graph lookup and introduces no new uncertainty of its own.
- **Escalation Rules:** None typically — a lookup, not a judgment call.
- **Future AI Model:** None. Deterministic lookup.
- **Dependencies:** Stage 03.
- **Related Constitution:** `PRODUCT_CONSTITUTION.md` Chapter 7 (Non-Goals — bank cards permanently excluded).
- **Related Specification:** `knowledge/affected-assets/` (Sprint 01K.2).

### Stage 05 — Procedure Resolution
- **Purpose:** Resolve the identified Asset(s) to specific Procedure(s).
- **Inputs:** `assetId`s, `affected-assets/index.json`'s `procedureToAssets`, `knowledge/procedures/`.
- **Outputs:** Matched `procedureId`(s), each tagged `in_library` or `planned_not_yet_authored`.
- **Decision Rules:** A `planned_not_yet_authored` procedure routes directly to Stage 10 — the pipeline does not pretend to continue reasoning about a procedure that has no real content behind it.
- **Failure Modes:** Continuing eligibility/checklist/citation work against a placeholder procedure.
- **Confidence Rules:** Only `in_library` procedures can support a High-confidence downstream result.
- **Escalation Rules:** Not-yet-authored procedure → escalate/disclose immediately.
- **Future AI Model:** None. Deterministic lookup.
- **Dependencies:** Stage 04.
- **Related Constitution:** `LEGAL_INTELLIGENCE_CONSTITUTION.md` (reason only about what actually, verifiably exists).
- **Related Specification:** `knowledge/procedures/`; `SYSTEM_ARCHITECTURE_SPECIFICATION.md` Chapter 5 (Domain Architecture).

### Stage 06 — Eligibility Evaluation
- **Purpose:** Deterministically evaluate whether this citizen qualifies for the resolved procedure.
- **Inputs:** The procedure's `Prerequisites`/`Applicable Citizens` fields; known citizen facts (Memory Subsystem).
- **Outputs:** `eligible | not_eligible | unknown_pending_fact`.
- **Decision Rules:** Matches Epic A's Decision Model exactly: a missing fact yields `unknown_pending_fact`, which prompts Stage 11 to ask for it — never to assume a default.
- **Failure Modes:** Inferring eligibility from an incomplete fact set.
- **Confidence Rules:** High only when every required fact is known and confirmed; otherwise capped at Low.
- **Escalation Rules:** A genuinely ambiguous edge case the procedure file itself flags (e.g., `CCCD_FIRST_ISSUANCE`'s "reached adulthood with no prior ID" case) escalates rather than being resolved by inference.
- **Future AI Model:** A deterministic rule engine (Volume 14, not yet authored) — no LLM judgment is permitted at this stage under any circumstance.
- **Dependencies:** Stage 05.
- **Related Constitution:** `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 4 (Eligibility); `AI_OPERATING_SYSTEM.md` (Validation Agent).
- **Related Specification:** `MASTER_INDEX.md` Volume 14 (Rule Engine Specification) — **not yet authored; a real dependency gap**, not a passing reference.

### Stage 07 — Checklist Generation
- **Purpose:** Generate the personalized, complete document checklist for this citizen and procedure.
- **Inputs:** The procedure's Required/Optional Documents (referencing `knowledge/documents/`), the eligibility result.
- **Outputs:** A `ChecklistItem` list (the Prisma model already implemented in Phase 0).
- **Decision Rules:** Never generated before eligibility is at least conditionally resolved; branching document requirements (e.g., `DAMAGE_OR_CHANGE_EVIDENCE`'s mutually exclusive damage/change branches) are resolved to exactly one branch, never both.
- **Failure Modes:** Generating a checklist ahead of eligibility resolution; including mutually exclusive branch documents simultaneously.
- **Confidence Rules:** Deterministic given a resolved procedure and eligibility result; confidence is capped by whatever Stage 06 already established.
- **Escalation Rules:** None triggered by this stage itself; an inconsistency in the underlying procedure data is a content defect, escalated as such, not a citizen-specific judgment call.
- **Future AI Model:** None. Deterministic generation from structured knowledge.
- **Dependencies:** Stage 06.
- **Related Constitution:** `WORKFLOW_CONSTITUTION.md` (Personalized Checklist step).
- **Related Specification:** `knowledge/documents/`; Volume 14.

### Stage 08 — Legal Citation Retrieval
- **Purpose:** Retrieve the specific legal citation backing any legal claim in the eventual response.
- **Inputs:** The procedure's `legalReferences` (`knowledge/citations/`), the specific claim requiring support.
- **Outputs:** A citation object (`lawName`, `article`, `issueDate`, `effectiveDate`, `sourceUrl`, `verified`), or `no_citation_found`.
- **Decision Rules:** Retrieval-or-refuse, absolute: a citation marked `verified: false` or entirely absent means the claim is not stated as settled fact, regardless of how plausible it sounds.
- **Failure Modes:** Presenting an unverified citation as verified — the single most severe failure mode named anywhere in this project's constitutional series.
- **Confidence Rules:** Confidence is capped at the citation's own verified status. **Every citation currently in `knowledge/citations/` is `verified: false`** — by design, no legal claim this pipeline produces today can exceed Medium confidence until a legal reviewer changes that.
- **Escalation Rules:** No citation found for a claim the response genuinely needs escalates/discloses rather than omitting the claim silently.
- **Future AI Model:** RAG/vector retrieval against a full legal corpus (Volume 15, not yet authored); today, a direct static lookup against `knowledge/citations/`.
- **Dependencies:** Stage 05 (needs the resolved procedure's `legalReferences`).
- **Related Constitution:** `LEGAL_INTELLIGENCE_CONSTITUTION.md` (the entire document, especially Chapters 4–5).
- **Related Specification:** `knowledge/citations/`; Volume 15 (not yet authored).

### Stage 09 — Confidence Assessment
- **Purpose:** Aggregate every prior stage's confidence signal into one overall label for the response as a whole.
- **Inputs:** The confidence values produced by Stages 01–08.
- **Outputs:** Overall confidence: `High | Medium | Low`.
- **Decision Rules:** Confidence is **capped at the weakest contributing stage, never averaged upward** — the same rule `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 4 already establishes for its own Confidence step, applied here across the whole pipeline.
- **Failure Modes:** Averaging instead of capping, producing an inflated overall confidence that hides one weak link behind several strong ones.
- **Confidence Rules:** This stage *is* the confidence rule, applied to itself.
- **Escalation Rules:** Aggregate confidence below the platform's floor (a specific numeric/qualitative threshold to be set by a future calibration ADR) routes to Stage 10's escalation path rather than Stage 11's direct response.
- **Future AI Model:** None — a deterministic minimum function over stage confidences, not itself a judgment call.
- **Dependencies:** Stages 01–08.
- **Related Constitution:** `TRUST_CONSTITUTION.md` Chapter 2 (Explainability, Consistency); `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 4.
- **Related Specification:** `SUCCESS_METRICS_CONSTITUTION.md` Chapter 7 (Citation Accuracy, Trust Metrics).

### Stage 10 — Escalation Decision
- **Purpose:** Decide whether this turn's output may reach the citizen directly or must route to a human officer first.
- **Inputs:** Stage 09's overall confidence; every escalation flag raised at any earlier stage (out-of-scope asset, not-yet-authored procedure, unresolved ambiguity, low confidence, explicit citizen request).
- **Outputs:** `escalate` (with an assembled context package) or `proceed`.
- **Decision Rules:** Applies the canonical trigger list already defined across `AI_OPERATING_SYSTEM.md` Chapter 9, `WORKFLOW_CONSTITUTION.md` Chapter 7, and `GOVERNMENT_CONSTITUTION.md` Chapter 9 — not re-derived here, only invoked.
- **Failure Modes:** Failing to escalate because a trigger fired at an earlier stage wasn't carried forward — this is why every stage above propagates its flags rather than only its final output; **flag propagation across the whole pipeline is a hard architectural requirement of this Specification, not an implementation detail left to chance.**
- **Confidence Rules:** N/A — this stage consumes confidence, it does not produce it.
- **Escalation Rules:** This stage *is* the escalation decision.
- **Future AI Model:** None — a rule-based decision over the propagated flag set.
- **Dependencies:** Every flag raised by Stages 01–09.
- **Related Constitution:** `GOVERNMENT_CONSTITUTION.md` Chapter 3 (human-authority boundary); `TRUST_CONSTITUTION.md` Chapter 5 (Trust Boundaries).
- **Related Specification:** `EPIC_A_AI_CORE_ARCHITECTURE.md` Chapter 8 (Human-in-the-Loop Model) — this stage is that model's gate, made concrete.

### Stage 11 — Natural Language Response
- **Purpose:** Compose the citizen-facing message — the only stage permitted to generate novel phrasing.
- **Inputs:** Every resolved structured fact from Stages 01–09 (or the escalation context package, if Stage 10 routed there).
- **Outputs:** Plain-language response text, plus structured rendering data (citation, checklist) for the UI.
- **Decision Rules:** Never introduces a claim not already established upstream; the confidence label is always surfaced, never hidden; an out-of-scope asset is acknowledged explicitly, never omitted.
- **Failure Modes:** The model "helpfully" adding detail beyond what was actually resolved — the single highest risk named across this project's entire sprint-planning history (`SPRINT_BREAKDOWN.md`'s Sprint 01E risk assessment).
- **Confidence Rules:** Inherits Stage 09's label exactly; never restated more confidently than that.
- **Escalation Rules:** None generated here — by this stage, the escalation decision is already final.
- **Future AI Model:** A single grounded LLM call, exactly as already scoped in `ENGINEERING_SPRINT_01_SPECIFICATION.md` and `MVD_IMPLEMENTATION_PLAN.md`.
- **Dependencies:** Stage 10.
- **Related Constitution:** `CITIZEN_CONSTITUTION.md` (plain language, dignity); `TRUST_CONSTITUTION.md`.
- **Related Specification:** `ENGINEERING_SPRINT_01_SPECIFICATION.md`; `DEMO_DIRECTOR_BOOK.md` (this stage is literally the citation-reveal beat, 1:10–1:40).

### Stage 12 — Case Initialization
- **Purpose:** Persist the resolved case as the durable system of record.
- **Inputs:** The resolved procedure (Stage 05), citizen identity, the first message, Stage 10's escalation status.
- **Outputs:** A real `Case` record (`id`, `workflowState`, `stage`) and an audit event.
- **Decision Rules:** An already-open case for this citizen and procedure is reused, never duplicated. **Critically: this stage only initializes a case against a procedure that Stage 05 has actually resolved** — see the Known Risk below regarding the current implementation's temporary deviation from this rule.
- **Failure Modes:** Initializing a case before the procedure is actually known — exactly what Sprint 01A.1's current implementation does, of necessity, before this pipeline existed (see Known Risks).
- **Confidence Rules:** N/A.
- **Escalation Rules:** If Stage 10 escalated, the case is still initialized (an officer needs something concrete to review) but is created already flagged for escalation, not silently left in a default state.
- **Future AI Model:** None.
- **Dependencies:** Stage 05 (procedure) and Stage 10 (escalation status).
- **Related Constitution:** `GOVERNMENT_CONSTITUTION.md` Chapter 5 (Auditability).
- **Related Specification:** `ENGINEERING_SPRINT_01_SPECIFICATION.md`; Sprint 01A.1 (already implemented; flagged for revision below); `WORKFLOW_CONSTITUTION.md` Chapter 4 (state machine).

---

## Complete Pipeline Diagram

```
Citizen Message
      │
      ▼
[01] Intent Detection ──────────────────► (ambiguous) ──► ask
      │
      ▼
[02] Goal Resolution ────────────────────► (no match) ──► Stage 10
      │
      ▼
[03] Life Event Resolution ──────────────► (ambiguous) ──► ask / Stage 10
      │
      ▼
[04] Affected Asset Resolution ──────────► (out-of-scope asset noted, carried forward)
      │
      ▼
[05] Procedure Resolution ───────────────► (not yet authored) ──► Stage 10
      │
      ▼
[06] Eligibility Evaluation ─────────────► (unknown fact) ──► ask
      │                                    (ambiguous edge case) ──► Stage 10
      ▼
[07] Checklist Generation
      │
      ▼
[08] Legal Citation Retrieval ───────────► (no citation found) ──► Stage 10
      │
      ▼
[09] Confidence Assessment (min across 01-08)
      │
      ▼
[10] Escalation Decision ──────┬─────────► ESCALATE (context package → Officer)
      │                        │
      ▼ (proceed)              ▼
[11] Natural Language Response │
      │                        │
      ▼                        ▼
[12] Case Initialization ◄─────┘
      │
      ▼
Citizen sees response / Officer sees escalated case
```

## Sequence Diagram

```
Citizen        Communication      Orchestration      Legal Reasoning     Document Intel     Escalation
  │  message         │                   │                   │                  │               │
  ├────────────────► │                   │                   │                  │               │
  │                  ├──[01,02,03,04]──► │                   │                  │               │
  │                  │                   ├──[05]────────────►│ (lookup)         │               │
  │                  │                   │                   ├──[06,07,08]─────►│ (n/a today)   │
  │                  │                   │◄──resolved data────┤                  │               │
  │                  │                   ├──[09] confidence   │                  │               │
  │                  │                   ├──[10] decision ────┼──────────────────┼──────────────►│
  │                  │◄──[11] response───┤ (if proceed)       │                  │               │
  │◄─────────────────┤                   │                   │                  │               │
  │                  │                   ├──[12] persist Case │                  │               │
```

Only the Orchestration Subsystem sequences calls to more than one other subsystem — matching Epic A Chapter 6's rule exactly. Document Intelligence is shown as "n/a today" because no OCR/document-verification capability exists yet; its slot in the sequence is reserved, not invented.

## State Transition Diagram

Maps pipeline execution onto the already-implemented 13-state `WorkflowState` machine (`src/lib/orchestration/workflow-state-machine.ts`):

```
First successful pipeline run (Stage 12, no prior Case):
   DRAFT ──► PREPARING

Subsequent turns, still gathering eligibility facts or documents:
   PREPARING ──► WAITING_CITIZEN   (Stage 06 needs a fact)
   PREPARING ──► WAITING_DOCUMENTS (Stage 07 checklist has open items)

Escalated at any stage:
   <current state> ──► ESCALATED   (Stage 10 fires, per the existing state machine's
                                    allowed transitions from PREPARING/WAITING_* states)
```

No new states or transitions are introduced by this pipeline — it exclusively drives the state machine already Approved in Epic A Milestone M1, exactly as that milestone intended.

## Failure Recovery Flow

Every failure mode named above converges to exactly one of four recovery paths, never an improvised fifth:

1. **Ask** — a specific, answerable fact is missing (Stages 01, 03, 06).
2. **Disclose** — a claim cannot be supported (Stage 08's no-citation-found path; Stage 04's out-of-scope asset).
3. **Escalate** — ambiguity, a missing procedure, or low aggregate confidence (Stage 10, triggered from Stages 02, 03, 05, 06, 08, 09).
4. **Retry** — a transient technical failure (an LLM timeout at Stage 11) — the citizen is told plainly and invited to retry, never shown a partial or fabricated result.

## Confidence Propagation

```
Stage 01 confidence ─┐
Stage 02 confidence ─┤
Stage 03 confidence ─┤
Stage 04 confidence ─┼──► min( ) ──► Stage 09 overall confidence ──► Stage 10 threshold check
Stage 05 confidence ─┤
Stage 06 confidence ─┤
Stage 07 confidence ─┤
Stage 08 confidence ─┘
```

`min()`, not an average — a single weak stage (most often Stage 08, since every current citation is unverified) caps the entire response's confidence, regardless of how strong every other stage was.

## Human Override Points

- **Stage 10 (Escalation Decision)** — the primary, structural override point; any trigger anywhere in the pipeline routes here before a citizen ever sees an unreviewed claim.
- **Post-Stage-12, Officer Console** — the already-implemented approve/request-info actions on a persisted `Case` are the second override point, exercised after the pipeline has already run at least once.
- No other point in this pipeline permits human intervention to *change* an AI-produced fact — only to receive it, review it, and decide.

## Trust by Design Mapping

| `TRUST_CONSTITUTION.md` Ch. 4 Mechanism | Implementing Stage(s) |
|---|---|
| Legal Citation | Stage 08 |
| Human Escalation | Stage 10 |
| Auditability | Stage 12 (and flag propagation across every stage feeding it) |
| Traceability | Every stage's flag propagation, reconstructed at Stage 12's audit event |
| Evidence | Stages 06, 07, 08 (deterministic, source-grounded) |
| Consistency | Stage 09 (same inputs always cap to the same confidence) |

## Audit Events

**One audit event per conversation turn**, not twelve fragmented ones — consistent with `ENGINEERING_SPRINT_01_SPECIFICATION.md` §14. The event's payload structurally captures every stage's key decision: matched `goalId`/`lifeEventId`/`assetId`/`procedureId`, the eligibility result, the checklist generated, the citation(s) used (or the no-citation-found flag), the aggregate confidence, and the escalation decision. A reviewer reconstructs the entire pipeline's reasoning for that turn from this one event, per `TRUST_CONSTITUTION.md` Chapter 4's Traceability requirement.

## Performance Budget

Against `ENGINEERING_SPRINT_01_SPECIFICATION.md` §16's 6-second turn target:

| Stages | Nature | Budget |
|---|---|---|
| 01–07, 12 | Deterministic lookups/logic | < 500ms combined |
| 08 | Static citation lookup today (RAG later) | < 100ms today |
| 09–10 | Deterministic aggregation/decision | < 50ms combined |
| 11 | Single grounded LLM call | Remainder of budget (~5s), masked by the typing indicator per `DEMO_DIRECTOR_BOOK.md` §7 |

## Competition Demo Mapping

| Demo Director Book Beat | Pipeline Stages |
|---|---|
| 0:40–1:05 (recognition) | Stages 01–05 |
| 1:10–1:40 (citation reveal) | Stage 08, surfaced through Stage 11 |
| 1:40–2:05 (checklist) | Stages 06–07 |
| 2:05–2:35 (missing document) | **Not in this pipeline** — see Recommendation for Volume 42 |
| 2:55–3:25 (officer approval) | Post-Stage-12, Officer Console override point |

---

## Known Risks

- **Case Initialization ordering conflict.** Sprint 01A.1's already-implemented `initializeCase()` runs on the citizen's *first message*, defaulting to the single pilot procedure, because no Procedure Resolution logic existed at that time. This Specification places Case Initialization *last* (Stage 12), after real procedure resolution — the architecturally correct order. **A future sprint must move `initializeCase()`'s trigger point from "first message" to "after Stage 05 resolves a real, in-library procedure,"** or a case could silently be created against the wrong procedure once more than one procedure exists.
- **Flag propagation is currently conceptual, not implemented.** Stage 10's correctness depends entirely on every earlier stage's flags actually reaching it — this Specification requires that architecturally but does not yet exist in code; a naive implementation that only passes each stage's final output forward (not its flags) would silently break escalation.
- **Missing Document Detection has no stage.** ~~The Demo Director Book's most emotionally important beat (2:05–2:35) is not covered by any of the twelve stages here~~ — **Resolved by `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Volume 42)**, which supplies the reasoning core for this gap. A future revision of this Specification should formally add it as Stage 13, invoked after the citizen responds to Stage 07's generated checklist.
- **Every citation is currently unverified**, capping this entire pipeline's achievable confidence at Medium until a legal reviewer changes that — a known, disclosed limitation, not an oversight.

## Recommendation for Volume 42

Author a companion **Multi-Turn Follow-Up Specification** covering what happens *after* Stage 11's first response — specifically, a "Stage 13: Missing Document Detection" re-invoking Stages 06–07 against citizen-confirmed document status, closing the one gap this Specification's Competition Demo Mapping explicitly surfaces. Alongside it, raise the Case Initialization ordering conflict above as a formal ADR before any implementation of Stages 01–05 begins, so Sprint 01A.1's code is corrected deliberately rather than discovered broken later.
