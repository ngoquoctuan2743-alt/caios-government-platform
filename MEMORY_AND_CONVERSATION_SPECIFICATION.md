# MEMORY_AND_CONVERSATION_SPECIFICATION.md
### The Memory & Conversation Specification — Volume 45
**Version:** 2.0
**Status:** Approved
**Class:** Specification — architecture only. No conversational AI model, in-memory data store, vector database, embedding technique, semantic search method, software framework, programming language, database technology, or cloud vendor is named or implied anywhere in this document; every principle here must remain true regardless of which such technology eventually implements it.
**Precedence:** Numbered Volume 45, the next actually-available sequential slot (per ADR-0008/0009) — **not Volume 17**, which remains reserved for the Escalation & Human-in-the-Loop Operations Manual, an unrelated document governing officer escalation SLA and routing rather than memory architecture. No ADR is required for this numbering, since no reassignment occurs — Volume 17 keeps its original reserved purpose untouched. Subordinate to every Constitution. Formalizes the conversational and case-memory assumptions that `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41) and `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42) already made implicitly, without modifying either document. Does not modify `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` (Vol. 16), or `LEGAL_CITATION_SPECIFICATION.md` (Vol. 44).
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Vol. 37), `EPIC_A_AI_CORE_ARCHITECTURE.md` (Vol. 38), `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` (Vol. 16), `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42), `LEGAL_CITATION_SPECIFICATION.md` (Vol. 44).
**Ownership:** Owner — Chief AI Architect · Architect — Memory Systems Designer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | Prior revision | Architecture Review | Initial authorship. Numbered Volume 45 after resolving a naming mismatch with Volume 17 (reserved for the Escalation & Human-in-the-Loop Operations Manual). |
| 2.0 | This revision | Architecture Review | **MAJOR:** complete restructuring into 16 chapters. Conversation Lifecycle expanded from 6 to 8 states, adding Paused and Escalated. Conversation Object Model revised: Context object retired in favor of a Participant object, with context propagation instead governed entirely by the new dedicated Memory Lifecycle (Chapter 07) and Context Propagation (Chapter 08) chapters. Memory Lifecycle introduced as a chapter distinct from Memory Trust Levels, mirroring the Verification Status / Citation Level separation already established in `LEGAL_CITATION_SPECIFICATION.md`. Failure Handling expanded from 6 to 7 categories. Acceptance Criteria expanded from 8 to 9 substitution tests, adding Government Platform. Dependencies and companion documents reviewed against the new content and confirmed unchanged. |

---

## Preface

Every conversation CAIOS has ever held with a citizen is, in one sense, disposable — a citizen only needs a renewed ID card, not a transcript. But the *facts* a conversation surfaces are not disposable: a birth date mentioned in turn three still matters in turn thirty, and still matters when the case reopens next year. This Specification defines the difference between a conversation and the memory a conversation leaves behind — how that memory is structured, how it moves through its own lifecycle independent of the conversation that produced it, how much of it can be trusted, how it propagates from a single exchange outward to an entire citizen relationship, and how a human always remains able to correct it. It says nothing about how any of this is stored, retrieved, or generated, because none of that is what makes memory trustworthy. What makes memory trustworthy is discipline about what it is allowed to claim.

---

## 01. Purpose

Define the complete, technology-independent architecture for conversational memory inside CAIOS: how conversations become persistent knowledge, how cases retain context, how memory evolves over time, how trust in memory is preserved and never fabricated, and how present and future AI implementations consume memory without this Specification depending on any of them.

## 02. Scope

**In scope:** what memory domains exist, the lifecycle a conversation moves through, the objects a conversation is made of, the separate lifecycle each individual memory fact moves through, how context propagates outward without duplication or hidden transformation, how much a given piece of memory can be trusted, how conversations are summarized without losing authority to the summary, and how a human corrects memory that turns out to be wrong.

**Out of scope, by design:** eligibility evaluation (`RULE_ENGINE_SPECIFICATION.md`), document extraction (`OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md`), gap and conflict reasoning (`DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md`), and legal citation (`LEGAL_CITATION_SPECIFICATION.md`). This Specification defines what a case is permitted to remember and how sure it is allowed to be about it — it never itself decides what a remembered fact means for eligibility or law.

## 03. Memory Philosophy

- **Memory exists to preserve context.** It is not a creative faculty and does not stand in for one.
- **Never imagination.** Memory does not fill a gap with a plausible-sounding scenario merely because one would be convenient.
- **Never prediction.** Memory does not record what a citizen is likely to say or do next as if it had already been said or done.
- **Never assumption.** A fact true in a similar case, or typically true of citizens in a given situation, is never carried into this citizen's memory without this citizen actually having stated or confirmed it.
- **Memory records evidence, not opinions.** What was said, what was observed, what was decided, and by whom — never a characterization of what any of it means. Meaning is supplied downstream, by the components in Chapter 12 that consume memory as input.

## 04. Memory Domains

Ten domains, distinguished by whose context they hold and how long they persist:

| Domain | Character |
|---|---|
| Conversation Memory | The turn-by-turn record of one specific conversation |
| Case Memory | Facts, decisions, and evidence accumulated across every conversation and action within one case |
| Citizen Memory | Facts about a citizen that persist across separate cases, where the citizen has consented to that persistence |
| Officer Memory | An officer's own notes, decisions, and review actions, distinct from the citizen-facing record |
| Legal Memory | The legal facts and citations relied upon, governed jointly with `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` and `LEGAL_CITATION_SPECIFICATION.md` |
| Organizational Memory | Facts about how a given government body or office handles matters, not tied to any one citizen or case |
| Audit Memory | The immutable record of what happened and why, governed by the project's existing audit discipline |
| Temporary Memory | Held only for the duration of an active conversation or session; not retained once that conversation closes unless promoted into a longer-lived domain |
| Permanent Memory | Retained for the life of the case and beyond, per this project's Knowledge Preservation discipline |
| Retired Memory | No longer active or consulted in ordinary operation, but preserved, never deleted, for audit and historical reconstruction |

A single fact may exist in more than one domain at once — a citizen's stated date of birth is simultaneously Conversation Memory (where it was said), Case Memory (that it is now part of this case), and potentially Citizen Memory (if the citizen consents to it persisting into future cases). The domains describe roles a fact plays, not exclusive bins.

## 05. Conversation Lifecycle

```
Started → Active ⇄ Paused
              │
              ├──→ Escalated ──→ Active (on resolution)
              │
              ▼
           Closed → Archived
                        │
                        ├──→ Reopened ──→ Active
                        │
                        ▼
                     Retired (terminal)
```

- **Started** — a citizen or officer begins a new exchange; a Conversation object (Chapter 06) is created and associated with a case.
- **Active** — turns are being exchanged; memory objects are created and updated as the conversation proceeds.
- **Paused** — the conversation is temporarily suspended without having reached any resolution — the citizen stepped away, or the exchange is waiting on something outside the conversation itself — and may return to Active at any time without having gone through Closed.
- **Escalated** — the conversation has reached a point requiring human handling per `GOVERNMENT_CONSTITUTION.md` and the escalation triggers defined elsewhere in this project; it returns to Active once the escalation is resolved, carrying forward whatever the escalation added to memory.
- **Closed** — the immediate exchange has concluded with some resolution reached, but the conversation remains available for reopening; nothing is summarized away yet.
- **Archived** — the conversation is retained in full per this project's permanence discipline, no longer expected to be reopened in the ordinary course of the case, but never deleted.
- **Reopened** — a closed or archived conversation resumes because new information or a new need arose; the original record is preserved in full, and new turns are appended, never inserted into or overwriting the original sequence.
- **Retired** — a terminal state, reachable only from Archived: the conversation is no longer relevant to any active or foreseeable case activity; still preserved permanently for audit, but no longer surfaced in ordinary case review.

## 06. Conversation Object Model

Thirteen object types make up the vocabulary of a conversation in this Specification:

| Object | Description |
|---|---|
| Conversation | The overall exchange, containing an ordered sequence of Turns |
| Turn | One complete round of exchange — typically one party's contribution and the response to it |
| Message | The smallest unit of communicated content within a Turn |
| Participant | A party to the conversation — a citizen, an officer, or a system component acting on behalf of one — identified consistently across every Turn they appear in |
| Observation | A fact noted during a conversation, at whatever Memory Trust level (Chapter 09) it currently holds |
| Question | Something asked, by either the citizen or the system, that has not yet been answered |
| Answer | A response to a specific Question, linked to it by Reference |
| Decision | A determination reached during or as a result of a conversation, attributed to whichever Participant or system component reached it |
| Evidence | A fact or document referenced in support of a Decision or Observation |
| Reference | A pointer from one object to another, or to an object outside this Specification (a document, a citation, a rule) |
| Summary | A condensed representation of a Conversation or a span of it, per Chapter 10 |
| Action | Something done as a result of the conversation — a case transition, a notification, a document request |
| Resolution | The outcome that closes a Question, a Decision, or an entire Conversation |

Every object carries enough Reference structure to trace it back to the Conversation, Turn, and Participant it originated from — an object with no traceable origin is not a valid object under this Specification. Context — the set of facts assumed to be in effect at a given point — is not a separate object in this model; it is a property of Memory Domains and their propagation, governed entirely by Chapters 07 and 08.

## 07. Memory Lifecycle

Distinct from the Conversation Lifecycle (Chapter 05): the Conversation Lifecycle governs the conversation as a whole; the Memory Lifecycle governs each individual remembered fact, independent of whether the conversation that produced it is still Active, Closed, or Archived.

```
Created → Updated → Verified → Referenced → Superseded → Archived → Retired
```

- **Created** — a fact enters memory for the first time, as an Observation or Evidence object, at whatever Memory Trust level (Chapter 09) it starts at.
- **Updated** — the fact's representation is refined (for example, normalized or clarified) without its underlying claim changing.
- **Verified** — the fact undergoes independent confirmation, per Chapter 11's human review or an already-Verified source from Volume 16 or Volume 44. This is a lifecycle *stage* — a thing that happened to the fact at a point in time — distinct from Chapter 09's Memory Trust *level*, which is the fact's current epistemic status; the two move together but are not the same concept, mirroring the Verification Status / Confidence Level separation already established in `LEGAL_CITATION_SPECIFICATION.md` Section 3.
- **Referenced** — the fact is read and relied upon by another object or by a component in Chapter 12; being Referenced does not itself change the fact's trust level.
- **Superseded** — the fact is replaced by newer, conflicting information; it is retained, not deleted, and marked Superseded so its history remains visible.
- **Archived** — the fact is retained in full per this project's permanence discipline, no longer expected to change in the ordinary course of the case.
- **Retired** — the fact is no longer relevant to any active reasoning, but preserved permanently for audit.

**Nothing is silently deleted.** Every stage transition is itself recorded in Audit Memory (Chapter 04); a fact does not disappear when it is Superseded, Archived, or Retired — it becomes less prominent, never absent.

## 08. Context Propagation

Context flows outward through the Memory Domains (Chapter 04) in one direction only:

```
Conversation → Case → Citizen → Organization
```

A fact established at the Conversation level becomes available as Case context for every later conversation in the same case. A fact promoted to Citizen Memory becomes available across that citizen's separate cases, where consented to. A fact generalized into Organizational Memory (a pattern true of how an office handles matters, not of any one citizen) never flows back down and never attaches itself to an individual citizen's record.

Three rules govern every propagation, at every level:

- **No duplication** — a fact is recorded once, at the domain where it actually belongs, and Referenced by every later point that needs it; it is never re-recorded as a new, independently tracked fact merely because it was mentioned again. A citizen restating a fact already on record is treated as a potential confirmation (Chapter 09), not as a second, independent fact.
- **No contradiction** — a fact is never propagated to a broader domain (Case, Citizen, Organization) while a known, unresolved contradiction about it exists at a narrower one; the contradiction must be flagged and handled (Chapter 13) before the fact is treated as settled at the broader level.
- **No hidden transformation** — a fact's meaning is never altered in the course of propagating outward; only its Memory Lifecycle stage (Chapter 07) or Trust Level (Chapter 09) may change, and only through a recorded event, never as a silent side effect of moving between domains.

## 09. Memory Trust Levels

Six levels, describing how much a given fact in memory can be relied upon:

- **Unknown** — no memory exists yet on this point; there is nothing to rely on, and nothing is assumed in its place.
- **Observed** — the fact was stated or noted once, in a single conversation, with no corroboration yet.
- **Confirmed** — the fact has been restated consistently, across more than one turn or by more than one Participant, without yet being checked against an authoritative source outside the conversation itself.
- **Verified** — the fact has been independently checked against an authoritative source — a human review (Chapter 11), a Verified-level document field (`OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` Chapter 10), or a Verified legal citation (`LEGAL_CITATION_SPECIFICATION.md` Chapter 4). As with those two Specifications, **this level is never reached through repetition alone** — a fact repeated ten times by the same citizen in the same conversation is still only Confirmed, not Verified, because repetition and independent confirmation are not the same thing.
- **Superseded** — the fact was once Confirmed or Verified, but has since been replaced by newer, conflicting information; the earlier fact is retained, not deleted, and marked Superseded so its history remains visible.
- **Retired** — the fact is no longer relevant to any active reasoning, but is preserved permanently for audit, exactly like a Retired conversation (Chapter 05) or a Retired memory fact (Chapter 07).

**Propagation rule:** where a Decision or Resolution (Chapter 06) depends on more than one Observation, its own trust level is the minimum of the trust levels it depends on — the same minimum-based propagation already established in `OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md` Chapter 10, `AI_REASONING_PIPELINE_SPECIFICATION.md` Stage 09, `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` Section 5, and `RULE_ENGINE_SPECIFICATION.md` Section 5. This Specification does not introduce a fourth aggregation rule into a project that already has one consistent rule.

## 10. Conversation Summaries

- **Purpose** — a Summary exists to give a later point in a case fast access to condensed Context (Chapter 08) without needing to replay an entire original Conversation.
- **Creation** — a Summary is created at a natural boundary in the Conversation Lifecycle (Chapter 05), typically at Closed or Archived, or when a Conversation grows long enough that later Turns need condensed context rather than the full original sequence.
- **Updates** — a Summary is updated whenever a Conversation is Reopened and new Turns are added, or whenever a fact it relied on is Superseded (Chapters 07, 09); a Summary is never left silently stale once the memory it summarizes has changed.
- **Traceability** — every statement in a Summary carries a Reference (Chapter 06) back to the specific Turn or Turns it condenses, so a human can always expand a summarized claim back to its original source.
- **Original conversation always remains authoritative.** A Summary is a convenience for faster context propagation; it is never treated as a substitute for, or a more current version of, the full original Conversation record, which is retained permanently regardless of how many Summaries are built on top of it.

## 11. Human Review

- **Citizen correction** — a citizen may review what memory holds about their own conversation or case and dispute or correct it; a correction is recorded as a new Observation with its own Memory Trust level, never as a silent overwrite of the original.
- **Officer correction** — an officer may correct Case Memory or Officer Memory directly, with the same non-destructive recording rule: the prior fact is marked Superseded (Chapter 09), not erased.
- **Administrator correction** — a systemic error affecting memory across multiple cases (for example, a misconfigured context propagation rule) is corrected through an explicit administrative action, itself recorded in Audit Memory, never through a quiet data patch.
- **Audit preservation** — every correction, by any party, is permanently retained in Audit Memory alongside the fact it corrected, so the full history of what was believed, when, and why it changed remains reconstructable indefinitely.
- **Evidence retention** — the Evidence (Chapter 06) underlying a corrected fact is never discarded when the fact is corrected; both the original and the correction remain available, so a reviewer can judge not only what was corrected but why the original determination seemed reasonable at the time.

## 12. Interfaces

This Specification governs what memory is and how trustworthy it is; it does not itself reason about eligibility, documents, or law. It hands structured memory to other components through defined interfaces only.

Output is provided to:

- **Case Management** — Case Memory is the durable record a case is built from across its entire lifecycle.
- **Rule Engine** (`RULE_ENGINE_SPECIFICATION.md`, Vol. 14) — Case Memory facts serve as rule inputs, each carrying its Memory Trust level.
- **Reasoning Pipeline** (`AI_REASONING_PIPELINE_SPECIFICATION.md`, Vol. 41) — Conversation and Case Memory are the context every reasoning stage operates over.
- **Document Intelligence** (`OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md`, Vol. 16) — extracted document facts are received as Evidence objects (Chapter 06) and folded into Case Memory at whatever Memory Trust level they carry.
- **Knowledge Base** (`LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md`, Vol. 15) — Legal Memory is governed jointly with that Specification's knowledge-object lifecycle.
- **Audit** — every memory object creation, update, and correction writes an audit event.
- **Notification** — an Action or Resolution (Chapter 06) may trigger a citizen- or officer-facing notification.

**Never communicate directly with AI models.** Nothing in this Specification requires, presumes, or is implemented by a specific conversational or generative model; memory is structured data with a defined lifecycle and trust level, handed to and from other components exactly as any other structured data in this architecture is — never through an implicit or informal channel to a generative reasoning component.

## 13. Failure Handling

- **Lost conversation** — a case references a Conversation that cannot be located; this is recorded as a Broken Reference (below), and the case proceeds on the memory that does remain, never by assuming what the missing conversation might have contained.
- **Broken references** — a Reference (Chapter 06) points to an object that no longer resolves; the Reference is retained and flagged as broken, never silently dropped, so a human reviewer knows a link existed even if its target cannot currently be found.
- **Contradictory memories** — two Observations of the same fact disagree; both are retained, flagged as contradictory, and never silently resolved by picking one — resolution requires Chapter 11's human review or a subsequent Verified-level fact that supersedes both, consistent with Chapter 08's no-contradiction propagation rule.
- **Duplicate conversations** — the same exchange appears to have been recorded twice; both are retained, one marked as the duplicate of the other, never merged in a way that could lose a Turn unique to either.
- **Partial history** — a Conversation record ends abruptly, mid-exchange; it is marked incomplete rather than treated as if it reached a natural Resolution.
- **Missing context** — a point in a Conversation is reached where expected Case, Citizen, or Organizational context (Chapter 08) is absent; the gap is recorded explicitly as Unknown (Chapter 09), never filled with an assumption per Chapter 03.
- **Corrupted summaries** — a Summary (Chapter 10) is found to no longer accurately condense its source Conversation (for example, after an unrecorded edit outside this Specification's own update rule); the Summary is flagged and rebuilt from the original Conversation record, which remains authoritative throughout.

## 14. Trust by Design Mapping

Every architectural decision in this Specification traces to one or more of `TRUST_CONSTITUTION.md`'s six mechanisms:

| Trust Mechanism | How this Specification satisfies it |
|---|---|
| Legal Citation | Legal Memory (Chapter 04) is governed jointly with `LEGAL_CITATION_SPECIFICATION.md`, so a citation held in memory is never a lesser-quality copy of the citation standard elsewhere in this project. |
| Human Escalation | Chapter 11 is the permanent, structural point at which a human corrects memory; the Escalated conversation state (Chapter 05) and Chapter 13's failure paths both route to it rather than to silent auto-resolution. |
| Auditability | Chapter 12's interfaces, Chapter 11's corrections, and Chapter 07's "nothing is silently deleted" rule all write to Audit Memory (Chapter 04) at every step; nothing in this Specification happens invisibly. |
| Traceability | Chapter 06's Reference object and Chapter 10's summarization rules preserve a path from any condensed or reused fact back to its originating Turn and Participant. |
| Evidence | Chapter 06's Evidence and Observation objects, Chapter 09's Memory Trust scale, and Chapter 11's Evidence retention rule ensure every remembered fact carries an honest, permanently available account of how well-supported it is. |
| Consistency | Chapter 09's single, project-wide minimum-based trust propagation rule, and Chapter 08's three propagation rules (no duplication, no contradiction, no hidden transformation), ensure memory behaves the same way regardless of which citizen, case, or conversation it belongs to. |

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
- `LEGAL_CITATION_SPECIFICATION.md` (Volume 44)

A change to any of these eleven documents that touches conversation, context, evidence, or trust must be checked against this Specification for continued consistency, and vice versa.

## 16. Acceptance Criteria

This Specification remains valid only if every rule in it still holds after any of the following changes, individually or in combination:

1. **AI Model** — no principle depends on a specific conversational or generative model's capability, provider, or generation.
2. **Programming Language** — no principle presumes a specific implementation language.
3. **Database** — no principle presumes a specific storage engine or schema technology.
4. **Framework** — no principle presumes a specific software framework.
5. **Cloud** — no principle presumes a specific hosting provider or infrastructure.
6. **Storage** — no principle presumes a specific file or object storage mechanism.
7. **Conversation Engine** — no principle presumes a specific mechanism for conducting or routing a conversation.
8. **Organization** — no principle presumes a specific government office structure; Organizational Memory (Chapter 04) is defined generically enough to hold whatever structure actually exists.
9. **Government Platform** — no principle presumes integration with any specific government system, portal, or national platform; this Specification describes what memory must be and how trustworthy it must be, not which external system eventually consumes it.

A future reviewer who finds a single rule in this document that would stop making sense after any one of these nine substitutions has found a defect in this Specification, to be corrected at that time.

---

## Architecture Summary

This Specification defines memory as a disciplined record, never a creative or predictive faculty: ten Memory Domains (Chapter 04) spanning from Temporary to Permanent, an eight-state Conversation Lifecycle with explicit Paused and Escalated states (Chapter 05), a thirteen-object Conversation Object Model built around Participants rather than a standalone Context object (Chapter 06), a Memory Lifecycle for individual facts kept deliberately distinct from the Conversation Lifecycle (Chapter 07), one-directional Context Propagation governed by three absolute rules — no duplication, no contradiction, no hidden transformation (Chapter 08) — a six-level Memory Trust scale that reserves its Verified level for independent confirmation rather than repetition (Chapter 09), traceable Summaries that never outrank the original record (Chapter 10), a five-part permanent human-correction path (Chapter 11), seven defined interface consumers with no direct AI-model dependency (Chapter 12), and seven named failure categories (Chapter 13), each routed to human review rather than silent resolution.

## Memory Trust Levels

`Unknown → Observed → Confirmed → Verified → Superseded → Retired` — six levels; Verified is reachable only through independent confirmation (a human review, or an already-Verified fact from Volume 16 or Volume 44), never through mere repetition within a single conversation, and is deliberately distinct from the Memory Lifecycle's own "Verified" stage (Chapter 07), which records the event rather than the current status.

## Known Risks

- **The Memory Lifecycle (Chapter 07) and Memory Trust Levels (Chapter 09) both use the term "Verified," for a stage and a level respectively** — this Specification deliberately keeps them distinct, mirroring `LEGAL_CITATION_SPECIFICATION.md`'s Verification Status / Citation Level separation, but a future implementation must be careful never to collapse the two into a single field, or the distinction this chapter pair exists to preserve is lost silently.
- **No existing schema field has been identified as the home for Case Memory, Conversation Memory, or the thirteen Conversation Objects of Chapter 06** — this remains a first-implementation gap carried forward from Version 1.0, not newly introduced or newly resolved by this restructuring.
- **The relationship between this Specification's Case Memory and the existing Memory Subsystem mediator (`src/lib/memory/case-memory.ts`) built during Sprint 01A/01A.1 has not yet been reconciled** — that mediator currently enforces citizen/officer read isolation only, and has not been checked against this document's Memory Domains, Conversation Object Model, Memory Lifecycle, or Memory Trust Levels.
- **The Paused and Escalated conversation states (Chapter 05) are new in this revision** — no existing code path currently distinguishes either from Active or Closed; a future implementation must confirm these states are representable before this Specification's lifecycle can be considered implementable as written.

## Recommendation

Reconcile the existing `src/lib/memory/case-memory.ts` mediator against this Specification's Memory Domains (Chapter 04), Conversation Object Model (Chapter 06), Memory Lifecycle (Chapter 07), and Memory Trust Levels (Chapter 09) as a first implementation task — confirming which domains and objects it currently serves, and whether its underlying state can represent the newly added Paused and Escalated conversation states — before authoring the next Volume, so the gaps this Specification's Known Risks flag are closed deliberately rather than discovered later during real integration.
