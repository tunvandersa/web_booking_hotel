import React, { createContext, useContext, useState } from 'react';

const HotelContext = createContext();

export const useHotel = () => useContext(HotelContext);

export const HotelProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <HotelContext.Provider value={{ selectedHotel, setSelectedHotel }}>
      {children}
    </HotelContext.Provider>
  );
};
