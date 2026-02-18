import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdvocatesMeetingItem from './AdvocatesMeetingItem';
import { useSchemeUIContext } from '../../context/SchemeUIContext';

const AdvocatesMeetingsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateMultipleFields } = useSchemeUIContext();
    const [attendedAdvocatesMeetings, setAttendedAdvocatesMeetings] = useState('');
    const [advocatesMeetings, setAdvocatesMeetings] = useState([]);

    const proceedingType = location.state?.proceedingType || '';
    const lawType = location.state?.lawType || '';
    const aspectOfWork = location.state?.aspectOfWork || '';

    const handleAttendedChange = (e) => {
        const value = e.target.value;
        setAttendedAdvocatesMeetings(value);
        if (value === 'no') {
            setAdvocatesMeetings([]);
            updateMultipleFields({
                attendedAdvocatesMeetings: value,
                advocatesMeetings: []
            });
        } else {
            updateMultipleFields({ attendedAdvocatesMeetings: value });
        }
    };

    const handleAddMeeting = () => {
        const newMeeting = {
            id: Date.now(),
            meetingDate: '',
            format: '',
            judgeLevel: '',
            courtDirected: '',
            courtOrderProvided: '',
            exceptionalTravelClaimed: '',
            exceptionalTravelAmount: ''
        };
        const updatedMeetings = [...advocatesMeetings, newMeeting];
        setAdvocatesMeetings(updatedMeetings);
        updateMultipleFields({ advocatesMeetings: updatedMeetings });
    };

    const handleUpdateMeeting = (id, updatedMeeting) => {
        const updatedMeetings = advocatesMeetings.map(meeting => 
            meeting.id === id ? { ...meeting, ...updatedMeeting } : meeting
        );
        setAdvocatesMeetings(updatedMeetings);
        updateMultipleFields({ advocatesMeetings: updatedMeetings });
    };

    const handleRemoveMeeting = (id) => {
        const filteredMeetings = advocatesMeetings.filter(meeting => meeting.id !== id);
        setAdvocatesMeetings(filteredMeetings);
        updateMultipleFields({ advocatesMeetings: filteredMeetings });
    };

    const handleContinue = () => {
        const payload = {
            attendedAdvocatesMeetings: attendedAdvocatesMeetings === 'yes',
            advocatesMeetings: advocatesMeetings.map(meeting => ({
                meetingDate: meeting.meetingDate,
                format: meeting.format,
                judgeLevel: meeting.judgeLevel,
                courtDirected: meeting.courtDirected === 'yes',
                courtOrderProvided: meeting.courtOrderProvided === 'yes',
                exceptionalTravelClaimed: meeting.exceptionalTravelClaimed === 'yes',
                exceptionalTravelAmount: meeting.exceptionalTravelAmount ? parseFloat(meeting.exceptionalTravelAmount) : null
            }))
        };
        
        console.log('Proceeding Type:', proceedingType);
        console.log('Law Type:', lawType);
        console.log('Aspect of Work:', aspectOfWork);
        console.log('Payload to be sent to backend:', JSON.stringify(payload, null, 2));
        
        // TODO: Send POST request to backend
        // await fetch('/api/advocates-meetings', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(payload)
        // });
        
        // Navigate to next page
        // navigate('/next-page');
    };

    const isFormValid = () => {
        if (!attendedAdvocatesMeetings) return false;
        if (attendedAdvocatesMeetings === 'no') return true;
        
        if (advocatesMeetings.length === 0) return false;
        
        return advocatesMeetings.every(meeting => 
            meeting.meetingDate &&
            meeting.format &&
            meeting.judgeLevel &&
            meeting.courtDirected &&
            meeting.courtOrderProvided &&
            meeting.exceptionalTravelClaimed &&
            (meeting.exceptionalTravelClaimed === 'no' || meeting.exceptionalTravelAmount)
        );
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Advocates' Meetings</h1>

                <div className="govuk-form-group">
                    <fieldset className="govuk-fieldset">
                        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                            <h2 className="govuk-fieldset__heading">
                                Did you attend any advocates' meetings?
                            </h2>
                        </legend>
                        <div className="govuk-radios" data-module="govuk-radios">
                            <div className="govuk-radios__item">
                                <input
                                    className="govuk-radios__input"
                                    id="attended-yes"
                                    name="attended"
                                    type="radio"
                                    value="yes"
                                    checked={attendedAdvocatesMeetings === 'yes'}
                                    onChange={handleAttendedChange}
                                />
                                <label className="govuk-label govuk-radios__label" htmlFor="attended-yes">
                                    Yes
                                </label>
                            </div>
                            <div className="govuk-radios__item">
                                <input
                                    className="govuk-radios__input"
                                    id="attended-no"
                                    name="attended"
                                    type="radio"
                                    value="no"
                                    checked={attendedAdvocatesMeetings === 'no'}
                                    onChange={handleAttendedChange}
                                />
                                <label className="govuk-label govuk-radios__label" htmlFor="attended-no">
                                    No
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                {attendedAdvocatesMeetings === 'yes' && (
                    <>
                        <div className="govuk-form-group">
                            <h2 className="govuk-heading-m">Meeting Details</h2>
                            
                            {advocatesMeetings.map((meeting, index) => (
                                <AdvocatesMeetingItem
                                    key={meeting.id}
                                    meeting={meeting}
                                    index={index}
                                    onUpdate={handleUpdateMeeting}
                                    onRemove={handleRemoveMeeting}
                                    showRemove={advocatesMeetings.length > 1}
                                />
                            ))}
                        </div>

                        <button
                            className="govuk-button govuk-button--secondary"
                            data-module="govuk-button"
                            onClick={handleAddMeeting}
                            type="button"
                        >
                            Add Another Meeting
                        </button>
                    </>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem', marginTop: '2rem' }}>
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

export default AdvocatesMeetingsPage;
