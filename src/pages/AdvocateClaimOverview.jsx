import React from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryRow from '../components/SummaryRow';

const AdvocateClaimOverview = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/fee-schemes');
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-l">Advocate Claim Overview</h1>

                <dl className="govuk-summary-list">
                    <SummaryRow label="Client name" value="Jane Doe" />
                    <SummaryRow label="Certificate number" value="123456789" />
                    <SummaryRow label="Category" value="Family – Public Law" />
                    <SummaryRow label="Certificate dates" value="01 Jan 2024 to 31 Dec 2024" />
                    <SummaryRow label="Advocate" value="John Smith" />
                    <SummaryRow label="Advocate role" value="Barrister" />
                    <SummaryRow label="Provider firm" value="Newcastle Solicitors" />
                </dl>

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
