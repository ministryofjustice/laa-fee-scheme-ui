import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSchemeUIContext } from '../../context/SchemeUIContext';
import { PublicLawFeeService } from '../../services/advocacySchemeService';
import { calculateAdvocacyFee } from '../../services/feeRequestService';
import HearingItem, { durationBandOptions, judgeLevelOptions } from './HearingItem';

const Hearing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData, updateMultipleFields } = useSchemeUIContext();

    const proceedingType = location.state?.proceedingType || formData.proceedingType || '';
    const lawType = location.state?.lawType || '';
    const aspectOfWork = location.state?.aspectOfWork || formData.aspectOfWork || '';

    const [hearingDate, setHearingDate] = useState(formData.hearingDate || '');
    const [hearingType, setHearingType] = useState(formData.hearingType || proceedingType || '');
    const [numberOfInterimProceedings, setNumberOfInterimProceedings] = useState(formData.numberOfInterimProceedings || '');
    const [interimHearings, setInterimHearings] = useState(formData.interimHearings || []);
    const [durationBand, setDurationBand] = useState(formData.durationBand || '');
    const [days, setDays] = useState(formData.days || '');
    const [judgeLevel, setJudgeLevel] = useState(formData.judgeLevel || '');
    const [courtDirected, setCourtDirected] = useState(formData.courtDirected || '');

    // Sync auto-set hearingType to context
    React.useEffect(() => {
        if (!formData.hearingType && proceedingType) {
            updateMultipleFields({ hearingType: proceedingType });
        }
    }, [formData.hearingType, proceedingType, updateMultipleFields]);

    // --- API-fetched fee state (replaces hardcoded useMemo calculations below) ---
    const [calculatedFee, setCalculatedFee] = useState(null);
    const [feeLoading, setFeeLoading] = useState(false);
    const [feeError, setFeeError] = useState(null);
    const [interimHearingFees, setInterimHearingFees] = useState([]);
    const [totalInterimFee, setTotalInterimFee] = useState(null);

    // Fetch single hearing fee from API when inputs change
    useEffect(() => {
        const shouldFetch =
            (hearingType === 'INTERIM_HEARING' && numberOfInterimProceedings === '1' && durationBand && judgeLevel) ||
            (hearingType === 'FINAL_HEARING' && days && judgeLevel);

        if (!shouldFetch || !aspectOfWork) {
            setCalculatedFee(null);
            return;
        }

        let cancelled = false;
        setFeeLoading(true);
        setFeeError(null);

        calculateAdvocacyFee({ aspectOfWork, judgeLevel, hearingType, durationBand })
            .then(data => {
                if (!cancelled) {
                    setCalculatedFee(data.amount);
                    setFeeLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setFeeError('Unable to calculate fee. Please try again.');
                    setFeeLoading(false);
                }
            });

        return () => { cancelled = true; };
    }, [aspectOfWork, hearingType, durationBand, judgeLevel, days, numberOfInterimProceedings]);

    // Fetch fees for multiple interim hearings from API when inputs change
    useEffect(() => {
        if (hearingType !== 'INTERIM_HEARING' || parseInt(numberOfInterimProceedings) <= 1) {
            setInterimHearingFees([]);
            setTotalInterimFee(null);
            return;
        }

        const promises = interimHearings.map(h =>
            h.durationBand && h.judgeLevel
                ? calculateAdvocacyFee({ aspectOfWork, judgeLevel: h.judgeLevel, hearingType: 'INTERIM_HEARING', durationBand: h.durationBand })
                : Promise.resolve(null)
        );

        let cancelled = false;
        Promise.all(promises)
            .then(results => {
                if (!cancelled) {
                    const fees = results.map(r => (r ? r.amount : null));
                    setInterimHearingFees(fees);
                    const allValid = fees.length > 0 && fees.every(f => f !== null);
                    setTotalInterimFee(allValid ? parseFloat(fees.reduce((sum, f) => sum + f, 0).toFixed(2)) : null);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setInterimHearingFees(interimHearings.map(() => null));
                    setTotalInterimFee(null);
                }
            });

        return () => { cancelled = true; };
    }, [aspectOfWork, hearingType, numberOfInterimProceedings, interimHearings]);

    // --- Hardcoded local fee calculations (commented out — replaced by API calls above) ---
    // const calculatedFee = useMemo(() => {
    //     if (hearingType === 'INTERIM_HEARING' && numberOfInterimProceedings === '1' && durationBand && judgeLevel) {
    //         return PublicLawFeeService.calculateHearingFeeFromUI(aspectOfWork, judgeLevel, hearingType, durationBand);
    //     }
    //     if (hearingType === 'FINAL_HEARING' && days && judgeLevel) {
    //         return PublicLawFeeService.calculateHearingFeeFromUI(aspectOfWork, judgeLevel, hearingType, null, days);
    //     }
    //     return null;
    // }, [aspectOfWork, hearingType, durationBand, judgeLevel, days, numberOfInterimProceedings]);
    //
    // const interimHearingFees = useMemo(() => {
    //     if (hearingType !== 'INTERIM_HEARING' || parseInt(numberOfInterimProceedings) <= 1) return [];
    //     return interimHearings.map(h => {
    //         if (h.durationBand && h.judgeLevel) {
    //             return PublicLawFeeService.calculateHearingFeeFromUI(aspectOfWork, h.judgeLevel, 'INTERIM_HEARING', h.durationBand);
    //         }
    //         return null;
    //     });
    // }, [aspectOfWork, hearingType, numberOfInterimProceedings, interimHearings]);
    //
    // const totalInterimFee = useMemo(() => {
    //     if (interimHearingFees.length === 0 || interimHearingFees.some(f => f === null)) return null;
    //     return parseFloat(interimHearingFees.reduce((sum, f) => sum + f, 0).toFixed(2));
    // }, [interimHearingFees]);

    const hearingTypeOptions = [
        { value: '', label: 'Select hearing type' },
        { value: 'INTERIM_HEARING', label: 'Interim Hearing' },
        { value: 'FINAL_HEARING', label: 'Final Hearing' }
    ];

    const daysOptions = [
        { value: '', label: 'Select days' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' }
    ];

    const numberOfInterimProceedingsOptions = [
        { value: '', label: 'Select number' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' }
    ];

    const handleHearingDateChange = (e) => {
        const value = e.target.value;
        setHearingDate(value);
        updateMultipleFields({ hearingDate: value });
    };

    const handleHearingTypeChange = (e) => {
        const value = e.target.value;
        setHearingType(value);
        updateMultipleFields({ hearingType: value });
        if (value !== 'INTERIM_HEARING') {
            setDurationBand('');
            setNumberOfInterimProceedings('');
        }
        if (value !== 'FINAL_HEARING') {
            setDays('');
        }
    };

    const handleNumberOfInterimProceedingsChange = (e) => {
        const value = e.target.value;
        setNumberOfInterimProceedings(value);
        updateMultipleFields({ numberOfInterimProceedings: value });
        
        // Initialize interim hearings array when number > 1
        if (parseInt(value) > 1) {
            const hearingsArray = [];
            for (let i = 0; i < parseInt(value); i++) {
                hearingsArray.push({
                    id: Date.now() + i,
                    hearingDate: '',
                    durationBand: '',
                    judgeLevel: '',
                    courtDirected: ''
                });
            }
            setInterimHearings(hearingsArray);
            updateMultipleFields({ interimHearings: hearingsArray });
        } else {
            setInterimHearings([]);
            updateMultipleFields({ interimHearings: [] });
        }
    };

    const handleUpdateInterimHearing = (id, updates) => {
        const updated = interimHearings.map(hearing =>
            hearing.id === id ? { ...hearing, ...updates } : hearing
        );
        setInterimHearings(updated);
        updateMultipleFields({ interimHearings: updated });
    };

    const handleDurationBandChange = (e) => {
        const value = e.target.value;
        setDurationBand(value);
        updateMultipleFields({ durationBand: value });
    };

    const handleDaysChange = (e) => {
        const value = e.target.value;
        setDays(value);
        updateMultipleFields({ days: value });
    };

    const handleJudgeLevelChange = (e) => {
        const value = e.target.value;
        setJudgeLevel(value);
        updateMultipleFields({ judgeLevel: value });
    };

    const handleCourtDirectedChange = (e) => {
        const value = e.target.value;
        setCourtDirected(value);
        updateMultipleFields({ courtDirected: value });
    };

    const handleContinue = () => {
        const isMultipleInterim = hearingType === 'INTERIM_HEARING' && parseInt(numberOfInterimProceedings) > 1;
        const fee = isMultipleInterim ? totalInterimFee : calculatedFee;

        updateMultipleFields({
            calculatedFee: fee,
            interimHearingFees: isMultipleInterim ? interimHearingFees : [],
            totalInterimFee: isMultipleInterim ? totalInterimFee : null,
        });

        console.log('Proceeding Type:', proceedingType);
        console.log('Law Type:', lawType);
        console.log('Aspect of Work:', aspectOfWork);
        console.log('Hearing Date:', hearingDate);
        console.log('Hearing Type:', hearingType);
        console.log('Duration Band:', durationBand);
        console.log('Days:', days);
        console.log('Judge Level:', judgeLevel);
        console.log('Court Directed:', courtDirected);
        console.log('Calculated Fee: £', fee);
        
        navigate('/bolton');
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-l">Hearing Details</h1>

                {proceedingType && (
                    <div className="govuk-form-group" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <label className="govuk-label govuk-label--m" style={{ marginBottom: 0 }}>
                            Advocacy Event Type
                        </label>
                        <p className="govuk-body" style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '1.25rem' }}>
                            {proceedingType === 'INTERIM_HEARING' ? 'Interim hearing' : proceedingType === 'FINAL_HEARING' ? 'Final hearing' : proceedingType}
                        </p>
                    </div>
                )}

                {proceedingType !== 'INTERIM_HEARING' && (
                <div className="govuk-form-group">
                    <label className="govuk-label govuk-label--m" htmlFor="hearing-date">
                        Date of Hearing
                    </label>
                    <input
                        className="govuk-input govuk-input--width-10"
                        id="hearing-date"
                        name="hearing-date"
                        type="date"
                        value={hearingDate}
                        onChange={handleHearingDateChange}
                    />
                </div>
                )}

                <div className="govuk-form-group">
                    <label className="govuk-label govuk-label--m" htmlFor="hearing-type">
                        Hearing Type
                    </label>
                    <select
                        className="govuk-select govuk-!-width-two-thirds"
                        id="hearing-type"
                        name="hearing-type"
                        value={hearingType}
                        onChange={handleHearingTypeChange}
                    >
                        {hearingTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {hearingType === 'INTERIM_HEARING' && (
                    <div className="govuk-form-group">
                        <label className="govuk-label govuk-label--m" htmlFor="number-of-proceedings">
                            Number of Interim Proceedings
                        </label>
                        <select
                            className="govuk-select govuk-!-width-two-thirds"
                            id="number-of-proceedings"
                            name="number-of-proceedings"
                            value={numberOfInterimProceedings}
                            onChange={handleNumberOfInterimProceedingsChange}
                        >
                            {numberOfInterimProceedingsOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {hearingType === 'INTERIM_HEARING' && parseInt(numberOfInterimProceedings) > 1 && (
                    <>
                        {interimHearings.map((hearing, index) => (
                            <HearingItem
                                key={hearing.id}
                                hearing={hearing}
                                index={index}
                                onUpdate={handleUpdateInterimHearing}
                                calculatedFee={interimHearingFees[index]}
                            />
                        ))}
                    </>
                )}

                {hearingType === 'INTERIM_HEARING' && numberOfInterimProceedings === '1' && (
                    <>
                        <div className="govuk-form-group">
                            <label className="govuk-label govuk-label--m" htmlFor="duration-band">
                                Duration Band
                            </label>
                            <select
                                className="govuk-select govuk-!-width-two-thirds"
                                id="duration-band"
                                name="duration-band"
                                value={durationBand}
                                onChange={handleDurationBandChange}
                            >
                                {durationBandOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="govuk-form-group">
                            <label className="govuk-label govuk-label--m" htmlFor="judge-level">
                                Judge level
                            </label>
                            <select
                                className="govuk-select govuk-!-width-two-thirds"
                                id="judge-level"
                                name="judge-level"
                                value={judgeLevel}
                                onChange={handleJudgeLevelChange}
                            >
                                {judgeLevelOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="govuk-form-group">
                            <fieldset className="govuk-fieldset">
                                <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                                    Was this advocacy court-directed?
                                </legend>
                                <div className="govuk-radios" data-module="govuk-radios">
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="court-directed-yes"
                                            name="courtDirected"
                                            type="radio"
                                            value="YES"
                                            checked={courtDirected === 'YES'}
                                            onChange={handleCourtDirectedChange}
                                        />
                                        <label className="govuk-label govuk-radios__label" htmlFor="court-directed-yes">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="court-directed-no"
                                            name="courtDirected"
                                            type="radio"
                                            value="NO"
                                            checked={courtDirected === 'NO'}
                                            onChange={handleCourtDirectedChange}
                                        />
                                        <label className="govuk-label govuk-radios__label" htmlFor="court-directed-no">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </>
                )}

                {hearingType === 'FINAL_HEARING' && (
                    <>
                        <div className="govuk-form-group">
                            <label className="govuk-label govuk-label--m" htmlFor="days">
                                Days
                            </label>
                            <select
                                className="govuk-select govuk-!-width-two-thirds"
                                id="days"
                                name="days"
                                value={days}
                                onChange={handleDaysChange}
                            >
                                {daysOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="govuk-form-group">
                            <label className="govuk-label govuk-label--m" htmlFor="judge-level">
                                Judge level
                            </label>
                            <select
                                className="govuk-select govuk-!-width-two-thirds"
                                id="judge-level"
                                name="judge-level"
                                value={judgeLevel}
                                onChange={handleJudgeLevelChange}
                            >
                                {judgeLevelOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="govuk-form-group">
                            <fieldset className="govuk-fieldset">
                                <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                                    Was this advocacy court-directed?
                                </legend>
                                <div className="govuk-radios" data-module="govuk-radios">
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="court-directed-yes"
                                            name="courtDirected"
                                            type="radio"
                                            value="YES"
                                            checked={courtDirected === 'YES'}
                                            onChange={handleCourtDirectedChange}
                                        />
                                        <label className="govuk-label govuk-radios__label" htmlFor="court-directed-yes">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="court-directed-no"
                                            name="courtDirected"
                                            type="radio"
                                            value="NO"
                                            checked={courtDirected === 'NO'}
                                            onChange={handleCourtDirectedChange}
                                        />
                                        <label className="govuk-label govuk-radios__label" htmlFor="court-directed-no">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </>
                )}

                {/* Fee Display */}
                {feeLoading && (
                    <p className="govuk-body" style={{ color: '#505a5f' }}>Calculating fee…</p>
                )}
                {feeError && (
                    <p className="govuk-error-message">{feeError}</p>
                )}
                {calculatedFee !== null && hearingType === 'INTERIM_HEARING' && numberOfInterimProceedings === '1' && (
                    <div className="govuk-inset-text" style={{ borderLeftColor: '#1d70b8' }}>
                        <h2 className="govuk-heading-s" style={{ marginBottom: '5px' }}>Calculated Hearing Fee</h2>
                        <p className="govuk-body-l" style={{ fontWeight: 'bold', marginBottom: 0 }}>
                            £{calculatedFee.toFixed(2)}
                        </p>
                    </div>
                )}

                {calculatedFee !== null && hearingType === 'FINAL_HEARING' && (
                    <div className="govuk-inset-text" style={{ borderLeftColor: '#1d70b8' }}>
                        <h2 className="govuk-heading-s" style={{ marginBottom: '5px' }}>Calculated Hearing Fee ({days} day{parseInt(days) > 1 ? 's' : ''})</h2>
                        <p className="govuk-body-l" style={{ fontWeight: 'bold', marginBottom: 0 }}>
                            £{calculatedFee.toFixed(2)}
                        </p>
                    </div>
                )}

                {hearingType === 'INTERIM_HEARING' && parseInt(numberOfInterimProceedings) > 1 && interimHearingFees.length > 0 && (
                    <div className="govuk-inset-text" style={{ borderLeftColor: '#1d70b8' }}>
                        <h2 className="govuk-heading-s" style={{ marginBottom: '10px' }}>Calculated Hearing Fees</h2>
                        {interimHearingFees.map((fee, idx) => (
                            <p key={idx} className="govuk-body" style={{ marginBottom: '5px' }}>
                                Interim Hearing {idx + 1}: {fee !== null ? `£${fee.toFixed(2)}` : '—'}
                            </p>
                        ))}
                        {totalInterimFee !== null && (
                            <p className="govuk-body-l" style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: 0 }}>
                                Total: £{totalInterimFee.toFixed(2)}
                            </p>
                        )}
                    </div>
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
                        disabled={
                            (proceedingType !== 'INTERIM_HEARING' && !hearingDate) || 
                            !hearingType || 
                            (hearingType === 'INTERIM_HEARING' && !numberOfInterimProceedings) ||
                            (hearingType === 'INTERIM_HEARING' && numberOfInterimProceedings === '1' && (!durationBand || !judgeLevel || !courtDirected)) ||
                            (hearingType === 'INTERIM_HEARING' && parseInt(numberOfInterimProceedings) > 1 && !interimHearings.every(h => h.hearingDate && h.durationBand && h.judgeLevel && h.courtDirected)) ||
                            (hearingType === 'FINAL_HEARING' && (!days || !judgeLevel || !courtDirected))
                        }
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Hearing;
