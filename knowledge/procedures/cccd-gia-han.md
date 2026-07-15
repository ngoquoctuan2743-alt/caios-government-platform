---
procedureId: CCCD_RENEWAL
officialName: "Cấp đổi Căn cước do hết thời hạn sử dụng / đến tuổi cấp đổi"
aliases: ["Gia hạn CCCD", "Renew CCCD", "Renew Citizen ID", "CCCD renewal", "Đổi CCCD hết hạn"]
citizenFriendlyName: "Renew my Citizen ID (CCCD) / Gia hạn thẻ Căn cước của tôi"
responsibleAuthority: "Ministry of Public Security — Police Department for Administrative Management of Social Order (PC06); processed at provincial/district police or via the national public service portal"
requiredDocuments: ["CURRENT_ID_DOCUMENT", "APPLICATION_FORM"]
optionalDocuments: ["HOUSEHOLD_REGISTRATION_EXTRACT"]
governmentFees: "Unknown — pending verification [cite: THONG_TU_LE_PHI_CCCD, verified: false]"
expectedProcessingTime: "Unknown precise figure — pending verification; historically within statutory limits set by implementing regulation [cite: NGHI_DINH_HUONG_DAN_CAN_CUOC, verified: false]"
relatedProcedures: ["CCCD_REPLACEMENT", "CCCD_REISSUE"]
legalReferences: ["LUAT_CAN_CUOC_2023", "NGHI_DINH_HUONG_DAN_CAN_CUOC", "THONG_TU_ANH_CHAN_DUNG", "THONG_TU_LE_PHI_CCCD"]
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for process structure; Low/Unknown for exact fees, processing days, and article-level citations — none independently verified"
assumptions:
  - "Household registration is assumed digitally verifiable in most cases per HOUSEHOLD_REGISTRATION_EXTRACT's notes; not required as a physical document by default."
  - "The age-based mandatory renewal cycle (commonly cited as 25, 40, 60) is assumed current; exact article and any recent amendment unverified."
---

## Short Description

Renewing a Citizen ID (Căn cước / CCCD) that has expired, is approaching expiry, or is due for mandatory renewal at a specific age milestone.

## Purpose

Ensures every citizen holds a currently valid identity document, which underpins access to a wide range of other services (banking, travel, other administrative procedures) that require a valid ID.

## Applicable Citizens

- Citizens whose current Căn cước/CCCD has expired or is expiring within the window their locality accepts renewal applications ahead of expiry (exact window unverified).
- Citizens reaching one of the mandatory renewal age milestones (commonly cited as 25, 40, 60), regardless of whether their current card has technically expired yet.
- **Not applicable** to a citizen who has never held a Căn cước/CCCD before — see `CCCD_FIRST_ISSUANCE` instead.
- **Not applicable** to a citizen whose card is lost — see `CCCD_REISSUE` instead.

## Prerequisites

- Must hold a prior, genuine Căn cước/CCCD record (even if the physical card itself is worn or the printed expiry date has passed).
- Must be a Vietnamese citizen currently within Vietnam, or use the applicable overseas process where relevant (overseas process specifics out of scope for this initial pack).

## Processing Steps

1. Citizen submits the application form (in person or via the national public service portal / VNeID app where available) along with their current ID document.
2. Receiving agency verifies the citizen's identity and residence information, primarily via database lookup.
3. Portrait photo and biometric data (fingerprint, and iris where applicable) are captured on-site if not already current in the system.
4. Application is processed and the new card is produced.
5. Citizen collects the new card in person or, where available, via delivery.

## Citizen Journey

A citizen typically starts this process feeling mild obligation rather than urgency — an expiring card is rarely a crisis until it suddenly is (e.g., needed for an upcoming flight or bank appointment). The moment that matters most is being told, clearly and early, exactly what to bring and how long it will realistically take — this is precisely the "no wasted trip" promise `CITIZEN_CONSTITUTION.md` centers the whole platform on. Relief comes at the point of submission confirmation; anxiety can return during the waiting period if no status update is given.

## Common Mistakes

- Waiting until the card is already expired to start, then discovering the process takes longer than expected for something time-sensitive (e.g., upcoming travel).
- Assuming the physical household registration book is still required when, in most cases today, it is not.
- Not realizing a new photo will be taken on-site and arriving with an outdated expectation of the process (e.g., needing to bring their own photo).

## Typical Missing Documents

- A citizen occasionally arrives with only their expired card and no completed application form, expecting to fill it out only after being told to.
- Where residence information is *not* correctly reflected in the national database (a known transitional edge case), a citizen may be unexpectedly asked for a physical residence extract they did not bring.

## Frequently Asked Questions

**Q: Can I renew before my card actually expires?**
A: Generally yes, within a window before expiry — exact number of days/months unverified, pending confirmation.

**Q: Do I need to bring a photo?**
A: In most cases, no — a photo is captured on-site. See `PORTRAIT_PHOTO`.

**Q: What happens if I miss the mandatory renewal age milestone?**
A: Unknown — consequence (if any) and grace period are unverified; do not state a claim about this to a citizen until confirmed.
