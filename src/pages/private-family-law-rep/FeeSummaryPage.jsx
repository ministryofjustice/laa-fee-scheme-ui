import PageHeading from "../../components/PageHeading";
import PageSubHeading from "../../components/PageSubHeading";
import { useSchemeUIContext } from "../../context/SchemeUIContext";
import { formatCurrency, formatDate } from "../../utils/formatUtil";
import { useNavigate } from "react-router-dom";

const TableRow = ({ label, value, isBold = false }) => {
  return (
    <tr className="govuk-table__row">
      <th scope="row" className="govuk-table__header">
        {label}
      </th>
      <td
        className={
          "govuk-table__cell" + (isBold ? " govuk-!-font-weight-bold" : "")
        }
      >
        {value}
      </td>
    </tr>
  );
};

const FeeSummaryPage = () => {
  const navigate = useNavigate();

  const { formData, resetFormData } = useSchemeUIContext();

  const pflrsProceedingTypesLabels = {
    children: "Children",
    finance: "Finance",
    domesticAbuse: "Domestic Abuse",
    excluded: "Excluded from PFLRS",
  };

  const providerLocationLabels = {
    london: "London",
    nonLondon: "Non-London",
  };

  const feeTypeLabels = {
    fixed: "Fixed",
    hourlyRate: "Hourly Rate",
  };

  const handleSubmit = () => {
    resetFormData();
    navigate("/submission-confirmation");
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <PageHeading>
            Private Family Law Representation Scheme (PFLRS)
          </PageHeading>
          <PageSubHeading>Check your answers</PageSubHeading>
          <p className="govuk-body-l">
            Review the information you have provided before submitting.
          </p>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds govuk-!-padding-left-0">
            {/* Case Details */}
            <h2 className="govuk-heading-m">Case details</h2>
            <dl className="govuk-summary-list">
              {formData.pflrsProceedingsType && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Proceedings Type</dt>
                  <dd className="govuk-summary-list__value">
                    {pflrsProceedingTypesLabels[
                      formData.pflrsProceedingsType
                    ] || formData.pflrsProceedingsType}
                  </dd>
                  <dd className="govuk-summary-list__actions">
                    <a
                      className="govuk-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/private-family-law-representation-scheme");
                      }}
                    >
                      Change
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <dl className="govuk-summary-list">
              {formData.certificationDate && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Certification Date
                  </dt>
                  <dd className="govuk-summary-list__value">
                    {formatDate(formData.certificationDate)}
                  </dd>
                  <dd className="govuk-summary-list__actions">
                    <a
                      className="govuk-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/certification-date");
                      }}
                    >
                      Change
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <dl className="govuk-summary-list">
              {formData.providerLocation && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Provider Location</dt>
                  <dd className="govuk-summary-list__value">
                    {providerLocationLabels[formData.providerLocation] ||
                      formData.providerLocation}
                  </dd>
                  <dd className="govuk-summary-list__actions">
                    <a
                      className="govuk-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/provider-location");
                      }}
                    >
                      Change
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            {/* Fee Details */}
            <h2 className="govuk-heading-m">Fee details</h2>
            <dl className="govuk-summary-list">
              {formData.feeType && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Fee Type</dt>
                  <dd className="govuk-summary-list__value">
                    {feeTypeLabels[formData.feeType] || formData.feeType}
                  </dd>
                  <dd className="govuk-summary-list__actions">
                    <a
                      className="govuk-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/fee-type");
                      }}
                    >
                      Change
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            {/* Grand Total */}
            {formData.calculatedFee !== null &&
              formData.calculatedFee !== undefined && (
                <div
                  style={{
                    marginTop: "30px",
                    padding: "20px",
                    backgroundColor: "#1d70b8",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong
                    className="govuk-heading-m"
                    style={{ color: "#ffffff", marginBottom: 0 }}
                  >
                    Total Fee:
                  </strong>
                  <strong
                    className="govuk-heading-l"
                    style={{ color: "#ffffff", marginBottom: 0 }}
                  >
                    {formatCurrency(formData.calculatedFee)}
                  </strong>
                </div>
              )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "1rem",
                marginTop: "30px",
              }}
            >
              <button
                className="govuk-button govuk-button--secondary"
                data-module="govuk-button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

              <button
                className="govuk-button"
                data-module="govuk-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeeSummaryPage;
