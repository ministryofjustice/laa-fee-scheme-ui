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
                <h1 className="govuk-heading-xl">Fee Scheme = Phase 1 / FGF for advocacy</h1>

                <p className="govuk-body">
                    Fee scheme information etc
                </p>

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

            </main>
        </div>
    );
};

export default FeeSchemeFgfCounselAdvocacy;
