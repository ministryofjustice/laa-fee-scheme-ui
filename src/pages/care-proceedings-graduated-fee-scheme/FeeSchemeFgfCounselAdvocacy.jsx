import { useNavigate } from 'react-router-dom';
import React from "react";

const FeeSchemeFgfCounselAdvocacy = () => {
    const navigate = useNavigate();
    const fixedFeeAmount = 1000;

    const handleContinue = () => {
        navigate('/profit-costs', { state: { fixedFeeAmount } });
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">

                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>

                <p className="govuk-body">
                    Fee Scheme = Phase 1 / FGF for advocacy <br />
                    Fee scheme information etc
                </p>

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
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FeeSchemeFgfCounselAdvocacy;
