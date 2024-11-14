import { Patient } from "@/types/User";
import { atom } from "recoil";

interface IFormValue {
  patient?: Patient;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const formValue = atom<IFormValue>({
  key: "formValue",
  default: {},
});
