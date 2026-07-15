# PROJECT_OPERATING_SYSTEM.md
### The Project Operating System (POS) — Supreme Governance Document
**Version:** 1.7
**Status:** Approved
**Precedence:** Supreme. Nothing in the CAIOS project — no Constitution, Specification, ADR, Knowledge Base entry, contributor action, or AI-assisted change — may violate this document. Where any other document defines its own governance, versioning, or collaboration rule that conflicts with this one, this one governs.
**Companion documents:** `MASTER_INDEX.md` (incorporated as Chapter 01), `PRODUCT_CONSTITUTION.md` (Volume 01, the root of content this POS's governance ultimately protects), `VISION_CONSTITUTION.md` (Volume 02, the destination that content DNA exists to reach), `TRUST_CONSTITUTION.md` (Volume 03, why that destination can be believed in along the way), `SUCCESS_METRICS_CONSTITUTION.md` (Volume 36 per ADR-0007, how we know the destination is actually being reached), `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`.

**Cross-Reference Chain:**
```
Project Operating System (POS, this document)   — supreme governance authority
        │  (Chapter 01)
        ▼
Master Index                                     — documentation architecture & navigation (Volume 00)
        │  (Volume 01)
        ▼
Product Constitution                              — root of product DNA and content
        │  (Volume 02)
        ▼
Vision Constitution                                — the destination that DNA exists to reach
        │  (Volume 03)
        ▼
Trust Constitution                                  — why that destination can be believed in along the way
        │  (Volume 36 — see ADR-0007)
        ▼
Success Metrics Constitution                         — how we know the destination is actually being reached
```

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 (initial) | Prior revision | Architecture Review | First issuance: 8 chapters covering Master Index integration, authority model, amendment procedure, consistency enforcement, repository governance, escalation, and sunset. |
| 1.0 (this revision) | Prior revision | Architecture Review | Restructured into the complete 10-chapter governance model: Master Index, Project Governance, Documentation Governance, Architecture Governance, ADR Governance, Knowledge Governance, AI Collaboration Rules, Reading Paths, Project Evolution, Operating Principles. All content from the prior 8-chapter structure is preserved, redistributed into its correct chapter below — nothing already governed was removed, only reorganized and substantially extended. |
| 1.1 | Prior revision | Architecture Review 003 | Added explicit Cross-Reference Chain (POS → Master Index → Product Constitution) to the title block, added `PRODUCT_CONSTITUTION.md` to Companion Documents, and added the standing rule in Chapter 03 that every future document's Companion Documents field must name all three of POS, Master Index, and Product Constitution. |
| 1.2 | Prior revision | Architecture Review | Volume 02 (`VISION_CONSTITUTION.md`) inserted into the Founder, Architect, and Judge Reading Paths in Chapter 08, following its formal reassignment in `MASTER_INDEX.md` (ADR-0005). |
| 1.3 | Prior revision | Architecture Review 004 (Governance Verification) | Fixed a real gap the verification check caught: `VISION_CONSTITUTION.md` was missing from this document's own Companion Documents field and Cross-Reference Chain diagram, despite being correctly referenced everywhere else. Added it to both, and extended the standing cross-reference rule in Chapter 03 from three required documents to four. |
| 1.4 | Prior revision | Architecture Review | Added `TRUST_CONSTITUTION.md` (Volume 03) to Companion Documents, Cross-Reference Chain, the standing cross-reference rule (now five required documents), and the Founder/Architect/Judge Reading Paths in Chapter 08. |
| 1.5 | Prior revision | Architecture Review | Added `SUCCESS_METRICS_CONSTITUTION.md` (Volume 36 per ADR-0007) to Companion Documents, Cross-Reference Chain, the standing cross-reference rule (now six required documents), and the Founder/Architect/Judge Reading Paths. |
| 1.6 | Prior revision | Architecture Review | `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Volume 37, per ADR-0009) inserted into the Architect Reading Path in Chapter 08. As a Specification rather than a Constitution, it does not extend the Cross-Reference Chain or the six-document standing rule — those remain scoped to the Constitutional Core. |
| 1.7 | This revision | Architecture Review 007 | Recorded Epics as a new document class (ADR-0010, detailed in `MASTER_INDEX.md` §2) and added Epic approval authority to Chapter 02's Decision Authority table. |

---

## Preface

Every document authored before this one governs *something specific* inside CAIOS: the AI's mind, the citizen's journey, the law's reasoning, the citizen's dignity, the government's authority, the documentation architecture. None of them governs *how the project itself is run* — who decides, how work moves from idea to Approved artifact, how AI tools are allowed to participate, how the project changes shape as it grows from a startup prototype into national infrastructure.

That is what this document is for. The Project Operating System is not a description of CAIOS the product. It is the description of CAIOS the *undertaking* — the operating system the people, the AI tools, and the documents themselves all run on. It is held to no lower a standard than the standard it imposes on everything beneath it: every claim in this document must be traceable to a real governance need, every rule must have a stated reason, and every boundary here is exactly as permanent as the boundaries `GOVERNMENT_CONSTITUTION.md` Chapter 3 places on the AI it describes.

---

## Chapter 01 — Master Index

`MASTER_INDEX.md` is incorporated by reference as the first chapter of this Project Operating System. It is not duplicated here — duplicating a 35-volume index inside its own governing document would create two copies that could silently drift apart, which is exactly the failure this entire document series exists to prevent.

What Chapter 01 provides: the complete documentation hierarchy (Constitutions → Specifications → ADRs → Knowledge Base), the 35-volume structure across 7 phases with Document Status and Ownership for each, the Dependency Matrix and Change Impact Matrix, the Traceability Matrix, the Reading Order and AI Consumption Order, the Relationship Diagram, the ADR Index, the Product Evolution Roadmap, and the AI Agent Map.

What the remaining nine chapters of this POS provide, that the Master Index does not and should not hold itself: the authority structure, decision rights, architectural discipline, decision-record governance, living-knowledge governance, AI-tool collaboration rules, audience-specific reading paths, edition-by-edition evolution, and the ten operating principles every one of those chapters must itself answer to.

---

## Chapter 02 — Project Governance

### Roles and Responsibilities

CAIOS governance is exercised through five standing bodies. No individual acts with authority beyond what their body is assigned here, and no document may invent a sixth body without amending this chapter first.

- **National Steering Committee (NSC)** — the highest standing authority. Approves all Constitutions (Volumes 01, 05–09), approves this POS itself, and is the final and binding escalation point for any dispute the bodies below cannot resolve. Composed of representation matching the eight perspectives already established as the Constitutional Design Committee (Government Digital Transformation Architect, Senior Public Administration Expert, Administrative Law Expert, AI Governance Expert, Citizen Experience Expert, Cybersecurity Expert, Public Service Officer, Enterprise Architect).
- **Constitutional Design Committee (CDC)** — drafts and Red-Team-reviews Constitutions before they reach the NSC. A drafting and review body, not an approval body: it recommends, the NSC approves.
- **Technical Steering Committee (TSC)** — approves Specifications in the Architecture, AI Subsystem, and Quality/Operations phases (Volumes 04, 14–19, 24–27). Composed of the Enterprise Architect, relevant subsystem leads, and the AI Governance Expert.
- **Security & Compliance Steering Committee (SCSC)** — approves Specifications in the Data Governance & Security phase (Volumes 20–23) and any security-relevant amendment to any other volume. Composed of the Cybersecurity Expert, a legal/compliance representative, and the Enterprise Architect.
- **Program Management Office (PMO)** — owns execution, not approval: sequencing volume authorship, tracking the Dependency and Change Impact Matrices for actual (not merely planned) staleness, and administering the Documentation Lifecycle so its stages are never silently skipped under delivery pressure.

### Decision Authority

Authority is scoped by document class and, within Specifications, by domain — this is deliberate, not an oversight: a cross-cutting Specification (e.g., one touching both an AI subsystem and security) requires joint sign-off from both relevant committees, making cross-cutting changes harder to push through unilaterally than single-domain ones.

| Decision Type | Authority |
|---|---|
| Approve/amend a Constitution | National Steering Committee, on CDC recommendation |
| Approve/amend an Epic (per ADR-0010) | Relevant Steering Committee (typically TSC for AI/architecture Epics), same bar as a Specification, since an Epic constrains multiple future Specifications and an error here propagates to all of them |
| Approve/amend a Specification | Relevant Steering Committee (TSC or SCSC), jointly where domains overlap |
| Approve/amend this POS | National Steering Committee, unanimous (see Chapter 02's Amendment Authority below) |
| Approve/supersede an ADR | Decision owner named in the ADR, reviewed per Chapter 05 |
| Update Knowledge Base content | Designated Implementation Owner, no committee review required unless it alters a claim inherited from a higher-authority document |
| Resolve a cross-body dispute | Escalation path below |

### Approval Flow

```
Draft → Review → Red Team Review (where required) → Standing Body Approval → Implementation → Maintenance
```

This is the same Documentation Lifecycle governed in full in Chapter 03; this chapter's contribution is naming *who* sits at the "Standing Body Approval" gate for each document class, per the Decision Authority table above.

### Ownership

Every volume's Owner, Architect, Reviewer, Implementation Owner, and Approval Authority are recorded in `MASTER_INDEX.md` §3 (individually for Volumes 01–09) and §4a (by phase default for Volumes 10–35). This chapter is the source of *what those role titles mean and what authority they carry*; the Master Index is the source of *who holds which role for which volume*. The two are companions, not duplicates — a role definition changing here (e.g., redefining what an "Implementation Owner" is accountable for) automatically applies to every volume's existing ownership record without needing 35 individual edits.

### Amendment Authority Over This Chapter, and Over This POS

Amending this chapter, or any part of this POS, requires unanimous National Steering Committee sign-off and a dedicated Red Team Review targeting the proposed governance change itself — the highest bar in the project, detailed in full in Chapter 03's Lifecycle section. There is no expedited path; an urgent interim need is handled as a logged, time-boxed ADR exception (Chapter 05), never as a shortcut through this bar.

### Dispute Resolution

1. A disagreement is first raised directly between the parties, with the specific point of disagreement stated in writing.
2. If unresolved, it escalates to the relevant Steering Committee.
3. If the disagreement concerns a Constitution, this POS itself, or a Steering Committee cannot resolve it, it escalates to the NSC, whose decision is final.
4. Every escalation and its resolution is logged — the project's own governance is held to the same auditability standard `GOVERNMENT_CONSTITUTION.md` Chapter 5 demands of the AI it governs. A governance layer that exempted itself from that standard would be a double standard, not an efficiency.
5. No standing body may resolve a dispute by declining to engage — silence past a defined response window escalates automatically rather than leaving a document in permanent limbo.

---

## Chapter 03 — Documentation Governance

### Templates

Every document begins from one standard skeleton: title block (filename, human-readable title and volume number, version, status, precedence, companion documents, ownership), a changelog table, a Preface stating the need the document traces back to, its chapters, and a Closing Note relating it to the rest of the set. ADRs use a shorter, decision-specific template (Title, Status, Context, Decision, Consequences, Alternatives Considered) — deliberately terser, since an ADR's value is in being quick to write and quick to read, not in matching a Constitution's depth.

**Standing cross-reference rule (Architecture Review 003, extended by Architecture Reviews 004, 005, and this revision):** every document's title block, regardless of class or volume, must name all six of `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, and `SUCCESS_METRICS_CONSTITUTION.md` in its Companion Documents field — the chain established in each of their own headers. A new document missing any of the five fails the Review Rules below before any other criterion is even checked. This rule itself is versioned: each time a new root-level Constitution is added to the chain, the required reference count grows by one, and every document approved before that addition is not retroactively non-compliant — only newly Approved documents are held to the expanded chain.

### Naming

Constitutions use `SCREAMING_SNAKE_CASE` ending in `_CONSTITUTION.md` (or the established foundational exception, `AI_OPERATING_SYSTEM.md`). Specifications end in `_SPECIFICATION.md`. Playbooks and operational manuals end in `_PLAYBOOK.md` or `_MANUAL.md`. ADRs use `ADR-NNNN-short-kebab-case-title.md`, numbered sequentially and never renumbered or reused. Volume numbers are two-digit, zero-padded, and are stable identifiers independent of a document's eventual filename. Every document's title block volume number must match its entry in `MASTER_INDEX.md` §3 — a mismatch is treated as a defect requiring immediate reconciliation, in either the document or the index, never tolerated as a lingering discrepancy.

### Folders

The target folder structure is defined in `MASTER_INDEX.md` §17. **It is not yet in effect.** Per the standing Repository Freeze established under the prior Architecture Review and reaffirmed here: no document currently in force is to be relocated, renamed, or reorganized until all of the following are simultaneously true — (1) `MASTER_INDEX.md` is Approved at v1.0 or later, (2) this POS is Approved at v1.0 or later, and (3) a dedicated ADR, approved by the Technical Steering Committee, explicitly authorizes the migration and includes a plan for updating every cross-reference so no companion-document pointer breaks silently during the move. Conditions (1) and (2) are satisfied as of this revision; condition (3) has not yet been raised, so the freeze remains in effect. Any proposal to "also tidy up the file structure while we're at it" during unrelated work is out of scope for whoever is doing that work — it is raised as its own ADR, not executed as a side effect.

### Status

Every document carries one of seven lifecycle states: `Draft`, `Review`, `Red Team Review`, `Approved`, `Deprecated` (superseded in practice but not yet formally replaced), `Superseded` (formally replaced by a named successor), or `Archived` (retained permanently for historical traceability). A superseded or archived document is never deleted — this project applies to its own documentation the identical Retirement discipline `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 3 requires of the legal sources it reasons over: the past remains inspectable, even once it no longer governs.

### Versioning

Every document carries a version in the form **MAJOR.MINOR**. MAJOR increments whenever a change alters binding meaning, and always requires the full lifecycle below, including Red Team Review where applicable. MINOR increments for clarifications or corrections that do not change what is required or permitted, and requires Review but not necessarily a fresh Red Team pass. Every version bump carries a changelog entry — version, date, reviewer, and a one-sentence reason. No document, including this one, is ever silently edited without a version bump.

### Lifecycle

```
Draft → Review → Red Team Review → Approved → Implementation → Maintenance
```

Draft: an author produces a first complete version, marking any referenced-but-unwritten dependency clearly as such. Review: at least one qualified reviewer per relevant perspective checks internal correctness and consistency with every higher-authority document. Red Team Review: mandatory for Constitutions and any citizen- or security-impacting Specification — an adversarial pass specifically tries to find how the document's rules could be gamed or misapplied; findings are resolved or explicitly recorded as an accepted residual risk, never silently dropped. Approved: the document is versioned and becomes binding on every dependent volume. Implementation: work is built to conform to it; any discovered deviation triggers a correction or a new revision cycle, never a silent divergence. Maintenance: the document is periodically re-checked for currency and revised through this same lifecycle when it needs to change.

### Review Rules

Before advancing Draft → Review: every listed dependency is Approved or explicitly flagged as a known gap; nothing contradicts a higher-authority document; citizen-experience, legal-citation, and AI-capability-boundary claims are checked against Volumes 08, 07, and 09 respectively; the document contains no implementation detail inappropriate to its class; accessibility, security, and privacy implications have been considered even where the answer is "not applicable"; Status, Ownership, and changelog are all present and correct; and the title block volume number matches the Master Index.

Before advancing Review → Red Team Review: at least one reviewer has explicitly attempted to find a way the document's rules could be misapplied or gamed, and every finding is either resolved or recorded, visibly, as an accepted residual risk.

A document reaches **Approved** only when every one of the above is true, it does not contradict any higher-ranked Approved document (any apparent tension resolved and documented explicitly, in the style already established by `GOVERNMENT_CONSTITUTION.md`'s Constitutional Review), and its entry in `MASTER_INDEX.md` is updated as part of its own approval — a document is not Approved until Volume 00 reflects it.

---

## Chapter 04 — Architecture Governance

### Architecture Principles

These are the structural commitments no Specification or implementation may violate, regardless of short-term convenience:

- **Configuration over code** — a new administrative procedure is added as a configuration of the universal workflow (`WORKFLOW_CONSTITUTION.md`), never as a new bespoke workflow. If adding a procedure requires touching the workflow engine's own logic, that is treated as an architecture defect to fix, not a normal cost of growth.
- **Swappable AI providers** — no agent's correctness may depend on a specific model vendor. The orchestration layer, not the underlying model, is where governance and behavior guarantees live, per `MASTER_INDEX.md` §8's AI Consumption Order.
- **Retrieval-gated legal and factual claims** — no component may assert a legal or factual claim without a traceable, current source, per `LEGAL_INTELLIGENCE_CONSTITUTION.md`. This is an architectural constraint, not a prompting convention, and any implementation that makes it merely a "usually true" behavior rather than a structural guarantee is non-conformant.
- **Human-authority boundary is structural, not configurable** — the line in `GOVERNMENT_CONSTITUTION.md` Chapter 3 between AI decision support and final government decision is not a feature flag. No architecture may introduce a code path, however administratively convenient, that lets the AI's output become binding without a human officer's action in between.

### Dependencies

The authoritative Dependency Matrix lives in `MASTER_INDEX.md` §4. This chapter's governing rule: a Specification may enter Draft before every dependency is Approved, but may not reach Approved status itself until every volume it depends on is Approved — an architecture may not be finalized on top of a constitutional principle still under active debate.

### Impact Analysis

The authoritative Change Impact Matrix lives in `MASTER_INDEX.md` §6. This chapter's governing rule: any change to a High-severity volume **automatically opens a review task** against every volume the matrix lists as directly affected. This is not discretionary — the PMO tracks it as a mandatory, non-optional part of the Review stage of the Documentation Lifecycle, exactly as a change to a shared architectural component in any serious engineering organization triggers review of everything built on top of it.

### Breaking Changes

A change is a **breaking change** when it invalidates an assumption an existing Approved, dependent volume already relies on — not merely when it looks large. A wording clarification to a Constitution that changes no dependent's assumptions is not breaking; a one-sentence edit that silently narrows an eligibility rule a live procedure configuration depends on is breaking, regardless of how small the diff looks. Every breaking change requires: (1) identification of every affected volume via the Change Impact Matrix, (2) an explicit compatibility plan for each (Chapter 04's Compatibility Rules below), and (3) sign-off from every Steering Committee whose Specifications are affected, not just the committee that owns the changing document.

### Compatibility Rules

- **Legal versioning compatibility** — a case decided under a prior version of the law must remain fully explainable under the law version actually in force at the time, per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 3's Version Control stage. A legal source update must never retroactively make a past, correctly-decided case appear to have been wrongly decided.
- **Procedure configuration compatibility** — evolving the universal workflow (adding a new step, state, or agent) must never require every existing procedure configuration to be rewritten; new capability is additive, and existing configurations continue to function unless a dedicated migration ADR says otherwise.
- **Data compatibility** — a citizen's historical case record must remain readable and explainable under whichever schema or rule version produced it, even after the platform has moved on to a newer version — this is the direct architectural expression of `CITIZEN_CONSTITUTION.md`'s requirement that a citizen never be made to feel like their history was discarded.

---

## Chapter 05 — ADR Governance

### ADR Numbering

ADRs are numbered sequentially (`ADR-0001`, `ADR-0002`, ...), assigned at creation, and never reused or renumbered — even when an ADR is rejected or later superseded, its number remains permanently associated with it, the same way a repealed law's citation is retained rather than reassigned to something else.

### ADR Lifecycle

```
Proposed → Accepted / Rejected → (later, optionally) Superseded → Archived
```

An ADR is **Proposed** when drafted, capturing the context and the decision being considered. It becomes **Accepted** or **Rejected** once its designated decision owner (below) rules on it, with the reasoning recorded either way — a rejected ADR is retained, not deleted, since knowing what was considered and why it was turned down is itself valuable institutional memory. An Accepted ADR may later be **Superseded** by a new ADR that explicitly names it; the old ADR is never edited to reflect the new decision, it is marked Superseded and left exactly as it was written, preserving an honest record of what the project actually believed at the time. All ADRs, regardless of final status, are eventually **Archived** — retained permanently, contributing to the project's decision history the same way `GOVERNMENT_CONSTITUTION.md` Chapter 5 requires of any accountable institutional record.

### Decision Ownership

Every ADR names a single decision owner accountable for it — typically the Architect role for the affected volume (per `MASTER_INDEX.md` §4a's Ownership model) — even when the decision was reached collaboratively. A decision without a named owner is not eligible to move past Proposed.

### Decision Review

An ADR affecting a single, narrow implementation choice may be Accepted by its decision owner alone. An ADR that constitutes a breaking change (Chapter 04) or touches security, privacy, or a citizen-facing guarantee requires the same Steering Committee sign-off any Specification of that domain would require — an ADR is a lighter-weight artifact than a Specification, but it is not a way to bypass the review a decision of that consequence would otherwise require.

### Decision Superseding

Superseding is always explicit: a new ADR states, in its own text, which prior ADR it supersedes and why. `MASTER_INDEX.md` §10 maintains the running index of every ADR, its status, and its supersession chain — the same way the Legal Knowledge Hierarchy tracks which regulation replaced which. The project's own technical decisions are held to the identical traceability standard `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 2 demands of the law the AI reasons about.

---

## Chapter 06 — Knowledge Governance

The Knowledge Base is the living layer beneath the constitutional and specification layers — it changes often, is read constantly, and must never be allowed to drift from what the higher layers actually say.

- **Knowledge Base (general)** — playbooks, onboarding material, and FAQs (Volumes 29, 31, 33–35) are maintained by their designated Implementation Owner without requiring committee review for routine updates, provided no update alters a claim inherited from a Constitution or Specification. An update that does alter such a claim is no longer a routine Knowledge Base edit — it re-enters the Documentation Lifecycle at Review.
- **Glossary** (Volume 33) — maintains exactly one authoritative definition per term used anywhere in the CAIOS documentation set. No document may introduce a new definition for an existing term without updating the Glossary in the same change; term drift between documents authored months apart is treated as a defect the Glossary exists specifically to prevent.
- **Legal Knowledge** (Volume 15, governed substantively by `LEGAL_INTELLIGENCE_CONSTITUTION.md`) — the legal corpus is reviewed on the cadence defined in Volume 34, with ownership of each legal domain explicitly assigned so that no area of law silently goes unreviewed simply because no one volume named an owner for it.
- **Citizen Research** — findings from real citizen usage (comprehension, completion, sentiment — the metrics defined in `CITIZEN_CONSTITUTION.md` Chapter 9) are captured as Knowledge Base entries, and any finding that reveals a persona, journey stage, or communication principle was incompletely understood triggers a proposed amendment to Volume 08 itself, not merely a note filed away and forgotten.
- **Officer Research** — feedback from officers using the system, especially override patterns (per `GOVERNMENT_CONSTITUTION.md` Chapter 4 and `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 9's manual-override feedback loop), is captured the same way: a pattern of overrides pointing to a systemic AI or legal-corpus gap is not just logged, it is escalated toward a Specification or legal-source correction.
- **Lessons Learned** — every incident (Volume 27), pilot milestone (Volume 28), or significant escalation pattern produces a Lessons Learned entry, distinct from an ADR (which records a decision) and distinct from an incident report (which records an event) — a Lessons Learned entry records what the project now understands differently as a result, and is the single most direct mechanism by which the documentation set actually improves over time rather than merely accumulating.

**The unifying rule across this entire chapter:** the Knowledge Base may move fast precisely because it is not authoritative on its own — it is authoritative only insofar as it stays honest to what the Constitutions and Specifications above it actually say, and the moment it doesn't, it is the Knowledge Base that is wrong, never the other way around.

---

## Chapter 07 — AI Collaboration Rules

CAIOS is authored and, in places, operated with the direct participation of AI tools. Their responsibilities, boundaries, and collaboration modes are project governance, not an implementation detail, because an ungoverned AI tool is exactly the kind of silent-drift risk Chapter 02 exists to prevent — applied here to the tools building the project, not only to the product they are building.

**Universal rule:** Constitutional documents always load before Specifications; Specifications always load before code. No AI tool is ever handed code to modify without also being given the Constitution governing the area that code implements.

- **ChatGPT** — used, where a contributor chooses to, as an informal external drafting or brainstorming aid, outside this project's governed context. It holds no special status and no write access to any CAIOS document. Anything drafted with its help re-enters the project exactly like any other contributor's first draft: through Chapter 03's Documentation Lifecycle, starting at Draft, subject to the same Review and Red Team requirements as anything else.

- **Claude** — the primary conversational collaborator for authoring Constitutions and Specifications within a governed project engagement, as this project's own history already demonstrates. Loads the full constitutional stack (`MASTER_INDEX.md` §8) for the duration of an engagement and is expected to reason from it consistently. Claude may draft, synthesize, and propose — Claude does not unilaterally Approve; approval remains with the human standing bodies defined in Chapter 02, always.

- **Claude Code** — the coding agent operating directly on the repository. Bound by the AI Consumption Order (`MASTER_INDEX.md` §8): loads the Master Index, then the Constitution(s) governing the task at hand, then the relevant Specification, before touching code. Claude Code is the primary agent expected to turn an Approved Specification into working implementation, and is responsible for flagging — not silently resolving — any point where the existing code appears to already diverge from an Approved document.

- **Cursor** — an in-editor AI pair programmer operating at file or function scope, with a narrower working context by default than a full project engagement. Rather than loading the entire constitutional stack every session, Cursor is pointed to a lightweight, file-scoped rule identifying which single Constitution chapter governs the code area currently open — matched to its narrower scope, not a reduced standard of compliance.

- **Gemini** (and any other third-party model integrated as a swappable backend behind a specific agent, e.g., for OCR or embeddings per Volume 04's config-driven provider requirement) — **never receives the constitutional stack as conversational context.** It receives only the narrow instruction and data relevant to the single tool call it performs. Handing a swappable vendor model the full constitutional stack as an implicit system prompt would misattribute governance authority to a component `GOVERNMENT_CONSTITUTION.md` Chapter 3 explicitly denies any decision authority to — governance lives in the orchestration layer, never in whichever vendor model happens to be plugged in underneath a given agent, which is precisely what keeps that vendor swappable without a governance rewrite.

- **Future AI** — any tool not yet integrated is onboarded by first classifying it against the four roles above: a governed conversational collaborator (Claude-like), a repository-operating coding agent (Claude Code-like), a scoped editor assistant (Cursor-like), or a swappable narrow-task backend (Gemini-like). It inherits the corresponding rules automatically. No new AI tool is granted bespoke rules invented ad hoc for it — if none of the four roles fit, that itself is treated as a signal that this chapter needs a considered amendment (per Chapter 02's Amendment Authority), not an improvised exception.

---

## Chapter 08 — Reading Paths

Different readers need different sequences through the same documentation set. No path below skips a Constitution that governs the reader's own area of concern.

- **Founder:** 01 (Product Constitution) → 02 (Vision Constitution) → 03 (Trust Constitution) → 36 (Success Metrics Constitution) → 08 (Citizen Constitution) → 09 (Government Constitution) → 05 (AI Operating System) → 06 (Workflow Constitution) → 07 (Legal Intelligence Constitution) → 04 (Technical PRD) → `MASTER_INDEX.md` in full → this POS.
- **Architect:** this POS → `MASTER_INDEX.md` → 01 → 02 → 03 → 36 → 04 → 37 (System Architecture Specification) → 05 → 06 → 07 → 09 → Volumes 20–23 → Volumes 14–19 → the ADR Index.
- **Developer:** 04 → 05 → 06 → whichever Volume 14–19 covers the task at hand → the codebase itself → 24 (QA Strategy) → 26 (DevOps Playbook).
- **Judge / External Evaluator:** 01 → 02 → 03 → 36 → 08 → `MASTER_INDEX.md` (as proof of structural rigor) → this POS (as proof of governance maturity) → 09 → 28 (Pilot Playbook) → live demo.
- **Government Officer:** `GOVERNMENT_CONSTITUTION.md` Chapter 4 (Role of Officers) → 11 (Officer Workspace Design) → 17 (Escalation Operations Manual) → 29 (Officer Training Program). Officers do not need the full constitutional stack — only the operationally relevant subset governing their own authority and workflow.
- **Citizen:** citizens are never expected to read the constitutional documents directly — that would itself violate the plain-language principle those very documents establish. Their reading path is a single plain-language public transparency summary (the eventual output of Volume 31, the Public Communication & Trust Report Framework), derived from `CITIZEN_CONSTITUTION.md` and `GOVERNMENT_CONSTITUTION.md` Chapter 8, and nothing beyond it should ever be a precondition for a citizen to trust or use the system.
- **AI Models:** governed in full by `MASTER_INDEX.md` §8 (the AI Consumption Order) and Chapter 07 of this document — each tool's reading path is a function of its role (governed collaborator, coding agent, editor assistant, or swappable backend), not a single universal sequence.

---

## Chapter 09 — Project Evolution

```
Startup Edition
      │
      ▼
Competition Edition
      │
      ▼
  Pilot Edition
      │
      ▼
Provincial Edition
      │
      ▼
Enterprise Edition
```

This chapter describes **governance only** — what authority, review rigor, and standing-body involvement changes at each edition. Product scope evolution is governed separately by `MASTER_INDEX.md` §11's Product Evolution Roadmap (Startup → Pilot → Province → National → Enterprise); the two are complementary views of the same growth, not competing roadmaps.

- **Startup Edition** (current): governance is lightweight by necessity — a small set of documents, a small team, the Constitutional Design Committee and National Steering Committee functioning as the only real standing bodies in practice. Every one of the ten chapters in this POS is already in force; only the *staffing* of each standing body is minimal.
- **Competition Edition:** a specific, time-boxed governance mode for presenting CAIOS to external evaluators (competitions, investor review, government pilot-selection panels) — not a lower bar than Startup Edition, but a *narrower demonstration scope*: the full constitutional and governance layer must already be Approved and internally consistent (this is exactly what a Judge's Reading Path in Chapter 08 is designed to verify), while production-only gates that don't affect demonstrability — such as Volume 23's data residency dossier — may remain open, explicitly disclosed as such rather than glossed over. A Competition Edition claim of readiness that hides an open production gate is a governance violation, not an acceptable simplification.
- **Pilot Edition:** governance tightens to production standard. Every launch-blocking gate identified in `MASTER_INDEX.md` §11 (Volume 23 data residency chief among them) must be closed before Pilot Edition governance is considered satisfied. The Security & Compliance Steering Committee's sign-off becomes mandatory, not advisory, and real citizens and real officers are, for the first time, governed parties whose feedback (Chapter 06's Citizen and Officer Research) enters the formal Documentation Lifecycle.
- **Provincial Edition:** governance must now support more than one instance of officer/jurisdiction structure simultaneously. The onboarding playbook (Volume 30) is exercised for real, and the Technical Steering Committee's Impact Analysis discipline (Chapter 04) is tested against a second real jurisdiction's configuration, not just the pilot's.
- **Enterprise Edition:** governance matures to support multiple ministries, sustained multi-year public trust reporting (Volume 31), and — per `PROJECT_OPERATING_SYSTEM.md` Chapter 08's own future-evolution question — a plausible need for standing bodies this version of the POS does not yet name (e.g., a cross-ministry coordination body). That expansion is handled through the ordinary Amendment Authority in Chapter 02 when the need is real, not preempted here by inventing bodies the project does not yet require.

---

## Chapter 10 — Operating Principles

Ten principles bind every chapter above and every document beneath this one. Where a specific rule elsewhere in this POS or its subordinate documents appears ambiguous, it is resolved in favor of whichever reading better satisfies these principles — they are the constitution behind the constitution.

- **Single Source of Truth** — for any fact, rule, or decision, there is exactly one authoritative document that governs it. Every other mention of that fact anywhere else in the project is a reference to that source, never an independent restatement that could drift from it.
- **Citizen First** — every governance decision, including purely internal ones about documentation process, is ultimately in service of the citizen outcomes defined in `CITIZEN_CONSTITUTION.md`. A governance rule that makes the project easier to run but the citizen experience worse has failed this principle regardless of its internal tidiness.
- **Legal Traceability** — every legal claim the system makes, and every architectural decision that affects how legal claims are made, is traceable to a named source and a named decision record. This project holds its own decisions to the same evidentiary standard `LEGAL_INTELLIGENCE_CONSTITUTION.md` demands of the law it reasons about.
- **Transparency** — governance decisions, escalations, and their resolutions are logged and available to those with a legitimate reason to review them, per Chapter 02's Dispute Resolution logging requirement. Governance does not operate through informal, unrecorded understanding.
- **Auditability** — every approval, amendment, and override across every chapter of this POS is attributable to a specific standing body or individual and reviewable after the fact, exactly as `GOVERNMENT_CONSTITUTION.md` Chapter 5 requires of the AI system this governance layer oversees.
- **Modularity** — the documentation architecture, the workflow engine, and the AI agent architecture are all designed so a new procedure, ministry, or agent is added as a new configuration or a new module, never as a rewrite of what already works, per Chapter 04's Architecture Principles.
- **Scalability** — governance structures defined for the Startup Edition are designed to extend, not be replaced, as the project grows through Chapter 09's editions — the same standing bodies persist, taking on broader scope, rather than needing to be reinvented at each stage.
- **Security** — every governance decision is evaluated for its security and privacy implications as a matter of course, not as an afterthought bolted on before launch, per the Security & Compliance Steering Committee's standing (not advisory) role from Pilot Edition onward.
- **Maintainability** — documents, decisions, and code are all written so that someone who was not present when they were created can understand, extend, or correct them without having to reconstruct lost context — this is the entire reason ADRs record *why*, not just *what*, and Constitutions state their reasoning, not just their rules.
- **Knowledge Preservation** — nothing is ever deleted outright. Superseded documents, rejected ADRs, and retired legal sources are archived, not erased, because an honest record of what the project once believed — and why it changed its mind — is itself one of the project's most valuable long-term assets, not administrative debris to be cleaned up.

---

## Closing Note

This Project Operating System, together with `MASTER_INDEX.md` (its Chapter 01) and the five Constitutions whose amendment it governs (`AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`), forms the complete governing layer of the Citizen AI Case Manager. Every future volume, every ADR, every AI-assisted contribution, and every line of code exists inside the authority structure defined here — and per Chapter 02's Amendment Authority, that includes this document's own future evolution.
