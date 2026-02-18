/**
 * Fee Type enum, codes, and labels
 * Schedule 3, Part 1 - The Civil Legal Aid (Remuneration) Regulations 2013
 * Scheme: FAS_2020 (Family Advocacy Scheme 2020)
 */

export const FeeType = Object.freeze({
    INTERIM_HEARING_UNIT_1: 'INTERIM_HEARING_UNIT_1',
    INTERIM_HEARING_UNIT_2: 'INTERIM_HEARING_UNIT_2',
    CONFERENCE_FEE: 'CONFERENCE_FEE',
    OPINION_FEE: 'OPINION_FEE',
    ADVOCATES_MEETING_FEE: 'ADVOCATES_MEETING_FEE',
    FINAL_HEARING_FEE_PER_DAY: 'FINAL_HEARING_FEE_PER_DAY',
});

/**
 * Short unique codes for each fee type column.
 * Used for identification in billing and claim submissions.
 */
export const FeeTypeCodes = Object.freeze({
    [FeeType.INTERIM_HEARING_UNIT_1]: 'FAS_IHU1',
    [FeeType.INTERIM_HEARING_UNIT_2]: 'FAS_IHU2',
    [FeeType.CONFERENCE_FEE]: 'FAS_CONF',
    [FeeType.OPINION_FEE]: 'FAS_OPIN',
    [FeeType.ADVOCATES_MEETING_FEE]: 'FAS_ADVMTG',
    [FeeType.FINAL_HEARING_FEE_PER_DAY]: 'FAS_FHDAY',
});

export const FeeTypeLabels = Object.freeze({
    [FeeType.INTERIM_HEARING_UNIT_1]: 'Interim Hearing Unit 1 (up to 1 hour)',
    [FeeType.INTERIM_HEARING_UNIT_2]: 'Interim Hearing Unit 2 (up to 2.5 hours)',
    [FeeType.CONFERENCE_FEE]: 'Conference fee',
    [FeeType.OPINION_FEE]: 'Opinion fee',
    [FeeType.ADVOCATES_MEETING_FEE]: "Advocates' Meeting Fee",
    [FeeType.FINAL_HEARING_FEE_PER_DAY]: 'Final Hearing Fee (per day)',
});
