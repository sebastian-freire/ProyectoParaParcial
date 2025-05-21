import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const LOCAL_STORAGE_USERNAME_KEY = "app_username";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUsername = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
      return savedUsername ? JSON.parse(savedUsername) : null;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user !== null) {
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
      }
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [user]);

  const login = (nuevoUsuario) => {
    setUser(nuevoUsuario);
    console.log(`Nuevo user logeado: ${nuevoUsuario}`);
    console.log('localStorage actual:', localStorage.getItem('app_username'))
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

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
