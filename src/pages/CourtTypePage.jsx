import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import ButtonContainer from "../components/ButtonContainer";
import NavButton from "../components/NavButton";
import PageHeading from "../components/PageHeading";
import RadioButtonsPanel from "../components/RadioButtonsPanel";
import { useSchemeUIContext } from "../context/SchemeUIContext";

const CourtTypePage = () => {
  const navigate = useNavigate();  
  const { updateFormData } = useSchemeUIContext();
  const location = useLocation();
  const title = location.state?.title || "Private Family Law Representation Scheme (PFLRS)";
  const nextPath = location.state?.nextPath || "/level-of-work-done";

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "lawJusticeMagsCourt",
      label: "Law Justice or Magistrates Court",
      fee: 100,
    },
    {
      value: "districtJudgeCountyCourt",
      label: "District Judge or Country Court",
      fee: 150,
    },
    {
      value: "highCourt",
      label: "High Court",
      fee: 200,
    },
    {
      value: "circuitDistrictCostsJudge",
      label: "District Judge / District Judge / Costs Judge",
      fee: 250,
    },
    {
      value: "other",
      label: "Other",
      fee: 50,
    },
  ];

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedRadio(value);
    updateFormData("courtType", value);
  };

  const handleContinue = () => {
    const selectedOption = options.find(option => option.value === selectedRadio)
    updateFormData("courtTypeFee", selectedOption.fee);
    navigate(nextPath, {
          state: {
            title: title,
          }
    });
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          {title}
        </PageHeading>

        <RadioButtonsPanel
          name="courtType"
          heading="Select court type"
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

export default CourtTypePage;
