---
goalId: MOVE_TO_A_NEW_CITY
citizenFriendlyName: "Move to a New City / Chuyển đến thành phố mới"
description: "The citizen is relocating to a new city or province and needs their residence and related records updated to reflect it."
typicalCitizenExpressions:
  - "I'm moving to a new city for work, what do I need to do?"
  - "Tôi chuyển đến thành phố khác, cần đăng ký gì"
relatedLifeEvents: ["MOVING_RESIDENCE"]
relatedAffectedAssets: "Derived (see recover-lost-documents.md's Rule Note) -- RESIDENCE_INFORMATION, CITIZEN_INFORMATION"
relatedProcedures: "Derived -- RESIDENCE_REGISTRATION, CITIZEN_INFORMATION_UPDATE"
priority: "Medium"
urgency: "Low to Medium — not usually urgent itself, but other services (school enrollment for a family, local voting rolls) can depend on it being current"
typicalJourney: "Practical, task-oriented — a move to a new city is usually accompanied by a long list of other logistics (housing, work, schools), and this goal's administrative piece is one item among many, easy to underweight"
successDefinition: "Residence information reflects the new city/province, and the citizen understands whether any other procedure (e.g., a future CCCD renewal) should now be processed in the new location"
commonObstacles: "Deprioritizing this update amid the many other logistics of a move, then discovering it matters later when an unrelated procedure asks for current residence"
recommendedFirstAction: "Register the new residence promptly, framed as one quick item to clear off the moving checklist rather than a separate undertaking"
futureExpansionNotes: "Functionally very close to BUY_A_HOME's residence-update component, but without that goal's property-transaction complexity — the two goals share the same underlying life event and procedures by design, not by oversight"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium — reflects the same MOVING_RESIDENCE life event already reasonably well developed"
---

# Goal: Move to a New City

Deliberately shares its entire Life Event, Affected Asset, and Procedure mapping with `BUY_A_HOME` — both goals converge on the same underlying administrative need (a residence update), and modeling them as two goals rather than one reflects that citizens *frame* the same underlying need very differently depending on why they're moving, even though the government-side resolution is identical.
