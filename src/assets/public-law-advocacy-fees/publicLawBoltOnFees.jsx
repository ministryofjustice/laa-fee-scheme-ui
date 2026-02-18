/**
 * Table 1(c): Public Law – bolt-on fees
 * Schedule 3, Part 1 - The Civil Legal Aid (Remuneration) Regulations 2013
 * Point in time: 06/04/2020
 */

import { BoltOnCategory } from './boltOnCategoryEnum';

export class PublicLawBoltOnFee {
    static description = 'Public Law – bolt-on fees';

    static fees = Object.freeze({
        [BoltOnCategory.CLIENT_ALLEGATIONS_OF_HARM]: {
            payableFor: 'Hearings',
            type: 'percentage',
            percentage: 25,
            description: '25% of Hearing Unit Fee',
        },
        [BoltOnCategory.CLIENT_LACK_OF_UNDERSTANDING]: {
            payableFor: 'Hearings',
            type: 'percentage',
            percentage: 25,
            description: '25% of Hearing Unit Fee',
        },
        [BoltOnCategory.EXPERT_CROSS_EXAMINATION]: {
            payableFor: 'Hearings',
            type: 'percentage',
            percentage: 25,
            description: '25% of Hearing Unit Fee',
        },
        [BoltOnCategory.EXCEPTIONAL_TRAVEL_FEE]: {
            payableFor: "Hearings, Advocates' Meetings and Conferences",
            type: 'fixed',
            amount: 32.04,
            description: '£32.04',
        },
    });

    static getBoltOn(category) {
        return this.fees[category] ?? null;
    }

    static calculateBoltOn(category, hearingUnitFee = 0) {
        const boltOn = this.fees[category];
        if (!boltOn) return null;

        if (boltOn.type === 'fixed') {
            return boltOn.amount;
        }
        if (boltOn.type === 'percentage') {
            return parseFloat(((boltOn.percentage / 100) * hearingUnitFee).toFixed(2));
        }
        return null;
    }
}
