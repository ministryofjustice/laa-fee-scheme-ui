import React from 'react';
import { useNavigate } from 'react-router-dom';

const FamilyAdvocacySchemePage = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/aspect-of-work');
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Family Advocacy Scheme (FAS)</h1>
                
                <p className="govuk-body">
                    This is the Family Advocacy Scheme page.
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
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

export default FamilyAdvocacySchemePage;
