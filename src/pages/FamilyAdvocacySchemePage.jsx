import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchemeUIContext } from '../context/SchemeUIContext';

const FamilyAdvocacySchemePage = () => {
    const navigate = useNavigate();
    const { formData, updateFormData, resetFormData } = useSchemeUIContext();
    const [selectedAspect, setSelectedAspect] = useState(formData.aspectOfWork || '');

    // Reset all form data when entering this page
    useEffect(() => {
        resetFormData();
    }, []); // Only run once on mount

    const aspectOptions = [
        { value: 'private-law-finance', label: 'Private Law Finance' },
        { value: 'private-law-children', label: 'Private Law Children' },
        { value: 'care-and-supervision', label: 'Care and Supervision' },
        { value: 'other-public-law-children', label: 'Other Public Law Children' },
        { value: 'domestic-abuse', label: 'Private Law Domestic Abuse​' },
        { value: 'ancillary-relief', label: 'Ancillary Relief & Other Family Work​' },
    ];

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedAspect(value);
        updateFormData('aspectOfWork', value);
    };

    const handleContinue = () => {
        if (selectedAspect) {
            navigate('/proceeding-types', { 
                state: { aspectOfWork: selectedAspect }
            });
        }
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Family Advocacy Scheme (FAS)</h1>
                
                <h2 className="govuk-heading-l">Type of Family Proceedings :</h2>
                
                <div className="govuk-form-group">
                    <fieldset className="govuk-fieldset">
                        <div className="govuk-radios">
                            {aspectOptions.map((option) => (
                                <div key={option.value} className="govuk-radios__item">
                                    <input
                                        className="govuk-radios__input"
                                        id={`aspect-${option.value}`}
                                        name="aspect"
                                        type="radio"
                                        value={option.value}
                                        checked={selectedAspect === option.value}
                                        onChange={handleChange}
                                    />
                                    <label className="govuk-label govuk-radios__label" htmlFor={`aspect-${option.value}`}>
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
                        disabled={!selectedAspect}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FamilyAdvocacySchemePage;
