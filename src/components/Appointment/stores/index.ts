import { atom } from "recoil";
import { formValue, Service } from "@/types/Appointment";

export const stepState = atom({
  key: "stepState",
  default: 1,
});

export const formValuesState = atom<formValue | null>({
  key: "formValuesState",
  default: {
    service: Service.InHour,
  },
});
