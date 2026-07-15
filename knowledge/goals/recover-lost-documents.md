---
goalId: RECOVER_LOST_DOCUMENTS
citizenFriendlyName: "Recover Lost Documents / Khôi phục giấy tờ bị mất"
description: "The citizen wants to get back to a normal, fully-documented state after losing their wallet, bag, or a specific document."
typicalCitizenExpressions:
  - "I lost my documents and need to sort everything out"
  - "I need to recover everything after losing my wallet"
  - "Tôi cần khôi phục lại giấy tờ bị mất"
relatedLifeEvents: ["LOST_WALLET"]
relatedAffectedAssets: "Derived from relatedLifeEvents via affected-assets/index.json -- CITIZEN_ID_CARD, DRIVER_LICENSE, HEALTH_INSURANCE_CARD, PASSPORT, RESIDENCE_INFORMATION, BANK_CARDS (out of scope). Not independently authored here; see Rule Note below."
relatedProcedures: "Derived transitively -- CCCD_REISSUE, DRIVER_LICENSE_REISSUE, HEALTH_INSURANCE_CARD_REISSUE, PASSPORT_REISSUE, RESIDENCE_REGISTRATION. Not independently authored here."
priority: "High — identity documents underpin access to many other services"
urgency: "High immediately after the loss, tapering as each document is resolved"
typicalJourney: "Panic or mild dread at discovery -> triage (which documents were actually in the wallet) -> sequential recovery, starting with the Citizen ID -> gradual relief as each document is resolved -> full normalcy once the last one is done"
successDefinition: "Every government-issued document that was lost has been reissued or reissue is confirmed in progress, and the citizen has been clearly told what (if anything) still needs a private-sector follow-up (e.g., their bank)"
commonObstacles: "Not knowing where to start; assuming one office handles everything at once; forgetting a document was even in the wallet until prompted"
recommendedFirstAction: "Start Citizen ID reissue immediately, in parallel with (not sequentially before) any other affected document, since none of the recovery procedures currently in this pack depend on another completing first"
futureExpansionNotes: "The most fully resolvable goal in this initial set, aside from the explicitly out-of-scope BANK_CARDS asset — a good reference example once more procedures (driver's license, passport, health insurance reissue) are authored"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium — the single related life event (LOST_WALLET) is well developed; this goal adds no new claims of its own"
---

# Goal: Recover Lost Documents

## Rule Note (applies to every file in this layer)

`relatedAffectedAssets` and `relatedProcedures` above are **derived rollups**, computed transitively from `relatedLifeEvents` through the existing `life-events/index.json` and `affected-assets/index.json` graphs — they are not independently authored facts. This is how this layer satisfies both "each Goal shall include Related Affected Assets and Related Procedures" and "never duplicate legal knowledge, never duplicate procedures" at the same time: the fields exist for a reader's convenience, but the single source of truth remains the lower layers.
