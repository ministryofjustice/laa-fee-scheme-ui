/**
 * Table 1(b): Other Public Law Case – graduated fees
 * Schedule 3, Part 1 - The Civil Legal Aid (Remuneration) Regulations 2013
 * Point in time: 06/04/2020
 */

import { JudgeLevel } from './judgeLevelEnum';
import { FeeType } from './feeTypeEnum';

export class OtherPublicLawGraduatedFee {
    static description = 'Other Public Law Case – graduated fees';

    static fees = Object.freeze({
        [JudgeLevel.JUSTICES_LEGAL_ADVISER_OR_LAY_JUSTICES]: {
            [FeeType.INTERIM_HEARING_UNIT_1]: 75.83,
            [FeeType.INTERIM_HEARING_UNIT_2]: 189.59,
            [FeeType.CONFERENCE_FEE]: 127.71,
            [FeeType.OPINION_FEE]: 105.66,
            [FeeType.ADVOCATES_MEETING_FEE]: 128.16,
            [FeeType.FINAL_HEARING_FEE_PER_DAY]: 464.31,
        },
        [JudgeLevel.DISTRICT_JUDGE_LEVEL]: {
            [FeeType.INTERIM_HEARING_UNIT_1]: 83.39,
            [FeeType.INTERIM_HEARING_UNIT_2]: 208.53,
            [FeeType.CONFERENCE_FEE]: 127.71,
            [FeeType.OPINION_FEE]: 105.66,
            [FeeType.ADVOCATES_MEETING_FEE]: 140.99,
            [FeeType.FINAL_HEARING_FEE_PER_DAY]: 510.75,
        },
        [JudgeLevel.HIGH_COURT_JUDGE_LEVEL]: {
            [FeeType.INTERIM_HEARING_UNIT_1]: 100.08,
            [FeeType.INTERIM_HEARING_UNIT_2]: 250.20,
            [FeeType.CONFERENCE_FEE]: 127.71,
            [FeeType.OPINION_FEE]: 105.66,
            [FeeType.ADVOCATES_MEETING_FEE]: 169.20,
            [FeeType.FINAL_HEARING_FEE_PER_DAY]: 612.90,
        },
    });

    static getFee(judgeLevel, feeType) {
        return this.fees[judgeLevel]?.[feeType] ?? null;
    }

    static getFeesForJudgeLevel(judgeLevel) {
        return this.fees[judgeLevel] ?? null;
    }
}
