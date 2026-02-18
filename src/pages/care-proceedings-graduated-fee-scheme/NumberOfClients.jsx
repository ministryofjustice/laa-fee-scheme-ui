import {useNavigate} from 'react-router-dom';
import React, {useState} from "react";

const NumberOfClients = () => {
    const navigate = useNavigate();
    const [numberOfClients, setNumberOfClients] = useState("");

    const handleNumberChange = (e) => {
        setNumberOfClients(e.target.value);
    };

    const handleContinue = () => {
        navigate('/consider-provider-region');
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>

                <div id="width-20" className="govuk-form-group">
                    <label
                        htmlFor="width-20-input"
                        className="govuk-heading-s"
                        aria-hidden="false"
                    >
                        Number of clients
                    </label>
                    <input
                        id="width-20-input"
                        className="govuk-input"
                        style={{maxWidth: '22.86ex'}}
                        type="number"
                        name="width-20"
                        value={numberOfClients}
                        onChange={handleNumberChange}
                    />
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', gap: '4rem'}}>
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
                        disabled={!numberOfClients}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default NumberOfClients;
