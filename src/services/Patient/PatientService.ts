import { axiosInstance } from "@/api/axiosInstance";
import { useApiRequest } from "@/hooks/useApiRequest";

export const PatientService = () => {
  const getByPhone = async (phone: string) => {
    return useApiRequest({
      apiCall: axiosInstance.get(`patient/findByPhone/${phone}`),
      catchError: true,
    });
  };

  const getById = async (id: string) => {
    const response = await useApiRequest({
      apiCall: axiosInstance.get(`patient/${id}`),
      catchError: true,
    });
    if (response) return response;
  };

  const getMedicalRecord = async (patientId: string) => {
    return useApiRequest({
      apiCall: axiosInstance.get(`medical-record?patientId=${patientId}`),
      catchError: true,
    });
  };

  const updateInfo = async (patient_id: string, data: any) => {
    return useApiRequest({
      apiCall: axiosInstance.put(`patient/${patient_id}`, data),
      catchError: true,
    });
  };

  return { getByPhone, getById, getMedicalRecord, updateInfo };
};
