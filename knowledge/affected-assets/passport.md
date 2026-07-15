---
assetId: PASSPORT
citizenFriendlyName: "Passport / Hộ chiếu"
description: "The citizen's international travel document, separate from the Citizen ID and typically only urgent to a citizen if travel is imminent."
typicalCitizenExpressions:
  - "my passport"
  - "hộ chiếu của tôi"
relatedLifeEvents: ["LOST_WALLET"]
relatedProcedures: ["PASSPORT_REISSUE"]
governmentAuthority: "Ministry of Public Security — Immigration Department"
priorityLevel: "Low by default; High if the citizen has imminent international travel planned"
riskLevel: "Low unless travel is imminent, in which case processing-time risk becomes significant"
verificationNeeded: "Yes — whether standard or expedited reissue paths exist and their respective timeframes is unverified"
escalationConditions: "Citizen states travel within a timeframe the standard process is unlikely to meet — mirrors the escalation logic already used for passport issuance in AI_OPERATING_SYSTEM.md's own worked example"
dependencies: "None"
futureExpansionNotes: "No PASSPORT_REISSUE procedure exists yet; this asset is the natural home for the passport-specific urgency logic already described qualitatively in AI_OPERATING_SYSTEM.md §8.1"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Low — related procedure does not yet exist"
---

# Affected Asset: Passport

Deliberately reuses the urgency framing already established in `AI_OPERATING_SYSTEM.md`'s passport worked example (§8.1) rather than re-deriving it independently — the same underlying document, the same risk shape, now given a place in the Affected Assets layer.
