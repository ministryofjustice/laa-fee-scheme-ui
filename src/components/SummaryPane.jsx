import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSchemeUIContext } from '../context/SchemeUIContext';

const SummaryPane = () => {
    const { formData } = useSchemeUIContext();
    const location = useLocation();

    // Hide summary pane on these routes
    const hiddenRoutes = ['/', '/fee-schemes', '/family-advocacy-scheme', '/final-summary'];
    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }

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

    const durationBandLabels = {
        'INTERIM_HEARING_UNIT_1': 'Unit 1 (up to 1 hour)',
        'INTERIM_HEARING_UNIT_2': 'Unit 2 (up to 2.5 hours)',
        'MULTIPLE_UNIT_2S': 'Multiple Unit 2s'
    };

    const judgeLevelLabels = {
        'MAGISTRATES_COURT_JUDGE': "Magistrates' Court Judge",
        'DISTRICT_JUDGE': 'District Judge',
        'CIRCUIT_JUDGE': 'Circuit Judge',
        'HIGH_COURT_JUDGE': 'High Court Judge',
        'DEPUTY_DISTRICT_JUDGE': 'Deputy District Judge',
        'OTHER': 'Other'
    };

    const hasAnyData = formData.aspectOfWork ||
        formData.proceedingType ||
        formData.hearingDate ||
        formData.hearingType ||
        formData.numberOfInterimProceedings ||
        (formData.interimHearings && formData.interimHearings.length > 0) ||
        formData.durationBand ||
        formData.days ||
        formData.judgeLevel ||
        formData.courtDirected ||
        formData.calculatedFee !== null ||
        formData.isBoltonApplicable ||
        formData.boltonCategory ||
        (formData.boltonItems && formData.boltonItems.length > 0) ||
        formData.attendedAdvocatesMeetings ||
        (formData.advocatesMeetings && formData.advocatesMeetings.length > 0);

    if (!hasAnyData) {
        return null;
    }

    const advocatesMeetingAmount = formData.advocatesMeetingAmount || 0;

    return (
        <aside style={{
            width: '450px',
            flexShrink: 0,
            alignSelf: 'flex-start',
            position: 'sticky',
            top: '20px',
            maxHeight: 'calc(100vh - 40px)',
            overflowY: 'auto',
            backgroundColor: '#f3f2f1',
            border: '2px solid #b1b4b6',
            borderRadius: '4px',
            padding: '20px',
            margin: '30px 20px 30px 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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

            {formData.numberOfInterimProceedings && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Number of Interim Proceedings:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>{formData.numberOfInterimProceedings}</span>
                </div>
            )}

            {formData.durationBand && (
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #b1b4b6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong className="govuk-body-s" style={{ marginRight: '10px', flexShrink: 0 }}>
                        Duration Band:
                    </strong>
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>
                        {durationBandLabels[formData.durationBand] || formData.durationBand}
                    </span>
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
                    <span className="govuk-body-s" style={{ textAlign: 'right' }}>
                        {judgeLevelLabels[formData.judgeLevel] || formData.judgeLevel}
                    </span>
                </div>
            )}

            {formData.calculatedFee !== null && formData.calculatedFee !== undefined && (
                <div style={{
                    marginBottom: '15px',
                    paddingBottom: '15px',
                    borderBottom: '2px solid #1d70b8',
                    backgroundColor: '#f0f4f9',
                    padding: '15px',
                    borderRadius: '4px'
                }}>
                    {formData.interimHearingFees && formData.interimHearingFees.length > 0 && (
                        <>
                            <strong className="govuk-body-s" style={{ display: 'block', marginBottom: '5px', color: '#1d70b8' }}>
                                Hearing Fee:
                            </strong>
                            <div style={{ marginBottom: '10px' }}>
                                {formData.interimHearingFees.map((fee, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span className="govuk-body-s">Interim Hearing {idx + 1}:</span>
                                        <span className="govuk-body-s">
                                            {fee !== null ? `£${fee.toFixed(2)}` : '—'}
                                        </span>
                                    </div>
                                ))}
                                <div style={{ borderTop: '1px solid #b1b4b6', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                    <strong className="govuk-body-s">Total:</strong>
                                    <strong className="govuk-body-s" style={{ fontSize: '1.1rem' }}>
                                        £{formData.calculatedFee.toFixed(2)}
                                    </strong>
                                </div>
                            </div>
                        </>
                    )}

                    {(!formData.interimHearingFees || formData.interimHearingFees.length === 0) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong className="govuk-body-s" style={{ color: '#1d70b8', marginBottom: 0 }}>
                                Hearing Fee:
                            </strong>
                            <strong className="govuk-body-s" style={{ fontSize: '1.1rem', color: '#0b0c0c', marginBottom: 0 }}>
                                £{formData.calculatedFee.toFixed(2)}
                            </strong>
                        </div>
                    )}
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
                <div style={{
                    marginBottom: '15px',
                    paddingBottom: '15px',
                    borderBottom: '2px solid #1d70b8',
                    backgroundColor: '#f0f4f9',
                    padding: '15px',
                    borderRadius: '4px'
                }}>
                    <strong className="govuk-body-s" style={{ display: 'block', marginBottom: '5px', color: '#1d70b8' }}>
                        Bolt-On Fees:
                    </strong>
                    {formData.boltonItems.filter(item => item.amount).map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span className="govuk-body-s">{item.boltonType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                            <span className="govuk-body-s">£{parseFloat(item.amount).toFixed(2)}</span>
                        </div>
                    ))}
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

            {formData.calculatedFee !== null && formData.calculatedFee !== undefined && (
                <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#1d70b8',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <strong className="govuk-body" style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: 0 }}>
                        Total:
                    </strong>
                    <strong className="govuk-body" style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: 0 }}>
                        £{((formData.calculatedFee || 0) + (formData.totalBoltonFee || 0) + advocatesMeetingAmount).toFixed(2)}
                    </strong>
                </div>
            )}

            {advocatesMeetingAmount > 0 && (
                <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Advocates' Meeting Amount</dt>
                    <dd className="govuk-summary-list__value">£{advocatesMeetingAmount.toFixed(2)}</dd>
                    <dd className="govuk-summary-list__actions" />
                </div>
            )}
        </aside>
    );
};

export default SummaryPane;
