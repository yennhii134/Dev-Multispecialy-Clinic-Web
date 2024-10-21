import { DoctorService } from "@/services/Doctor/DoctorService";
import { useEffect, useState } from "react";

export const useGetSpecializations = () => {
  const [specializations, setSpecializations] = useState([]);
  const { getSpecializations } = DoctorService();

  useEffect(() => {
    const fetchSpecializations = async () => {
      const response = await getSpecializations();
      if (response) {
        const data = response.map((specialization: any) => {
          return {
            ...specialization,
            label: specialization.name,
            value: specialization.specialization_id,
          };
        });
        setSpecializations(data);
      }
    };
    fetchSpecializations();
  }, []);

  return { specializations, setSpecializations };
};
