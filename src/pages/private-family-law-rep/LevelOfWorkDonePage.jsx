import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import NavButton from "../../components/NavButton";
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import { useSchemeUIContext } from '../../context/SchemeUIContext';
import PageHeading from "../../components/PageHeading";

const LevelOfWorkDonePage = () => {
  const navigate = useNavigate();

  const { updateFormData } = useSchemeUIContext();

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "legalHelp",
      label: "Legal Help (higher)",
    },
    {
      value: "legalRep",
      label: "Legal Representation",
      fee: 300,
    },
  ];

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedRadio(value);
    updateFormData("levelOfWorkDone", value);
  };

  const handleContinue = () => {
    navigate("/fee-summary");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <RadioButtonsPanel
          name="levelOfWork"
          heading="Select level of work done"
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

export default LevelOfWorkDonePage;
