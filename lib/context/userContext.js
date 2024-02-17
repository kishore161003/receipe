import React from "react";
import { useState, useContext } from "react";
export const MyContext = React.createContext();

function MyProvider({ children }) {
  // Define the state or data you want to provide
  const [userId, setuserId] = useState({
    id: "",
  });

  return (
    <MyContext.Provider value={{ userId, setuserId }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
