import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";

const ProviderLocationDatePage = () => {
  const navigate = useNavigate();

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "london",
      label: "London",
    },
    {
      value: "nonLondon",
      label: "Non-London",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    navigate("/private-family-law-representation-fee-type");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>

        <RadioButtonsPanel
          name="providerLocation"
          heading="Select provider location"
          options={options}
          selectedRadio={selectedRadio}
          handleRadioChange={handleRadioChange}
        />

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
