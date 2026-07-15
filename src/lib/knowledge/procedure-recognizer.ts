import { ASSETS, GOALS, LIFE_EVENTS, PROCEDURES } from "./recognition-data";

/**
 * Sprint 01B -- Procedure Recognition.
 *
 * Deterministic recognizer only. No LLM, no fuzzy scoring, no legal
 * inference. Every match is a plain substring check against phrases already
 * authored in the Knowledge Library (`recognition-data.ts`), and every
 * confidence level is derived solely from which layer of the chain
 * (Procedure alias > Life Event > Goal) produced the deciding match -- never
 * a fabricated or invented number.
 *
 * Resolution chain, per Sprint 01B's requirements:
 *   Citizen Message -> Goal (if available) -> Life Event -> Affected Asset -> Procedure
 *
 * A Procedure is only ever returned if it is authored in
 * `knowledge/procedures/` (`PROCEDURES[id].inLibrary === true`) -- recognizing
 * a Life Event or Goal that maps only to not-yet-authored procedures produces
 * "Unknown", never a fabricated Procedure result.
 */

export type RecognitionConfidence = "High" | "Medium" | "Low";
export type RecognitionSource = "PROCEDURE_ALIAS" | "LIFE_EVENT" | "GOAL";

export interface ProcedureRecognitionResult {
  status: "RECOGNIZED" | "UNKNOWN";
  procedureId: string | null;
  /** Present only when status is "RECOGNIZED" -- never fabricated for "Unknown". */
  confidence: RecognitionConfidence | null;
  matchedSource: RecognitionSource | null;
  matchedGoalId: string | null;
  matchedLifeEventId: string | null;
  matchedAssetId: string | null;
  /** The exact authored phrase that produced the match, for traceability. */
  matchedPhrase: string | null;
}

function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Returns the first phrase (as authored) that appears as a substring of the normalized message. */
function findMatchingPhrase(normalizedMessage: string, phrases: string[]): string | null {
  for (const phrase of phrases) {
    const normalizedPhrase = normalize(phrase);
    if (normalizedPhrase.length > 0 && normalizedMessage.includes(normalizedPhrase)) {
      return phrase;
    }
  }
  return null;
}

/** Deduplicates and filters candidate procedure ids down to authored ones only. */
function toAuthoredCandidates(candidateProcedureIds: string[]): string[] {
  const unique = Array.from(new Set(candidateProcedureIds));
  return unique.filter((id) => PROCEDURES[id]?.inLibrary === true);
}

function unknownResult(
  matchedGoalId: string | null = null,
  matchedLifeEventId: string | null = null,
): ProcedureRecognitionResult {
  return {
    status: "UNKNOWN",
    procedureId: null,
    confidence: null,
    matchedSource: null,
    matchedGoalId,
    matchedLifeEventId,
    matchedAssetId: null,
    matchedPhrase: null,
  };
}

/**
 * Recognizes the Procedure a citizen's first message describes, per the
 * deterministic Goal -> Life Event -> Affected Asset -> Procedure chain.
 * Never calls an LLM. Never infers a legal fact. Returns exactly one
 * recognized Procedure, or "Unknown" -- never a guess between candidates.
 */
export function recognizeProcedure(citizenMessage: string): ProcedureRecognitionResult {
  const normalizedMessage = normalize(citizenMessage);
  if (normalizedMessage.length === 0) {
    return unknownResult();
  }

  // Step 1 (checked first -- the most specific possible signal): does the
  // message directly name an authored Procedure by its own official name,
  // alias, or citizen-friendly name?
  for (const entry of Object.values(PROCEDURES)) {
    if (!entry.inLibrary) continue;
    const matchedPhrase = findMatchingPhrase(normalizedMessage, entry.matchPhrases);
    if (matchedPhrase) {
      return {
        status: "RECOGNIZED",
        procedureId: entry.procedureId,
        confidence: "High",
        matchedSource: "PROCEDURE_ALIAS",
        matchedGoalId: null,
        matchedLifeEventId: null,
        matchedAssetId: null,
        matchedPhrase,
      };
    }
  }

  // Step 2: Goal match ("if available" -- optional). Narrows which Life
  // Events are considered next; if no Goal matches, every Life Event remains
  // a candidate.
  let matchedGoalId: string | null = null;
  let matchedGoalPhrase: string | null = null;
  let candidateLifeEventIds = Object.keys(LIFE_EVENTS);

  for (const entry of Object.values(GOALS)) {
    const matchedPhrase = findMatchingPhrase(normalizedMessage, entry.matchPhrases);
    if (matchedPhrase) {
      matchedGoalId = entry.goalId;
      matchedGoalPhrase = matchedPhrase;
      candidateLifeEventIds = entry.lifeEventIds;
      break;
    }
  }

  // Step 3: Life Event match, required to proceed to Affected Asset / Procedure.
  let matchedLifeEventId: string | null = null;
  let matchedLifeEventPhrase: string | null = null;
  for (const lifeEventId of candidateLifeEventIds) {
    const entry = LIFE_EVENTS[lifeEventId];
    if (!entry) continue;
    const matchedPhrase = findMatchingPhrase(normalizedMessage, entry.matchPhrases);
    if (matchedPhrase) {
      matchedLifeEventId = lifeEventId;
      matchedLifeEventPhrase = matchedPhrase;
      break;
    }
  }

  if (matchedLifeEventId) {
    const lifeEvent = LIFE_EVENTS[matchedLifeEventId];

    // Step 4: Affected Asset disambiguation. Only consulted when the Life
    // Event's own candidate procedures do not already resolve uniquely --
    // with today's Knowledge Library this step never changes the outcome
    // (see Known Issues in the sprint report), but it is a real, tested code
    // path, ready for when more procedures are authored.
    const directAuthoredCandidates = toAuthoredCandidates(lifeEvent.procedureIds);
    if (directAuthoredCandidates.length === 1) {
      return {
        status: "RECOGNIZED",
        procedureId: directAuthoredCandidates[0],
        confidence: "Medium",
        matchedSource: "LIFE_EVENT",
        matchedGoalId,
        matchedLifeEventId,
        matchedAssetId: null,
        matchedPhrase: matchedLifeEventPhrase,
      };
    }

    if (directAuthoredCandidates.length > 1) {
      let matchedAssetId: string | null = null;
      for (const assetId of lifeEvent.assetIds) {
        const asset = ASSETS[assetId];
        if (!asset) continue;
        const assetPhrase = findMatchingPhrase(normalizedMessage, asset.matchPhrases);
        if (assetPhrase) {
          matchedAssetId = assetId;
          break;
        }
      }

      if (matchedAssetId) {
        const assetCandidates = directAuthoredCandidates.filter((id) =>
          ASSETS[matchedAssetId]!.procedureIds.includes(id),
        );
        if (assetCandidates.length === 1) {
          return {
            status: "RECOGNIZED",
            procedureId: assetCandidates[0],
            confidence: "Medium",
            matchedSource: "LIFE_EVENT",
            matchedGoalId,
            matchedLifeEventId,
            matchedAssetId,
            matchedPhrase: matchedLifeEventPhrase,
          };
        }
      }

      // More than one authored candidate and no Asset-level signal narrows
      // it to exactly one -- never guess between them.
      return unknownResult(matchedGoalId, matchedLifeEventId);
    }

    // Life Event recognized, but none of its candidate procedures are
    // authored yet -- Unknown, not a fabricated result.
    return unknownResult(matchedGoalId, matchedLifeEventId);
  }

  // Step 5: Goal matched but no corroborating Life Event phrase was found.
  // Fall back to the Goal's own derived procedure rollup (goals/index.json's
  // goalChain[...].procedures), at Low confidence -- the weakest layer, since
  // it rests on the most generic phrase in the chain.
  if (matchedGoalId) {
    const goalEntry = GOALS[matchedGoalId];
    const authoredCandidates = toAuthoredCandidates(goalEntry.procedureIds);
    if (authoredCandidates.length === 1) {
      return {
        status: "RECOGNIZED",
        procedureId: authoredCandidates[0],
        confidence: "Low",
        matchedSource: "GOAL",
        matchedGoalId,
        matchedLifeEventId: null,
        matchedAssetId: null,
        matchedPhrase: matchedGoalPhrase,
      };
    }
    // Zero or multiple authored candidates at the Goal level -- never guess.
    return unknownResult(matchedGoalId, null);
  }

  return unknownResult();
}
