import { AuthenService } from "@/services/authen.service";
import { userValue } from "@/stores/user";
import { createContext, useContext, useEffect, useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

const AuthContext = createContext<any>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }
  return context;
};

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("access_Token");
  });
  const setUserGlobal = useSetRecoilState(userValue);
  const clearUserGlobal = useResetRecoilState(userValue);
  const { getProfile } = AuthenService();

  useEffect(() => {
    const fetchProfile = async () => {
      if (accessToken) {
        localStorage.setItem("access_Token", accessToken);
        getProfile().then((response) => {
          if (response?.data) {
            setUserGlobal(response?.data);
          }
        });
      } else {
        clearUserGlobal();
        localStorage.clear();
      }
    };
    fetchProfile();
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
