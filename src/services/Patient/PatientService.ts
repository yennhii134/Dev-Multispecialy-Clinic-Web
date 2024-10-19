import { axiosInstance } from "@/api/axiosInstance";
import { useApiRequest } from "@/hooks/useApiRequest";

export const PatientService = () => {
  const getByPhone = async (phone: string) => {
    return useApiRequest({
      apiCall: axiosInstance.get("patient", {
        params: {
          phone,
        },
      }),
    });
  };

  return { getByPhone };
};
