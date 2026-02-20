import React from 'react';

// Removed unused selectedCategory prop
const BoltonItem = ({ item, index, onUpdate, onRemove, valueOptions }) => {

    const handleFieldChange = (field, value) => {
        const updates = { [field]: value };
        onUpdate(item.id, updates);
    };

    return (
        <div style={{ border: '1px solid #b1b4b6', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="govuk-heading-m" style={{ margin: 0 }}>Bolt-On {index + 1}</h2>
                <button
                    className="govuk-button govuk-button--warning"
                    data-module="govuk-button"
                    onClick={() => onRemove(item.id)}
                    type="button"
                >
                    Remove
                </button>
            </div>

            {valueOptions.length > 0 && (
                <div className="govuk-form-group">
                    <label className="govuk-label govuk-label--m" htmlFor={`bolton-type-${item.id}`}>
                        Bolt-On Type
                    </label>
                    <select
                        className="govuk-select govuk-!-width-two-thirds"
                        id={`bolton-type-${item.id}`}
                        value={item.boltonType}
                        onChange={(e) => handleFieldChange('boltonType', e.target.value)}
                    >
                        {valueOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {item.boltonType && (
                <div className="govuk-form-group">
                    <label className="govuk-label govuk-label--m" htmlFor={`amount-${item.id}`}>
                        Amount
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span className="govuk-body" style={{ fontWeight: 'bold', marginBottom: 0 }}>£</span>
                        <input
                            className="govuk-input govuk-!-width-one-third"
                            id={`amount-${item.id}`}
                            type="text"
                            value={item.amount}
                            onChange={(e) => handleFieldChange('amount', e.target.value)}
                            readOnly={item.autoCalculated}
                            style={item.autoCalculated ? { backgroundColor: '#f3f2f1' } : {}}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoltonItem;
