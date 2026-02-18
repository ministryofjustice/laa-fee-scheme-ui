import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FeeSchemes.css';

const FeeSchemes = () => {
    const navigate = useNavigate();
    const [selectedScheme, setSelectedScheme] = useState('');
    const [selectedCardScheme, setSelectedCardScheme] = useState('');

    const schemeOptions = [
        { value: 'scheme1', label: 'Family Advocacy Scheme (FAS)', path: '/family-advocacy-scheme', description: 'For family advocacy work.' },
        { value: 'scheme2', label: 'Private Family Law Representation Scheme (PFLRS)', path: '/private-family-law-representation-scheme', description: 'For private family law representation.' },
        { value: 'scheme3', label: 'Care Proceedings Graduated Fee Scheme (CPGFS)', path: '/care-proceedings-graduated-fee-scheme', description: 'For care proceedings.' },
    ];

    const handleCardSelect = (value) => {
        setSelectedCardScheme(value);
    };

    const handleContinue = () => {
        const selectedOption = schemeOptions.find(option => option.value === selectedCardScheme);
        if (selectedOption && selectedOption.path) {
            navigate(selectedOption.path);
        }
    };

    return (
        <div className="govuk-width-container fee-schemes-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Fee Schemes</h1>
                <div className="fee-schemes-card-row">
                    {schemeOptions.map(option => (
                        <div className="fee-schemes-card-col" key={option.value}>
                            <div
                                className={`fee-schemes-card${selectedCardScheme === option.value ? ' selected' : ''}`}
                                tabIndex={0}
                                role="button"
                                aria-pressed={selectedCardScheme === option.value}
                                onClick={() => handleCardSelect(option.value)}
                                onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleCardSelect(option.value); }}
                            >
                                <h2 className="govuk-heading-m fee-schemes-heading">{option.label}</h2>
                                <p className="govuk-body fee-schemes-desc">{option.description}</p>
                                {selectedCardScheme === option.value && (
                                    <span className="govuk-visually-hidden">Selected</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="fee-schemes-actions-row">
                    <div className="fee-schemes-actions">
                        <button
                            className="govuk-button govuk-button--secondary"
                            data-module="govuk-button"
                            onClick={() => navigate('/')}
                        >
                            Back
                        </button>

                        <button
                            className="govuk-button"
                            data-module="govuk-button"
                            onClick={handleContinue}
                            disabled={!selectedCardScheme}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FeeSchemes;