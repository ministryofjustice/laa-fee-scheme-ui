import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonContainer from "../../components/ButtonContainer";
import PageHeading from "../../components/PageHeading";
import NavButton from "../../components/NavButton";
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import { useSchemeUIContext } from "../../context/SchemeUIContext";

const ProviderLocationDatePage = () => {
  const navigate = useNavigate();

  const { updateFormData } = useSchemeUIContext();

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "london",
      label: "London",
      fee: 1000
    },
    {
      value: "nonLondon",
      label: "Non-London",
      fee: 750
    },
  ];

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedRadio(value);
    updateFormData("providerLocation", value);
  };

  const handleContinue = () => {
   const selectedOption = options.find(
      (option) => option.value === selectedRadio,
    );
    updateFormData("calculatedFee", selectedOption.fee);
    navigate("/private-family-law-representation-fee-type");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <RadioButtonsPanel
          name="providerLocation"
          heading="Select provider location"
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

export default ProviderLocationDatePage;
