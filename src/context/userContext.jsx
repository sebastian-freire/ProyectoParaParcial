import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (nuevoUsuario) => {
    setUser(nuevoUsuario);
    console.log(`Nuevo user logeado: ${nuevoUsuario}`);
  };

  const logout = () => {
    setUser(null);
    console.log(`Usuario cerrando sesion`);
  };

  const contextValue = {
    user,
    login,
    logout,
    isLoggedIn: user !== null
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
