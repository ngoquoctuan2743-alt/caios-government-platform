import { LEGAL_SOURCES, PROCEDURE_LEGAL_REFERENCES } from "./citation-data";

/**
 * Sprint 01C -- Legal Citation.
 *
 * Deterministic lookup only. No LLM, no embeddings, no fuzzy legal
 * inference, no summarization, no text generation. Input is a recognized
 * Procedure ID (the output of Sprint 01B's `recognizeProcedure()`); this
 * module never performs recognition itself.
 *
 * Resolution chain, per this sprint's requirements:
 *   Procedure ID -> Legal Sources -> Citation Objects -> Citation Level
 *     -> Confidence -> Traceability
 *
 * Citation Levels follow `LEGAL_CITATION_SPECIFICATION.md` (Volume 44)
 * Section 4 exactly: `Verified | Official | Historical | Pending Verification
 * | Unknown | Deprecated`. This pack's `verified` field means precisely what
 * Volume 44's Verified level requires (independent confirmation by a
 * qualified legal reviewer, per `knowledge/metadata/schema.md` Field 20) --
 * so `verified: true` maps to VERIFIED and `verified: false` maps to UNKNOWN,
 * never to an intermediate tier this pack's data does not actually support.
 * Every citation in `knowledge/citations/` is `verified: false` today, so
 * every citation this resolver returns is UNKNOWN today -- this is Volume
 * 44's own stated fact about this corpus, not a defect of this resolver.
 *
 * Confidence values are transcribed from each citation's own authored
 * `confidenceLevel` frontmatter field -- never invented, never upgraded.
 */

export type CitationLevel =
  | "VERIFIED"
  | "OFFICIAL"
  | "HISTORICAL"
  | "PENDING_VERIFICATION"
  | "UNKNOWN"
  | "DEPRECATED";

export type CitationResolutionStatus = "RESOLVED" | "NOT_FOUND";

export type ConfidenceLevel = "High" | "Medium" | "Low" | "Unknown";

/** Volume 44 Section 4's own ordering, used as the ranking for "highest". */
const CITATION_LEVEL_RANK: Record<CitationLevel, number> = {
  VERIFIED: 0,
  OFFICIAL: 1,
  HISTORICAL: 2,
  PENDING_VERIFICATION: 3,
  UNKNOWN: 4,
  DEPRECATED: 5,
};

/** The project-wide four-level confidence scale, ranked for min() aggregation. */
const CONFIDENCE_RANK: Record<ConfidenceLevel, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
  Unknown: 3,
};

export interface CitationObject {
  citationId: string;
  sourceId: string;
  sourceName: string | null;
  citationLevel: CitationLevel;
  verificationStatus: CitationResolutionStatus;
  confidence: ConfidenceLevel;
  traceabilityReference: string | null;
}

export interface ProcedureCitationResult {
  procedureId: string;
  status: CitationResolutionStatus;
  citations: CitationObject[];
  /** Volume 44 §4 ranking; null only when there are no citations at all. */
  highestCitationLevel: CitationLevel | null;
  /** min() across every citation's confidence -- never averaged. */
  overallConfidence: ConfidenceLevel | null;
  /** File paths (procedure + every resolved citation), for audit/traceability. */
  traceability: string[];
}

/** Deterministically extracts the leading category from an authored confidenceLevel string. Never invents a value; falls back to "Unknown" if the string doesn't lead with a recognized category. */
function extractConfidence(confidenceLevelText: string): ConfidenceLevel {
  const trimmed = confidenceLevelText.trim();
  if (trimmed.startsWith("High")) return "High";
  if (trimmed.startsWith("Medium")) return "Medium";
  if (trimmed.startsWith("Low")) return "Low";
  return "Unknown";
}

/** verified === true means independently confirmed by a qualified legal reviewer (schema.md Field 20) -- Volume 44's definition of VERIFIED. verified === false has no reviewer confirmation at all, so it is UNKNOWN, per Volume 44 §4's explicit statement about this corpus. */
function deriveCitationLevel(verified: boolean): CitationLevel {
  return verified ? "VERIFIED" : "UNKNOWN";
}

function highestLevel(levels: CitationLevel[]): CitationLevel | null {
  if (levels.length === 0) return null;
  return levels.reduce((best, level) => (CITATION_LEVEL_RANK[level] < CITATION_LEVEL_RANK[best] ? level : best));
}

/** min() aggregation across confidences -- the same rule already established project-wide (never averaged). */
function overallConfidenceOf(confidences: ConfidenceLevel[]): ConfidenceLevel | null {
  if (confidences.length === 0) return null;
  return confidences.reduce((worst, level) => (CONFIDENCE_RANK[level] > CONFIDENCE_RANK[worst] ? level : worst));
}

/**
 * Resolves the traceable legal citations for a recognized Procedure ID.
 * Never fabricates a citation, never invents an article number, never
 * upgrades a confidence or Citation Level beyond what the Knowledge Library
 * itself states. Returns an honest, empty result rather than guessing when
 * the Procedure or a referenced citation is not found in the Knowledge
 * Library.
 */
export function resolveCitationsForProcedure(procedureId: string): ProcedureCitationResult {
  const procedureEntry = PROCEDURE_LEGAL_REFERENCES[procedureId];

  if (!procedureEntry) {
    return {
      procedureId,
      status: "NOT_FOUND",
      citations: [],
      highestCitationLevel: null,
      overallConfidence: null,
      traceability: [],
    };
  }

  const citations: CitationObject[] = procedureEntry.legalReferenceIds.map((citationId) => {
    const source = LEGAL_SOURCES[citationId];

    if (!source) {
      return {
        citationId,
        sourceId: citationId,
        sourceName: null,
        citationLevel: "UNKNOWN",
        verificationStatus: "NOT_FOUND",
        confidence: "Unknown",
        traceabilityReference: null,
      };
    }

    return {
      citationId: source.citationId,
      sourceId: source.citationId,
      sourceName: source.lawName,
      citationLevel: deriveCitationLevel(source.verified),
      verificationStatus: "RESOLVED",
      confidence: extractConfidence(source.confidenceLevel),
      traceabilityReference: source.path,
    };
  });

  const anyNotFound = citations.some((c) => c.verificationStatus === "NOT_FOUND");

  return {
    procedureId,
    status: anyNotFound ? "NOT_FOUND" : "RESOLVED",
    citations,
    highestCitationLevel: highestLevel(citations.map((c) => c.citationLevel)),
    overallConfidence: overallConfidenceOf(citations.map((c) => c.confidence)),
    traceability: [procedureEntry.path, ...citations.map((c) => c.traceabilityReference).filter((p): p is string => p !== null)],
  };
}

/**
 * Prepares a plain, serializable payload shaped for a future Audit Event
 * (per `WORKFLOW_CONSTITUTION.md`'s append-only audit discipline) without
 * writing one -- Sprint 01C does not implement Notification or Escalation,
 * and does not call `writeAuditEvent` itself. A future integration sprint
 * passes this payload to that existing audit service unchanged.
 */
export function prepareCitationAuditPayload(result: ProcedureCitationResult): Record<string, unknown> {
  return {
    action: "legal_citation.resolved",
    procedureId: result.procedureId,
    status: result.status,
    citationIds: result.citations.map((c) => c.citationId),
    highestCitationLevel: result.highestCitationLevel,
    overallConfidence: result.overallConfidence,
    traceability: result.traceability,
  };
}
