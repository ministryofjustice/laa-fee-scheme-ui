import React from 'react';
import { useNavigate } from 'react-router-dom';

// Simple function to generate a unique reference number
function generateReferenceNumber() {
    const now = new Date();
    return 'REF-' + now.getFullYear() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') +
        '-' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

const SubmissionConfirmationPage = () => {
    const navigate = useNavigate();
    const referenceNumber = generateReferenceNumber();

    return (
        <div className="govuk-width-container" style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingBottom: '40px' }}>
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Submission complete</h1>
                <div className="govuk-panel govuk-panel--confirmation" style={{ marginBottom: '2rem' }}>
                    <h2 className="govuk-panel__title">Your form has been submitted</h2>
                    <div className="govuk-panel__body">
                        Reference number: <strong>{referenceNumber}</strong>
                    </div>
                </div>
                <p className="govuk-body">We have received your details. Please keep your reference number safe for future correspondence.</p>
                <button className="govuk-button" data-module="govuk-button" onClick={() => navigate('/')}>Return to start</button>
            </main>
        </div>
    );
};

export default SubmissionConfirmationPage;
