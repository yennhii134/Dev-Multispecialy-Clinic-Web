import { axiosInstance } from "@/api/axiosInstance";
import { useState } from "react";

export const useCheckExistUserName = () => {
  const [isExist, setIsExist] = useState<boolean>(false);

  const checkExistUserName = async (username: string) => {
    try {
      const res = await axiosInstance.get(`/auth/check-username/${username}`);
      setIsExist(res.data.isExist);
    } catch (error) {
      console.error(error);
    }
  };

  return { isExist, checkExistUserName };
};
