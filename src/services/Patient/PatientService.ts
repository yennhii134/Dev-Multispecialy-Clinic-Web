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

  const getById = async (id: string) => {
    const response = await useApiRequest({
      apiCall: axiosInstance.get(`patient/${id}`),
      catchError: true,
    });
    if (response) return response;
  };

  return { getByPhone, getById };
};
