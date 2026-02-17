import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ButtonContainer from "../components/ButtonContainer";
import NavButton from "../components/NavButton";
import PageHeading from "../components/PageHeading";
import PageSubHeading from "../components/PageSubHeading";

const CalculateHourlyRatesPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/fee-summary");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <PageSubHeading>Calculate Fees</PageSubHeading>

        <p className="govuk-body">Click on continue to calculate fees</p>

        <ButtonContainer>
          <BackButton />
          <NavButton onClick={handleContinue}>Continue</NavButton>
        </ButtonContainer>
      </main>
    </div>
  );
}

export default CalculateHourlyRatesPage;
