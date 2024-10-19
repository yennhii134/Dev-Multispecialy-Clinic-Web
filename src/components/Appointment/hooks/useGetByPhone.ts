import { useEffect, useState } from "react";
import { PatientService } from "@/services/Patient/PatientService";
import { AutoCompleteProps } from "antd";

export const useGetByPhone = () => {
  const [patients, setPatients] = useState<AutoCompleteProps["options"]>([]);
  const [phone, setPhone] = useState<string>("");
  const { getByPhone } = PatientService();

  const handleGetPhone = async () => {
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

  useEffect(() => {
    if (phone?.length > 9) {
      handleGetPhone();
    }
  }, [phone]);

  return { patients, setPatients, phone, setPhone, getByPhone };
};
