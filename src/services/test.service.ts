import { axiosInstance } from "@/api/axiosInstance";
import { Patient } from "@/types/User";

export function getDataTest() {
  return axiosInstance.get("patient/PAT01");
}

export function updateDataTest(id: string, data: Patient) {
  return axiosInstance.put(`patient/${id}`, data);
}
