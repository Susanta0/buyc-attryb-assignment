import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider=({children})=>{

const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setUser(decodedToken);
    }
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
  };
    return(
        <AuthContext.Provider value={{authToken, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}