---
assetId: HEALTH_INSURANCE_CARD
citizenFriendlyName: "Health Insurance Card / Thẻ bảo hiểm y tế"
description: "The citizen's health insurance credential — either a card that needs reissuing after a loss, or a new enrollment needed for a newborn."
typicalCitizenExpressions:
  - "my health insurance card"
  - "thẻ bảo hiểm y tế"
  - "bảo hiểm y tế cho con tôi"
relatedLifeEvents: ["LOST_WALLET", "BIRTH_OF_CHILD"]
relatedProcedures: ["HEALTH_INSURANCE_CARD_REISSUE", "HEALTH_INSURANCE_REGISTRATION"]
governmentAuthority: "Vietnam Social Security (Bảo hiểm xã hội Việt Nam)"
priorityLevel: "High for a newborn (affects access to covered care from birth); Medium for an adult's routine reissue"
riskLevel: "Medium — gaps in coverage during reissue or new registration can mean out-of-pocket costs for care needed in the interim"
verificationNeeded: "Yes — current enrollment status and any continuity-of-coverage rule during reissue is unverified"
escalationConditions: "Citizen reports an urgent, imminent medical need affected by a coverage gap"
dependencies: "For a newborn, depends on BIRTH_REGISTRATION_RECORD and CITIZEN_REGISTRY_ENTRY existing first"
futureExpansionNotes: "Both related procedures are not yet authored; this asset correctly reflects two distinct triggering life events sharing one underlying asset type"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Low — neither related procedure exists yet, and the continuity-of-coverage question is unverified"
---

# Affected Asset: Health Insurance Card

The clearest example in this pack of one asset type reached by two structurally different life events — an adult replacing a lost card, and a newborn's first enrollment — that nonetheless share the same underlying asset and issuing authority.
