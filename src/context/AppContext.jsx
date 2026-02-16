import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [feeData, setFeeData] = useState({});
  const [feeType, setFeeType] = useState("");

  const addFee = (fieldName, amount) => {
    setFeeData({ ...feeData, [fieldName]: amount });
  };

  const getFeeTotal = () => {
    const feeItems =
      feeType === "fixed"
        ? Object.values(feeData)
        : Object.entries(feeData)
            .filter(([key]) =>
              ["Certification Date Fee", "Provider Location Fee"].includes(key),
            )
            .map(([key, value]) => value);

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
