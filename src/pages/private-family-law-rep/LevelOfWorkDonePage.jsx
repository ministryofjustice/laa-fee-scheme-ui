import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import NavButton from "../../components/NavButton";
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import { useSchemeUIContext } from '../../context/SchemeUIContext';
import FeeTotal from "../../components/FeeTotal";
import PageHeading from "../../components/PageHeading";

const LevelOfWorkDonePage = () => {
  const navigate = useNavigate();

  const { addFee, getFeeTotal } = useSchemeUIContext();

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "legalHelp",
      label: "Legal Help (higher)",
      fee: 250,
    },
    {
      value: "legalRep",
      label: "Legal Representation",
      fee: 300,
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    const selectedOption = options.find(
      (option) => option.value === selectedRadio,
    );
    addFee("Level Of Work Fee", selectedOption.fee);
    navigate("/calculate-fees");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <FeeTotal value={getFeeTotal()} />

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
