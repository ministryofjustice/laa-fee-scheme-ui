import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonContainer from "../../components/ButtonContainer";
import FeeTotal from "../../components/FeeTotal";
import NavButton from "../../components/NavButton";
import PageHeading from "../../components/PageHeading";
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import AppContext from "../../context/AppContext";

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
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <FeeTotal value={getFeeTotal()} />

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
