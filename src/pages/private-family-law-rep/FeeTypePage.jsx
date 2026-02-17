import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonContainer from "../../components/ButtonContainer";
import FeeTotal from "../../components/FeeTotal";
import NavButton from "../../components/NavButton";
import PageHeading from "../../components/PageHeading";
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import AppContext from "../../context/AppContext";

const PrivateFamilyLawRepresentationFeeTypePage = () => {
  const navigate = useNavigate();

  const { getFeeTotal, setFeeType } = useContext(AppContext);

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "profitCostsBelow",
      label: "Profit costs < 3x Fixed Fee",
      feeType: "Fixed",
    },
    {
      value: "profitCostsAbove",
      label: "Profit costs > 3x Fixed Fee",
      feeType: "Hourly Rate",
    },
    {
      value: "solicitorInstructed",
      label: "Solicitor instructed for < 24 hours",
      feeType: "Hourly Rate",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    const selectedOption = options.find(
      (option) => option.value === selectedRadio,
    );

    const { value: selectedValue, feeType } = selectedOption;

    setFeeType(feeType);

    if (selectedValue === "profitCostsBelow") {
      navigate("/bill-type");
    } else {
      navigate("/calculate-fees");
    }
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <FeeTotal value={getFeeTotal()} />

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
