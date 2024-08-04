import { useEffect, useState, createContext, useContext } from "react";
import getUser from "../services/getUser";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const defaultAuthState = {
  headers: null,
  isAuth: false,
  loggedUser: {
    bio: null,
    email: "",
    image: null,
    token: "",
    username: "",
  },
};

const loggedIn = JSON.parse(localStorage.getItem("loggedUser"));

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(loggedIn || defaultAuthState);

  useEffect(() => {
    if (!authState.headers) return;

    getUser(authState.headers)
      .then((loggedUser) => {
        setAuthState((prev) => ({
          ...prev,
          isAuth: true,
          loggedUser,
        }));
      })
      .catch(console.error);
  }, [authState.headers]);

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
