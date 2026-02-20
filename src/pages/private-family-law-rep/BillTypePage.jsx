import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonContainer from "../../components/ButtonContainer";
import NavButton from "../../components/NavButton";
import PageHeading from "../../components/PageHeading";
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import { useSchemeUIContext } from '../../context/SchemeUIContext';

const BillTypePage = () => {
  const navigate = useNavigate();

  const { updateFormData } = useSchemeUIContext();

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
    const value = e.target.value;
    setSelectedRadio(value);
    updateFormData("billType", value);
  };

  const handleContinue = () => {
    navigate("/court-type");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>
        
        <RadioButtonsPanel
          name="billType"
          heading="Select bill type"
          options={options}
          selectedRadio={selectedRadio}
          handleRadioChange={handleRadioChange}
          handleContinue={handleContinue}
        />

        <ButtonContainer>
          <BackButton />
          <NavButton onClick={handleContinue} disabled={!selectedRadio}>
            Continue
          </NavButton>
        </ButtonContainer>
      </main>
    </div>
  );
};

export default BillTypePage;
