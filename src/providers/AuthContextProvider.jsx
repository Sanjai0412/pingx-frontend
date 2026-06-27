import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { checkCurrentUser } from "../services/authService";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await checkCurrentUser();
        setUser(user);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
