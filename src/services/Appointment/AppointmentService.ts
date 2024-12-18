import { axiosInstance } from "@/api/axiosInstance";
import { useApiRequest } from "@/hooks/useApiRequest";
import { FormValue } from "@/types/Appointment";
import { useState } from "react";
import toast from "react-hot-toast";

export const AppointmentService = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const loadingType = {
    Appointment: "Appointment",
  };
  const appointment = async (formValues: FormValue) => {
    const response = await useApiRequest({
      apiCall: axiosInstance.post("appointment", formValues),
      loadingType: loadingType.Appointment,
      setIsLoading,
    });

    if (response) {
      toast.success("Đặt lịch thành công");
      return true;
    }
    return false;
  };

  return { isLoading, loadingType, appointment };
};
