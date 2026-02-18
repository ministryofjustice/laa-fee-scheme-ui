import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchemeUIContext } from '../context/SchemeUIContext';

const FinalSummaryPage = () => {
    const navigate = useNavigate();
    const { formData, resetFormData } = useSchemeUIContext();

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

    const pflrsProceedingTypesLabels = {
        'children': 'Children',
        'finance': 'Finance',
        'domesticAbuse': 'Domestic Abuse',
        'excluded': 'Excluded from PFLRS'
    };

    const boltonTypeLabels = (type) =>
        type ? type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';

    const totalFee = (formData.calculatedFee || 0) + (formData.totalBoltonFee || 0);

    const handleSubmit = () => {
        console.log('Final submission:', JSON.stringify(formData, null, 2));
        resetFormData();
        navigate('/submission-confirmation');
    };

    return (
        <div className="govuk-width-container" style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingBottom: '40px' }}>
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Check your answers</h1>
                <p className="govuk-body-l">Review the information you have provided before submitting.</p>

                {/* Case Details */}
                <h2 className="govuk-heading-m">Case details</h2>
                <dl className="govuk-summary-list">
                    {formData.aspectOfWork && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Type of Family Proceedings</dt>
                            <dd className="govuk-summary-list__value">
                                {aspectOfWorkLabels[formData.aspectOfWork] || formData.aspectOfWork}
                            </dd>
                            <dd className="govuk-summary-list__actions">
                                <a className="govuk-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/family-advocacy-scheme'); }}>
                                    Change
                                </a>
                            </dd>
                        </div>
                    )}

                    {formData.proceedingType && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Proceeding Type</dt>
                            <dd className="govuk-summary-list__value">
                                {proceedingTypeLabels[formData.proceedingType] || formData.proceedingType}
                            </dd>
                            <dd className="govuk-summary-list__actions">
                                <a className="govuk-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/proceeding-types'); }}>
                                    Change
                                </a>
                            </dd>
                        </div>
                    )}

                    {formData.pflrsProceedingsType && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Proceedings Type</dt>
                            <dd className="govuk-summary-list__value">
                                {pflrsProceedingTypesLabels[formData.pflrsProceedingsType] || formData.pflrsProceedingsType}
                            </dd>
                            <dd className="govuk-summary-list__actions">
                                <a className="govuk-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/private-family-law-representation-scheme'); }}>
                                    Change
                                </a>
                            </dd>
                        </div>
                    )}

                </dl>

                {/* Hearing Details */}
                <h2 className="govuk-heading-m">Hearing details</h2>
                <dl className="govuk-summary-list">
                    {formData.hearingDate && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Hearing Date</dt>
                            <dd className="govuk-summary-list__value">{formData.hearingDate}</dd>
                            <dd className="govuk-summary-list__actions">
                                <a className="govuk-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/hearing'); }}>
                                    Change
                                </a>
                            </dd>
                        </div>
                    )}

                    {formData.hearingType && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Hearing Type</dt>
                            <dd className="govuk-summary-list__value">
                                {formData.hearingType === 'INTERIM_HEARING' ? 'Interim Hearing' : 'Final Hearing'}
                            </dd>
                            <dd className="govuk-summary-list__actions">
                                <a className="govuk-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/hearing'); }}>
                                    Change
                                </a>
                            </dd>
                        </div>
                    )}

                    {formData.numberOfInterimProceedings && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Number of Interim Proceedings</dt>
                            <dd className="govuk-summary-list__value">{formData.numberOfInterimProceedings}</dd>
                            <dd className="govuk-summary-list__actions" />
                        </div>
                    )}

                    {formData.durationBand && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Duration Band</dt>
                            <dd className="govuk-summary-list__value">
                                {durationBandLabels[formData.durationBand] || formData.durationBand}
                            </dd>
                            <dd className="govuk-summary-list__actions" />
                        </div>
                    )}

                    {formData.days && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Days</dt>
                            <dd className="govuk-summary-list__value">{formData.days}</dd>
                            <dd className="govuk-summary-list__actions" />
                        </div>
                    )}

                    {formData.judgeLevel && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Judge Level</dt>
                            <dd className="govuk-summary-list__value">
                                {judgeLevelLabels[formData.judgeLevel] || formData.judgeLevel}
                            </dd>
                            <dd className="govuk-summary-list__actions" />
                        </div>
                    )}

                    {formData.courtDirected && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Court Directed</dt>
                            <dd className="govuk-summary-list__value">
                                {formData.courtDirected === 'YES' ? 'Yes' : 'No'}
                            </dd>
                            <dd className="govuk-summary-list__actions" />
                        </div>
                    )}
                </dl>

                {/* Interim Hearing Fees Breakdown */}
                {formData.interimHearingFees && formData.interimHearingFees.length > 0 && (
                    <>
                        <h2 className="govuk-heading-m">Interim hearing fees</h2>
                        <dl className="govuk-summary-list">
                            {formData.interimHearingFees.map((fee, idx) => (
                                <div className="govuk-summary-list__row" key={idx}>
                                    <dt className="govuk-summary-list__key">Interim Hearing {idx + 1}</dt>
                                    <dd className="govuk-summary-list__value">
                                        {fee !== null ? `£${fee.toFixed(2)}` : '—'}
                                    </dd>
                                    <dd className="govuk-summary-list__actions" />
                                </div>
                            ))}
                        </dl>
                    </>
                )}

                {/* Hearing Fee */}
                {formData.calculatedFee !== null && formData.calculatedFee !== undefined && (
                    <div className="govuk-inset-text" style={{ borderLeftColor: '#1d70b8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong className="govuk-body" style={{ marginBottom: 0 }}>Hearing Fee:</strong>
                            <strong className="govuk-heading-m" style={{ marginBottom: 0 }}>
                                £{formData.calculatedFee.toFixed(2)}
                            </strong>
                        </div>
                    </div>
                )}

                {/* Bolt-On Details */}
                <h2 className="govuk-heading-m">Bolt-on fees</h2>
                <dl className="govuk-summary-list">
                    <div className="govuk-summary-list__row">
                        <dt className="govuk-summary-list__key">Bolt-on Fee Applicable</dt>
                        <dd className="govuk-summary-list__value">
                            {formData.isBoltonApplicable === 'yes' ? 'Yes' : formData.isBoltonApplicable === 'no' ? 'No' : '—'}
                        </dd>
                        <dd className="govuk-summary-list__actions">
                            <a className="govuk-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/bolton'); }}>
                                Change
                            </a>
                        </dd>
                    </div>

                    {formData.isBoltonApplicable === 'yes' && formData.boltonCategory && (
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">Bolton Category</dt>
                            <dd className="govuk-summary-list__value">
                                {aspectOfWorkLabels[formData.boltonCategory] || formData.boltonCategory}
                            </dd>
                            <dd className="govuk-summary-list__actions" />
                        </div>
                    )}

                    {formData.boltonItems && formData.boltonItems.length > 0 && formData.boltonItems.map((item, idx) => (
                        <div className="govuk-summary-list__row" key={idx}>
                            <dt className="govuk-summary-list__key">
                                {boltonTypeLabels(item.boltonType)}
                            </dt>
                            <dd className="govuk-summary-list__value">
                                {item.amount ? `£${parseFloat(item.amount).toFixed(2)}` : '—'}
                            </dd>
                            <dd className="govuk-summary-list__actions" />
                        </div>
                    ))}
                </dl>

                {formData.totalBoltonFee !== null && formData.totalBoltonFee !== undefined && (
                    <div className="govuk-inset-text" style={{ borderLeftColor: '#1d70b8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong className="govuk-body" style={{ marginBottom: 0 }}>Total Bolt-On Fees:</strong>
                            <strong className="govuk-heading-m" style={{ marginBottom: 0 }}>
                                £{formData.totalBoltonFee.toFixed(2)}
                            </strong>
                        </div>
                    </div>
                )}

                {/* Advocates' Meetings */}
                {formData.attendedAdvocatesMeetings && (
                    <>
                        <h2 className="govuk-heading-m">Advocates' meetings</h2>
                        <dl className="govuk-summary-list">
                            <div className="govuk-summary-list__row">
                                <dt className="govuk-summary-list__key">Attended Advocates' Meetings</dt>
                                <dd className="govuk-summary-list__value">
                                    {formData.attendedAdvocatesMeetings === 'yes' ? 'Yes' : 'No'}
                                </dd>
                                <dd className="govuk-summary-list__actions" />
                            </div>
                            {formData.advocatesMeetings && formData.advocatesMeetings.length > 0 && (
                                <div className="govuk-summary-list__row">
                                    <dt className="govuk-summary-list__key">Number of Meetings</dt>
                                    <dd className="govuk-summary-list__value">
                                        {formData.advocatesMeetings.length}
                                    </dd>
                                    <dd className="govuk-summary-list__actions" />
                                </div>
                            )}
                        </dl>
                    </>
                )}

                {/* Grand Total */}
                {formData.calculatedFee !== null && formData.calculatedFee !== undefined && (
                    <div style={{
                        marginTop: '30px',
                        padding: '20px',
                        backgroundColor: '#1d70b8',
                        color: '#ffffff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <strong className="govuk-heading-m" style={{ color: '#ffffff', marginBottom: 0 }}>
                            Total Fee:
                        </strong>
                        <strong className="govuk-heading-l" style={{ color: '#ffffff', marginBottom: 0 }}>
                            £{totalFee.toFixed(2)}
                        </strong>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem', marginTop: '30px' }}>
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
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FinalSummaryPage;
