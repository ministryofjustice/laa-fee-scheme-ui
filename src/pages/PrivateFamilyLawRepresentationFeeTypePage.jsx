import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";
import AppContext from "../context/AppContext";
import FeeTotal from "../components/FeeTotal";

const PrivateFamilyLawRepresentationFeeTypePage = () => {
  const navigate = useNavigate();

  const { getFeeTotal, setFeeType } = useContext(AppContext);

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
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>
        <FeeTotal value={getFeeTotal()} />
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
