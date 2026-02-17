import { formatCurrency } from "../utils/formatUtil";

const FeeTotal = ({ value }) => {
  return (
    <h3 className="govuk-heading-m govuk-!-margin-bottom-5">
      Total Fee Amount: {formatCurrency(value)}
    </h3>
  );
};

export default FeeTotal;
