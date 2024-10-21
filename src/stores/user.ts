import { User } from "@/types/User";
import { atom } from "recoil";

export const userValue = atom<User | null>({
  key: "userValue",
  default: null,
});
