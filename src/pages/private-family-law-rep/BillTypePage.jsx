import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonContainer from "../../components/ButtonContainer";
import FeeTotal from "../../components/FeeTotal";
import NavButton from "../../components/NavButton";
import PageHeading from "../../components/PageHeading";
import RadioButtonsPanel from "../../components/RadioButtonsPanel";
import AppContext from "../../context/AppContext";

const BillTypePage = () => {
  const navigate = useNavigate();

  const { addFee, getFeeTotal } = useContext(AppContext);

  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    {
      value: "finalBill",
      label: "Final Bill",
    },
    {
      value: "transfer",
      label: "Transfer",
    },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleContinue = () => {
    const billTypeFee = selectedRadio === "finalBill" ? 50 : 25;
    addFee("Bill Type Fee", billTypeFee);
    navigate("/court-type");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <FeeTotal value={getFeeTotal()} />
        
        <RadioButtonsPanel
          name="billType"
          heading="Select bill type"
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

export default BillTypePage;
