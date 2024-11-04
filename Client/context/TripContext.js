import React, { createContext, useState } from "react";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    cityNameArr: [],
    daysArr: [],
    date: null,
    flightTickets: [],
    detailedFlightTickets: [],
    destinations: [],
  });

  const resetTripData = () => {
    setTripData({
      cityNameArr: [],
      daysArr: [],
      date: null,
      flightTickets: [],
      detailedFlightTickets: [],
      destinations: [],
    });
  };

  return (
    <TripContext.Provider value={{ tripData, setTripData, resetTripData }}>
      {children}
    </TripContext.Provider>
  );
};
