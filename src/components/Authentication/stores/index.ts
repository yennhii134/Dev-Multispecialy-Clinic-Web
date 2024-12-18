import { IFormValue } from "@/types/Authentication";
import { atom } from "recoil";

export const formValue = atom<IFormValue>({
  key: "formValue",
  default: {},
});
