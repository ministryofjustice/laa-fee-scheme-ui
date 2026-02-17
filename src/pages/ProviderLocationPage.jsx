import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ButtonContainer from "../components/ButtonContainer";
import PageHeading from "../components/PageHeading";
import FeeTotal from "../components/FeeTotal";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";
import AppContext from "../context/AppContext";

const ProviderLocationDatePage = () => {
  const navigate = useNavigate();

  const { addFee, getFeeTotal } = useContext(AppContext);

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "london",
      label: "London",
    },
    {
      value: "nonLondon",
      label: "Non-London",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    const providerLocationFee = selectedRadio === "london" ? 200 : 150;
    addFee("Provider Location Fee", providerLocationFee);
    navigate("/private-family-law-representation-fee-type");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <FeeTotal value={getFeeTotal()} />

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
