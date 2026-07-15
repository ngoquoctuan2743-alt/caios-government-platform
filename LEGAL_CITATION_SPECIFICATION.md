# LEGAL_CITATION_SPECIFICATION.md
### The Legal Citation Specification — Volume 44
**Version:** 1.0
**Status:** Approved
**Class:** Specification — architecture only. No OCR, RAG, prompt engineering, or LLM behavior is prescribed here; every rule in this document must remain true even if no LLM exists anywhere in the system.
**Precedence:** Numbered Volume 44, the next actually-available sequential slot (per ADR-0008/0009) — **not Volume 16**, which remains reserved for the OCR & Document Intelligence Specification, an unrelated document. Operationalizes `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 5's Citation Standard and `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15) Section 8's Citation Preservation into one dedicated, universal standard. Does not modify `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), or `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41) — it supplies the citation contract those three already assume, unchanged.
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md` (the constitution this Specification operationalizes), `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `RULE_PACK_CCCD_PILOT.md` (Vol. 43), `knowledge/citations/`.
**Ownership:** Owner — Chief Knowledge Architect · Architect — Legal Citation Standards Designer · Reviewer — Technical Steering Committee + Administrative Law Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | This revision | Architecture Review | Initial authorship. Numbered Volume 44 after resolving a naming mismatch with Volume 16 (reserved for OCR & Document Intelligence). |

---

## Preface

`LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 5 named the fields a citation must carry. `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` Section 8 said citation lineage must never be stripped. Neither document is the single, dedicated place that defines exactly what a citation *is* as an object, how confident CAIOS is permitted to be about it, and how it must look different to a citizen than it does to an officer or an auditor. This Specification is that place — deliberately narrow, deliberately independent of whether an LLM, a database, or any specific technology exists at all, because a citation's job — proving a claim is true and checkable — has nothing to do with any of them.

---

## 1. Citation Philosophy

Citations exist to make a legal claim independently checkable, not merely trustworthy on the system's own word:

- **Trust** — a citizen does not have to believe CAIOS; they can verify the specific law, article, and date themselves.
- **Transparency** — the origin of every legal claim is visible, never hidden behind a confident-sounding sentence.
- **Auditability** — a reviewer can reconstruct, months or years later, exactly what was cited and why.
- **Citizen confidence** — grounded in the ability to check, not in the AI's tone of certainty.
- **Officer confidence** — an officer reviewing an AI-prepared case can independently verify the citation rather than trusting the AI's characterization of it.

## 2. Citation Requirements

**Every one of the following must carry a traceable citation before it is stated to a citizen or relied upon by an officer:** every legal statement, every eligibility decision, every checklist item, every exception, every deadline, every fee, every mandatory document. This is a universal requirement across every category of output CAIOS produces — not a rule specific to legal claims narrowly defined. A checklist item ("bring your birth certificate") is just as much a citable claim as a sentence of legal prose, and is held to the identical standard.

## 3. Citation Object

Every citation is an instance of this object — a specialization, for the Legal Source class specifically, of the broader 15-field Knowledge Object Model already defined in `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` Section 3:

| Field | Description |
|---|---|
| Citation ID | Stable, unique, never reused |
| Source | The originating document |
| Authority | The issuing body |
| Jurisdiction | National or specific province/locality |
| Document Type | Law, Decree, Circular, etc. (per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Ch. 2) |
| Document Number | The official number (e.g., "26/2023/QH15") |
| Article | The specific article |
| Clause | The specific clause |
| Point | The specific point, where granular enough to have one |
| Issue Date | When the source was issued |
| Effective Date | When it entered force |
| Status | Its position in `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md`'s six-stage lifecycle |
| Verification Status | Whether and by whom it was confirmed |
| Confidence | High/Medium/Low |
| Language | The language of the source text |

## 4. Citation Levels

A finer-grained scale than the simple `verified: true/false` used so far across `knowledge/citations/` — this Specification is what that boolean should mature into:

- **Verified** — independently confirmed by a qualified legal reviewer against the current official source.
- **Official** — sourced from an official government channel (portal, gazette) but not yet independently reviewed by a human — trusted channel, not yet human-confirmed.
- **Historical** — was Verified or Official at some point, no longer current, retained specifically to answer questions about a past date.
- **Pending Verification** — ingested and classified, awaiting review (`LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md`'s Draft/Legal Review stages).
- **Unknown** — no source could be identified at all. **Every citation currently in `knowledge/citations/` and `RULE_PACK_CCCD_PILOT.md` is at this level today** — stated plainly, not softened.
- **Deprecated** — formally superseded; retained for traceability, never cited as current.

Only `Verified` and `Official` citations may support a High-confidence claim; every other level caps the claim at Medium or Low, per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 4's confidence-capping rule.

## 5. Citation Rendering Rules

The same Citation Object renders differently by audience — never a different object, only a different view of it:

- **Citizen View** — plain language: law name, article, and an explicit "as of [date]," with the confidence level shown, not hidden — per `CITIZEN_CONSTITUTION.md`'s plain-language principle.
- **Officer View** — the full citation detail plus Verification Status and reviewer identity, so an officer can independently assess it rather than trust the AI's summary of it.
- **Audit View** — the complete, unabridged Citation Object, immutable and timestamped, exactly as retrieved at the moment the claim was made.
- **System View** — a structured, machine-consumable rendering of the same object, for internal consumption by the Rule Engine (Vol. 14) and other components — described here only as a concept, never as an API or schema.

## 6. Missing Citation Policy

If no citation can be found for a claim that Section 2 requires one for:

1. **Never fabricate one.** No plausible-sounding citation is ever generated to fill the gap.
2. **Disclose the uncertainty explicitly**, to the citizen, in plain language.
3. **Recommend officer review** — the gap is escalated, not silently left unresolved or quietly worked around.

## 7. Conflicting Citation Policy

- **Higher authority wins** — per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 2's hierarchy, applied first, always.
- **The newest law alone never wins.** Recency only breaks a tie *within* the same rank of authority — a more recent Circular never overrides an older Decree simply for being newer.
- **All conflict resolution follows `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 6** without exception — this Specification does not define a competing resolution mechanism, it only requires that every citation carry enough structured data (Document Type, Issue Date, Jurisdiction) for that existing mechanism to actually be applied.

## 8. Citation Traceability

```
Knowledge Object (Legal Knowledge Base, Vol. 15 §3)
        │
        ▼
Rule (Rule Engine, Vol. 14 — the rule whose Legal Basis field points to this citation)
        │
        ▼
Procedure (knowledge/procedures/ — the procedure that rule belongs to)
        │
        ▼
Legal Source (knowledge/citations/ — the ultimate origin)
```

This traces a citation's governance chain — which knowledge object backs which rule, which rule belongs to which procedure, and which procedure's legal grounding is which source — distinct from `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` Section 10's Law → Procedure → Rule → Checklist → Citizen Response chain, which traces the *generation* of a citizen-facing answer. Both chains must hold simultaneously for any citation shown to a citizen to be fully accountable.

## 9. Audit Requirements

Every citation shown to a citizen or relied upon by an officer must be reproducible after the fact — the exact Citation Object (Section 3), at the exact version it was in when the claim was made, retrievable from the audit trail by Citation ID alone, independent of whether that citation's current status has since changed.

## 10. Future Compatibility

This Specification remains valid after replacing the AI model, the database, the cloud provider, the programming language, or the retrieval engine — because nothing in it depends on any of them. A Citation Object is a piece of verifiable data with a defined lifecycle and confidence level; it does not become more or less true because of what technology happens to be storing or serving it.

---

## Acceptance Criteria

This Specification remains valid only if every rule in it is still true **even if no LLM exists anywhere in the system.** Every principle here — the Citation Object's fields, the six Citation Levels, the four Rendering Rules, the Missing and Conflicting Citation Policies — describes verifiable data and human review process, none of it generative AI behavior. A future reviewer who can find a single rule in this document that would stop making sense in a fully non-AI, human-only administrative system has found a defect in this Specification, to be corrected at that time.

---

## Architecture Summary

This Specification sits directly beneath `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 5 and beside `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md`, refining the citation-specific subset of that Specification's Knowledge Object Model into its own dedicated standard: one Citation Object (Section 3), a six-level confidence gradation (Section 4) replacing the simple boolean used everywhere so far, four audience-specific renderings of the same underlying object (Section 5), and two absolute policies — never fabricate, and never let recency alone override hierarchy — that apply identically regardless of what generates the surrounding sentence.

## Citation Levels

`Verified → Official → Historical → Pending Verification → Unknown → Deprecated` — every citation currently in this project's corpus sits at **Unknown**, honestly, and this Specification is what future legal review moves them out of.

## Known Risks

- **Every existing citation in `knowledge/citations/` and `RULE_PACK_CCCD_PILOT.md` needs its `verified: false` boolean re-expressed against this Specification's six-level scale** — most naturally map to `Unknown`, but this has not been done as an explicit pass yet.
- **The System View (Section 5) is described only conceptually here**, per this document's own no-implementation rule — a future Specification implementing it must not accidentally narrow this Citation Object's fields to whatever a specific storage format makes convenient.
- **This Specification's two chains (Section 8, and Volume 15's Section 10) being distinct but both mandatory is a subtle point** that a future, less careful implementation could easily collapse into one, losing the governance-chain visibility Section 8 specifically exists to provide.

## Recommendation

Perform the citation re-leveling pass flagged above — walk every citation in `knowledge/citations/` and `RULE_PACK_CCCD_PILOT.md` and explicitly re-express each as one of this Specification's six Citation Levels (almost certainly `Unknown` across the board today) — before authoring `RULE_PACK_CCCD_PILOT.md`'s eventual successor packs, so new content starts from the same explicit standard rather than the looser boolean this Specification is meant to retire.
