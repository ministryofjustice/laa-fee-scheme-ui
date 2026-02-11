import React from 'react';

const AdvocatesMeetingItem = ({ meeting, index, onUpdate, onRemove, showRemove }) => {
    const formatOptions = [
        { value: '', label: 'Select format' },
        { value: 'VIDEO', label: 'Video' },
        { value: 'TELEPHONE', label: 'Telephone' },
        { value: 'IN_PERSON', label: 'In Person' }
    ];

    const judgeLevelOptions = [
        { value: '', label: 'Select judge level' },
        { value: 'HIGH_COURT_JUDGE', label: 'High Court Judge' },
        { value: 'CIRCUIT_JUDGE', label: 'Circuit Judge' },
        { value: 'RECORDER', label: 'Recorder' },
        { value: 'DISTRICT_JUDGE', label: 'District Judge' },
        { value: 'MAGISTRATE', label: 'Magistrate' }
    ];

    const handleChange = (field, value) => {
        onUpdate(meeting.id, { [field]: value });
    };

    const handleRadioChange = (field, value) => {
        const updates = { [field]: value };
        
        // Clear exceptional travel amount if not claiming
        if (field === 'exceptionalTravelClaimed' && value === 'no') {
            updates.exceptionalTravelAmount = '';
        }
        
        onUpdate(meeting.id, updates);
    };

    return (
        <div className="govuk-form-group" style={{ 
            border: '2px solid #b1b4b6', 
            padding: '20px', 
            marginBottom: '20px',
            position: 'relative'
        }}>
            <h3 className="govuk-heading-s">Meeting {index + 1}</h3>
            
            {showRemove && (
                <button
                    className="govuk-button govuk-button--warning"
                    data-module="govuk-button"
                    onClick={() => onRemove(meeting.id)}
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    type="button"
                >
                    Remove
                </button>
            )}

            {/* Meeting Date */}
            <div className="govuk-form-group">
                <label className="govuk-label" htmlFor={`meeting-date-${meeting.id}`}>
                    Meeting Date
                </label>
                <input
                    className="govuk-input"
                    id={`meeting-date-${meeting.id}`}
                    name={`meeting-date-${meeting.id}`}
                    type="date"
                    value={meeting.meetingDate}
                    onChange={(e) => handleChange('meetingDate', e.target.value)}
                    style={{ width: '200px' }}
                />
            </div>

            {/* Format */}
            <div className="govuk-form-group">
                <label className="govuk-label" htmlFor={`format-${meeting.id}`}>
                    Format
                </label>
                <select
                    className="govuk-select"
                    id={`format-${meeting.id}`}
                    value={meeting.format}
                    onChange={(e) => handleChange('format', e.target.value)}
                    style={{ width: '250px' }}
                >
                    {formatOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Judge Level */}
            <div className="govuk-form-group">
                <label className="govuk-label" htmlFor={`judge-level-${meeting.id}`}>
                    Judge Level
                </label>
                <select
                    className="govuk-select"
                    id={`judge-level-${meeting.id}`}
                    value={meeting.judgeLevel}
                    onChange={(e) => handleChange('judgeLevel', e.target.value)}
                    style={{ width: '250px' }}
                >
                    {judgeLevelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Court Directed */}
            <div className="govuk-form-group">
                <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend">
                        Was this meeting court directed?
                    </legend>
                    <div className="govuk-radios govuk-radios--inline" data-module="govuk-radios">
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={`court-directed-yes-${meeting.id}`}
                                name={`court-directed-${meeting.id}`}
                                type="radio"
                                value="yes"
                                checked={meeting.courtDirected === 'yes'}
                                onChange={(e) => handleRadioChange('courtDirected', e.target.value)}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={`court-directed-yes-${meeting.id}`}>
                                Yes
                            </label>
                        </div>
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={`court-directed-no-${meeting.id}`}
                                name={`court-directed-${meeting.id}`}
                                type="radio"
                                value="no"
                                checked={meeting.courtDirected === 'no'}
                                onChange={(e) => handleRadioChange('courtDirected', e.target.value)}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={`court-directed-no-${meeting.id}`}>
                                No
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>

            {/* Court Order Provided */}
            <div className="govuk-form-group">
                <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend">
                        Court order provided?
                    </legend>
                    <div className="govuk-radios govuk-radios--inline" data-module="govuk-radios">
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={`court-order-yes-${meeting.id}`}
                                name={`court-order-${meeting.id}`}
                                type="radio"
                                value="yes"
                                checked={meeting.courtOrderProvided === 'yes'}
                                onChange={(e) => handleRadioChange('courtOrderProvided', e.target.value)}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={`court-order-yes-${meeting.id}`}>
                                Yes
                            </label>
                        </div>
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={`court-order-no-${meeting.id}`}
                                name={`court-order-${meeting.id}`}
                                type="radio"
                                value="no"
                                checked={meeting.courtOrderProvided === 'no'}
                                onChange={(e) => handleRadioChange('courtOrderProvided', e.target.value)}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={`court-order-no-${meeting.id}`}>
                                No
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>

            {/* Exceptional Travel Claimed */}
            <div className="govuk-form-group">
                <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend">
                        Exceptional travel claimed?
                    </legend>
                    <div className="govuk-radios govuk-radios--inline" data-module="govuk-radios">
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={`exceptional-travel-yes-${meeting.id}`}
                                name={`exceptional-travel-${meeting.id}`}
                                type="radio"
                                value="yes"
                                checked={meeting.exceptionalTravelClaimed === 'yes'}
                                onChange={(e) => handleRadioChange('exceptionalTravelClaimed', e.target.value)}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={`exceptional-travel-yes-${meeting.id}`}>
                                Yes
                            </label>
                        </div>
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={`exceptional-travel-no-${meeting.id}`}
                                name={`exceptional-travel-${meeting.id}`}
                                type="radio"
                                value="no"
                                checked={meeting.exceptionalTravelClaimed === 'no'}
                                onChange={(e) => handleRadioChange('exceptionalTravelClaimed', e.target.value)}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={`exceptional-travel-no-${meeting.id}`}>
                                No
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>

            {/* Exceptional Travel Amount - conditional */}
            {meeting.exceptionalTravelClaimed === 'yes' && (
                <div className="govuk-form-group">
                    <label className="govuk-label" htmlFor={`exceptional-travel-amount-${meeting.id}`}>
                        Exceptional travel amount (£)
                    </label>
                    <div className="govuk-input__wrapper" style={{ display: 'inline-block' }}>
                        <div className="govuk-input__prefix" aria-hidden="true">£</div>
                        <input
                            className="govuk-input govuk-input--width-10"
                            id={`exceptional-travel-amount-${meeting.id}`}
                            name={`exceptional-travel-amount-${meeting.id}`}
                            type="number"
                            step="0.01"
                            min="0"
                            value={meeting.exceptionalTravelAmount}
                            onChange={(e) => handleChange('exceptionalTravelAmount', e.target.value)}
                            style={{ width: '150px', paddingLeft: '40px' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvocatesMeetingItem;
