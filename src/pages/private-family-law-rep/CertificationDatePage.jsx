import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonContainer from "../../components/ButtonContainer";
import NavButton from "../../components/NavButton";
import PageHeading from "../../components/PageHeading";
import { useSchemeUIContext } from '../../context/SchemeUIContext';

const CertificationDatePage = () => {
  const navigate = useNavigate();

  const [certificationDate, setCertificationDate] = useState("");

  const { addFee } = useSchemeUIContext();

  const handleCertificationDateChange = (e) => {
    setCertificationDate(e.target.value);
  };

  const handleContinue = () => {
    addFee("Certification Date Fee", 100);
    navigate("/provider-location");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <PageHeading>
          Private Family Law Representation Scheme (PFLRS)
        </PageHeading>

        <div className="govuk-form-group">
          <fieldset
            className="govuk-fieldset"
            role="group"
            aria-describedby="cerification-date-hint"
          >
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 className="govuk-fieldset__heading">
                What is the certification date?
              </h2>
            </legend>
            <div className="govuk-date-input" id="cerification-date">
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <input
                    className="govuk-input govuk-input--width-10"
                    id="cerificationDate"
                    name="cerificationDate"
                    type="date"
                    value={certificationDate}
                    onChange={handleCertificationDateChange}
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <ButtonContainer>
          <BackButton />
          <NavButton onClick={handleContinue} disabled={!certificationDate}>
            Continue
          </NavButton>
        </ButtonContainer>
      </main>
    </div>
  );
};

export default CertificationDatePage;
