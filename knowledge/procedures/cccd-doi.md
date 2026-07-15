---
procedureId: CCCD_REPLACEMENT
officialName: "Cấp đổi Căn cước do hư hỏng hoặc thay đổi thông tin"
aliases: ["Đổi CCCD", "Replace CCCD", "CCCD replacement", "Cấp đổi CCCD do sai thông tin"]
citizenFriendlyName: "Replace my Citizen ID because it's damaged or my information changed / Đổi thẻ Căn cước"
responsibleAuthority: "Ministry of Public Security — Police Department for Administrative Management of Social Order (PC06); processed at provincial/district police"
requiredDocuments: ["CURRENT_ID_DOCUMENT", "APPLICATION_FORM", "DAMAGE_OR_CHANGE_EVIDENCE"]
optionalDocuments: ["HOUSEHOLD_REGISTRATION_EXTRACT"]
governmentFees: "Unknown — pending verification [cite: THONG_TU_LE_PHI_CCCD, verified: false]"
expectedProcessingTime: "Unknown precise figure — pending verification [cite: NGHI_DINH_HUONG_DAN_CAN_CUOC, verified: false]"
relatedProcedures: ["CCCD_RENEWAL", "CCCD_REISSUE"]
legalReferences: ["LUAT_CAN_CUOC_2023", "NGHI_DINH_HUONG_DAN_CAN_CUOC", "THONG_TU_ANH_CHAN_DUNG", "THONG_TU_LE_PHI_CCCD"]
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for process structure; Low/Unknown for exact fees, processing days, and article-level citations — none independently verified"
assumptions:
  - "Assumes 'damage' and 'information change' are handled as two branches of one Replacement procedure rather than two separate procedures — this structural choice should be confirmed by a reviewer against current administrative practice."
---

## Short Description

Replacing a Citizen ID (Căn cước / CCCD) that is still within its normal validity period but is either physically damaged, illegible, or no longer accurately reflects the citizen's information (e.g., a legal name change).

## Purpose

Ensures a citizen's identity document remains both physically usable and factually accurate between renewal cycles, without waiting for the next scheduled renewal.

## Applicable Citizens

- Citizens whose current card is damaged, cracked, or has an illegible chip/printed area.
- Citizens who have undergone a legally recorded change relevant to their identity record (name, in some cases significant appearance change) since their card was issued.
- **Not applicable** to a card that is simply expired with no damage or information change — see `CCCD_RENEWAL` instead.
- **Not applicable** to a lost or stolen card — see `CCCD_REISSUE` instead.

## Prerequisites

- Must hold the current (even if damaged) card, or in the information-change branch, hold the official record proving the underlying change.
- The underlying change (if applicable) must already be officially recorded elsewhere (e.g., a marriage certificate or court order) before this procedure can incorporate it — this procedure updates the ID to reflect an already-official change, it does not itself register the change.

## Processing Steps

1. Citizen determines which branch applies: damage or information change (see `DAMAGE_OR_CHANGE_EVIDENCE`'s note on these being mutually exclusive sub-cases).
2. Citizen submits the application form, the current/damaged card, and — for the information-change branch — the official document proving the change.
3. Receiving agency verifies the reason for replacement and updates the record accordingly.
4. Photo and biometric data are re-captured or reconfirmed as needed.
5. New card is produced and collected.

## Citizen Journey

This procedure is often triggered by an already-stressful event for the information-change branch (a recent legal name change, for instance) — the AI's tone here should acknowledge that this is administrative housekeeping following a life event, not treat it as a routine card replacement identical to a simple damage case. For the damage branch, the citizen's dominant feeling is usually mild embarrassment or frustration at their own card being unusable; reassurance that this is common and quickly resolved matters more here than in most other procedures.

## Common Mistakes

- In the information-change branch, arriving without the official document proving the change, assuming the ID office can update the record based on the citizen's word alone.
- Not realizing damage severe enough to make the chip unreadable may require a different verification path than cosmetic damage — exact threshold unverified.

## Typical Missing Documents

- The proof-of-change document (e.g., marriage certificate) left at home, especially when the citizen assumes the two life events (the marriage registration and the ID update) are handled by the same office or process.

## Frequently Asked Questions

**Q: My card still has time before it expires but the chip won't scan — can I still get it replaced?**
A: Likely yes, under the damage branch, but exact verification threshold for "damaged enough to qualify" is unverified.

**Q: I legally changed my name — does this happen automatically or do I need to apply?**
A: Requires an active application under this procedure; it is not automatic even after the name change itself is officially recorded elsewhere — exact timing/deadline unverified.
