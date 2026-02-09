import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ProviderLocationDatePage = () => {
  const navigate = useNavigate();

  const [selectedRadio, setSelectedRadio] = useState("");

  const providerLocationOptions = [
    {
      value: "London",
      label: "London",
    },
    {
      value: "NonLondon",
      label: "Non-London",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    navigate("/private-family-law-fee");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">Provider Location</h1>

        <div className="govuk-form-group">
          <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h1 className="govuk-fieldset__heading">
                Select provider location
              </h1>
            </legend>
            <div className="govuk-radios" data-module="govuk-radios">
              {providerLocationOptions
                .filter((option) => option.value !== "")
                .map((option) => (
                  <div key={option.value} className="govuk-radios__item">
                    <input
                      className="govuk-radios__input"
                      id={option.value}
                      name="providerLocations"
                      type="radio"
                      value={option.value}
                      checked={selectedRadio === option.value}
                      onChange={handleRadioChange}
                    />
                    <label
                      className="govuk-label govuk-radios__label"
                      htmlFor={option.value}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
            </div>
          </fieldset>
        </div>
        <div className="govuk-button-group">
          <button
            className="govuk-button"
            data-module="govuk-button"
            onClick={handleContinue}
            disabled={!selectedRadio}
          >
            Continue
          </button>
          <button
            className="govuk-button govuk-button--secondary"
            data-module="govuk-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProviderLocationDatePage;
