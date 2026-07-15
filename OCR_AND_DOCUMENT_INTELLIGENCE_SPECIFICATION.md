# OCR_AND_DOCUMENT_INTELLIGENCE_SPECIFICATION.md
### The OCR & Document Intelligence Specification — Volume 16
**Version:** 2.0
**Status:** Approved
**Class:** Specification — architecture only. No OCR technology, cloud vision service, AI model, embedding technique, vector store, software framework, or programming language is named or implied anywhere in this document; every principle here must remain true regardless of which such technology eventually implements it, and regardless of which such technology replaces it later.
**Precedence:** Subordinate to every Constitution. Supplies the OCR Agent's concrete design within the Document Intelligence Subsystem (`EPIC_A_AI_CORE_ARCHITECTURE.md` Ch. 5) — the extraction half of that subsystem, distinct from and feeding into (never replacing) the Validation Agent's reasoning already specified in `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42). Does not modify `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42), or `LEGAL_CITATION_SPECIFICATION.md` (Vol. 44).
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Vol. 37), `EPIC_A_AI_CORE_ARCHITECTURE.md` (Vol. 38), `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42), `LEGAL_CITATION_SPECIFICATION.md` (Vol. 44), `knowledge/documents/`.
**Ownership:** Owner — Chief AI Architect · Architect — Document Intelligence Designer · Reviewer — Technical Steering Committee + AI Governance Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | Prior revision | Architecture Review | Initial authorship, filling `MASTER_INDEX.md`'s Volume 16 slot — the label matched the reserved purpose exactly, no numbering resolution needed. |
| 2.0 | This revision | Architecture Review | **MAJOR:** complete restructuring into 16 chapters. Document Lifecycle expanded to a 10-state model with an explicit Rejected exception branch. Document Categories generalized from 7 knowledge-pack-specific types to 10 durable categories. Confidence Model expanded from the project's four-level field scale into a five-level document-status scale that adds **Verified** as a human-attested state reachable only through Chapter 11, never through extraction alone. Added a dedicated Architecture Principles chapter, a dedicated Interfaces chapter, and a dedicated Trust by Design Mapping chapter. Dependencies and companion documents reviewed against the new content and confirmed unchanged. |

---

## Preface

`DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` was careful to say what it is not: OCR. This is the Specification for what OCR actually is in this system — the component that turns a photographed or scanned document into structured, evidenced facts, and nothing more. It never decides whether those facts satisfy a requirement, whether a document is genuine, or whether a citizen is eligible for anything. It extracts evidence. Every judgment about what that evidence means happens elsewhere, in components already specified. This revision restates that boundary more precisely and extends the lifecycle, category, and confidence model so the Specification can stand on its own for decades, independent of whatever specific recognition technology, artificial intelligence model, or software platform happens to implement it in any given year.

---

## 01. Purpose

Define the technology-independent architecture for turning an uploaded document into trusted, structured information that can be consumed by the Rule Engine, the Document Gap Analysis Engine, the AI Reasoning Pipeline, the Legal Citation Specification, and any future document-intelligence implementation — without that consuming component ever needing to know how the extraction happened.

This is not an implementation document. It defines what must be true of any implementation, not how any implementation is built.

## 02. Scope

**In scope:** the lifecycle a document moves through from upload to archive; the categories of document this subsystem recognizes; how an unknown document is classified; the conceptual model of what a "field" is; how an extracted field is validated and normalized; how confidence is assigned and who is allowed to raise it; how a human re-enters the loop; what this subsystem hands to other components and what it never does directly; how failure is handled; and how every decision here maps back to Trust by Design.

**Out of scope, by design:** eligibility evaluation (`RULE_ENGINE_SPECIFICATION.md`), gap and conflict reasoning (`DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md`), legal interpretation and citation (`LEGAL_INTELLIGENCE_CONSTITUTION.md`, `LEGAL_CITATION_SPECIFICATION.md`), and the final determination of whether a document is acceptable — which is always a human officer's decision, per `GOVERNMENT_CONSTITUTION.md` Chapter 3. This subsystem answers "what does this document say, and how sure are we," never "is this good enough."

## 03. Architecture Principles

- **Document Intelligence never decides legal meaning.** It only extracts evidence. Legal interpretation belongs to `LEGAL_INTELLIGENCE_CONSTITUTION.md` and the components that operationalize it — this subsystem has no opinion on what a law requires.
- **Extraction is evidence production, not evidence judgment.** A field extracted at High confidence is still only a claim about what the document appears to say; whether that claim satisfies a requirement is a downstream question this subsystem never answers.
- **Every output is traceable to a source.** A structured field that cannot be traced back to a specific uploaded document, at a specific point in its lifecycle, is not a valid output of this subsystem.
- **Confidence is honest, not optimistic.** An unreadable or ambiguous value is recorded as unreadable or ambiguous — it is never silently rounded up to a plausible-looking value.
- **Nothing in this subsystem is a final authority.** Every extracted fact remains open to human correction (Chapter 11) for the life of the case.
- **The subsystem is replaceable in whole or in part without changing what it owes the rest of the system.** Any component implementing this Specification may be replaced by an entirely different one, built on entirely different technology, without any consuming component noticing, provided the replacement still honors this document's lifecycle, categories, model, and confidence rules.

## 04. Document Lifecycle

A document moves through the following states. Every state transition is recorded in the audit trail; no state is ever skipped silently.

```
Uploaded → Detected → Classified → Extracted → Validated → Normalized
    → Stored → Referenced → Archived

                              ↘ Rejected (exception branch, reachable
                                 from Detected, Classified, Extracted,
                                 or Validated — never from Stored onward)
```

- **Uploaded** — a citizen or officer provides an image or scan; the file is received and associated with a case and a checklist item, but nothing about its content is yet known.
- **Detected** — the subsystem confirms a legible, processable document is present at all (as opposed to a blank page, an unrelated image, or an unreadable file). Detection answers only "is there something here to work with," not what that something is.
- **Classified** — the document is assigned to one of the categories in Chapter 05, with a confidence level on that classification itself (Chapter 06).
- **Extracted** — fields are read from the document according to the conceptual model in Chapter 07, each with its own confidence.
- **Validated** — the extraction is checked for internal coherence per Chapter 08: this is structural validation only, never a judgment about whether the document satisfies any legal requirement.
- **Normalized** — extracted values are converted to the canonical forms defined in Chapter 09, without altering what they mean.
- **Stored** — the structured result, at this point a durable Document Object (Chapter 07), persists against the case.
- **Referenced** — other components (Chapter 12) read this structured result as an input to their own reasoning.
- **Archived** — the document and its extraction are retained permanently, per this project's Knowledge Preservation discipline; nothing is ever deleted, only superseded and marked retired if a citizen re-uploads a corrected version.
- **Rejected** — an exception branch, not a terminal success state. A document is Rejected when it cannot proceed — nothing legible was Detected, it cannot be Classified into any known or plausible category, extraction produced nothing usable, or Validation found the document internally incoherent beyond what Chapter 13's failure handling can recover from. A Rejected document is never silently discarded: it is retained, flagged, and routed to Chapter 11's human verification, because a document a machine cannot process may still be a document a human can.

## 05. Document Categories

Ten durable categories, deliberately broader and more general than any single procedure's document list, so that new procedures introduced decades from now still map onto one of them without requiring a new category:

| Category | Character |
|---|---|
| Identity Document | Any document whose primary purpose is asserting who a person is |
| Birth Certificate | Civil-registration proof of birth and parentage |
| Household Document | Any document asserting membership in a household or family unit |
| Residence Document | Any document asserting where a person resides |
| Passport | Any document asserting identity and citizenship for cross-border purposes |
| Driver License | Any document asserting a driving qualification or privilege |
| Health Insurance | Any document asserting health coverage or entitlement |
| Application Form | A citizen- or officer-completed form requesting a government action |
| Supporting Evidence | Any document offered to substantiate a claim that does not itself fit another category — a declaration, a certificate of loss, proof of a life event, or similar |
| Other | A document that is legible and processable but does not fit any of the above; retained and flagged for human classification rather than forced into a poor-fitting category |

This category list is a closed set for the purposes of this Specification, but not a frozen one: adding an eleventh category is a Specification change, not a runtime configuration choice, so that the category list itself remains a governed, auditable decision rather than something a single implementation can silently expand.

## 06. Document Classification

- **Known category** — the document's characteristics match one of Chapter 05's categories closely enough to classify with a confidence level (Chapter 10).
- **Unknown document** — a document that is legible and processable, but does not clearly match any category, is classified as **Other**, never forced into the closest-sounding category merely to avoid an "unknown" result. A wrong classification is worse than an honest "unknown" one, because everything downstream inherits the wrong assumption.
- **Multiple candidates** — when a document plausibly matches more than one category, every plausible candidate is retained with its own confidence, and the highest-confidence candidate is used for routing purposes, but the alternatives are not discarded — a human reviewer (Chapter 11) can see and correct the choice.
- **Classification confidence** — governed by the same five-level model as every other judgment in this Specification (Chapter 10); a classification the subsystem is not confident in is never silently treated as if it were certain.

## 07. Field Extraction Model

This chapter defines the conceptual shape of what a "field" is. It prescribes no extraction technique.

| Field | Description |
|---|---|
| Document Number | The official identifying number printed or encoded on the document |
| Citizen Name | The name asserted by the document |
| Date of Birth | The birth date asserted by the document, where applicable |
| Issue Date | When the underlying document was issued |
| Expiry Date | When the underlying document ceases to be valid, where applicable |
| Issuing Authority | The body that issued the document |
| Address | Any residence or location asserted by the document |
| Photo Present | Whether a photograph appears on the document — a presence check, not a biometric judgment |
| Signature Present | Whether a signature appears — a presence check only; this subsystem never verifies whose signature it is |
| Machine Readable Zone | A structured, standardized strip or region of the document specifically designed to be read mechanically, where one exists |
| Barcode | A one-dimensional encoded symbol present on the document, where one exists |
| QR Code | A two-dimensional encoded symbol present on the document, where one exists |
| Unknown Fields | Any region of the document that appears to carry information but does not map to a defined field above; retained rather than discarded, so a human reviewer can later determine whether it matters |

Every field carries its own confidence (Chapter 10), independent of every other field on the same document. A document's overall confidence is a property of the document as a whole (Chapter 10), never assumed from a single strong field.

## 08. Validation Layer

Validation here is strictly structural — it asks whether the extraction is internally coherent, never whether the document satisfies a legal requirement. That second question belongs entirely to `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md`.

- **Required fields** — the set of fields a given document category is expected to carry, per Chapter 05's category.
- **Missing fields** — a required field could not be extracted at all; recorded as extraction-failed, not assumed absent from the underlying document.
- **Impossible values** — a value that cannot be true of any real document of this kind (for example, a date of birth after an issue date, or a document number of a shape no real document of that category ever takes) is flagged as impossible, never silently accepted.
- **Expired document** — an extracted expiry date that has already passed is flagged here as a structural fact; whether an expired document is acceptable for a given procedure is never this layer's decision.
- **Future date** — a date field whose value lies impossibly far in the future for its role (an issue date after today, for instance) is flagged as a future-date anomaly, distinct from a merely expired document.
- **Conflicting values** — two extractions of the same field, whether from two pages of the same document or two separate documents describing the same fact, that disagree with each other are flagged; the subsystem never silently picks one and discards the disagreement.
- **Unreadable fields** — a field the subsystem attempted to read but could not resolve with any confidence is recorded as unreadable, distinct from a field that was never present to begin with.

## 09. Normalization Layer

Normalization converts an extracted value into one canonical form without altering what it means. Normalization never resolves a Chapter 08 conflict — it only standardizes format once a value is already accepted.

- **Canonical names** — a single consistent ordering and casing convention for names, applied uniformly regardless of how the source document formatted them.
- **Canonical date format** — every date, regardless of the format it was printed or written in, is stored in one single canonical form.
- **Canonical address** — address components are stored in one consistent structure, regardless of the free-text layout of the source document.
- **Canonical identifiers** — document and citizen identifying numbers are stored in one consistent representation, independent of spacing, punctuation, or presentation differences in the source.
- **Language-independent storage** — the canonical, stored form of a field is never tied to the language the source document happened to be written in; the original language is retained as metadata (per the Document Object in Chapter 07), not lost, but the canonical value is comparable across documents regardless of source language.

## 10. Confidence Model

Five levels, ordered strictly:

**Unknown → Low → Medium → High → Verified**

- **Unknown** — no reliable determination could be made at all.
- **Low** — a determination was made, but with substantial doubt.
- **Medium** — a determination was made with moderate reliability; typical of common, expected format variation.
- **High** — a determination was made with strong reliability, consistent with a clear, well-formed source.
- **Verified** — the determination has been independently confirmed by a human being (Chapter 11). This is not a stronger flavor of machine confidence — it is a categorically different kind of confidence, attested by a person rather than computed from the document alone.

**Propagation within the machine levels:** per-field confidence aggregates to document-level confidence via minimum, never averaging — the same rule already established in `AI_REASONING_PIPELINE_SPECIFICATION.md` Stage 09, `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` Section 5, and `RULE_ENGINE_SPECIFICATION.md` Section 5. A document with nine High-confidence fields and one Unknown field is an Unknown-confidence document for any purpose that field matters to.

**Why confidence never increases automatically:** the ceiling any extraction process can reach on its own is High — never Verified. Verified is reachable only through Chapter 11's human verification, never through repetition, never through internal consistency checks, and never through the passage of time. This is a deliberate, permanent asymmetry, not a gap to be engineered away: allowing a process to certify its own output as Verified would let the same untrusted step both produce a claim and vouch for it, collapsing the separation between extraction and judgment that Chapter 03 exists to protect. A human verifying a document does not need to reach the same conclusion the extraction reached — verification can confirm, correct, or overturn a prior extraction, but it can never be granted by the extraction to itself.

## 11. Human Verification

- **Officer review** — an officer may inspect any extracted field against the original document image and either confirm it, correct it, or mark it unresolved.
- **Citizen confirmation** — a citizen may be shown what was extracted from their own document and asked to confirm or dispute it, giving the person the extraction is about a direct role in correcting it.
- **Manual correction** — any field, at any confidence level, may be corrected by a human; a correction is recorded as a new fact with its own provenance, never as a silent overwrite of the original extraction, which is preserved for audit.
- **Evidence preservation** — the original uploaded document is retained unchanged for the life of the case, regardless of how many times its extraction is corrected, so any human review can always be checked against the actual source.
- **Auditability** — every human verification action — who reviewed, what they changed, and when — is written to the audit trail with the same permanence as the original extraction event.

## 12. Interfaces

This subsystem produces structured output for other components to consume. It does not reason about eligibility, gaps, or law itself, and it never communicates directly with a large language model or any generative reasoning component — every output described here is structured data, handed off through the same interfaces every other component in this project uses, never through an ad hoc or informal channel.

Output is provided to:

- **Rule Engine** (`RULE_ENGINE_SPECIFICATION.md`, Vol. 14) — extracted fields serve as rule inputs.
- **Document Gap Analysis** (`DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md`, Vol. 42) — extracted fields and their confidence replace citizen self-report as the basis for gap and conflict reasoning, wherever extraction is available.
- **Case** — the structured Document Object becomes part of the case record, referenced by the checklist item it satisfies.
- **Audit** — every lifecycle transition, every extraction, and every human verification action writes an audit event.
- **Knowledge Base** (`LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md`, Vol. 15) — a processed document becomes a Knowledge Object of the Documents class, versioned and retained per that Specification's lifecycle.

**Never direct communication with a generative reasoning component.** Any component in this architecture that reasons in natural language receives this subsystem's output only as structured data handed to it by an orchestrating component (per `AI_OPERATING_SYSTEM.md`'s Planner Agent pattern) — it never queries this subsystem directly, and this subsystem never addresses it directly. This preserves the instruction/data separation `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 8 requires everywhere in this project.

## 13. Failure Handling

- **Unreadable image** — the file itself cannot be processed at all (too degraded, corrupted, or blank); the document moves to Rejected from Detected, and the citizen is asked to re-upload rather than the subsystem guessing at content that was never legible.
- **Partial extraction** — some fields are read, others are not; the document proceeds to Validated with the missing fields recorded as such, not blocked entirely for a partial result.
- **Multiple documents** — more than one distinct document appears in a single upload; each is Detected and Classified separately rather than merged into one confused extraction.
- **Wrong document** — the uploaded document does not match the category the checklist item expected; this is flagged distinctly from a missing document, since the citizen may simply need to upload the correct one, not provide something that does not yet exist.
- **Duplicate upload** — the same document is uploaded more than once for the same checklist item; the most recent, highest-confidence extraction is used for reference, and the earlier one is archived, never discarded.
- **Unsupported document** — a document that is legible but does not correspond to any expected use in the current case is retained and flagged as Other (Chapter 05/06), never rejected outright merely for being unexpected.

## 14. Trust by Design Mapping

Every architectural decision in this Specification traces to one or more of `TRUST_CONSTITUTION.md`'s six mechanisms:

| Trust Mechanism | How this Specification satisfies it |
|---|---|
| Legal Citation | This subsystem never states a legal conclusion, so it never requires a citation itself — but by handing the Rule Engine and Citation Specification honestly-confidenced evidence (Chapter 10), it ensures every downstream citation is grounded in traceable fact rather than an assumed document content. |
| Human Escalation | Chapter 11 is the permanent, structural point at which a human re-enters every case; Chapter 13's failure paths route to it rather than to silent failure. |
| Auditability | Chapter 04's lifecycle and Chapter 12's interfaces both write to the audit trail at every transition; nothing in this subsystem happens invisibly. |
| Traceability | Chapter 07's Document Object and Chapter 12's interfaces preserve a path from any consumed field back to the exact source document and extraction event. |
| Evidence | The entire purpose of this Specification (Chapter 01) is producing evidence, never conclusions — this is the mechanism this Specification exists primarily to serve. |
| Consistency | Chapter 09's normalization and Chapter 10's single, project-wide confidence propagation rule ensure this subsystem behaves the same way regardless of which document, which citizen, or which case it is processing. |

## 15. Traceability

This Specification depends on, and must be read alongside:

- `PRODUCT_CONSTITUTION.md`
- `CITIZEN_CONSTITUTION.md`
- `GOVERNMENT_CONSTITUTION.md`
- `TRUST_CONSTITUTION.md`
- `LEGAL_INTELLIGENCE_CONSTITUTION.md`
- `AI_OPERATING_SYSTEM.md`
- `RULE_ENGINE_SPECIFICATION.md` (Volume 14)
- `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Volume 15)
- `AI_REASONING_PIPELINE_SPECIFICATION.md` (Volume 41)
- `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Volume 42)
- `LEGAL_CITATION_SPECIFICATION.md` (Volume 44)

A change to any of these eleven documents that touches document handling, evidence, confidence, or human review must be checked against this Specification for continued consistency, and vice versa.

## 16. Acceptance Criteria

This Specification remains valid only if every rule in it still holds after any of the following changes, individually or in combination:

1. **OCR vendor** — no principle names or presumes a specific recognition technology or vendor.
2. **AI model** — no principle depends on a specific model's capability, provider, or generation.
3. **Programming language** — no principle presumes a specific implementation language.
4. **Cloud** — no principle presumes a specific hosting provider or infrastructure.
5. **Database** — no principle presumes a specific storage engine or schema technology.
6. **Storage** — no principle presumes a specific file or object storage mechanism.
7. **UI** — no principle presumes a specific citizen- or officer-facing interface design.
8. **Government platform** — no principle presumes integration with any specific government system, portal, or national platform; this Specification describes what must be true of the evidence CAIOS produces, not which external system eventually consumes it.

A future reviewer who finds a single rule in this document that would stop making sense after any one of these eight substitutions has found a defect in this Specification, to be corrected at that time.

---

## Architecture Summary

This Specification defines the extraction half of the Document Intelligence Subsystem, cleanly separated from Volume 42's reasoning half: a 10-state lifecycle with an explicit exception branch (Chapter 04) turning an uploaded document into a Document Object (Chapter 07) classified into one of ten durable categories (Chapter 05), validated and normalized without judgment (Chapters 08–09), governed by a five-level confidence model that adds a human-only Verified state above the project's existing machine ceiling (Chapter 10), re-entered by a human at every failure or review point (Chapter 11), and handed off through defined interfaces to five existing components without ever speaking directly to a generative reasoning component (Chapter 12).

## Document Lifecycle

`Uploaded → Detected → Classified → Extracted → Validated → Normalized → Stored → Referenced → Archived`, with `Rejected` as a permanent exception branch reachable up through Validated, never from Stored onward — ten named states, none skipped silently, none reachable without an audit trail.

## Known Risks

- **`ChecklistItem.ocrExtract`'s eventual content shape must still be confirmed against this Specification's Document Object (Chapter 07)** — this was flagged in Version 1.0 and remains an open implementation task, not resolved by this revision, which changes the conceptual model but not the underlying schema field.
- **The five-level Confidence Model (Chapter 10) introduces a Verified level that the project's existing four-level field-confidence scale (used in Volumes 14, 41, 42) does not have** — a future implementation must be careful not to conflate this document-status Verified level with a per-field High result; they are deliberately different kinds of claims, and collapsing them would quietly erode the guarantee Chapter 10 exists to protect.
- **The Document Categories table (Chapter 05) is now deliberately broader than `knowledge/documents/`'s current entries** — a reconciliation pass mapping each existing `knowledge/documents/` file to one of these ten categories has not yet been performed.
- **Signature verification remains explicitly out of scope** (Chapter 07) — a future procedure requiring it needs its own Specification, not a quiet extension of this one.

## Recommendation

Perform the two reconciliation passes this revision surfaces before any real implementation begins: (1) map every existing file in `knowledge/documents/` onto one of Chapter 05's ten durable categories, and (2) confirm `ChecklistItem.ocrExtract`'s field shape against Chapter 07's Document Object, including how a Chapter 10 Verified status is represented distinctly from a High-confidence extraction. Both are prerequisites for any real OCR integration, so the existing Prisma field and knowledge pack are deliberately aligned with this Specification rather than discovered mismatched afterward.
