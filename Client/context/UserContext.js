// context/UserContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// UserProvider to wrap around the app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context in components
export const useUser = () => useContext(UserContext);
