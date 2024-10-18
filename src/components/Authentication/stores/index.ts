import { atom } from "recoil";

export const phoneState = atom<string>({
  key: "phoneState",
  default: "",
});
