import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";
import AppContext from "../context/AppContext";
import FeeTotal from "../components/FeeTotal";

const CourtTypePage = () => {
  const navigate = useNavigate();

  const { addFee, getFeeTotal } = useContext(AppContext);

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
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    const selectedOption = options.find(option => option.value === selectedRadio)
    addFee('Court Type Fee', selectedOption.fee)
    navigate("/level-of-work-done");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>

        <FeeTotal value={getFeeTotal()} />

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
