/**
 * Bolt-On Category enum and labels
 * Schedule 3, Part 1 - The Civil Legal Aid (Remuneration) Regulations 2013
 */

export const BoltOnCategory = Object.freeze({
    CLIENT_ALLEGATIONS_OF_HARM: 'CLIENT_ALLEGATIONS_OF_HARM',
    CLIENT_LACK_OF_UNDERSTANDING: 'CLIENT_LACK_OF_UNDERSTANDING',
    EXPERT_CROSS_EXAMINATION: 'EXPERT_CROSS_EXAMINATION',
    EXCEPTIONAL_TRAVEL_FEE: 'EXCEPTIONAL_TRAVEL_FEE',
});

export const BoltOnCategoryLabels = Object.freeze({
    [BoltOnCategory.CLIENT_ALLEGATIONS_OF_HARM]: 'Client – Allegations of Harm',
    [BoltOnCategory.CLIENT_LACK_OF_UNDERSTANDING]: 'Client – Lack of understanding etc',
    [BoltOnCategory.EXPERT_CROSS_EXAMINATION]: "Expert's cross examination",
    [BoltOnCategory.EXCEPTIONAL_TRAVEL_FEE]: 'Exceptional travel fee',
});
