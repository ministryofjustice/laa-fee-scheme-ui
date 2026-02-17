import { useContext } from "react";
import PageHeading from "../../components/PageHeading";
import PageSubHeading from "../../components/PageSubHeading";
import AppContext from "../../context/AppContext";
import { formatCurrency } from "../../utils/formatUtil";

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
  const { feeType, feeData, getFeeTotal } = useContext(AppContext);

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <PageHeading>
            Private Family Law Representation Scheme (PFLRS)
          </PageHeading>
          <PageSubHeading>Fee Summary</PageSubHeading>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds govuk-!-padding-left-0">
            <table className="govuk-table">
              <tbody className="govuk-table__body">
                {feeType && <TableRow label="Fee Type" value={feeType} />}
                {Object.entries(feeData).map(([key, value]) => (
                  <TableRow
                    key={key}
                    label={key}
                    value={formatCurrency(value)}
                  />
                ))}
                <TableRow
                  label="Total Fee Amount"
                  isBold={true}
                  value={formatCurrency(getFeeTotal())}
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
