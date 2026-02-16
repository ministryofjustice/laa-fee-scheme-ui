import { formatCurrency } from "../utils/formatUtil";

const FeeTotal = ({ value }) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-third">
        <p className="govuk-body">
          <span className="govuk-!-font-weight-bold">Fee Total:</span>{" "}
          {formatCurrency(value)}
        </p>
      </div>
    </div>
  );
};

export default FeeTotal;
