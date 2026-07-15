---
goalId: BUY_A_HOME
citizenFriendlyName: "Buy a Home / Mua nhà"
description: "The citizen wants to purchase a home and update their administrative records to reflect it, distinct from the property transaction itself which is out of this system's scope."
typicalCitizenExpressions:
  - "I just bought a house, what do I need to update?"
  - "Tôi vừa mua nhà, cần đăng ký gì"
relatedLifeEvents: ["MOVING_RESIDENCE"]
relatedAffectedAssets: "Derived (see recover-lost-documents.md's Rule Note) -- RESIDENCE_INFORMATION, CITIZEN_INFORMATION"
relatedProcedures: "Derived -- RESIDENCE_REGISTRATION, CITIZEN_INFORMATION_UPDATE"
priority: "Medium — the administrative side is rarely the citizen's main concern during a home purchase, but matters for later procedures"
urgency: "Low — the property transaction itself has its own timeline this system does not participate in; the administrative follow-up (residence registration) is comparatively unhurried"
typicalJourney: "A home purchase is a major, often stressful financial event; the administrative residence update that follows is a comparatively minor afterthought, easy to deprioritize or forget entirely"
successDefinition: "Residence information correctly reflects the new home address in the national database — this system does not track or confirm the property transaction/title itself"
commonObstacles: "Conflating the property/title transaction (out of scope) with the residence registration update (in scope), leading a citizen to expect help this system cannot provide"
recommendedFirstAction: "Clarify explicitly that this system helps with the residence registration update only, not the property purchase itself, before proceeding"
futureExpansionNotes: "Land and property title registration is a real, substantial government procedure area entirely unmodeled in this pack — a natural, large future expansion, but one requiring its own dedicated Procedure Library entries, not an extension of MOVING_RESIDENCE"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Low — this goal's most substantial real-world component (the property transaction) is entirely outside this pack's current scope"
---

# Goal: Buy a Home

The goal in this initial set with the widest gap between what a citizen actually means by the phrase and what this system currently helps with — "buying a home" is, for most citizens, primarily about the property transaction, which this system does not touch at all. This file exists partly to make that scope boundary explicit rather than let a citizen discover it mid-conversation.
