---
lifeEventId: LOST_WALLET
citizenLanguage: "Lost wallet / lost bag with my documents / Mất ví / Mất giấy tờ tùy thân"
typicalExpressions:
  - "I lost my wallet, what do I do?"
  - "Someone stole my bag and my ID was inside"
  - "Mất ví có CCCD trong đó"
  - "Bị móc túi mất giấy tờ"
relatedProcedures:
  - { procedureId: "CCCD_REISSUE", status: "in_library" }
  - { procedureId: "DRIVER_LICENSE_REISSUE", status: "planned_not_yet_authored" }
  - { procedureId: "HEALTH_INSURANCE_CARD_REISSUE", status: "planned_not_yet_authored" }
priority: "High — multiple identity documents are typically compromised at once, and delay increases fraud exposure"
riskLevel: "High — risk of the lost documents being used for identity fraud, especially if theft (not just loss) is suspected"
recommendedFirstAction: "Report and begin reissue of the Citizen ID first, since it underpins verification for most other documents and services; handle other cards in parallel, not sequentially, where possible"
frequentlyForgottenDocuments: "Citizens often forget that a police report may be relevant only for suspected theft, not ordinary loss (see LOSS_DECLARATION) — and forget to check whether other cards (driver's license, insurance) were in the same wallet until asked directly"
commonMistakes:
  - "Waiting to report anything until they're sure exactly which cards were lost, delaying the most urgent one (Citizen ID)"
  - "Assuming one office or one report handles all lost documents at once, when each affected procedure is currently separate"
escalationTriggers:
  - "Citizen reports the loss was a theft or robbery involving personal safety, not simple misplacement"
  - "Citizen suspects the documents are already being used fraudulently"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium — mapping to CCCD_REISSUE is direct and confident; mappings to driver's license and health insurance reissue are structurally reasonable but reference procedures not yet authored in this Knowledge Pack"
scopeNote: "This life event intentionally excludes bank cards, payment cards, and private-sector account recovery — CAIOS is scoped to government administrative procedures only, per PRODUCT_CONSTITUTION.md's Non-Goals."
---

# Life Event: Lost Wallet

## Why This Life Event Exists

A citizen experiencing this rarely thinks "I need to reissue my Citizen ID" — they think "I lost my wallet, what do I do now?" This life event exists to catch that exact framing and route it to every government-side consequence at once, rather than requiring the citizen to already know which separate procedures apply.

## Citizen Journey Notes

This is inherently a moment of mild-to-significant stress, sometimes compounded by embarrassment or self-blame. Per `CITIZEN_CONSTITUTION.md`'s "never judged" principle, the AI's first response should orient the citizen toward action, not dwell on how it happened — the same tone guidance already established for `CCCD_REISSUE`'s Citizen Journey section, which this life event most directly leads to.
