import { useNavigate, useLocation } from 'react-router-dom';

const ProfitCosts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fixedFeeAmount = location.state?.fixedFeeAmount || 0;

    console.log(fixedFeeAmount + '  xxxxxx');

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Profit Costs</h1>

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
                            type="text"
                            name="profit-cost"
                            defaultValue={fixedFeeAmount} // prefill input
                        />
                    </div>
                </div>

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

export default ProfitCosts;
