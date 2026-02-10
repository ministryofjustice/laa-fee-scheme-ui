import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavButton from "../components/NavButton";
import BackButton from "../components/BackButton";
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
          <NavButton onClick={handleContinue} disabled={!selectedRadio}>
            Continue
          </NavButton>
          <BackButton />
        </div>
      </main>
    </div>
  );
};

export default ProviderLocationDatePage;
