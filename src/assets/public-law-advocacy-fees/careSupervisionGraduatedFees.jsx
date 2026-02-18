/**
 * Table 1(a): Care or supervision proceedings under section 31 of the Children Act 1989 – graduated fees
 * Schedule 3, Part 1 - The Civil Legal Aid (Remuneration) Regulations 2013
 * Point in time: 06/04/2020
 */

import { JudgeLevel } from './judgeLevelEnum';
import { FeeType } from './feeTypeEnum';

export class CareSupervisionGraduatedFee {
    static description = 'Care or supervision proceedings under section 31 of the Children Act 1989 – graduated fees';

    static fees = Object.freeze({
        [JudgeLevel.JUSTICES_LEGAL_ADVISER_OR_LAY_JUSTICES]: {
            [FeeType.INTERIM_HEARING_UNIT_1]: 86.72,
            [FeeType.INTERIM_HEARING_UNIT_2]: 216.81,
            [FeeType.CONFERENCE_FEE]: 127.71,
            [FeeType.OPINION_FEE]: 105.66,
            [FeeType.ADVOCATES_MEETING_FEE]: 128.16,
            [FeeType.FINAL_HEARING_FEE_PER_DAY]: 506.25,
        },
        [JudgeLevel.DISTRICT_JUDGE_LEVEL]: {
            [FeeType.INTERIM_HEARING_UNIT_1]: 95.40,
            [FeeType.INTERIM_HEARING_UNIT_2]: 238.46,
            [FeeType.CONFERENCE_FEE]: 127.71,
            [FeeType.OPINION_FEE]: 105.66,
            [FeeType.ADVOCATES_MEETING_FEE]: 140.99,
            [FeeType.FINAL_HEARING_FEE_PER_DAY]: 556.88,
        },
        [JudgeLevel.HIGH_COURT_JUDGE_LEVEL]: {
            [FeeType.INTERIM_HEARING_UNIT_1]: 114.48,
            [FeeType.INTERIM_HEARING_UNIT_2]: 286.16,
            [FeeType.CONFERENCE_FEE]: 127.71,
            [FeeType.OPINION_FEE]: 105.66,
            [FeeType.ADVOCATES_MEETING_FEE]: 169.20,
            [FeeType.FINAL_HEARING_FEE_PER_DAY]: 668.25,
        },
    });

    static getFee(judgeLevel, feeType) {
        return this.fees[judgeLevel]?.[feeType] ?? null;
    }

    static getFeesForJudgeLevel(judgeLevel) {
        return this.fees[judgeLevel] ?? null;
    }
}
