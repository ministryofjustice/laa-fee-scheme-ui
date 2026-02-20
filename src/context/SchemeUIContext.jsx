import React, { useState } from 'react';
import { SchemeUIContext } from './SchemeUIContextUtils';

export const SchemeUIProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        // Family Advocacy Scheme Page
        aspectOfWork: '',
        
        // Proceeding Types Page
        proceedingType: '',
        
        // Hearing Page
        hearingDate: '',
        hearingType: '',
        numberOfInterimProceedings: '',
        interimHearings: [],
        durationBand: '',
        days: '',
        judgeLevel: '',
        courtDirected: '',
        
        // Calculated Fee
        calculatedFee: null,
        interimHearingFees: [],
        totalInterimFee: null,

        // Bolton Page
        isBoltonApplicable: '',
        boltonCategory: '',
        boltonItems: [],
        totalBoltonFee: null,
        
        // Advocates Meetings Page
        attendedAdvocatesMeetings: '',
        advocatesMeetings: []
    });

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const updateMultipleFields = (updates) => {
        setFormData(prev => ({
            ...prev,
            ...updates
        }));
    };

    const resetFormData = () => {
        setFormData({
            aspectOfWork: '',
            proceedingType: '',
            hearingDate: '',
            hearingType: '',
            numberOfInterimProceedings: '',
            interimHearings: [],
            durationBand: '',
            days: '',
            judgeLevel: '',
            courtDirected: '',
            calculatedFee: null,
            interimHearingFees: [],
            totalInterimFee: null,
            isBoltonApplicable: '',
            boltonCategory: '',
            boltonItems: [],
            totalBoltonFee: null,
            attendedAdvocatesMeetings: '',
            advocatesMeetings: []
        });
    };

    return (
        <SchemeUIContext.Provider value={{ formData, updateFormData, updateMultipleFields, resetFormData }}>
            {children}
        </SchemeUIContext.Provider>
    );
};
