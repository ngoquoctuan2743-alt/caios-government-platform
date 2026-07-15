---
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
---

# Glossary

Definitions kept consistent with the existing constitutional documents (`AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`) — this glossary does not redefine those terms, it restates them for readers of the Knowledge Pack who may not have read the constitutional set.

**Citizen** — the person the entire system exists to serve; the one whose administrative case is being prepared, never merely "a user."

**Procedure** — a specific, named administrative service a citizen can request (e.g., `CCCD_RENEWAL`), defined by its own eligibility rules, required documents, and legal basis, but instantiating the same universal workflow every other procedure does.

**Case** — one citizen's specific instance of going through a procedure, from first contact to resolution; the unit everything else (checklist, escalation, audit trail) attaches to.

**Workflow** — the fixed sequence of states a Case moves through (Draft → Preparing → ... → Archived), enforced by the Orchestration Subsystem so a case can never skip or invent a state.

**Checklist** — the personalized, complete list of documents and conditions a specific citizen's case requires, generated from the matched procedure and the citizen's own facts — never a generic, one-size-fits-all form.

**Officer** — the accountable government professional who reviews AI-prepared cases and makes any decision that legally requires a human — never replaced by the AI, only supported by it.

**Legal Citation** — a specific, dated, named legal source (law, article, clause) backing a claim about what the law requires; a claim without one is not permitted to be stated as fact.

**Eligibility** — whether a specific citizen meets a procedure's legal requirements, determined deterministically against their actual facts, never assumed or guessed.

**Escalation** — the structured handoff of a case from AI preparation to human officer judgment, triggered by defined conditions (low confidence, legal ambiguity, citizen request, and others) — never a fallback used only when something breaks.

**Risk** — a flagged factor (inconsistency, expiring document, anomaly) that may affect a case's outcome, surfaced for human review and never acted on automatically.

**Knowledge Source** — an entry in this Knowledge Pack (a procedure, document definition, or citation) that some future AI subsystem reads from — deliberately structured, versioned, and marked with a confidence level rather than treated as an implicit, unversioned assumption.

**Confidence Level** — an explicit, stated indicator (High / Medium / Low) of how verified a given piece of knowledge is, attached to every entry in this pack so nothing is silently treated as more certain than it actually is.
