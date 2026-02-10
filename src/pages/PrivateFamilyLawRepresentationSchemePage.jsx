import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";

const PrivateFamilyLawRepresentationSchemePage = () => {
  const navigate = useNavigate();

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
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    if (selectedRadio === "excluded") {
      navigate("/process-complete");
    } else {
      navigate("/certification-date");
    }
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>

        <RadioButtonsPanel
          name="proceedingsType"
          heading="Select proceedings type"
          options={options}
          selectedRadio={selectedRadio}
          handleRadioChange={handleRadioChange}
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

export default PrivateFamilyLawRepresentationSchemePage;
