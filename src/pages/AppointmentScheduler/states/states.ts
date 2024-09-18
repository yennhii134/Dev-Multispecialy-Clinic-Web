import { atom } from "recoil";

export const stepState = atom({
  key: "stepState",
  default: 1,
});

export const cityState = atom({
  key: "cityState",
  default: "",
});

export const districtState = atom({
  key: "districtState",
  default: [],
});
