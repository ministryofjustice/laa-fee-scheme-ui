import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const CareProceedingsGraduatedFeeSchemePage = () => {
    const navigate = useNavigate();
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');

    const handleDayChange = (e) => setDay(e.target.value);
    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    const handleContinue = () => {
        setError('');
        const paddedDay = day.padStart(2, '0');
        const paddedMonth = month.padStart(2, '0');
        const inputDate = `${year}-${paddedMonth}-${paddedDay}`;
        const phase1Start = '2007-10-02';
        const phase2Start = '2011-05-09';

        if (inputDate < phase1Start) {
            setError('Certification date must be on or after 2 October 2007');
            return;
        }
        if (inputDate >= phase2Start) {
            navigate('/fee-scheme-fas-advocacy');
        } else {
            navigate('/fee-scheme-fgf-counsel-advocacy');
        }
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <h1 className="govuk-heading-xl">Care Proceedings Graduated Fee Scheme (CPGFS)</h1>

                <div
                    id="certification"
                    className="govuk-form-group"
                >
                    <fieldset
                        aria-describedby="certification-hint"
                        className="govuk-fieldset"
                    >
                        <legend className="govuk-fieldset__legend">
                            <h1 className="govuk-heading-l">
                                Certification Date
                            </h1>
                        </legend>

                        <div
                            id="certification-hint"
                            className="govuk-hint"
                            aria-hidden="false"
                        >
                            For example, 12 11 2007
                        </div>
                        {error && (
                            <p className="govuk-error-message">
                                <span className="govuk-visually-hidden">Error:</span>
                                {error}
                            </p>
                        )}
                        <div className="govuk-date-input">
                            <div className="govuk-date-input__item">
                                <label
                                    htmlFor="certification-day"
                                    className="govuk-label"
                                    aria-hidden="false"
                                >
                                    Day
                                </label>
                                <input
                                    id="certification-day"
                                    inputMode="numeric"
                                    className="govuk-input govuk-input--width-2 govuk-date-input__input"
                                    type="text"
                                    name="certification-day-input"
                                    value={day}
                                    onChange={handleDayChange}
                                />
                            </div>

                            <div className="govuk-date-input__item">
                                <label
                                    htmlFor="certification-month"
                                    className="govuk-label"
                                    aria-hidden="false"
                                >
                                    Month
                                </label>
                                <input
                                    id="certification-month"
                                    inputMode="numeric"
                                    className="govuk-input govuk-input--width-2 govuk-date-input__input"
                                    type="text"
                                    name="certification-month-input"
                                    value={month}
                                    onChange={handleMonthChange}
                                />
                            </div>

                            <div className="govuk-date-input__item">
                                <label
                                    htmlFor="certification-year"
                                    className="govuk-label"
                                    aria-hidden="false"
                                >
                                    Year
                                </label>
                                <input
                                    id="certification-year"
                                    inputMode="numeric"
                                    className="govuk-input govuk-input--width-4 govuk-date-input__input"
                                    type="text"
                                    name="certification-year-input"
                                    value={year}
                                    onChange={handleYearChange}
                                />
                            </div>
                        </div>
                    </fieldset>
                </div>

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
                    disabled={!day || !month || !year}
                >
                    Continue
                </button>
            </main>
        </div>
    );
};

export default CareProceedingsGraduatedFeeSchemePage;
