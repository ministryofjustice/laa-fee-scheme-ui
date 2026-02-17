import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [feeData, setFeeData] = useState({});
  const [feeType, setFeeType] = useState("");

  const addFee = (fieldName, amount) => {
    setFeeData({ ...feeData, [fieldName]: amount });
  };

  const hourlyRateFilter = ([key]) => ["Certification Date Fee", "Provider Location Fee"].includes(key);

  const getFeeTotal = () => {
    const feeItems =
      feeType === "Fixed"
        ? Object.values(feeData)
        : Object.entries(feeData)
            .filter(hourlyRateFilter)
            .map(([, value]) => value);

    return feeItems.reduce((sum, value) => sum + value, 0);
  };

  return (
    <AppContext.Provider
      value={{ feeData, addFee, getFeeTotal, feeType, setFeeType }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
