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
      apiCall: axiosInstance.post("/auth/patientRegister", data),
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
    const respone = await useApiRequest({
      apiCall: axiosInstance.get(`/auth/checkExist/${username}`),
    });
    if (respone?.status) {
      return respone.data;
    }
  };

  return { isLoading, typeLoading, signUp, signIn, logout, checkExistUsername };
};
