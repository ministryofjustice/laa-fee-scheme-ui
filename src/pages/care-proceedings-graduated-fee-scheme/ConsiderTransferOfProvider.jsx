import {useNavigate} from 'react-router-dom';
import React, {useState} from "react";

const ConsiderTransferOfProvider = () => {
    const navigate = useNavigate();
    const [providerTransferred, setProviderTransferred] = useState('');

    const handleProviderTransferred = (e) => {
        setProviderTransferred(e.target.value);
    };

    const handleContinue = () => {
        navigate('/calculate-fees');
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>

                <div className="govuk-radios" data-module="govuk-radios">
                    <label
                        htmlFor="width-20-input"
                        className="govuk-heading-s"
                        aria-hidden="false"
                    >
                        Has there been a provider transfer?
                    </label>
                    <div className="govuk-radios__item">
                        <input
                            className="govuk-radios__input"
                            id="provider-transferred-yes"
                            name="providerTransferred"
                            type="radio"
                            value="YES"
                            checked={providerTransferred === 'YES'}
                            onChange={handleProviderTransferred}
                        />
                        <label className="govuk-label govuk-radios__label" htmlFor="provider-transferred-yes">
                            Yes
                        </label>
                    </div>
                    <div className="govuk-radios__item">
                        <input
                            className="govuk-radios__input"
                            id="provider-transferred-no"
                            name="providerTransferred"
                            type="radio"
                            value="NO"
                            checked={providerTransferred === 'NO'}
                            onChange={handleProviderTransferred}
                        />
                        <label className="govuk-label govuk-radios__label" htmlFor="provider-transferred-no">
                            No
                        </label>
                    </div>
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
                        disabled={!providerTransferred}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ConsiderTransferOfProvider;
