# Knowledge Pack Schema

This file defines the structure every file under `knowledge/procedures/` must follow. It is descriptive, not a Constitution or Specification — it exists so a human author and a future ingestion pipeline (Master Index Volume 15) read the same shape the same way.

## File Format

Every procedure file is Markdown with a YAML frontmatter block. Frontmatter holds short, structured fields a machine reads directly; the Markdown body holds the longer prose fields a human reads and a future summarizer/embedder processes.

## Field List (22 fields, per the authoring brief)

| # | Field | Location | Type |
|---|---|---|---|
| 1 | Procedure ID | frontmatter | string, stable, uppercase snake case |
| 2 | Official Name | frontmatter | string (Vietnamese) |
| 3 | Aliases | frontmatter | string[] |
| 4 | Citizen Friendly Name | frontmatter | string (plain language, EN + VN) |
| 5 | Short Description | body | 1-2 sentences |
| 6 | Purpose | body | why this procedure exists |
| 7 | Responsible Authority | frontmatter | string |
| 8 | Applicable Citizens | body | who this applies to, including edge cases |
| 9 | Required Documents | frontmatter | reference list of document IDs (see `documents/`) |
| 10 | Optional Documents | frontmatter | reference list of document IDs |
| 11 | Prerequisites | body | conditions that must be true before starting |
| 12 | Government Fees | frontmatter | amount or `"Unknown"` |
| 13 | Expected Processing Time | frontmatter | duration or `"Unknown"` |
| 14 | Processing Steps | body | ordered list |
| 15 | Citizen Journey | body | narrative, emotion-aware (per `CITIZEN_CONSTITUTION.md`) |
| 16 | Common Mistakes | body | list |
| 17 | Typical Missing Documents | body | list |
| 18 | Frequently Asked Questions | body | Q/A list |
| 19 | Related Procedures | frontmatter | reference list of procedure IDs |
| 20 | Legal References | frontmatter | reference list of citation IDs (see `citations/`) — every one marked `verified: false` until a legal reviewer confirms it |
| 21 | Last Reviewed | frontmatter | ISO date |
| 22 | Data Version | frontmatter | semver-style string |
| — | Confidence Level | frontmatter | `High` / `Medium` / `Low`, plus a one-line reason |

## Knowledge Rules (binding for every file in this pack)

- **No duplicated knowledge.** A document requirement or legal citation is defined exactly once, in `documents/` or `citations/`, and every procedure references it by ID rather than re-describing it.
- **No contradictory information.** If two procedures appear to need different versions of the same fact, that is a defect to fix at the shared source, not to resolve differently in each procedure file.
- **No hidden assumptions.** Any structural assumption made during authoring (e.g., "household registration is assumed digitally integrated per the national population database") is stated explicitly in the file's `assumptions` frontmatter field, not left implicit.
- **Unknown is explicit.** Any field whose true, current value could not be verified during authoring is set to the literal string `"Unknown"`, never a plausible-sounding placeholder.
- **Every legal statement reserves a citation.** A sentence describing a legal requirement is followed by a `[cite: CITATION_ID]` marker even when that citation is still `verified: false` — the slot exists so verification can be dropped in later without rewriting the prose.

## Confidence Level Convention

- **High** — verified against a current, authoritative source.
- **Medium** — reflects stable, well-documented general administrative practice, not independently verified against the current in-force legal text.
- **Low** — drafted from general knowledge only; any specific figure (fee, day-count, article number) must be treated as provisional.

Every procedure file in this initial pack is **Medium** for structural/process content and explicitly **Low / Unknown** for exact fees, processing-day counts, and article-level citations, pending review by a qualified legal reviewer — consistent with `LEGAL_INTELLIGENCE_CONSTITUTION.md`'s citation-or-disclose principle applied here to the authoring process itself, not only to runtime AI behavior.
