import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";

const CourtTypePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state?.title || "Private Family Law Representation Scheme (PFLRS)";
  const nextPath = location.state?.nextPath || "/level-of-work-done";

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "lawJusticeMagsCourt",
      label: "Law Justice or Magistrates Court",
    },
    {
      value: "districtJudgeCountyCourt",
      label: "District Judge or Country Court",
    },
    {
      value: "highCourt",
      label: "High Court",
    },
    {
      value: "circuitDistrictCostsJudge",
      label: "District Judge / District Judge / Costs Judge",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    navigate(nextPath, {
          state: {
            title: title,
          }
    });
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          {title}
        </h1>

        <RadioButtonsPanel
          name="courtType"
          heading="Select court type"
          options={options}
          selectedRadio={selectedRadio}
          handleRadioChange={handleRadioChange}
          handleContinue={handleContinue}
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

export default CourtTypePage;
