# LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md
### The Legal Knowledge Base & RAG Ingestion Specification — Volume 15
**Version:** 1.0
**Status:** Approved
**Class:** Specification — architecture only. No vector database, framework, or specific retrieval technology is named or prescribed anywhere in this document; every principle here must remain true regardless of which such technology eventually implements it, including in 2050.
**Precedence:** Subordinate to every Constitution, and specifically operationalizes `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapters 2–3 (the Legal Knowledge Hierarchy and Legal Knowledge Lifecycle) into a concrete ingestion, classification, chunking, and retrieval specification. Does not modify `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `RULE_PACK_CCCD_PILOT.md` (Vol. 43), or `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41) — it supplies the knowledge layer those three consume, unchanged.
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md` (the constitution this Specification operationalizes), `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42), `RULE_PACK_CCCD_PILOT.md` (Vol. 43), `knowledge/citations/`, `knowledge/procedures/`.
**Ownership:** Owner — Chief Knowledge Architect · Architect — Legal Knowledge Engineer / RAG Systems Designer · Reviewer — Technical Steering Committee + Administrative Law Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | This revision | Architecture Review | Initial authorship, filling `MASTER_INDEX.md`'s Volume 15 slot — the label matched the reserved purpose exactly this time, no numbering resolution required. |

---

## Preface

`LEGAL_INTELLIGENCE_CONSTITUTION.md` established *why* legal knowledge must be hierarchical, versioned, and never fabricated. It did not describe how a real corpus of laws, decrees, and circulars actually becomes something an AI system can search, chunk, and cite without losing any of those guarantees along the way. This Specification is that description — and because vector databases, embedding models, and retrieval frameworks will all be replaced multiple times before this platform is retired, none of them appear here. What appears here is what must remain true no matter which of them is used.

---

## 1. Knowledge Sources

| Source | Treatment |
|---|---|
| Official Laws | Highest-authority active sources; ingested per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Ch. 2's hierarchy |
| Decrees | Implementing detail beneath Laws; inherits and may never contradict the Law it implements |
| Circulars | Technical/administrative detail beneath Decrees |
| Administrative Procedures | Operational descriptions (`knowledge/procedures/`), not themselves legal authority — always traced back to the Law/Decree/Circular that authorizes them |
| Government Portals | A distribution channel and provenance-verification point, not an authority in itself — used to confirm a source is genuinely official |
| Official Announcements | Time-sensitive notices (e.g., a temporary process change); tracked with an explicit expiry, never treated as permanent |
| Superseded Laws | Retained permanently, marked `Deprecated`/`Archived` (Section 4), excluded from active reasoning by default |
| Historical Laws | Same treatment as Superseded, retained specifically to answer questions about what applied at a past date |
| Draft Laws | **Never treated as current law.** Tracked as `Draft` status only, visible to internal review, never eligible for citation in any citizen-facing claim until formally enacted and moved through the full lifecycle (Section 4) |

## 2. Knowledge Classification

| Class | Where It Already Lives in This Project | Purpose |
|---|---|---|
| Legal Sources | `knowledge/citations/` | Ground-truth legal claims |
| Procedures | `knowledge/procedures/` | What a citizen must do |
| Documents | `knowledge/documents/` | What a citizen must provide |
| Rules | `RULE_ENGINE_SPECIFICATION.md`, `RULE_PACK_CCCD_PILOT.md` | Deterministic evaluation logic |
| Glossary | `knowledge/glossary/` | Consistent terminology |
| FAQs | Embedded per-procedure today | Common citizen questions |
| Citizen Guidance | Derived from `CITIZEN_CONSTITUTION.md` | Tone, plain-language framing |
| Officer Guidance | Not yet its own artifact (see Known Risks) | How officers should interpret a case |
| Templates | e.g. `knowledge/documents/application-form.md` | Reusable form/structure references |
| Examples | Worked examples across the Constitutions | Illustrative, never authoritative on their own |

Every object in every one of these ten classes conforms to the same Knowledge Object Model (Section 3) — classification is a field on that model, not a reason for a different schema.

## 3. Knowledge Object Model

Every knowledge object — regardless of class — carries these fifteen fields:

| Field | Purpose |
|---|---|
| Unique Identifier | Stable, never reused (mirrors the ADR numbering discipline already established project-wide) |
| Version | Semver-style; a new version on any binding change, never a silent edit |
| Status | Position in the Knowledge Lifecycle (Section 4) |
| Language | Vietnamese, English, or other — never assumed |
| Jurisdiction | National or a specific province/locality (per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Ch. 2) |
| Effective Date | When this object entered force |
| Expiry Date | When it stops applying, if known |
| Superseded By | The identifier of whatever replaced it, if any |
| Authority | The issuing body |
| Confidence | High/Medium/Low, per `LEGAL_INTELLIGENCE_CONSTITUTION.md`'s standard |
| Citation | The full citation per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Ch. 5's standard |
| Verification | Boolean + reviewer identity + date |
| Dependencies | Other objects this one relies on (e.g., a Procedure depends on its Legal Sources) |
| Relationships | Non-dependency links (e.g., "related procedure," "amends") |
| Metadata | Classification (Section 2), chunking hints (Section 6), anything else structural |

Every knowledge object already authored in this project (`knowledge/citations/*.md`'s frontmatter, `knowledge/procedures/*.md`'s frontmatter) is, retroactively, an instance of this model — this Specification does not require rewriting them now, only recognizes them as already conforming in spirit, with a future normalization pass to make every field explicit where it is currently implicit.

## 4. Knowledge Lifecycle

```
Draft → Legal Review → Approved → Published → Deprecated → Archived
```

- **Draft** — a source has been identified and ingested but not yet reviewed; includes every Draft Law (Section 1) by definition, since a draft law can never advance past this stage until enacted.
- **Legal Review** — a qualified reviewer confirms provenance, current-force status, and correct classification — corresponds to `LEGAL_INTELLIGENCE_CONSTITUTION.md` Ch. 3's Validation, Classification, and Relationship Mapping stages combined.
- **Approved** — reviewed and confirmed; corresponds to that Constitution's Version Control stage — the object now has a stable, citable version.
- **Published** — available for active retrieval and citation; corresponds to that Constitution's Activation stage.
- **Deprecated** — superseded but retained for a transition window (e.g., during a legally-defined grace period) — visible to reviewers, excluded from default citizen-facing retrieval.
- **Archived** — fully retired from active use, permanently retained for historical reconstruction — corresponds to that Constitution's Retirement stage.

No object skips a stage, and no object is ever deleted — `Archived` is a permanent, not a temporary, terminal state, per this project's standing Knowledge Preservation principle.

## 5. Knowledge Validation

Four distinct reviewer roles, each checking something the others do not:

- **Legal Reviewer** — confirms the source is genuinely authoritative, current, and correctly cited.
- **Technical Reviewer** — confirms the object conforms to the Knowledge Object Model (Section 3) and is structurally suitable for chunking (Section 6) without losing meaning.
- **AI Reviewer** — an automated, assistive pass that flags potential contradictions with existing Published knowledge or malformed structure — **never an approval authority in itself**; per `GOVERNMENT_CONSTITUTION.md` Chapter 3, no automated review may advance an object's Status without a human Legal or Government Reviewer's action.
- **Government Reviewer** — confirms alignment with actual current government policy/procedure for the relevant jurisdiction and authorizes the object's move to `Published`.

An object requires sign-off from all applicable human roles before advancing past `Legal Review` — the AI Reviewer's flags inform that sign-off, they do not replace it.

## 6. Knowledge Chunking Principles

- **Chunk boundaries never split a single legal provision.** An article or clause is the minimum indivisible unit — never broken across two chunks regardless of length.
- **Semantic boundaries follow the law's own structure** (chapter, article, clause), never an arbitrary length limit imposed by a specific technology.
- **Cross-references are preserved as explicit pointers.** A provision referencing another provision retains that reference as structured metadata, not as prose that becomes meaningless once separated from its original context.
- **Citation preservation** — every chunk carries its full citation lineage (Section 8) independently, so a chunk retrieved in isolation is never unciteable.
- **Context preservation** — a chunk retains enough surrounding structural context (which law, which chapter) to be understood without needing to re-fetch its parent document.
- **Hierarchy preservation** — a chunk's position in `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 2's rank (Constitution > Law > Decree > Circular > ...) travels with it as metadata, so retrieval-time conflict resolution (Section 7) remains possible even after the original document has been broken into pieces.

## 7. Retrieval Principles

- **Search order** — scoped first by jurisdiction and procedure relevance, never an unscoped search across the entire corpus; a narrower, correctly-scoped search is preferred over a broader one even if the broader one might coincidentally rank the right result higher.
- **Ranking** — the Legal Knowledge Hierarchy's three-step ordering (hierarchy, then recency, then specificity — `LEGAL_INTELLIGENCE_CONSTITUTION.md` Ch. 2) is the *primary* ranking signal; any similarity-based ranking is secondary and only breaks ties within an already hierarchy-filtered result set, never overrides it.
- **Confidence** — inherited entirely from the retrieved object's own Confidence and Verification fields (Section 3); retrieval never invents a confidence value of its own.
- **Conflict detection** — if top-ranked results still disagree after the hierarchy ordering is applied, that is a structural conflict, handled exactly per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 6, not silently resolved by a ranking algorithm's tie-break.
- **Unknown handling** — zero relevant results returned is stated explicitly as "not found," never silently substituted with the nearest available (but not actually relevant) match.
- **No hallucination** — retrieval returns actual knowledge objects with their citations attached; it never returns generated or synthesized text presented as if it were retrieved. Generation (phrasing) happens strictly downstream of retrieval — per `AI_REASONING_PIPELINE_SPECIFICATION.md` Stage 11 — never blended into the retrieval step itself.

## 8. Citation Preservation

**Every answer must always preserve original citation lineage.** A knowledge object's full lineage — its own citation, what it supersedes, what supersedes it, and its jurisdiction and effective dates — travels with it through every stage: ingestion, classification, chunking, retrieval, and into the final citizen-facing response. No stage in this pipeline is permitted to strip or summarize away that lineage for brevity; where a citation must be shortened for readability, the full lineage remains available on request, never discarded.

## 9. Knowledge Versioning

- **Legal evolution** — a law amendment creates a new version of the affected object; the prior version is retired (Section 4), never overwritten.
- **Administrative evolution** — a procedure or agency reorganization versions the affected Procedure/Documents objects the same way, even when no underlying law changed.
- **Historical references** — a citizen's question about a past case must be answerable using the specific object version that was actually in force at the relevant historical date, not the current version — this requires every retired version to remain genuinely retrievable, not merely retained in name.
- **Future references** — Draft Laws (Section 1) are tracked and versioned from the moment they're identified, so that once enacted, their transition to `Legal Review` doesn't start from scratch.

## 10. Knowledge Dependency Graph

```
Law (knowledge/citations/)
   │
   ▼
Procedure (knowledge/procedures/)
   │
   ▼
Rule (RULE_ENGINE_SPECIFICATION.md / RULE_PACK_CCCD_PILOT.md)
   │
   ▼
Checklist (AI_REASONING_PIPELINE_SPECIFICATION.md Stage 07)
   │
   ▼
Citizen Response (AI_REASONING_PIPELINE_SPECIFICATION.md Stage 11)
```

This is the complete lineage a single citizen-facing sentence can be traced back through — from the specific law, through the procedure and rule that operationalized it, to the checklist item it produced, to the words a citizen actually read. Every existing artifact in this project already sits at one of these five levels; this Specification's contribution is naming the chain explicitly so no future addition can sit outside it.

## 11. Auditability

Every retrieved knowledge object must remain explainable after the fact — not just the citation text, but the object's own identifier and version, so that if that object's status later changes (amended, superseded, retired), every past claim that relied on it remains traceable to exactly which version was in force when the claim was made. This extends the "one event per turn" audit discipline already established in `AI_REASONING_PIPELINE_SPECIFICATION.md` and `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md`: the audit payload for any legal claim includes the specific knowledge object identifier and version retrieved, not merely the rendered citation string.

## 12. Acceptance Criteria

This Specification, and any future amendment to it, remains valid only if every principle in it is still true after:

1. **Technology replacement** — no principle here names or presumes a specific retrieval technology, vector store, or framework.
2. **AI independence** — no principle depends on any specific model's capability; retrieval and generation remain structurally separate regardless of which models perform either.
3. **Database independence** — no principle presumes a specific storage engine.
4. **Cloud independence** — no principle presumes a specific hosting provider.
5. **Full model-replacement survival** — every guarantee here (hierarchy-first ranking, citation preservation, no-hallucination retrieval) holds even after every AI model in the system is replaced, since none of these guarantees depend on any model's behavior — they depend on this Specification's own structure being enforced around whichever model is present.

---

## Architecture Summary

This Specification sits between `LEGAL_INTELLIGENCE_CONSTITUTION.md` (why) and any future retrieval implementation (how, in code). It defines one shared Knowledge Object Model (Section 3) across ten classes of knowledge (Section 2), one six-stage authoring lifecycle (Section 4) with four independent reviewer roles (Section 5), chunking and retrieval principles that keep the Legal Knowledge Hierarchy enforceable even after a document is broken into pieces (Sections 6–7), and one traceable dependency chain from raw law to the words a citizen reads (Section 10).

## Knowledge Lifecycle Summary

`Draft → Legal Review → Approved → Published → Deprecated → Archived` — no object skips a stage, no object is ever deleted, and a Draft Law can never be cited as current law regardless of how likely it is to pass.

## Known Risks

- **The AI Reviewer role (Section 5) is a genuinely new concept in this project** and must be carefully bounded — its output is advisory input to human sign-off, never a Status-advancing action on its own; a future implementation that lets it auto-approve anything would violate `GOVERNMENT_CONSTITUTION.md` Chapter 3 directly.
- **Officer Guidance (Section 2) has no authored artifact yet**, despite being named as one of the ten knowledge classes — a real content gap, not an architectural one.
- **Retroactive normalization of existing `knowledge/` files against the 15-field Object Model (Section 3) has not been performed** — today's files are consistent in spirit but not field-complete against this schema; a future pass should close that gap explicitly rather than assume it away.

## Recommendation

Perform the retroactive normalization flagged above — walk every existing file in `knowledge/citations/`, `knowledge/procedures/`, and `knowledge/documents/` and confirm each of the fifteen Knowledge Object Model fields is explicitly present (adding `Superseded By: None` and similar explicit nulls where currently just absent) — before authoring any new knowledge source, so the corpus this Specification governs is honestly, fully conformant rather than conformant "in spirit."
