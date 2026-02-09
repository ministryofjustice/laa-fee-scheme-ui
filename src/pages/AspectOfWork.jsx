import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AspectOfWork = () => {
    const navigate = useNavigate();
    const [selectedAspect, setSelectedAspect] = useState('');

    const aspectOptions = [
        { value: '', label: 'Select an aspect of work' },
        { value: 'finance', label: 'Finance' },
        { value: 'private-law-children', label: 'Private Law Children' },
        { value: 'public-law-children', label: 'Public Law Children' },
        { value: 'other-public-law-children', label: 'Other Public Law Children' },
        { value: 'domestic-abuse', label: 'Domestic Abuse' },
    ];

    const handleChange = (e) => {
        setSelectedAspect(e.target.value);
    };

    const handleContinue = () => {
        // Handle continue logic here
        console.log('Selected aspect:', selectedAspect);
    };

    return (
        <div className="govuk-width-container" >
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Aspect of Work</h1>
                
                <div className="govuk-form-group">
                    <select
                        className="govuk-select"
                        id="aspect-select"
                        value={selectedAspect}
                        onChange={handleChange}
                    >
                        {aspectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
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
                        disabled={!selectedAspect}
                    >
                        Continue
                    </button>
                </div>
              </main>
        </div>
    );
};

export default AspectOfWork;
