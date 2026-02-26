import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdvocateClaimOverview = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/fee-schemes');
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">🏛 Civil Family Claims Portal</h1>

                <h2 className="govuk-heading-l">Civil Legal Aid – Family Advocacy & Representation Schemes</h2>

                <h3 className="govuk-heading-m">Welcome</h3>
                <p className="govuk-body">
                    This service allows legal aid providers to submit and manage civil family claims under approved
                    remuneration schemes in England and Wales.
                </p>

                <p className="govuk-body">
                    Use this portal to record case details, calculate fees, and submit claims for assessment.
                </p>

                <h3 className="govuk-heading-s">Who this service is for</h3>
                <p className="govuk-body">This service is for:</p>
                <ul className="govuk-list govuk-list--bullet">
                    <li>Advocates</li>
                    <li>Solicitors</li>
                    <li>Barristers</li>
                    <li>Legal aid providers contracted under civil legal aid</li>
                </ul>
                <button 
                    className="govuk-button" 
                    data-module="govuk-button"
                    onClick={handleContinue}
                >
                    Continue to fee assessment
                </button>
            </main>
        </div>
    );
};

export default AdvocateClaimOverview;
