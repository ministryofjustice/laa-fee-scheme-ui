/**
 * Judge Level enum and labels
 * Schedule 3, Part 1 - The Civil Legal Aid (Remuneration) Regulations 2013
 */

export const JudgeLevel = Object.freeze({
    JUSTICES_LEGAL_ADVISER_OR_LAY_JUSTICES: 'JUSTICES_LEGAL_ADVISER_OR_LAY_JUSTICES',
    DISTRICT_JUDGE_LEVEL: 'DISTRICT_JUDGE_LEVEL',
    HIGH_COURT_JUDGE_LEVEL: 'HIGH_COURT_JUDGE_LEVEL',
});

export const JudgeLevelLabels = Object.freeze({
    [JudgeLevel.JUSTICES_LEGAL_ADVISER_OR_LAY_JUSTICES]: "Justices' legal adviser or lay justices",
    [JudgeLevel.DISTRICT_JUDGE_LEVEL]: 'Judge of district judge level, judge of circuit judge level or costs judge',
    [JudgeLevel.HIGH_COURT_JUDGE_LEVEL]: 'Judge of High Court judge level',
});
