---
assetId: DRIVER_LICENSE
citizenFriendlyName: "Driver License / Giấy phép lái xe"
description: "The citizen's driving credential, separate from their Citizen ID but often carried in the same wallet and therefore affected by the same loss events."
typicalCitizenExpressions:
  - "my driver's license"
  - "bằng lái xe của tôi"
relatedLifeEvents: ["LOST_WALLET"]
relatedProcedures: ["DRIVER_LICENSE_REISSUE"]
governmentAuthority: "Ministry of Public Security / Ministry of Transport (exact current issuing authority split unverified)"
priorityLevel: "Medium — matters most to citizens who drive as part of daily work or commuting"
riskLevel: "Medium — driving without a valid physical license, even if the record exists digitally, can create friction with traffic enforcement"
verificationNeeded: "Yes — whether a digital/database record can substitute for the physical card in the interim is unverified"
escalationConditions: "None specific beyond the general Lost Wallet escalation triggers"
dependencies: "None"
futureExpansionNotes: "No DRIVER_LICENSE_REISSUE procedure exists yet in this pack; this asset and its life-event link are ready the moment that procedure is authored"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Low — the related procedure does not yet exist, and the issuing authority split is unverified"
---

# Affected Asset: Driver License

Included specifically because `LOST_WALLET`'s worked example names it, even though CAIOS has not yet authored the procedure that would resolve it — this asset exists to hold that place in the graph honestly rather than silently dropping it.
