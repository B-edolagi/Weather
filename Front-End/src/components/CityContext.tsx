import React, { createContext, useContext, useState } from "react";
const CityContext = createContext<{
  city: string | undefined;
  setCity: React.Dispatch<React.SetStateAction<string>> | undefined;
}>({
  city: undefined,
  setCity: undefined,
});
export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCity] = useState("");

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  return useContext(CityContext);
};
