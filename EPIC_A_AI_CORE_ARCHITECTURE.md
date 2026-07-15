# EPIC_A_AI_CORE_ARCHITECTURE.md
### Epic A — AI Core Architecture — Volume 38
**Version:** 1.0
**Status:** Approved
**Class:** Epic (per **ADR-0010**, the first document of this new class) — an architectural blueprint parenting multiple child Specifications, ADRs, and Knowledge Base entries. Not a Constitution: it establishes no new principle, only structure. Not a Specification: it is deliberately one level more abstract than any single buildable design, precisely so that several Specifications can be produced under it coherently rather than independently.
**Precedence:** Subordinate to every Constitution; superordinate to every Specification, ADR, and Knowledge Base entry produced under it (Chapter 13). Numbered Volume 38, the next sequential slot after Volume 37, per ADR-0009/0010.
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Volume 37, whose Chapter 6 AI Subsystems this Epic elaborates in full, without contradicting it).
**Ownership:** Owner — Chief AI Architect · Architect — Enterprise Solution Architect / GovTech Platform Architect / AI Systems Designer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | This revision | Architecture Review | Initial authorship as the first document of the new Epic class (ADR-0010), numbered Volume 38. |

---

## Preface

`SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Volume 37) placed the twelve agents of `AI_OPERATING_SYSTEM.md` into seven architectural subsystems in a single chapter — enough to establish the shape, not enough to actually build against. Six planned Specifications already sit in `MASTER_INDEX.md`'s Phase C waiting for exactly that depth: the Rule Engine, the Legal Knowledge ingestion pipeline, OCR and Document Intelligence, Escalation Operations, the Analytics dashboard, and Agent Orchestration itself. Written independently, six specifications risk six subtly different interpretations of the same subsystem boundary. This Epic exists so they don't have to guess — it is the one shared blueprint all six, and everything the AI Core produces after them, answer to.

---

## 1. Epic Overview

Epic A defines the complete architecture of the **AI Core** — the orchestrated set of subsystems responsible for every act of reasoning, verification, and preparation CAIOS performs on a citizen's case, from the moment a goal is expressed to the moment a case is ready for a human decision. It is the parent blueprint for every AI-related Specification the platform will ever produce, present or future.

## 2. Business Objectives

- Deliver Phase 1 (`MASTER_INDEX.md` Volume 04 §10) on a single, coherent AI architecture rather than six independently-designed subsystems that happen to sit next to each other.
- Reduce the risk that a future AI Specification quietly reintroduces a violation of `GOVERNMENT_CONSTITUTION.md` Chapter 3's human-authority boundary, by giving every future Specification the same pre-verified structural guardrails to build inside.
- Make the AI Core's correctness demonstrable as a whole — auditable, traceable, and trust-integrated — rather than as an assembly of parts each separately claiming compliance.
- Provide a stable parent structure so that adding a new AI capability in the future (`AI_OPERATING_SYSTEM.md`'s "Future Agents") extends this Epic rather than requiring a new, competing architecture.

## 3. Architectural Scope

**In scope:** the structural design of the AI Core — subsystem boundaries, information flow, decision flow, escalation flow, legal reasoning boundaries, human oversight checkpoints, auditability hooks, and how trust mechanisms are architecturally embedded rather than bolted on.

**Out of scope, deliberately deferred to child Specifications:** the specific rule-authoring mechanism (Volume 14), the specific legal corpus ingestion pipeline (Volume 15), the specific OCR confidence-scoring technique (Volume 16), the specific escalation SLA tooling (Volume 17), the specific analytics computation (Volume 18), and the specific orchestration mechanism (Volume 19) — none of which this Epic prescribes, all of which this Epic constrains.

## 4. AI Capability Map

The capabilities the AI Core provides, independent of which subsystem implements them:

- **Understanding** — turning a citizen's plain-language goal into a structured intent and matched procedure.
- **Legal Reasoning** — determining what current law actually requires, always cited.
- **Verification** — checking documents and eligibility facts deterministically against requirements.
- **Risk Assessment** — flagging rejection-risk and anomalies for human review, never for automated action.
- **Preparation** — assembling a complete, personalized checklist and readiness recommendation.
- **Communication** — translating every other capability's output into plain, honest, citizen-appropriate language.
- **Memory** — remembering what a case and citizen have already established, within the boundaries `AI_OPERATING_SYSTEM.md` Chapter 4 sets.
- **Escalation** — recognizing the limits of every capability above and hosting a clean handoff to a human.
- **Analytics** — observing the AI Core's own aggregate performance without ever exposing an individual case.

## 5. AI Subsystem Map

Elaborating `SYSTEM_ARCHITECTURE_SPECIFICATION.md` Chapter 6, without contradicting it:

| Subsystem | Capability Owned | Constitutional Agent(s) |
|---|---|---|
| Orchestration | Sequencing every other subsystem against the workflow state machine | Planner Agent |
| Legal Reasoning | Legal Reasoning, always citation-gated | Legal Agent, Citation Agent |
| Document Intelligence | Verification | OCR Agent, Validation Agent |
| Risk & Analytics | Risk Assessment, Analytics | Risk Agent, Analytics Agent |
| Communication | Understanding (citizen-facing), Communication | Citizen Agent, Notification Agent |
| Escalation | Escalation | Escalation Agent |
| Memory | Memory | Memory Agent |

No subsystem here is new; this table is the same seven from Volume 37, retained exactly, with the Capability Map (Chapter 4) layered on top so a reader can approach the AI Core from either "what it does" or "how it's structured" and land on the same architecture either way.

## 6. Interaction Model

```
Citizen Goal
     │
     ▼
Communication Subsystem  ──(structured intent)──►  Orchestration Subsystem
                                                          │
                    ┌─────────────────────────────────────┼─────────────────────────────────┐
                    ▼                                     ▼                                 ▼
          Legal Reasoning Subsystem          Document Intelligence Subsystem       Risk & Analytics Subsystem
                    │                                     │                                 │
                    └─────────────────────┬───────────────┴─────────────────────────────────┘
                                          ▼
                                Orchestration Subsystem (synthesis)
                                          │
                              ┌───────────┴───────────┐
                              ▼                       ▼
                    Communication Subsystem   Escalation Subsystem
                      (citizen-facing)          (human-facing)
```

Only the Orchestration Subsystem is permitted to call more than one other subsystem in sequence. No subsystem calls another peer-to-peer outside this pattern — this is what keeps the interaction model auditable as a whole rather than as an unmanaged mesh, and what makes `MASTER_INDEX.md` §8's AI Consumption Order actually enforceable at the point where an external model is invoked.

## 7. Decision Model

Every point in the interaction model above resolves to exactly one of three outcomes, never a fourth:

- **Verified fact** — a claim or status backed by deterministic evaluation or a valid citation, eligible to be shown to a citizen or officer as established.
- **Recommendation** — a conclusion the AI Core is confident in but that requires human sign-off before it carries any legal weight, per `GOVERNMENT_CONSTITUTION.md` Chapter 3.
- **Escalation** — a point where confidence falls below threshold, a legal or risk trigger fires, or the situation is unrecognized, per `AI_OPERATING_SYSTEM.md` Chapter 9 and `TRUST_CONSTITUTION.md` Chapter 5.

No subsystem is permitted to produce a fourth kind of output that blurs these three — a "confident-sounding guess" is not a category this Decision Model has room for.

## 8. Human-in-the-Loop Model

```
Every subsystem output
        │
        ▼
   Confidence / Rule Check
        │
   ┌────┴─────┐
   ▼          ▼
Above       Below
Threshold   Threshold
   │          │
   ▼          ▼
Recommendation   Escalation Subsystem
   │                    │
   ▼                    ▼
Officer Review    Context Package → Officer
(Chapter 4,             (Chapter 4,
GOVERNMENT_CONSTITUTION) GOVERNMENT_CONSTITUTION)
   │                    │
   └────────┬───────────┘
            ▼
    Human Decision (binding)
```

Every path through the AI Core terminates at a human checkpoint before anything becomes binding — there is no path in this model, by design, that reaches a citizen-facing final outcome without passing through this gate. This is the architectural instantiation of the permanent boundary in `GOVERNMENT_CONSTITUTION.md` Chapter 3 and `PRODUCT_CONSTITUTION.md` Chapter 12: not a policy the AI Core is asked to honor, but a shape it cannot structurally bypass.

## 9. Trust Integration

Each of `TRUST_CONSTITUTION.md` Chapter 4's Trust by Design mechanisms is embedded as a specific checkpoint in the models above, not as a separate concern layered on afterward:

- **Legal Citation** is enforced at the Legal Reasoning Subsystem's only output gate (Chapter 6, 7).
- **Human Escalation** is the mandatory terminal gate in the Human-in-the-Loop Model (Chapter 8).
- **Auditability** is emitted by every subsystem at every transition in the Interaction Model (Chapter 6), not sampled or added selectively.
- **Traceability** follows directly from the Decision Model's three-outcome discipline (Chapter 7) — every case's path through the AI Core is reconstructable exactly because it can only have taken one of three shapes at each step.
- **Evidence** and **Consistency** are properties of the Legal Reasoning and Document Intelligence subsystems' deterministic and citation-gated design, never left to a subsystem's discretion.

## 10. Security Considerations

- Each subsystem operates under its own least-privilege identity, per `SYSTEM_ARCHITECTURE_SPECIFICATION.md` Chapter 9 — the Document Intelligence Subsystem, for instance, has no path to invoke the Escalation Subsystem directly, only through Orchestration.
- Retrieved and citizen-supplied content is treated as data throughout every subsystem, never as instruction, per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 8 — this is an architectural property of how the Legal Reasoning and Communication Subsystems parse input, not a per-prompt discipline left to chance.
- The Memory Subsystem is the sole path to any citizen or case data for every other subsystem — no subsystem maintains its own side-channel copy of citizen data, which is what makes cross-citizen isolation (`AI_OPERATING_SYSTEM.md` Chapter 4) enforceable at a single point rather than needing to be independently correct in six places.

## 11. Dependencies

Volumes 01, 02, 03, 05, 06, 07, 09, 36, 37 — every Constitution this Epic's architecture must satisfy, plus the System Architecture Specification whose subsystem placement it elaborates.

## 12. ADR Candidates

Decisions this Epic anticipates but does not itself make — each to be recorded as its own ADR once the relevant child Specification reaches that point:

- The specific orchestration control-flow pattern (explicit state graph vs. rule-based dispatcher) — candidate for an ADR under Volume 19.
- The confidence-threshold calibration methodology for the Legal Reasoning and Risk subsystems — candidate for an ADR under Volumes 14/15.
- The specific memory persistence and retention-expiry enforcement mechanism — candidate for an ADR under Volume 20.
- The specific mechanism by which the Communication Subsystem selects language/channel per citizen — candidate for an ADR under Volume 13.

## 13. Future Specifications Produced by This Epic

This Epic formally adopts the following already-planned `MASTER_INDEX.md` Phase C volumes as its children, effective immediately — each must now trace to this Epic's subsystem map and interaction model, not design its own independently:

- **Volume 14** — Rule Engine Specification (Document Intelligence / decision-model deterministic evaluation).
- **Volume 15** — Legal Knowledge Base & RAG Ingestion Specification (Legal Reasoning Subsystem).
- **Volume 16** — OCR & Document Intelligence Specification (Document Intelligence Subsystem).
- **Volume 17** — Escalation & Human-in-the-Loop Operations Manual (Escalation Subsystem, Chapter 8's model).
- **Volume 18** — Analytics & AI Quality Dashboard Specification (Risk & Analytics Subsystem).
- **Volume 19** — Conversation & Agent Orchestration Specification (Orchestration Subsystem, Chapter 6's model).

---

## Closing Note

Epic A is the first document of a new class, and its purpose is proven not by its own content but by whether Volumes 14 through 19 — written after it — turn out to agree with each other. Every one of those six Specifications is now accountable to the subsystem map, interaction model, decision model, and human-in-the-loop model defined here, not to its own independent judgment of what the AI Core should look like.
