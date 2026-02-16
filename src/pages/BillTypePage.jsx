import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import RadioButtonsPanel from "../components/RadioButtonsPanel";
import AppContext from "../context/AppContext";
import FeeTotal from "../components/FeeTotal";

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
    const billTypeFee =  (selectedRadio === 'finalBill') ? 50 : 25;
    addFee('Bill Type Fee', billTypeFee)
    navigate("/court-type");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>
        <FeeTotal value={getFeeTotal()} />
        <RadioButtonsPanel
          name="billType"
          heading="Select bill type"
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

export default BillTypePage;
