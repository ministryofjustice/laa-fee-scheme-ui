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

  const applyEarlyResolutionSettlementFee = () => {
    console.log("Apply bolt-on Early Resolution/Settlement Fee");
  };

  const applyEnforcementProceedingsFee = () => {
    console.log("Apply bolt-on Enforcement Proceedings Fee");
  };

  const handleContinue = () => {
    // if finance and resolution at first app OR
    // Financial Dispute Resolution (FDR) hearing
    const isEarlyResolutionSettlement = false;
    if (isEarlyResolutionSettlement) {
      applyEarlyResolutionSettlementFee();
    }

    // if returned to court after final hearing for enforcement proceedings fee
    const isEnforcementProceeding = false;
    if (isEnforcementProceeding) {
      applyEnforcementProceedingsFee();
    }

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
