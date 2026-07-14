import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { checkCurrentUser } from "../services/authService";
import { getProfile } from "../services/userService";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add user profile to authenticated user
  const setAuthUser = async (newUser) => {
    if (newUser && newUser.username) {
      try {
        const profile = await getProfile(newUser.username);
        setUser({ ...newUser, ...profile });
      } catch (err) {
        console.error("Failed to fetch profile details on setUser:", err);
        setUser(newUser);
      }
    } else {
      setUser(newUser);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const rawUser = await checkCurrentUser(); // check JWT tokens in cookie
        await setAuthUser(rawUser);
      } catch (err) {
        setUser(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser: setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
