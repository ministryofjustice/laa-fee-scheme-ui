import React from 'react';

const SummaryRow = ({ label, value }) => {
    return (
        <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">
                {label}
            </dt>
            <dd className="govuk-summary-list__value">
                {value}
            </dd>
        </div>
    );
};

export default SummaryRow;
