import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";

const CalculateHourlyRatesPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/process-complete");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">Private Family Law Representation Scheme (PFLRS)</h1>
        <h2 className="govuk-heading-l">Calculate Fees</h2>
        <p className="govuk-body">Click on continue to calculate fees</p>
        <div className="govuk-button-group">
          <BackButton />
          <NavButton onClick={handleContinue}>Continue</NavButton>
        </div>
      </main>
    </div>
  );
}

export default CalculateHourlyRatesPage;
