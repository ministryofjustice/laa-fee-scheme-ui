import { useNavigate } from 'react-router-dom';
import React from "react";

const ConsiderWorkDoneQuantity = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/court-type', {
            state: {
                title: "Care Proceedings Graduated Fee Scheme (CPGFS)",
                nextPath: "/calculate-fees"
            }
        });
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>

                <label
                    htmlFor="profit-cost-input"
                    className="govuk-label"
                    aria-hidden="false"
                >
                    <h1 className="govuk-heading-l">
                        Consider Work Done Quantity
                    </h1>
                </label>

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

export default ConsiderWorkDoneQuantity;
