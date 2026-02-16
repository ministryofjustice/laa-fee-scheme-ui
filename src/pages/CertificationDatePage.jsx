import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import AppContext from "../context/AppContext";

const CertificationDatePage = () => {
  const navigate = useNavigate();
  const [certificationDate, setCertificationDate] = useState("");

  const { addFee } = useContext(AppContext);

  const handleCertificationDateChange = (e) => {
    setCertificationDate(e.target.value);
  };

  const handleContinue = () => {
    addFee('Certification Date Fee',100);
    navigate("/provider-location");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Private Family Law Representation Scheme (PFLRS)
        </h1>
        <div className="govuk-form-group">
          <fieldset
            className="govuk-fieldset"
            role="group"
            aria-describedby="cerification-date-hint"
          >
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h1 className="govuk-fieldset__heading">
                What is the certification date?
              </h1>
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

        <div className="govuk-button-group">
          <BackButton />
          <NavButton onClick={handleContinue} disabled={!certificationDate}>
            Continue
          </NavButton>
        </div>
      </main>
    </div>
  );
};

export default CertificationDatePage;
