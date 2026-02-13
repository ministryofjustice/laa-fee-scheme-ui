import { useNavigate } from 'react-router-dom';
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import React, {useState} from "react";

const PersonRepresented = () => {
    const navigate = useNavigate();
    const [selectedRadio, setSelectedRadio] = useState("");
    const [numberOfPersons, setNumberOfPersons] = useState("");

    const handleContinue = () => {
        navigate('/court-type', {
            state: {
                title: "Care Proceedings Graduated Fee Scheme (CPGFS)",
                nextPath: "/calculate-fees"
            }
        });
    };

    const options = [
        {
            value: "Children",
            label: "Children",
        },
        {
            value: "ParentParentalResponsibility",
            label: "Parents and those with parental responsibility (including grandparents who have PR)",
        },
        {
            value: "JoinedParties",
            label: "Joined parties",
        }
    ];

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNumberOfPersons(e.target.value);
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>

                <RadioButtonsPanel
                    name="representationType"
                    heading="Select person represented"
                    options={options}
                    selectedRadio={selectedRadio}
                    handleRadioChange={handleRadioChange}
                />

                <div id="width-20" className="govuk-form-group">
                    <label
                        htmlFor="width-20-input"
                        className="govuk-heading-s"
                        aria-hidden="false"
                    >
                        Number of persons represented
                    </label>
                    <input
                        id="width-20-input"
                        className="govuk-input"
                        style={{ maxWidth: '22.86ex' }}
                        type="number"
                        name="width-20"
                        value={numberOfPersons}
                        onChange={handleNumberChange}
                    />
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
                        disabled={!selectedRadio || !numberOfPersons}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default PersonRepresented;
