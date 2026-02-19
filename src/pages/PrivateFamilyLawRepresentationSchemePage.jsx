import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ButtonContainer from "../components/ButtonContainer";
import NavButton from "../components/NavButton";
import PageHeading from "../components/PageHeading";
import RadioButtonsPanel from "../components/RadioButtonsPanel";
import { useSchemeUIContext } from "../context/SchemeUIContext";

const PrivateFamilyLawRepresentationSchemePage = () => {
  const navigate = useNavigate();

  const { updateFormData } = useSchemeUIContext();

  const [selectedRadio, setSelectedRadio] = useState("");

   const options = [
    {
      value: "children",
      label: "Children",
    },
    {
      value: "finance",
      label: "Finance",
    },
    {
      value: "domesticAbuse",
      label: "Domestic Abuse",
    },
    {
      value: "excluded",
      label: "Excluded from PFLRS",
    },
  ];

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedRadio(value);
    updateFormData("pflrsProceedingsType", value);
  };

  const handleContinue = () => {
    if (selectedRadio === "excluded") {
      navigate("/fee-summary");
    } else {
      navigate("/certification-date");
    }
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <RadioButtonsPanel
          name="proceedingsType"
          heading="Select proceedings type"
          options={options}
          selectedRadio={selectedRadio}
          handleRadioChange={handleRadioChange}
        />

        <ButtonContainer className="govuk-button-group">
          <BackButton />
          <NavButton onClick={handleContinue} disabled={!selectedRadio}>
            Continue
          </NavButton>
        </ButtonContainer>
      </main>
    </div>
  );
};

export default PrivateFamilyLawRepresentationSchemePage;
