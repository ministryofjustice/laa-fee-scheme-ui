import React, { createContext, useContext, useState } from 'react';

const SchemeUIContext = createContext();

export const useSchemeUIContext = () => {
    const context = useContext(SchemeUIContext);
    if (!context) {
        throw new Error('useSchemeUIContext must be used within SchemeUIProvider');
    }
    return context;
};

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
        courtTypeFee: null,

        // Bolton Page
        isBoltonApplicable: '',
        boltonCategory: '',
        boltonItems: [],
        totalBoltonFee: null,

        // Advocates Meetings Page
        attendedAdvocatesMeetings: '',
        advocatesMeetings: [],

        // PFLRS Pages
        certificationDate: "",
        pflrsProceedingsType: "",
        providerLocation: "",
        feeType: "",
        billType: "",
        courtType: "",
        levelOfWorkDone: "",
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
            advocatesMeetings: [],
            certificationDate: "",
            pflrsProceedingsType: "",
            providerLocation: "",
            feeType: "",
            billType: "",
            courtType: "",
            levelOfWorkDone: "",
        });
    };

    return (
        <SchemeUIContext.Provider value={{ formData, updateFormData, updateMultipleFields, resetFormData }}>
            {children}
        </SchemeUIContext.Provider>
    );
};
