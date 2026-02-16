import { useNavigate, useLocation } from 'react-router-dom';
import React, {useState} from "react";

const ProfitCosts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fixedFeeAmount = location.state?.fixedFeeAmount || 0;
    const [profitCost, setProfitCost] = useState('');
    const handleProfitCost = (e) => setProfitCost(e.target.value);

    const handleContinue = () => {
        const profit = Number.parseFloat(profitCost);
        const fixed = Number(fixedFeeAmount);

        if (profit < fixed * 2) {
            return navigate('/person-represented');
        }
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

                <div id="cost" className="govuk-form-group">
                    <label
                        htmlFor="profit-cost-input"
                        className="govuk-label"
                        aria-hidden="false"
                    >
                        <h1 className="govuk-heading-l">
                            Enter Profit Costs
                        </h1>
                    </label>
                    <div
                        id="certification-hint"
                        className="govuk-hint"
                        aria-hidden="false"
                    >
                        For example,
                        <ul >
                            <li>Time spent drafting or considering documents</li>
                            <li>Attending the client to take instructions</li>
                            <li>Attending a hearing as advocate to represent the client</li>
                            <li>Travelling</li>
                            <li>Waiting</li>
                            <li>Letters and telephone calls</li>
                        </ul>
                    </div>
                    <div className="govuk-input__wrapper">
                        <div
                            className="govuk-input__prefix"
                            aria-hidden="true"
                        >
                            £
                        </div>
                        <input
                            id="cost-input"
                            className="govuk-input"
                            style={{ maxWidth: '10.81ex' }}
                            type="Number"
                            name="profit-cost"
                            onChange={handleProfitCost}
                        />
                    </div>
                </div>

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
                        disabled={!profitCost}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProfitCosts;
