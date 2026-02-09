import React from 'react';
import { useNavigate } from 'react-router-dom';

const CareProceedingsGraduatedFeeSchemePage = () => {
    const navigate = useNavigate();

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>
                
                <p className="govuk-body">
                    This is the Care Proceedings Graduated Fee Scheme page.
                </p>

                <button
                    className="govuk-button govuk-button--secondary"
                    data-module="govuk-button"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </main>
        </div>
    );
};

export default CareProceedingsGraduatedFeeSchemePage;
