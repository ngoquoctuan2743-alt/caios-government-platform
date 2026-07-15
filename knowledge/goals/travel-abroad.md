---
goalId: TRAVEL_ABROAD
citizenFriendlyName: "Travel Abroad / Đi nước ngoài"
description: "The citizen wants to travel internationally and needs their identity and travel documents in order before departure."
typicalCitizenExpressions:
  - "I'm traveling abroad next month, what do I need?"
  - "I need my passport sorted before my trip"
  - "Tôi sắp đi nước ngoài, cần chuẩn bị giấy tờ gì"
relatedLifeEvents: ["EXPIRED_CITIZEN_ID", "FIRST_TIME_CITIZEN_ID", "LOST_WALLET"]
relatedAffectedAssets: "Derived (see recover-lost-documents.md's Rule Note) -- CITIZEN_ID_CARD always; PASSPORT, DRIVER_LICENSE, HEALTH_INSURANCE_CARD, RESIDENCE_INFORMATION only via the LOST_WALLET branch"
relatedProcedures: "Derived -- CCCD_RENEWAL, CCCD_FIRST_ISSUANCE, CCCD_REISSUE, and (via LOST_WALLET) PASSPORT_REISSUE, DRIVER_LICENSE_REISSUE, HEALTH_INSURANCE_CARD_REISSUE, RESIDENCE_REGISTRATION"
priority: "High — a hard external deadline (the travel date) is usually already fixed"
urgency: "Often High — this is one of the goals most likely to surface a citizen's travel date as a real constraint on processing time"
typicalJourney: "Excitement about the trip, interrupted by a practical worry about document validity -> checking each document's status -> relief once confirmed valid, or a scramble if something needs urgent renewal"
successDefinition: "Every document the citizen needs for this specific trip (destination-dependent, e.g., visa requirements are out of this system's scope) is confirmed valid well before departure"
commonObstacles: "Discovering a document issue close to the travel date, when standard processing may not meet the deadline"
recommendedFirstAction: "State the travel date explicitly up front and check it against realistic processing times for whichever document needs attention — mirrors the escalation logic already established for passports in AI_OPERATING_SYSTEM.md §8.1"
futureExpansionNotes: "This goal's most directly relevant asset (PASSPORT) has no dedicated life event of its own yet — only reachable today via LOST_WALLET, which won't apply to most citizens preparing for travel with all documents intact. A future 'Preparing to Travel' or 'First Passport' life event would close this gap directly."
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Low-Medium — the goal is well-defined, but its most relevant underlying life event does not yet exist"
---

# Goal: Travel Abroad

The clearest example in this initial set of a goal that is only partially served by the current knowledge graph — the asset a citizen actually cares about most (their passport) is reachable today only as a side effect of a life event (Lost Wallet) that won't apply to most travelers. This gap is stated explicitly rather than papered over.
