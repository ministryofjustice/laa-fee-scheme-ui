import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSchemeUIContext } from '../context/SchemeUIContext';

const ProceedingTypes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateFormData, updateMultipleFields } = useSchemeUIContext();
    const [proceedingType, setProceedingType] = useState('');
    
    const aspectOfWork = location.state?.aspectOfWork || 'Unknown';

    const proceedingTypeOptions = [
        { value: 'INTERIM_HEARING', label: 'Interim hearing' },
        { value: 'FINAL_HEARING', label: 'Final hearing' },
        { value: 'ADVOCATES_MEETING', label: 'Advocates\' meeting' },
        { value: 'CONFERENCES_OPINIONS', label: 'Conferences / Opinions' },
        { value: 'APPEAL_REVIEW', label: 'Appeal / review' }
    ];

    const handleProceedingTypeChange = (e) => {
        const value = e.target.value;
        setProceedingType(value);
        updateMultipleFields({
            proceedingType: value,
            // Reset all subsequent page data
            hearingDate: '',
            hearingType: '',
            numberOfInterimProceedings: '',
            interimHearings: [],
            durationBand: '',
            days: '',
            judgeLevel: '',
            courtDirected: '',
            isBoltonApplicable: '',
            boltonCategory: '',
            boltonItems: [],
            attendedAdvocatesMeetings: '',
            advocatesMeetings: []
        });
    };

    const handleContinue = () => {
        console.log('Proceeding type:', proceedingType);
        console.log('Aspect of work:', aspectOfWork);
        
        const stateData = {
            aspectOfWork,
            proceedingType
        };

        // Navigate based on proceeding type
        if (proceedingType === 'INTERIM_HEARING' || proceedingType === 'FINAL_HEARING') {
            navigate('/hearing', { state: stateData });
        } else if (proceedingType === 'ADVOCATES_MEETING') {
            navigate('/advocates-meetings', { state: stateData });
        } else {
            // For other types like APPEAL_REVIEW
            console.log('Proceeding type not yet implemented');
        }
    };

    return (
        <div className="govuk-width-container" style={{ maxWidth: 'calc(100% - 510px)' }}>
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Family Advocacy Scheme (FAS)</h1>

                <div className="govuk-form-group">
                    <fieldset className="govuk-fieldset">
                        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                            Proceeding Type
                        </legend>
                        <div className="govuk-radios">
                            {proceedingTypeOptions.map((option) => (
                                <div key={option.value} className="govuk-radios__item">
                                    <input
                                        className="govuk-radios__input"
                                        id={`proceeding-type-${option.value}`}
                                        name="proceeding-type"
                                        type="radio"
                                        value={option.value}
                                        checked={proceedingType === option.value}
                                        onChange={handleProceedingTypeChange}
                                    />
                                    <label className="govuk-label govuk-radios__label" htmlFor={`proceeding-type-${option.value}`}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem' }}>
                    <button
                        className="govuk-button govuk-button--secondary"
                        data-module="govuk-button"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>

                    <button
                        className="govuk-button"
                        data-module="govuk-button"
                        onClick={handleContinue}
                        disabled={!proceedingType}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProceedingTypes;
