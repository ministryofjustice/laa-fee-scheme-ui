import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";

const BillTypePage = () => {
  const navigate = useNavigate();

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "finalBill",
      label: "Final Bill",
    },
    {
      value: "transfer",
      label: "Transfer",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    navigate("/court-type");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>

        <RadioButtonsPanel
          name="billType"
          heading="Select bill type"
          options={options}
          selectedRadio={selectedRadio}
          handleRadioChange={handleRadioChange}
          handleContinue={handleContinue}
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

export default BillTypePage;
