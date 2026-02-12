import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeeSchemeFasAdvocacy = () => {
    const navigate = useNavigate();
    const fixedFeeAmount = 2000;
    const handleContinue = () => {
        navigate('/profit-costs', { state: { fixedFeeAmount } });
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Fee Scheme = Phase 2 / FAS for counsel advocacy</h1>

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

export default FeeSchemeFasAdvocacy;
