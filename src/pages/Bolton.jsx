import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchemeUIContext } from '../context/SchemeUIContext';

const Bolton = () => {
    const navigate = useNavigate();
    const { updateMultipleFields } = useSchemeUIContext();
    const [isBoltonApplicable, setIsBoltonApplicable] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [boltonItems, setBoltonItems] = useState([]);

    const aspectOptions = [
        { value: '', label: 'Select a category' },
        { value: 'private-law-finance', label: 'Private Law Finance' },
        { value: 'private-law-children', label: 'Private Law Children' },
        { value: 'care-and-supervision', label: 'Care and Supervision' },
        { value: 'other-public-law-children', label: 'Other Public Law Children' },
        { value: 'domestic-abuse', label: 'Private Law Domestic Abuse​' },
        { value: 'ancillary-relief', label: 'Ancillary Relief & Other Family Work' },
    ];

    const getValueOptions = (category) => {
        switch (category) {
            case 'private-law-children':
                return [
                    { value: '', label: 'Select an option' },
                    { value: 'expert-cross-examination-20', label: 'Expert\'s cross examination (20%)' },
                    { value: 'client-allegations-significant-harm-25', label: 'Client – allegations of significant harm (25%)' },
                    { value: 'advocate-bundle-payments', label: 'Advocate\'s Bundle Payments (fee)' },
                    { value: 'exceptional-travel-fee', label: 'Exceptional travel fee' }
                ];
            case 'care-and-supervision':
            case 'other-public-law-children':
                return [
                    { value: '', label: 'Select an option' },
                    { value: 'expert-cross-examination-25', label: 'Expert\'s cross examination (25%)' },
                    { value: 'client-allegations-significant-harm-25', label: 'Client - allegations of significant harm (25%)' },
                    { value: 'client-lack-of-understanding-25', label: 'Client lack of understanding (25%)' },
                    { value: 'advocate-bundle-payments', label: 'Advocate\'s Bundle payments (fee)' },
                    { value: 'exceptional-travel-fee', label: 'Exceptional travel fee' }
                ];
            case 'domestic-abuse':
                return [
                    { value: '', label: 'Select an option' },
                    { value: 'exceptional-travel-fee', label: 'Exceptional travel fee' }
                ];
            case 'private-law-finance':
                return [
                    { value: '', label: 'Select an option' },
                    { value: 'early-resolution-settlement-fee', label: 'Early resolution / Settlement fee' }
                ];
            case 'ancillary-relief':
                return [
                    { value: '', label: 'Select an option' },
                    { value: 'early-resolution-fee', label: 'Early resolution fee' },
                    { value: 'advocate-bundle-payments', label: 'Advocate\'s Bundle payments (fee)' },
                    { value: 'exceptional-travel-fee', label: 'Exceptional travel fee' }
                ];
            default:
                return [];
        }
    };

    const handleBoltonApplicableChange = (e) => {
        const value = e.target.value;
        setIsBoltonApplicable(value);
        updateMultipleFields({ isBoltonApplicable: value });
        if (value === 'no') {
            setSelectedCategory('');
            setBoltonItems([]);
            updateMultipleFields({ boltonCategory: '', boltonItems: [] });
        }
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        setBoltonItems([]);
        updateMultipleFields({ boltonCategory: value, boltonItems: [] });
    };

    const handleAddBolton = () => {
        const newBolton = {
            id: Date.now(),
            boltonType: '',
            amount: ''
        };
        const updatedItems = [...boltonItems, newBolton];
        setBoltonItems(updatedItems);
        updateMultipleFields({ boltonItems: updatedItems });
    };

    const handleUpdateBolton = (id, field, value) => {
        const updated = boltonItems.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                // Clear amount when bolton type changes
                if (field === 'boltonType') {
                    updatedItem.amount = '';
                }
                return updatedItem;
            }
            return item;
        });
        setBoltonItems(updated);
        updateMultipleFields({ boltonItems: updated });
    };

    const handleRemoveBolton = (id) => {
        const updated = boltonItems.filter(item => item.id !== id);
        setBoltonItems(updated);
        updateMultipleFields({ boltonItems: updated });
    };

    const isFormValid = () => {
        if (!isBoltonApplicable) return false;
        if (isBoltonApplicable === 'no') return true;
        
        if (!selectedCategory || boltonItems.length === 0) return false;
        
        return boltonItems.every(item => 
            item.boltonType && item.amount
        );
    };

    const handleContinue = () => {
        const payload = {
            isBoltonApplicable: isBoltonApplicable === 'yes',
            category: selectedCategory,
            boltonItems: boltonItems.map(item => ({
                boltonType: item.boltonType,
                amount: parseFloat(item.amount)
            }))
        };
        
        console.log('Bolton Payload:', JSON.stringify(payload, null, 2));
        // Navigate to next page
    };

    return (
        <div className="govuk-width-container" style={{ maxWidth: 'calc(100% - 510px)' }}>
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-l">Bolton</h1>

                <div className="govuk-form-group">
                    <fieldset className="govuk-fieldset">
                        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                            Is Bolt-on Fee Applicable for this claim?
                        </legend>
                        <div className="govuk-radios govuk-radios--inline">
                            <div className="govuk-radios__item">
                                <input
                                    className="govuk-radios__input"
                                    id="bolton-yes"
                                    name="bolton-applicable"
                                    type="radio"
                                    value="yes"
                                    checked={isBoltonApplicable === 'yes'}
                                    onChange={handleBoltonApplicableChange}
                                />
                                <label className="govuk-label govuk-radios__label" htmlFor="bolton-yes">
                                    Yes
                                </label>
                            </div>
                            <div className="govuk-radios__item">
                                <input
                                    className="govuk-radios__input"
                                    id="bolton-no"
                                    name="bolton-applicable"
                                    type="radio"
                                    value="no"
                                    checked={isBoltonApplicable === 'no'}
                                    onChange={handleBoltonApplicableChange}
                                />
                                <label className="govuk-label govuk-radios__label" htmlFor="bolton-no">
                                    No
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                {isBoltonApplicable === 'yes' && (
                    <>
                        <div className="govuk-form-group">
                            <label className="govuk-label govuk-label--m" htmlFor="category-select">
                                Category
                            </label>
                            <select
                                className="govuk-select govuk-!-width-two-thirds"
                                id="category-select"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                {aspectOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedCategory && (
                            <>
                                <div className="govuk-form-group">
                                    <button
                                        className="govuk-button govuk-button--secondary"
                                        data-module="govuk-button"
                                        onClick={handleAddBolton}
                                        type="button"
                                    >
                                        Add Bolton
                                    </button>
                                </div>

                                {boltonItems.map((item, index) => (
                                    <div key={item.id} style={{ border: '1px solid #b1b4b6', padding: '20px', marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                            <h2 className="govuk-heading-m" style={{ margin: 0 }}>Bolton {index + 1}</h2>
                                            <button
                                                className="govuk-button govuk-button--warning"
                                                data-module="govuk-button"
                                                onClick={() => handleRemoveBolton(item.id)}
                                                type="button"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        {getValueOptions(selectedCategory).length > 0 && (
                                            <div className="govuk-form-group">
                                                <label className="govuk-label govuk-label--m" htmlFor={`bolton-type-${item.id}`}>
                                                    Bolt-On Type
                                                </label>
                                                <select
                                                    className="govuk-select govuk-!-width-two-thirds"
                                                    id={`bolton-type-${item.id}`}
                                                    value={item.boltonType}
                                                    onChange={(e) => handleUpdateBolton(item.id, 'boltonType', e.target.value)}
                                                >
                                                    {getValueOptions(selectedCategory).map((option) => (
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
                                                <input
                                                    className="govuk-input govuk-!-width-one-third"
                                                    id={`amount-${item.id}`}
                                                    type="text"
                                                    value={item.amount}
                                                    onChange={(e) => handleUpdateBolton(item.id, 'amount', e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem' }}>
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
                        onClick={handleContinue}
                        disabled={!isFormValid()}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Bolton;
