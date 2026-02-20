import React from 'react';

const durationBandOptions = [
    { value: '', label: 'Select duration band' },
    { value: 'INTERIM_HEARING_UNIT_1', label: 'Interim Hearing Unit 1' },
    { value: 'INTERIM_HEARING_UNIT_2', label: 'Interim Hearing Unit 2' },
    { value: 'MULTIPLE_UNIT_2S', label: 'Multiple Unit 2s' }
];

const judgeLevelOptions = [
    { value: '', label: 'Select Judge Level' },
    { value: 'MAGISTRATES_COURT_JUDGE', label: 'Magistrates\u2019 Court judge' },
    { value: 'DISTRICT_JUDGE', label: 'District Judge' },
    { value: 'CIRCUIT_JUDGE', label: 'Circuit Judge' },
    { value: 'HIGH_COURT_JUDGE', label: 'High Court Judge' },
    { value: 'DEPUTY_DISTRICT_JUDGE', label: 'Deputy District Judge' },
    { value: 'OTHER', label: 'Other' }
];

const HearingItem = ({ hearing, index, onUpdate, calculatedFee }) => {

    const handleChange = (field, value) => {
        onUpdate(hearing.id, { [field]: value });
    };

    return (
        <div style={{ border: '1px solid #b1b4b6', padding: '20px', marginBottom: '20px' }}>
            <h2 className="govuk-heading-m">Interim Hearing {index + 1}</h2>

            <div className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor={`hearing-date-${hearing.id}`}>
                    Date of Hearing
                </label>
                <input
                    className="govuk-input govuk-input--width-10"
                    id={`hearing-date-${hearing.id}`}
                    type="date"
                    value={hearing.hearingDate}
                    onChange={(e) => handleChange('hearingDate', e.target.value)}
                />
            </div>

            <div className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor={`duration-band-${hearing.id}`}>
                    Duration Band
                </label>
                <select
                    className="govuk-select govuk-!-width-two-thirds"
                    id={`duration-band-${hearing.id}`}
                    value={hearing.durationBand}
                    onChange={(e) => handleChange('durationBand', e.target.value)}
                >
                    {durationBandOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor={`judge-level-${hearing.id}`}>
                    Judge level
                </label>
                <select
                    className="govuk-select govuk-!-width-two-thirds"
                    id={`judge-level-${hearing.id}`}
                    value={hearing.judgeLevel}
                    onChange={(e) => handleChange('judgeLevel', e.target.value)}
                >
                    {judgeLevelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="govuk-form-group">
                <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                        Was this advocacy court-directed?
                    </legend>
                    <div className="govuk-radios govuk-radios--inline">
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={`court-directed-yes-${hearing.id}`}
                                name={`courtDirected-${hearing.id}`}
                                type="radio"
                                value="YES"
                                checked={hearing.courtDirected === 'YES'}
                                onChange={(e) => handleChange('courtDirected', e.target.value)}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={`court-directed-yes-${hearing.id}`}>
                                Yes
                            </label>
                        </div>
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={`court-directed-no-${hearing.id}`}
                                name={`courtDirected-${hearing.id}`}
                                type="radio"
                                value="NO"
                                checked={hearing.courtDirected === 'NO'}
                                onChange={(e) => handleChange('courtDirected', e.target.value)}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={`court-directed-no-${hearing.id}`}>
                                No
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>

            {calculatedFee !== null && calculatedFee !== undefined && (
                <div className="govuk-inset-text" style={{ borderLeftColor: '#1d70b8', marginBottom: 0 }}>
                    <p className="govuk-body" style={{ fontWeight: 'bold', marginBottom: 0 }}>
                        Fee: £{calculatedFee.toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default HearingItem;

export { durationBandOptions,  judgeLevelOptions};
