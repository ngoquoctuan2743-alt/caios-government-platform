---
assetId: TAX_INFORMATION
citizenFriendlyName: "Tax Information / Thông tin thuế"
description: "The citizen's personal tax record, which may need updating to reflect a change in marital status (relevant to dependent deductions and household tax filing in some cases)."
typicalCitizenExpressions:
  - "my tax information"
  - "thông tin thuế của tôi"
relatedLifeEvents: ["MARRIAGE"]
relatedProcedures: ["TAX_INFORMATION_UPDATE"]
governmentAuthority: "General Department of Taxation"
priorityLevel: "Low — rarely urgent, but easy to overlook entirely"
riskLevel: "Low"
verificationNeeded: "Yes — whether this update is mandatory or optional, and under what income/dependent conditions, is unverified"
escalationConditions: "None specific identified"
dependencies: "Depends on MARRIAGE_REGISTRATION being complete first"
futureExpansionNotes: "Currently the least-connected asset in this pack (one life event); likely to gain more connections once employment- and income-related life events are added in a future sprint"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Low — whether this update is even mandatory in the general case is unverified"
---

# Affected Asset: Tax Information

Included specifically because `MARRIAGE`'s own worked example names it — the asset most likely to be genuinely optional for a given citizen depending on their specific tax situation, which is why "Verification Needed" here is framed around mandatoriness itself, not just factual accuracy.
