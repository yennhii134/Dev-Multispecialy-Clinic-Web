import { useApiRequest } from "@/hooks/useApiRequest";
import { axiosInstance } from "@/api/axiosInstance";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userValue } from "@/stores/user";

export const AuthenService = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  enum typeLoading {
    signUp = "signUp",
    signIn = "signIn",
  }
  const setUser = useSetRecoilState(userValue);

  const signUp = async (data: any) => {
    return await useApiRequest({
      apiCall: axiosInstance.post("/auth/register-patient", data),
      catchError: true,
      loadingType: typeLoading.signUp,
      setIsLoading: setIsLoading,
    });
  };

  const signIn = async (data: any) => {
    return await useApiRequest({
      apiCall: axiosInstance.post("/auth/login", data),
      catchError: true,
      loadingType: typeLoading.signIn,
      setIsLoading: setIsLoading,
    });
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  const checkExistUsername = async (username: string) => {
    return await useApiRequest({
      apiCall: axiosInstance.get(`/auth/check-username/${username}`),
      catchError: true,
    });
  };

  const checkPatiendId = async (patientId: string) => {
    return await useApiRequest({
      apiCall: axiosInstance.get(`/auth/check-patientId/${patientId}`),
      catchError: true,
    });
  };

  return {
    isLoading,
    typeLoading,
    signUp,
    signIn,
    logout,
    checkExistUsername,
    checkPatiendId,
  };
};
