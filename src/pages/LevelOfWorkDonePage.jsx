import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";

const LevelOfWorkDonePage = () => {
  const navigate = useNavigate();

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "legalHelp",
      label: "Legal Help (higher)",
    },
    {
      value: "legalRep",
      label: "Legal Representation",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    navigate("/calculate-fees");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>

        <RadioButtonsPanel
          name="levelOfWork"
          heading="Select level of work done"
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

export default LevelOfWorkDonePage;
