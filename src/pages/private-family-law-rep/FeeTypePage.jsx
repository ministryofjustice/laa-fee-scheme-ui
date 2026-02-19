import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonContainer from "../../components/ButtonContainer";
import NavButton from "../../components/NavButton";
import PageHeading from "../../components/PageHeading";
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import { useSchemeUIContext } from '../../context/SchemeUIContext';

const PrivateFamilyLawRepresentationFeeTypePage = () => {
  const navigate = useNavigate();

  const { updateFormData } = useSchemeUIContext();

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
    const value = e.target.value;
    setSelectedRadio(value);
    const selectedOption = options.find(
      (option) => option.value === value,
    );
    updateFormData("feeType", selectedOption.feeType);
  };

  const handleContinue = () => {
    if (selectedRadio === "profitCostsBelow") {
      navigate("/bill-type");
    } else {
      navigate('/fee-summary');
    }
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <RadioButtonsPanel
          name="feeType"
          heading="Select fee type"
          options={options}
          selectedRadio={selectedRadio}
          handleRadioChange={handleRadioChange}
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

export default PrivateFamilyLawRepresentationFeeTypePage;
