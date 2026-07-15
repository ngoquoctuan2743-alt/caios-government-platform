---
assetId: CITIZEN_INFORMATION
citizenFriendlyName: "Citizen Information / Thông tin công dân"
description: "The citizen's core identity attributes on record in the national population database — name, marital status, and similar personal facts distinct from any single physical document."
typicalCitizenExpressions:
  - "my information on file"
  - "thông tin cá nhân của tôi"
relatedLifeEvents: ["MARRIAGE", "CHANGE_OF_NAME", "MOVING_RESIDENCE"]
relatedProcedures: ["CITIZEN_INFORMATION_UPDATE"]
governmentAuthority: "Ministry of Public Security — national population database"
priorityLevel: "Medium"
riskLevel: "Low to Medium — inaccurate core information can cause friction across many unrelated future procedures until corrected"
verificationNeeded: "Yes — which specific attribute changes trigger a required update versus an optional one is unverified"
escalationConditions: "The underlying change (name, marital status) is itself contested or not yet legally finalized"
dependencies: "Marital-status updates depend on MARRIAGE_REGISTRATION being complete first; name updates depend on the underlying legal name change being finalized first"
futureExpansionNotes: "The single procedure this maps to (CITIZEN_INFORMATION_UPDATE) does not yet exist; it is the natural consolidation point for what might otherwise become three separate, overlapping update procedures"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for structure; Low for the related procedure, which is not yet authored"
---

# Affected Asset: Citizen Information

The second-most-connected asset in this initial pack (three life events), and a good example of "no duplicated knowledge": rather than each life event separately describing what counts as a citizen-information update, they all point here.
