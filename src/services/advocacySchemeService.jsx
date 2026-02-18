/**
 * Public Law Advocacy Fee Service
 *
 * Provides methods to look up fees for a given case type, hearing type,
 * judge/court level, and optional bolt-on or bundle payment selections.
 *
 * Reference: Schedule 3, Part 1 – The Civil Legal Aid (Remuneration) Regulations 2013
 * https://www.legislation.gov.uk/uksi/2013/422/schedule/3/part/1/2020-04-06
 */

import {
    CareSupervisionGraduatedFee,
    OtherPublicLawGraduatedFee,
    PublicLawBoltOnFee,
    FeeType,
    JudgeLevel,
} from '../assets/public-law-advocacy-fees';

// ---------- Case Type ----------

export const CaseType = Object.freeze({
    CARE_SUPERVISION: 'CARE_SUPERVISION',
    OTHER_PUBLIC_LAW: 'OTHER_PUBLIC_LAW',
});

export const CaseTypeLabels = Object.freeze({
    [CaseType.CARE_SUPERVISION]: 'Care or supervision proceedings (s.31 Children Act 1989)',
    [CaseType.OTHER_PUBLIC_LAW]: 'Other Public Law Case',
});

// ---------- UI → Service Mappings ----------

/**
 * Maps the UI judge-level values to the service's JudgeLevel enum.
 * Per the legislation, district judge, circuit judge, deputy district judge and costs judge
 * all fall under the same fee tier.
 */
const judgeLevelMapping = Object.freeze({
    MAGISTRATES_COURT_JUDGE: JudgeLevel.JUSTICES_LEGAL_ADVISER_OR_LAY_JUSTICES,
    DISTRICT_JUDGE: JudgeLevel.DISTRICT_JUDGE_LEVEL,
    CIRCUIT_JUDGE: JudgeLevel.DISTRICT_JUDGE_LEVEL,
    DEPUTY_DISTRICT_JUDGE: JudgeLevel.DISTRICT_JUDGE_LEVEL,
    HIGH_COURT_JUDGE: JudgeLevel.HIGH_COURT_JUDGE_LEVEL,
    OTHER: JudgeLevel.DISTRICT_JUDGE_LEVEL,
});

/**
 * Maps the UI aspectOfWork value to the service's CaseType enum.
 */
const aspectOfWorkToCaseType = Object.freeze({
    'care-and-supervision': CaseType.CARE_SUPERVISION,
    'other-public-law-children': CaseType.OTHER_PUBLIC_LAW,
});

// ---------- Service ----------

export class PublicLawFeeService {

    /**
     * Maps a UI judge-level value to the service JudgeLevel enum.
     * @param {string} uiJudgeLevel - e.g. 'DISTRICT_JUDGE', 'HIGH_COURT_JUDGE'
     * @returns {string|null} JudgeLevel enum value
     */
    static mapJudgeLevel(uiJudgeLevel) {
        return judgeLevelMapping[uiJudgeLevel] ?? null;
    }

    /**
     * Maps a UI aspectOfWork value to the CaseType enum.
     * @param {string} aspectOfWork - e.g. 'care-and-supervision'
     * @returns {string|null} CaseType enum value
     */
    static mapAspectOfWorkToCaseType(aspectOfWork) {
        return aspectOfWorkToCaseType[aspectOfWork] ?? null;
    }

    /**
     * Returns the fee-data class for the given case type.
     */
    static _getFeeClass(caseType) {
        switch (caseType) {
            case CaseType.CARE_SUPERVISION:
                return CareSupervisionGraduatedFee;
            case CaseType.OTHER_PUBLIC_LAW:
                return OtherPublicLawGraduatedFee;
            default:
                return null;
        }
    }

    // ---- Convenience: Calculate fee from UI values directly ----

    /**
     * Calculate the hearing fee from raw UI values.
     *
     * @param {string} aspectOfWork   - UI aspect of work (e.g. 'care-and-supervision')
     * @param {string} uiJudgeLevel   - UI judge level (e.g. 'DISTRICT_JUDGE')
     * @param {string} hearingType    - 'INTERIM_HEARING' or 'FINAL_HEARING'
     * @param {string} [durationBand] - For interim: 'INTERIM_HEARING_UNIT_1', 'INTERIM_HEARING_UNIT_2', or 'MULTIPLE_UNIT_2S'
     * @param {number} [days]         - For final hearings: number of days
     * @returns {number|null}
     */
    static calculateHearingFeeFromUI(aspectOfWork, uiJudgeLevel, hearingType, durationBand, days) {
        const caseType = this.mapAspectOfWorkToCaseType(aspectOfWork);
        const judgeLevel = this.mapJudgeLevel(uiJudgeLevel);
        if (!caseType || !judgeLevel) return null;

        if (hearingType === 'INTERIM_HEARING') {
            if (durationBand === 'MULTIPLE_UNIT_2S') {
                // Multiple Unit 2s: fee is the Unit 2 fee (caller multiplies by count if needed)
                return this.getInterimHearingUnit2Fee(caseType, judgeLevel);
            }
            // durationBand is either INTERIM_HEARING_UNIT_1 or INTERIM_HEARING_UNIT_2
            return this.getHearingFee(caseType, judgeLevel, durationBand);
        }

        if (hearingType === 'FINAL_HEARING') {
            return this.getFinalHearingTotalFee(caseType, judgeLevel, parseInt(days));
        }

        return null;
    }

    // ---- Interim Hearing Fees ----

    /**
     * Get the Interim Hearing Unit 1 fee (up to 1 hour).
     * @param {string} caseType  - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @returns {number|null}
     */
    static getInterimHearingUnit1Fee(caseType, judgeLevel) {
        const feeClass = this._getFeeClass(caseType);
        return feeClass?.getFee(judgeLevel, FeeType.INTERIM_HEARING_UNIT_1) ?? null;
    }

    /**
     * Get the Interim Hearing Unit 2 fee (up to 2.5 hours).
     * @param {string} caseType  - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @returns {number|null}
     */
    static getInterimHearingUnit2Fee(caseType, judgeLevel) {
        const feeClass = this._getFeeClass(caseType);
        return feeClass?.getFee(judgeLevel, FeeType.INTERIM_HEARING_UNIT_2) ?? null;
    }

    // ---- Final Hearing Fee ----

    /**
     * Get the Final Hearing fee per day.
     * @param {string} caseType  - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @returns {number|null}
     */
    static getFinalHearingFeePerDay(caseType, judgeLevel) {
        const feeClass = this._getFeeClass(caseType);
        return feeClass?.getFee(judgeLevel, FeeType.FINAL_HEARING_FEE_PER_DAY) ?? null;
    }

    /**
     * Get the total Final Hearing fee for a given number of days.
     * @param {string} caseType  - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @param {number} days       - Number of hearing days
     * @returns {number|null}
     */
    static getFinalHearingTotalFee(caseType, judgeLevel, days) {
        const perDay = this.getFinalHearingFeePerDay(caseType, judgeLevel);
        if (perDay === null || !days || days <= 0) return null;
        return parseFloat((perDay * days).toFixed(2));
    }

    // ---- Conference & Opinion Fees ----

    /**
     * Get the Conference fee.
     * @param {string} caseType  - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @returns {number|null}
     */
    static getConferenceFee(caseType, judgeLevel) {
        const feeClass = this._getFeeClass(caseType);
        return feeClass?.getFee(judgeLevel, FeeType.CONFERENCE_FEE) ?? null;
    }

    /**
     * Get the Opinion fee.
     * @param {string} caseType  - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @returns {number|null}
     */
    static getOpinionFee(caseType, judgeLevel) {
        const feeClass = this._getFeeClass(caseType);
        return feeClass?.getFee(judgeLevel, FeeType.OPINION_FEE) ?? null;
    }

    // ---- Advocates' Meeting Fee ----

    /**
     * Get the Advocates' Meeting fee.
     * @param {string} caseType  - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @returns {number|null}
     */
    static getAdvocatesMeetingFee(caseType, judgeLevel) {
        const feeClass = this._getFeeClass(caseType);
        return feeClass?.getFee(judgeLevel, FeeType.ADVOCATES_MEETING_FEE) ?? null;
    }

    // ---- All Fees for a Judge Level ----

    /**
     * Get all graduated fees for a given case type and judge level.
     * @param {string} caseType  - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @returns {Object|null} Map of FeeType → amount
     */
    static getAllFees(caseType, judgeLevel) {
        const feeClass = this._getFeeClass(caseType);
        return feeClass?.getFeesForJudgeLevel(judgeLevel) ?? null;
    }

    // ---- Bolt-On Fees ----

    /**
     * Get the bolt-on fee definition for a category.
     * @param {string} boltOnCategory - BoltOnCategory enum value
     * @returns {Object|null} { payableFor, type, percentage|amount, description }
     */
    static getBoltOnFee(boltOnCategory) {
        return PublicLawBoltOnFee.getBoltOn(boltOnCategory);
    }

    /**
     * Calculate the bolt-on amount.
     * For percentage-based bolt-ons, pass the base hearing unit fee.
     * @param {string} boltOnCategory - BoltOnCategory enum value
     * @param {number} hearingUnitFee - The base hearing unit fee (needed for percentage bolt-ons)
     * @returns {number|null}
     */
    static calculateBoltOnAmount(boltOnCategory, hearingUnitFee = 0) {
        return PublicLawBoltOnFee.calculateBoltOn(boltOnCategory, hearingUnitFee);
    }

    // ---- Convenience: Hearing Fee by Type ----

    /**
     * Return the appropriate hearing fee based on hearing type and duration/days.
     *
     * For INTERIM_HEARING, pass feeType as INTERIM_HEARING_UNIT_1 or INTERIM_HEARING_UNIT_2.
     * For FINAL_HEARING, returns the per-day fee (multiply by days externally or use getFinalHearingTotalFee).
     *
     * @param {string} caseType   - CaseType enum value
     * @param {string} judgeLevel - JudgeLevel enum value
     * @param {string} feeType    - FeeType enum value
     * @returns {number|null}
     */
    static getHearingFee(caseType, judgeLevel, feeType) {
        const feeClass = this._getFeeClass(caseType);
        return feeClass?.getFee(judgeLevel, feeType) ?? null;
    }
}
