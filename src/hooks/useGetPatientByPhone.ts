import { useEffect, useState } from "react";
import { PatientService } from "@/services/Patient/PatientService";
import { AutoCompleteProps } from "antd";

export const useGetPatientByPhone = () => {
  const [patients, setPatients] = useState<AutoCompleteProps["options"]>([]);
  const { getByPhone } = PatientService();

  const handleGetPhone = async (phone: string) => {
    const response = await getByPhone(phone);
    if (response) {
      const patient = response.map((patient: any) => {
        return {
          ...patient,
          value: `${patient.fullName} - ${patient.phone}`,
          label: `${patient.fullName} - ${patient.phone}`,
        };
      });
      setPatients(patient);
    }
  };

  return { patients, setPatients, handleGetPhone };
};
