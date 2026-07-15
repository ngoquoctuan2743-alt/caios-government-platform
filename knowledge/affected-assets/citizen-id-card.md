---
assetId: CITIZEN_ID_CARD
citizenFriendlyName: "Citizen ID Card (CCCD) / Thẻ Căn cước"
description: "The citizen's primary identity document, issued by the Ministry of Public Security. Central to almost every other government interaction, which is why it is affected by more life events than any single-purpose document in this pack."
typicalCitizenExpressions:
  - "my ID card"
  - "CCCD của tôi"
  - "thẻ căn cước"
relatedLifeEvents: ["LOST_WALLET", "EXPIRED_CITIZEN_ID", "FIRST_TIME_CITIZEN_ID", "CHANGE_OF_NAME"]
relatedProcedures: ["CCCD_REISSUE", "CCCD_RENEWAL", "CCCD_FIRST_ISSUANCE", "CCCD_REPLACEMENT"]
governmentAuthority: "Ministry of Public Security — Police Department for Administrative Management of Social Order (PC06)"
priorityLevel: "High — underpins verification for most other government and private services"
riskLevel: "High when compromised (loss/theft), Low when simply due for a routine update"
verificationNeeded: "Yes — current status (valid / expired / reported lost) should be confirmed against the national population database before recommending a specific procedure"
escalationConditions: "Suspected identity theft or fraudulent use of a lost/stolen card"
dependencies: "None upstream; several other assets and procedures (e.g., bank access, travel) depend on this asset being current, though those downstream effects are outside this system's scope"
futureExpansionNotes: "Once BIRTH_REGISTRATION_RECORD and CITIZEN_REGISTRY_ENTRY are fully modeled, this asset's dependency on a citizen already having a registry entry could be made explicit rather than assumed"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium — all four related procedures already exist in the Procedure Library; asset-level framing itself has not been independently reviewed"
---

# Affected Asset: Citizen ID Card (CCCD)

This is the one asset in this initial pack that is fully resolvable today — every life event that touches it already maps to an authored, in-library procedure. It is the reference example for what this layer looks like once fully built out.
