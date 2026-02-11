import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProceedingTypes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [proceedingType, setProceedingType] = useState('');
    const [lawType, setLawType] = useState('');
    
    const aspectOfWork = location.state?.aspectOfWork || 'Unknown';

    const proceedingTypeOptions = [
        { value: '', label: 'Select a proceeding type' },
        { value: 'INTERIM_HEARING', label: 'Interim hearing' },
        { value: 'FINAL_HEARING', label: 'Final hearing' },
        { value: 'ADVOCATES_MEETING', label: 'Advocates\' meeting' },
        { value: 'CONFERENCES_OPINIONS', label: 'Conferences / Opinions' },
        { value: 'APPEAL_REVIEW', label: 'Appeal / review' }
    ];

    const handleProceedingTypeChange = (e) => {
        setProceedingType(e.target.value);
    };

    const handleLawTypeChange = (e) => {
        setLawType(e.target.value);
    };

    const handleContinue = () => {
        console.log('Proceeding type:', proceedingType);
        console.log('Law type:', lawType);
        console.log('Aspect of work:', aspectOfWork);
        
        const stateData = {
            aspectOfWork,
            proceedingType,
            lawType
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
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-l">Proceeding details</h1>

                <div className="govuk-form-group">
                    <label className="govuk-label govuk-label--m" htmlFor="proceeding-type">
                        Proceeding type
                    </label>
                    <select
                        className="govuk-select govuk-!-width-two-thirds"
                        id="proceeding-type"
                        name="proceeding-type"
                        value={proceedingType}
                        onChange={handleProceedingTypeChange}
                    >
                        {proceedingTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="govuk-form-group">
                    <fieldset className="govuk-fieldset">
                        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                            Is this a public or private law case?
                        </legend>

                        <div className="govuk-radios" data-module="govuk-radios">
                            <div className="govuk-radios__item">
                                <input
                                    className="govuk-radios__input"
                                    id="law-type-public"
                                    name="lawType"
                                    type="radio"
                                    value="PUBLIC"
                                    checked={lawType === 'PUBLIC'}
                                    onChange={handleLawTypeChange}
                                />
                                <label className="govuk-label govuk-radios__label" htmlFor="law-type-public">
                                    Public law
                                </label>
                            </div>
                            <div className="govuk-radios__item">
                                <input
                                    className="govuk-radios__input"
                                    id="law-type-private"
                                    name="lawType"
                                    type="radio"
                                    value="PRIVATE"
                                    checked={lawType === 'PRIVATE'}
                                    onChange={handleLawTypeChange}
                                />
                                <label className="govuk-label govuk-radios__label" htmlFor="law-type-private">
                                    Private law
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4rem' }}>
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
                        disabled={!proceedingType || !lawType}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProceedingTypes;
