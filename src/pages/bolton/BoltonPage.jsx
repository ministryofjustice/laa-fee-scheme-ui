import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchemeUIContext } from '../../context/SchemeUIContext';
import { PublicLawFeeService } from '../../services/advocacySchemeService';
import { BoltOnCategory } from '../../assets/public-law-advocacy-fees/boltOnCategoryEnum';
import BoltonItem from './BoltonItem';

/**
 * Maps UI bolt-on type values to BoltOnCategory enum values.
 */
const boltOnTypeMapping = Object.freeze({
    'expert-cross-examination-25': BoltOnCategory.EXPERT_CROSS_EXAMINATION,
    'expert-cross-examination-20': BoltOnCategory.EXPERT_CROSS_EXAMINATION,
    'client-allegations-significant-harm-25': BoltOnCategory.CLIENT_ALLEGATIONS_OF_HARM,
    'client-lack-of-understanding-25': BoltOnCategory.CLIENT_LACK_OF_UNDERSTANDING,
    'exceptional-travel-fee': BoltOnCategory.EXCEPTIONAL_TRAVEL_FEE,
});

const Bolton = () => {
    const navigate = useNavigate();
    const { formData, updateMultipleFields } = useSchemeUIContext();
    const [isBoltonApplicable, setIsBoltonApplicable] = useState(formData.isBoltonApplicable || '');
    const [selectedCategory, setSelectedCategory] = useState(formData.aspectOfWork || '');
    const [boltonItems, setBoltonItems] = useState(formData.boltonItems || []);

    // Get the hearing fee from context for percentage-based bolt-on calculations
    const hearingFee = formData.calculatedFee || 0;

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

    const handleUpdateBolton = (id, updates) => {
        const updated = boltonItems.map(item => {
            if (item.id !== id) return item;
            const newItem = { ...item, ...updates };

            // Auto-calculate amount when boltonType changes
            if (updates.boltonType !== undefined) {
                const category = boltOnTypeMapping[updates.boltonType];
                if (category) {
                    const amount = PublicLawFeeService.calculateBoltOnAmount(category, hearingFee);
                    newItem.amount = amount !== null ? amount.toFixed(2) : '';
                    newItem.autoCalculated = true;
                } else {
                    newItem.amount = '';
                    newItem.autoCalculated = false;
                }
            }
            return newItem;
        });
        setBoltonItems(updated);
        updateMultipleFields({ boltonItems: updated });
    };

    const handleRemoveBolton = (id) => {
        const updated = boltonItems.filter(item => item.id !== id);
        setBoltonItems(updated);
        updateMultipleFields({ boltonItems: updated });
    };

    // Calculate total bolt-on fees
    const totalBoltonFee = useMemo(() => {
        if (isBoltonApplicable !== 'yes' || boltonItems.length === 0) return null;
        const amounts = boltonItems
            .filter(item => item.amount)
            .map(item => parseFloat(item.amount));
        if (amounts.length === 0) return null;
        return parseFloat(amounts.reduce((sum, a) => sum + a, 0).toFixed(2));
    }, [isBoltonApplicable, boltonItems]);

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
            })),
            totalBoltonFee,
        };

        updateMultipleFields({
            boltonItems,
            totalBoltonFee,
        });
        
        console.log('Bolton Payload:', JSON.stringify(payload, null, 2));
        navigate('/final-summary');
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-l">Bolt-On</h1>

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
                                disabled
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
                                    <BoltonItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        selectedCategory={selectedCategory}
                                        onUpdate={handleUpdateBolton}
                                        onRemove={handleRemoveBolton}
                                        valueOptions={getValueOptions(selectedCategory)}
                                    />
                                ))}
                            </>
                        )}

                        {totalBoltonFee !== null && (
                            <div className="govuk-inset-text" style={{ borderLeftColor: '#1d70b8' }}>
                                <h2 className="govuk-heading-s" style={{ marginBottom: '5px' }}>Total Bolt-On Fees</h2>
                                <p className="govuk-body-l" style={{ fontWeight: 'bold', marginBottom: 0 }}>
                                    £{totalBoltonFee.toFixed(2)}
                                </p>
                            </div>
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
