import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateFamilyLawRepresentationSchemePage = () => {
    const navigate = useNavigate();

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Private Family Law Representation Scheme (PFLRS)</h1>
                
                <p className="govuk-body">
                    This is the Private Family Law Representation Scheme page.
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

export default PrivateFamilyLawRepresentationSchemePage;
