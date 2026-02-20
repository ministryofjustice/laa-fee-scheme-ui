import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";

const PrivateFamilyLawRepresentationFeeTypePage = () => {
  const navigate = useNavigate();

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "profitCostsBelow",
      label: "Profit costs < 3x Fixed Fee",
      feeType: "fixed",
    },
    {
      value: "profitCostsAbove",
      label: "Profit costs > 3x Fixed Fee",
      feeType: "hourlyRate",
    },
    {
      value: "solicitorInstructed",
      label: "Solicitor instructed for < 24 hours",
      feeType: "hourlyRate",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    const selectedOption = options.find(
      (option) => option.value === selectedRadio,
    );
    if (selectedOption) {
      navigate("/private-family-law-representation-fee-type", {
        state: { feeType: selectedOption.feeType },
      });
    }
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>

        <RadioButtonsPanel
          name="feeType"
          heading="Select fee type"
          options={options}
          selectedRadio={selectedRadio}
          handleRadioChange={handleRadioChange}
        />
        <div className="govuk-button-group">
          <BackButton />
          <NavButton onClick={handleContinue} disabled={!selectedRadio}>
            Continue
          </NavButton>
        </div>
      </main>
    </div>
  );
};

export default PrivateFamilyLawRepresentationFeeTypePage;
