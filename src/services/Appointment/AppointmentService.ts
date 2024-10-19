import { axiosInstance } from "@/api/axiosInstance";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useState } from "react";
import toast from "react-hot-toast";

export const AppointmentService = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const loadingType = {
    Appointment: "Appointment",
  };
  const appointment = async (formValues: any) => {
    console.log("formValues appointment", formValues);
    
    const response = await useApiRequest({
      apiCall: axiosInstance.post("appointment", {
        service: formValues.service,
        // doctor: {
        //   name: formValues.doctor,
        //   specialization: formValues.specialization,
        // },
        specialty: formValues.specialty,
        date: formValues.date,
        time: formValues.time,
        symptoms: formValues.symptoms,
        patient: {
          fullName: formValues.fullName,
          phone: formValues.phone,
          address: `${formValues.address} ${formValues.district} ${formValues.city}`,
          gender: formValues.gender,
          dob: formValues.dob,
        },
      }),
      isToastSuccess: true,
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
