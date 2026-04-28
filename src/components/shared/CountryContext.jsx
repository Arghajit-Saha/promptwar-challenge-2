import React, { createContext, useState, useContext } from 'react';

const CountryContext = createContext();

export const useCountry = () => useContext(CountryContext);

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState('IN'); // defaults to IN. Options: US, UK, IN, EU

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};
