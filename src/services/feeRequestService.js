import axios from 'axios';

const apiUrl = import.meta.env.CERT_FEE_SCHEME_API_URL;
const apiToken = import.meta.env.CERT_FEE_SCHEME_API_TOKEN;
const advocacyFeeUrl = import.meta.env.CERT_FEE_SCHEME_ADVOCACY_FEE_URL;

const sanitiseFormData = (formData) => {
    if (!formData.boltonItems) return formData;
    return {
        ...formData,
        boltonItems: formData.boltonItems.map(({ id, ...rest }) => rest),
    };
};

export const submitAdvocacyFeeRequest = async (formData) => {
    const response = await axios.post(apiUrl, sanitiseFormData(formData), {
        headers: {
            Authorization: apiToken,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

// ---------- Advocacy Fee Calculation API ----------

// Maps UI aspectOfWork values to API proceedingTypeCode
const proceedingCodesFromAspect = Object.freeze({
    'care-and-supervision': 'CARE_SUPERVISION',
    'other-public-law-children': 'OTHER_PUBLIC_LAW',
});

// Maps UI judgeLevel values to API judgeLevelCode
const judgeCodesFromUI = Object.freeze({
    MAGISTRATES_COURT_JUDGE: 'MAGISTRATES_COURT',
    DISTRICT_JUDGE: 'DISTRICT_JUDGE',
    CIRCUIT_JUDGE: 'CIRCUIT_JUDGE',
    HIGH_COURT_JUDGE: 'HIGH_COURT',
    DEPUTY_DISTRICT_JUDGE: 'DEPUTY_DISTRICT_JUDGE',
    OTHER: 'OTHER',
});

// Maps UI durationBand values to API hearingBandCode
const hearingBandCodesFromDuration = Object.freeze({
    INTERIM_HEARING_UNIT_1: 'UNIT_1',
    INTERIM_HEARING_UNIT_2: 'UNIT_2',
    MULTIPLE_UNIT_2S: 'MULTIPLE_UNIT_2S',
});

/**
 * Calls the backend advocacy fee calculation endpoint.
 *
 * @param {Object} params
 * @param {string} params.aspectOfWork   - UI aspect of work (e.g. 'care-and-supervision')
 * @param {string} params.judgeLevel     - UI judge level (e.g. 'HIGH_COURT_JUDGE')
 * @param {string} params.hearingType    - 'INTERIM_HEARING' or 'FINAL_HEARING'
 * @param {string} [params.durationBand] - UI duration band (e.g. 'INTERIM_HEARING_UNIT_1')
 * @returns {Promise<{amount: number, schemeCode: string, proceedingTypeCode: string, judgeLevelCode: string, hearingTypeCode: string, hearingBandCode: string}>}
 */
export const calculateAdvocacyFee = async ({ aspectOfWork, judgeLevel, hearingType, durationBand }) => {
    const proceedingTypeCode = proceedingCodesFromAspect[aspectOfWork];
    const judgeLevelCode = judgeCodesFromUI[judgeLevel];

    const requestBody = {
        schemeCode: 'FAS',
        proceedingTypeCode,
        judgeLevelCode,
        hearingTypeCode: hearingType,
    };

    const hearingBandCode = hearingBandCodesFromDuration[durationBand];
    if (hearingBandCode) {
        requestBody.hearingBandCode = hearingBandCode;
    }

    const response = await axios.post(advocacyFeeUrl, requestBody, {
        headers: {
            Authorization: apiToken,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
