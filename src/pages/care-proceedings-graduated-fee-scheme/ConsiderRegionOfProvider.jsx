import {useNavigate} from 'react-router-dom';
import React, {useState} from "react";

const ConsiderRegionOfProvider = () => {
    const navigate = useNavigate();
    const [selectedRegionOption, setSelectedRegionOption] = useState("");

    const options = [
        {value: '', label: 'Select a region'},
        {value: 'region1', label: 'region one'},
        {value: 'region2', label: 'region two'},
        {value: 'region3', label: 'region three'},
        {value: 'region4', label: 'region four'},
        {value: 'region5', label: 'region five'},
    ];

    const handleOptionChange = (e) => {
        setSelectedRegionOption(e.target.value);
    }

    const handleContinue = () => {
        navigate('/consider-transfer-provider');
    }

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>

                <div className="govuk-form-group">
                    <label
                        htmlFor="width-20-input"
                        className="govuk-heading-s"
                        aria-hidden="false"
                    >
                        What is the region of the provider?
                    </label>
                    <select
                        className="govuk-select"
                        id="aspect-select"
                        value={selectedRegionOption}
                        onChange={handleOptionChange}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', gap: '4rem'}}>
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
                        disabled={!selectedRegionOption}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ConsiderRegionOfProvider;
