import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";

const CertificationDatePage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/provider-location");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">Private Family Law Representation Scheme (PFLRS)</h1>

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
            <div id="cerification-date-hint" className="govuk-hint">
              For example, 27 3 2007
            </div>
            <div className="govuk-date-input" id="cerification-date">
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label
                    className="govuk-label govuk-date-input__label"
                    htmlFor="cerification-date-day"
                  >
                    Day
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="cerification-date-day"
                    name="cerification-date-day"
                    type="text"
                    inputmode="numeric"
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label
                    className="govuk-label govuk-date-input__label"
                    htmlFor="cerification-date-month"
                  >
                    Month
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="cerification-date-month"
                    name="cerification-date-month"
                    type="text"
                    inputmode="numeric"
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label
                    className="govuk-label govuk-date-input__label"
                    htmlFor="cerification-date-year"
                  >
                    Year
                  </label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-4"
                    id="cerification-date-year"
                    name="cerification-date-year"
                    type="text"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="govuk-button-group">
          <NavButton onClick={handleContinue}>Continue</NavButton>
          <BackButton />
        </div>
      </main>
    </div>
  );
};

export default CertificationDatePage;
