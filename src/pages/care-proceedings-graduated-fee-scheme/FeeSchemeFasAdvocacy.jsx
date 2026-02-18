import React from 'react';
import {useNavigate} from 'react-router-dom';

const FeeSchemeFasAdvocacy = () => {
    const navigate = useNavigate();
    const fixedFeeAmount = 2000;
    const handleContinue = () => {
        navigate('/profit-costs', {state: {fixedFeeAmount}});
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>

                <p className="govuk-body">
                    Fee Scheme = Phase 2 / FAS for counsel advocacy <br/>
                    Fee scheme information etc
                </p>

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
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FeeSchemeFasAdvocacy;
