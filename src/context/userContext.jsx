import { useContext, createContext, useState, useEffect } from "react";
import { getProfileService } from "../services/authService.js";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      setLoading(true);

      const userData = await getProfileService();
      setUserInfo(userData); 
    } catch {
      setUserInfo({});
    } finally {
      setLoading(false);
    }
  };

  const getUserId = () => userInfo?.id || null;

  const isAuthenticated = () => !!userInfo?.id;

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        loading,
        checkSession,
        isAuthenticated,
        getUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
