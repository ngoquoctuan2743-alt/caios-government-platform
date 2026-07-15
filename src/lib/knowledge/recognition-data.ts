/**
 * Sprint 01B -- Procedure Recognition.
 *
 * Deterministic matching data transcribed directly from the authored
 * Knowledge Library (`knowledge/goals/`, `knowledge/life-events/`,
 * `knowledge/affected-assets/`, `knowledge/procedures/`). Nothing here is a
 * new fact -- every phrase, alias, and graph edge below already exists in
 * that Knowledge Library's frontmatter; this module only reshapes it into a
 * form `procedure-recognizer.ts` can traverse without a markdown/YAML parser.
 *
 * Source of truth for graph edges:
 * - Goal -> Life Event: `knowledge/goals/index.json` `goalChain[...].lifeEvents`
 * - Goal -> Procedure (derived rollup): `knowledge/goals/index.json` `goalChain[...].procedures`
 * - Life Event -> Procedure: `knowledge/life-events/index.json` `lifeEventToProcedures`
 *   (that file states this is "the single source of truth for that
 *   relationship" -- used here as authoritative over any other file's rollup)
 * - Asset -> Procedure: each asset's own `relatedProcedures` frontmatter field
 * - Which procedures are actually authored: `knowledge/life-events/index.json`
 *   `procedureLibraryStatus.inLibrary`
 *
 * If a new Goal, Life Event, Affected Asset, or Procedure file is authored in
 * `knowledge/`, this file must be updated to match -- it is a transcription,
 * not an independent source.
 */

export interface ProcedureRecognitionEntry {
  procedureId: string;
  /** Whether an authored file exists in `knowledge/procedures/` for this id. */
  inLibrary: boolean;
  /** officialName + aliases + citizenFriendlyName, verbatim from frontmatter. */
  matchPhrases: string[];
}

export interface AssetRecognitionEntry {
  assetId: string;
  /** typicalCitizenExpressions, verbatim from frontmatter. */
  matchPhrases: string[];
  /** relatedProcedures, verbatim from frontmatter. */
  procedureIds: string[];
}

export interface LifeEventRecognitionEntry {
  lifeEventId: string;
  /** typicalExpressions + citizenLanguage fragments, verbatim from frontmatter. */
  matchPhrases: string[];
  /** lifeEventToProcedures[lifeEventId], from life-events/index.json. */
  procedureIds: string[];
  /** Affected Assets connected to this life event, for Chapter-required Asset-level disambiguation. */
  assetIds: string[];
}

export interface GoalRecognitionEntry {
  goalId: string;
  /** typicalCitizenExpressions, verbatim from frontmatter. */
  matchPhrases: string[];
  /** goalChain[goalId].lifeEvents, from goals/index.json. */
  lifeEventIds: string[];
  /** goalChain[goalId].procedures (derived rollup), from goals/index.json. */
  procedureIds: string[];
}

export const PROCEDURES: Record<string, ProcedureRecognitionEntry> = {
  CCCD_RENEWAL: {
    procedureId: "CCCD_RENEWAL",
    inLibrary: true,
    matchPhrases: [
      "Cấp đổi Căn cước do hết thời hạn sử dụng",
      "Gia hạn CCCD",
      "Renew CCCD",
      "Renew Citizen ID",
      "CCCD renewal",
      "Đổi CCCD hết hạn",
      "Renew my Citizen ID",
      "Gia hạn thẻ Căn cước",
    ],
  },
  CCCD_FIRST_ISSUANCE: {
    procedureId: "CCCD_FIRST_ISSUANCE",
    inLibrary: true,
    matchPhrases: [
      "Cấp Căn cước lần đầu",
      "Cấp mới CCCD",
      "First-time CCCD",
      "First Citizen ID issuance",
      "Làm CCCD lần đầu",
      "Get my first Citizen ID",
      "Làm thẻ Căn cước lần đầu",
    ],
  },
  CCCD_REPLACEMENT: {
    procedureId: "CCCD_REPLACEMENT",
    inLibrary: true,
    matchPhrases: [
      "Cấp đổi Căn cước do hư hỏng hoặc thay đổi thông tin",
      "Đổi CCCD",
      "Replace CCCD",
      "CCCD replacement",
      "Cấp đổi CCCD do sai thông tin",
      "Replace my Citizen ID because it's damaged",
      "Đổi thẻ Căn cước",
    ],
  },
  CCCD_REISSUE: {
    procedureId: "CCCD_REISSUE",
    inLibrary: true,
    matchPhrases: [
      "Cấp lại Căn cước do bị mất",
      "Cấp lại CCCD",
      "Reissue CCCD",
      "CCCD reissue after loss",
      "Báo mất CCCD",
      "Get a replacement for my lost Citizen ID",
      "Xin cấp lại CCCD bị mất",
    ],
  },
};

export const ASSETS: Record<string, AssetRecognitionEntry> = {
  CITIZEN_ID_CARD: {
    assetId: "CITIZEN_ID_CARD",
    matchPhrases: ["my ID card", "CCCD của tôi", "thẻ căn cước"],
    procedureIds: ["CCCD_REISSUE", "CCCD_RENEWAL", "CCCD_FIRST_ISSUANCE", "CCCD_REPLACEMENT"],
  },
  DRIVER_LICENSE: {
    assetId: "DRIVER_LICENSE",
    matchPhrases: ["my driver's license", "bằng lái xe của tôi"],
    procedureIds: ["DRIVER_LICENSE_REISSUE"],
  },
  HEALTH_INSURANCE_CARD: {
    assetId: "HEALTH_INSURANCE_CARD",
    matchPhrases: ["my health insurance card", "thẻ bảo hiểm y tế", "bảo hiểm y tế cho con tôi"],
    procedureIds: ["HEALTH_INSURANCE_CARD_REISSUE", "HEALTH_INSURANCE_REGISTRATION"],
  },
  PASSPORT: {
    assetId: "PASSPORT",
    matchPhrases: ["my passport", "hộ chiếu của tôi"],
    procedureIds: ["PASSPORT_REISSUE"],
  },
  RESIDENCE_INFORMATION: {
    assetId: "RESIDENCE_INFORMATION",
    matchPhrases: ["my registered address", "nơi đăng ký thường trú"],
    procedureIds: ["RESIDENCE_REGISTRATION"],
  },
};

export const LIFE_EVENTS: Record<string, LifeEventRecognitionEntry> = {
  LOST_WALLET: {
    lifeEventId: "LOST_WALLET",
    matchPhrases: [
      "Lost wallet",
      "lost bag with my documents",
      "Mất ví",
      "Mất giấy tờ tùy thân",
      "I lost my wallet, what do I do?",
      "Someone stole my bag and my ID was inside",
      "Mất ví có CCCD trong đó",
      "Bị móc túi mất giấy tờ",
    ],
    // Authoritative per life-events/index.json's lifeEventToProcedures.
    procedureIds: ["CCCD_REISSUE", "DRIVER_LICENSE_REISSUE", "HEALTH_INSURANCE_CARD_REISSUE"],
    assetIds: ["CITIZEN_ID_CARD", "DRIVER_LICENSE", "HEALTH_INSURANCE_CARD"],
  },
  EXPIRED_CITIZEN_ID: {
    lifeEventId: "EXPIRED_CITIZEN_ID",
    matchPhrases: [
      "My ID card is expiring",
      "expired",
      "CCCD của tôi hết hạn",
      "My ID card expires next month",
      "I think my CCCD is already expired",
      "CCCD của tôi sắp hết hạn",
      "Tôi cần gia hạn căn cước",
    ],
    procedureIds: ["CCCD_RENEWAL"],
    assetIds: ["CITIZEN_ID_CARD"],
  },
  FIRST_TIME_CITIZEN_ID: {
    lifeEventId: "FIRST_TIME_CITIZEN_ID",
    matchPhrases: [
      "Getting my first ID",
      "my child needs their first ID",
      "Làm CCCD lần đầu",
      "I'm turning 14 soon, what do I need for my first ID?",
      "My child needs to get their Citizen ID for the first time",
      "Con tôi cần làm căn cước lần đầu",
      "Tôi chưa từng có CCCD",
    ],
    procedureIds: ["CCCD_FIRST_ISSUANCE"],
    assetIds: ["CITIZEN_ID_CARD"],
  },
  MARRIAGE: {
    lifeEventId: "MARRIAGE",
    matchPhrases: [
      "Getting married",
      "just got married",
      "Kết hôn",
      "I just got married, what do I need to update?",
      "We're registering our marriage next month",
      "Tôi mới kết hôn, cần làm thủ tục gì?",
      "Đăng ký kết hôn cần giấy tờ gì",
    ],
    procedureIds: [
      "MARRIAGE_REGISTRATION",
      "HOUSEHOLD_REGISTRATION_UPDATE",
      "TAX_INFORMATION_UPDATE",
      "CITIZEN_INFORMATION_UPDATE",
    ],
    assetIds: ["RESIDENCE_INFORMATION"],
  },
  BIRTH_OF_CHILD: {
    lifeEventId: "BIRTH_OF_CHILD",
    matchPhrases: [
      "We just had a baby",
      "registering my child's birth",
      "Sinh con",
      "Đăng ký khai sinh",
      "We just had a baby, what do we need to register?",
      "How do I register my child's birth?",
      "Chúng tôi vừa sinh con, cần đăng ký khai sinh",
    ],
    procedureIds: ["BIRTH_REGISTRATION", "HOUSEHOLD_REGISTRATION_UPDATE", "HEALTH_INSURANCE_REGISTRATION"],
    assetIds: ["HEALTH_INSURANCE_CARD"],
  },
  DEATH_OF_RELATIVE: {
    lifeEventId: "DEATH_OF_RELATIVE",
    matchPhrases: [
      "A family member passed away",
      "I need to register a death",
      "Người thân qua đời",
      "Đăng ký khai tử",
      "My father passed away, what do I need to do?",
      "I need to register my mother's death",
      "Người thân tôi vừa mất, cần làm thủ tục gì",
    ],
    procedureIds: ["DEATH_REGISTRATION", "HOUSEHOLD_REGISTRATION_UPDATE", "INHERITANCE_PROCEDURES"],
    assetIds: [],
  },
  MOVING_RESIDENCE: {
    lifeEventId: "MOVING_RESIDENCE",
    matchPhrases: [
      "I'm moving house",
      "changing my address",
      "Chuyển nhà",
      "Thay đổi nơi cư trú",
      "I just moved to a new address, what do I need to update?",
      "How do I register my new place of residence?",
      "Tôi vừa chuyển nhà, cần đăng ký thường trú ở đâu",
    ],
    procedureIds: ["RESIDENCE_REGISTRATION", "CITIZEN_INFORMATION_UPDATE"],
    assetIds: ["RESIDENCE_INFORMATION"],
  },
  CHANGE_OF_NAME: {
    lifeEventId: "CHANGE_OF_NAME",
    matchPhrases: [
      "I legally changed my name",
      "Tôi đổi tên hợp pháp",
      "I legally changed my name, what do I need to update?",
      "My court-approved name change just went through",
      "Tôi vừa đổi tên, cần cập nhật CCCD không",
    ],
    procedureIds: ["CCCD_REPLACEMENT", "CITIZEN_INFORMATION_UPDATE", "HOUSEHOLD_REGISTRATION_UPDATE"],
    assetIds: ["CITIZEN_ID_CARD"],
  },
};

export const GOALS: Record<string, GoalRecognitionEntry> = {
  RECOVER_LOST_DOCUMENTS: {
    goalId: "RECOVER_LOST_DOCUMENTS",
    matchPhrases: [
      "I lost my documents and need to sort everything out",
      "I need to recover everything after losing my wallet",
      "Tôi cần khôi phục lại giấy tờ bị mất",
    ],
    lifeEventIds: ["LOST_WALLET"],
    procedureIds: [
      "CCCD_REISSUE",
      "DRIVER_LICENSE_REISSUE",
      "HEALTH_INSURANCE_CARD_REISSUE",
      "PASSPORT_REISSUE",
      "RESIDENCE_REGISTRATION",
    ],
  },
  TRAVEL_ABROAD: {
    goalId: "TRAVEL_ABROAD",
    matchPhrases: [
      "I'm traveling abroad next month, what do I need?",
      "I need my passport sorted before my trip",
      "Tôi sắp đi nước ngoài, cần chuẩn bị giấy tờ gì",
    ],
    lifeEventIds: ["EXPIRED_CITIZEN_ID", "FIRST_TIME_CITIZEN_ID", "LOST_WALLET"],
    procedureIds: [
      "CCCD_RENEWAL",
      "CCCD_FIRST_ISSUANCE",
      "CCCD_REISSUE",
      "PASSPORT_REISSUE",
      "DRIVER_LICENSE_REISSUE",
      "HEALTH_INSURANCE_CARD_REISSUE",
      "RESIDENCE_REGISTRATION",
    ],
  },
  START_A_FAMILY: {
    goalId: "START_A_FAMILY",
    matchPhrases: [
      "We're getting married and want to know what to prepare",
      "We're starting a family, what should we take care of first?",
      "Chúng tôi chuẩn bị kết hôn và lập gia đình",
    ],
    lifeEventIds: ["MARRIAGE", "BIRTH_OF_CHILD"],
    procedureIds: [
      "MARRIAGE_REGISTRATION",
      "HOUSEHOLD_REGISTRATION_UPDATE",
      "TAX_INFORMATION_UPDATE",
      "CITIZEN_INFORMATION_UPDATE",
      "BIRTH_REGISTRATION",
      "HEALTH_INSURANCE_REGISTRATION",
    ],
  },
  RAISE_A_CHILD: {
    goalId: "RAISE_A_CHILD",
    matchPhrases: [
      "What do I need to set up for my child?",
      "Making sure my child has everything they need on record",
      "Tôi cần chuẩn bị giấy tờ gì cho con",
    ],
    lifeEventIds: ["BIRTH_OF_CHILD"],
    procedureIds: ["BIRTH_REGISTRATION", "HEALTH_INSURANCE_REGISTRATION", "HOUSEHOLD_REGISTRATION_UPDATE"],
  },
  BUY_A_HOME: {
    goalId: "BUY_A_HOME",
    matchPhrases: ["I just bought a house, what do I need to update?", "Tôi vừa mua nhà, cần đăng ký gì"],
    lifeEventIds: ["MOVING_RESIDENCE"],
    procedureIds: ["RESIDENCE_REGISTRATION", "CITIZEN_INFORMATION_UPDATE"],
  },
  MOVE_TO_A_NEW_CITY: {
    goalId: "MOVE_TO_A_NEW_CITY",
    matchPhrases: [
      "I'm moving to a new city for work, what do I need to do?",
      "Tôi chuyển đến thành phố khác, cần đăng ký gì",
    ],
    lifeEventIds: ["MOVING_RESIDENCE"],
    procedureIds: ["RESIDENCE_REGISTRATION", "CITIZEN_INFORMATION_UPDATE"],
  },
  HEALTHCARE: {
    goalId: "HEALTHCARE",
    matchPhrases: ["I need to sort out health insurance", "Cần đăng ký bảo hiểm y tế"],
    lifeEventIds: ["BIRTH_OF_CHILD"],
    procedureIds: ["HEALTH_INSURANCE_REGISTRATION"],
  },
  FIND_EMPLOYMENT: {
    goalId: "FIND_EMPLOYMENT",
    matchPhrases: ["I just got a new job, what do I need to update?", "Tôi vừa xin được việc, cần đăng ký bảo hiểm xã hội không"],
    lifeEventIds: [],
    procedureIds: [],
  },
  RETIRE: {
    goalId: "RETIRE",
    matchPhrases: ["I'm retiring soon, what do I need to arrange?", "Tôi sắp nghỉ hưu, cần làm thủ tục gì"],
    lifeEventIds: [],
    procedureIds: [],
  },
  STUDY: {
    goalId: "STUDY",
    matchPhrases: [
      "My child is starting school, what do I need?",
      "I'm enrolling in university, what documents do I need?",
      "Con tôi chuẩn bị nhập học",
    ],
    lifeEventIds: [],
    procedureIds: [],
  },
};
