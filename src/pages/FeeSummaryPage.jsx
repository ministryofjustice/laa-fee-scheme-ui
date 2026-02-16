import AppContext from "../context/AppContext";
import { useContext } from "react";
import { formatCurrency } from "../utils/formatUtil";

const TableRow = ({ label, value, isBold=false }) => {
  return (
    <tr className="govuk-table__row">
      <th scope="row" className="govuk-table__header">
        {label}
      </th>
      <td className={"govuk-table__cell" + (isBold ? " govuk-!-font-weight-bold" : "")}>{formatCurrency(value)}</td>
    </tr>
  );
};

const FeeSummaryPage = () => {
  const { feeData, getFeeTotal } = useContext(AppContext);

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-l">Fee Summary</h1>
            <table className="govuk-table">
              <tbody className="govuk-table__body">
                {Object.entries(feeData).map(([key, value]) => (
                  <TableRow key={key} label={key} value={value} />
                ))}
                <TableRow
                  label="Total Fee Amount"
                  isBold={true}
                  value={getFeeTotal()}
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeeSummaryPage;
