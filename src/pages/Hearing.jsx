import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSchemeUIContext } from '../context/SchemeUIContext';

const Hearing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateMultipleFields } = useSchemeUIContext();
    const [hearingDate, setHearingDate] = useState('');
    const [hearingType, setHearingType] = useState('');
    const [numberOfInterimProceedings, setNumberOfInterimProceedings] = useState('');
    const [interimHearings, setInterimHearings] = useState([]);
    const [durationBand, setDurationBand] = useState('');
    const [days, setDays] = useState('');
    const [judgeLevel, setJudgeLevel] = useState('');
    const [courtDirected, setCourtDirected] = useState('');

    const proceedingType = location.state?.proceedingType || '';
    const lawType = location.state?.lawType || '';
    const aspectOfWork = location.state?.aspectOfWork || '';

    const hearingTypeOptions = [
        { value: '', label: 'Select hearing type' },
        { value: 'INTERIM_HEARING', label: 'Interim Hearing' },
        { value: 'FINAL_HEARING', label: 'Final Hearing' }
    ];

    const durationBandOptions = [
        { value: '', label: 'Select duration band' },
        { value: 'INTERIM_HEARING_UNIT_1', label: 'Interim Hearing Unit 1' },
        { value: 'INTERIM_HEARING_UNIT_2', label: 'Interim Hearing Unit 2' },
        { value: 'MULTIPLE_UNIT_2S', label: 'Multiple Unit 2s' }
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

    const judgeLevelOptions = [
        { value: '', label: 'Select Judge Level' },
        { value: 'MAGISTRATES_COURT_JUDGE', label: 'Magistrates’ Court judge' },
        { value: 'DISTRICT_JUDGE', label: 'District Judge' },
        { value: 'CIRCUIT_JUDGE', label: 'Circuit Judge' },
        { value: 'HIGH_COURT_JUDGE', label: 'High Court Judge' },
        { value: 'DEPUTY_DISTRICT_JUDGE', label: 'Deputy District Judge' },
        { value: 'OTHER', label: 'Other' }
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

    const handleUpdateInterimHearing = (id, field, value) => {
        const updated = interimHearings.map(hearing => 
            hearing.id === id ? { ...hearing, [field]: value } : hearing
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
        console.log('Proceeding Type:', proceedingType);
        console.log('Law Type:', lawType);
        console.log('Aspect of Work:', aspectOfWork);
        console.log('Hearing Date:', hearingDate);
        console.log('Hearing Type:', hearingType);
        console.log('Duration Band:', durationBand);
        console.log('Days:', days);
        console.log('Judge Level:', judgeLevel);
        console.log('Court Directed:', courtDirected);
        
        navigate('/bolton');
    };

    return (
        <div className="govuk-width-container" style={{ maxWidth: 'calc(100% - 510px)' }}>
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
                            <div key={hearing.id} style={{ border: '1px solid #b1b4b6', padding: '20px', marginBottom: '20px' }}>
                                <h2 className="govuk-heading-m">Interim Hearing {index + 1}</h2>

                                <div className="govuk-form-group">
                                    <label className="govuk-label govuk-label--m" htmlFor={`hearing-date-${hearing.id}`}>
                                        Date of Hearing
                                    </label>
                                    <input
                                        className="govuk-input govuk-input--width-10"
                                        id={`hearing-date-${hearing.id}`}
                                        type="date"
                                        value={hearing.hearingDate}
                                        onChange={(e) => handleUpdateInterimHearing(hearing.id, 'hearingDate', e.target.value)}
                                    />
                                </div>

                                <div className="govuk-form-group">
                                    <label className="govuk-label govuk-label--m" htmlFor={`duration-band-${hearing.id}`}>
                                        Duration Band
                                    </label>
                                    <select
                                        className="govuk-select govuk-!-width-two-thirds"
                                        id={`duration-band-${hearing.id}`}
                                        value={hearing.durationBand}
                                        onChange={(e) => handleUpdateInterimHearing(hearing.id, 'durationBand', e.target.value)}
                                    >
                                        {durationBandOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="govuk-form-group">
                                    <label className="govuk-label govuk-label--m" htmlFor={`judge-level-${hearing.id}`}>
                                        Judge level
                                    </label>
                                    <select
                                        className="govuk-select govuk-!-width-two-thirds"
                                        id={`judge-level-${hearing.id}`}
                                        value={hearing.judgeLevel}
                                        onChange={(e) => handleUpdateInterimHearing(hearing.id, 'judgeLevel', e.target.value)}
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
                                        <div className="govuk-radios govuk-radios--inline">
                                            <div className="govuk-radios__item">
                                                <input
                                                    className="govuk-radios__input"
                                                    id={`court-directed-yes-${hearing.id}`}
                                                    name={`courtDirected-${hearing.id}`}
                                                    type="radio"
                                                    value="YES"
                                                    checked={hearing.courtDirected === 'YES'}
                                                    onChange={(e) => handleUpdateInterimHearing(hearing.id, 'courtDirected', e.target.value)}
                                                />
                                                <label className="govuk-label govuk-radios__label" htmlFor={`court-directed-yes-${hearing.id}`}>
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="govuk-radios__item">
                                                <input
                                                    className="govuk-radios__input"
                                                    id={`court-directed-no-${hearing.id}`}
                                                    name={`courtDirected-${hearing.id}`}
                                                    type="radio"
                                                    value="NO"
                                                    checked={hearing.courtDirected === 'NO'}
                                                    onChange={(e) => handleUpdateInterimHearing(hearing.id, 'courtDirected', e.target.value)}
                                                />
                                                <label className="govuk-label govuk-radios__label" htmlFor={`court-directed-no-${hearing.id}`}>
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
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
                            !hearingDate || 
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
