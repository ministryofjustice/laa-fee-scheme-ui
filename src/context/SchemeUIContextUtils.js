import React, { createContext, useContext } from 'react';

const SchemeUIContext = createContext();

const useSchemeUIContext = () => {
    const context = useContext(SchemeUIContext);
    if (!context) {
        throw new Error('useSchemeUIContext must be used within SchemeUIProvider');
    }
    return context;
};

export { SchemeUIContext, useSchemeUIContext };