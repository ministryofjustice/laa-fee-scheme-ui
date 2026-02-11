import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeeSchemes = () => {
    const navigate = useNavigate();
    const [selectedScheme, setSelectedScheme] = useState('');
    const [selectedRadioScheme, setSelectedRadioScheme] = useState('');

    const schemeOptions = [
        { value: '', label: 'Select a fee scheme', path: '' },
        { value: 'scheme1', label: 'Family Advocacy Scheme (FAS)', path: '/family-advocacy-scheme' },
        { value: 'scheme2', label: 'Private Family Law Representation Scheme (PFLRS)', path: '/private-family-law-representation-scheme' },
        { value: 'scheme3', label: 'Care Proceedings Graduated Fee Scheme (CPGFS)', path: '/care-proceedings-graduated-fee-scheme' },
    ];

    const handleChange = (e) => {
        setSelectedScheme(e.target.value);
    };

    const handleRadioChange = (e) => {
        const value = e.target.value;
        setSelectedRadioScheme(value);
    };

    const handleContinue = () => {
        const selectedOption = schemeOptions.find(option => option.value === selectedRadioScheme);
        if (selectedOption && selectedOption.path) {
            navigate(selectedOption.path);
        }
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Fee Schemes</h1>
                <div className="govuk-form-group">
                    <fieldset className="govuk-fieldset">
                        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                        </legend>
                        <div className="govuk-radios">
                            {schemeOptions.filter(option => option.value !== '').map((option) => (
                                <div key={option.value} className="govuk-radios__item">
                                    <input
                                        className="govuk-radios__input"
                                        id={option.value}
                                        name="schemes"
                                        type="radio"
                                        value={option.value}
                                        checked={selectedRadioScheme === option.value}
                                        onChange={handleRadioChange}
                                    />
                                    <label className="govuk-label govuk-radios__label" htmlFor={option.value}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4rem' }}>
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
                        disabled={!selectedRadioScheme}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FeeSchemes;