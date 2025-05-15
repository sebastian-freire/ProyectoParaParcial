import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userValue, setUser] = useState();

  const userHandle = (nuevoUsuario) => {
    setUser(nuevoUsuario);
  };

  return (
    <UserContext.Provider value={{ userValue, userHandle }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
