import React from 'react';
import { useSchemeUIContext } from '../context/SchemeUIContext';

const SummaryPane = () => {
    const { formData } = useSchemeUIContext();

    const getLabelForValue = (value, options) => {
        const option = options?.find(opt => opt.value === value);
        return option?.label || value;
    };

    const aspectOfWorkLabels = {
        'private-law-finance': 'Private Law Finance',
        'private-law-children': 'Private Law Children',
        'care-and-supervision': 'Care and Supervision',
        'other-public-law-children': 'Other Public Law Children',
        'domestic-abuse': 'Private Law Domestic Abuse',
        'ancillary-relief': 'Ancillary Relief & Other Family Work'
    };

    const proceedingTypeLabels = {
        'INTERIM_HEARING': 'Interim Hearing',
        'FINAL_HEARING': 'Final Hearing',
        'ADVOCATES_MEETING': 'Advocates\' Meeting',
        'CONFERENCES_OPINIONS': 'Conferences / Opinions',
        'APPEAL_REVIEW': 'Appeal / Review'
    };

    const hearingTypeLabels = {
        'INTERIM_HEARING': 'Interim Hearing',
        'FINAL_HEARING': 'Final Hearing'
    };

    return (
        <div style={{
            position: 'fixed',
            right: '20px',
            top: '80px',
            width: '450px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            backgroundColor: '#f3f2f1',
            border: '2px solid #b1b4b6',
            borderRadius: '4px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000
        }}>
            <h2 className="govuk-heading-m" style={{ marginTop: 0 }}>Summary</h2>
            
            {formData.aspectOfWork && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Type of Family Proceedings:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>
                        {aspectOfWorkLabels[formData.aspectOfWork] || formData.aspectOfWork}
                    </span>
                </div>
            )}

            {formData.proceedingType && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Proceeding Type:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>
                        {proceedingTypeLabels[formData.proceedingType] || formData.proceedingType}
                    </span>
                </div>
            )}

            {formData.hearingDate && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Hearing Date:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.hearingDate}</span>
                </div>
            )}

            {formData.hearingType && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Hearing Type:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>
                        {hearingTypeLabels[formData.hearingType] || formData.hearingType}
                    </span>
                </div>
            )}

            {formData.numberOfInterimProceedings && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Number of Interim Proceedings:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.numberOfInterimProceedings}</span>
                </div>
            )}

            {formData.interimHearings && formData.interimHearings.length > 0 && (
                <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #b1b4b6' }}>
                    <strong className="govuk-body-s" style={{ display: 'block', marginBottom: '5px' }}>
                        Interim Hearings:
                    </strong>
                    {formData.interimHearings.map((hearing, index) => (
                        <div key={index} style={{ marginLeft: '10px', marginTop: '5px' }}>
                            <span className="govuk-body-s" style={{ fontSize: '0.875rem' }}>
                                {index + 1}. {hearing.hearingDate || 'Not set'}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {formData.durationBand && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Duration Band:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.durationBand}</span>
                </div>
            )}

            {formData.days && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Days:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.days}</span>
                </div>
            )}

            {formData.judgeLevel && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Judge Level:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.judgeLevel}</span>
                </div>
            )}

            {formData.courtDirected && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Court Directed:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.courtDirected === 'YES' ? 'Yes' : 'No'}</span>
                </div>
            )}

            {formData.isBoltonApplicable && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Bolt-on Fee Applicable:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.isBoltonApplicable === 'yes' ? 'Yes' : 'No'}</span>
                </div>
            )}

            {formData.boltonCategory && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Bolton Category:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>
                        {aspectOfWorkLabels[formData.boltonCategory] || formData.boltonCategory}
                    </span>
                </div>
            )}

            {formData.boltonItems && formData.boltonItems.length > 0 && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Bolton Items:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.boltonItems.length} item(s)</span>
                </div>
            )}

            {formData.attendedAdvocatesMeetings && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Attended Advocates' Meetings:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>
                        {formData.attendedAdvocatesMeetings === 'yes' ? 'Yes' : 'No'}
                    </span>
                </div>
            )}

            {formData.advocatesMeetings && formData.advocatesMeetings.length > 0 && (
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Advocates' Meetings:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.advocatesMeetings.length} meeting(s)</span>
                </div>
            )}

            {!formData.aspectOfWork && (
                <p className="govuk-body-s" style={{ color: '#505a5f', fontStyle: 'italic' }}>
                    No information entered yet
                </p>
            )}
        </div>
    );
};

export default SummaryPane;
