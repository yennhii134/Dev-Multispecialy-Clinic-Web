import { useState } from "react";
import { PatientService } from "@/services/patient.service";
import { AutoCompleteProps } from "antd";

export const useGetPatientByPhone = () => {
  const [patients, setPatients] = useState<AutoCompleteProps["options"]>([]);
  const { getByPhone } = PatientService();

  const handleGetPhone = async (phone: string) => {
    const response = await getByPhone(phone);
    if (response?.status) {
      const patient = response.data.map((patient: any) => {
        const dob = new Date(patient.dob).toLocaleDateString("en-GB");
        return {
          ...patient,
          value: `${patient.fullName} - ${patient.phone} - ${dob}`,
          label: `${patient.fullName} - ${patient.phone} - ${dob}`,
        };
      });
      setPatients(patient);
    }
  };

  return { patients, setPatients, handleGetPhone };
};
