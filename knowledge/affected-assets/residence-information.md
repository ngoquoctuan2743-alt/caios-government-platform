---
assetId: RESIDENCE_INFORMATION
citizenFriendlyName: "Residence Information / Thông tin cư trú"
description: "The citizen's registered place of residence in the national population database — affected directly by moving, and indirectly by marriage where a household's registered address changes."
typicalCitizenExpressions:
  - "my registered address"
  - "nơi đăng ký thường trú"
relatedLifeEvents: ["LOST_WALLET", "MARRIAGE", "MOVING_RESIDENCE"]
relatedProcedures: ["RESIDENCE_REGISTRATION"]
governmentAuthority: "Commune/ward-level police (residence management)"
priorityLevel: "Medium"
riskLevel: "Low"
verificationNeeded: "Yes — whether a lost physical residence document (where one still exists) requires separate action beyond the database record is unverified"
escalationConditions: "Citizen reports a disputed residence (e.g., contested tenancy)"
dependencies: "None"
futureExpansionNotes: "Its inclusion under LOST_WALLET is a weaker link than the other two life events — reflects a citizen occasionally carrying a physical residence document, not a universal case; flagged for review rather than silently omitted"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for the Marriage and Moving Residence links; Low for the Lost Wallet link specifically"
---

# Affected Asset: Residence Information

Included under `LOST_WALLET` per that life event's own worked example, though the connection is genuinely weaker than the other two — this file states that honestly rather than presenting all three links as equally strong.
