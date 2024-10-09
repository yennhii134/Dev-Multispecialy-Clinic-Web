import { atom } from "recoil";

export const stepState = atom({
  key: "stepState",
  default: 1,
});

export const formValuesState = atom({
  key: "formValuesState",
  default: {
    service: "Normal Consultation",
    date: "",
    time: "",
    doctor: "",
    specialty: "",
    description: "",
    phone: "",
    name: "",
    email: "",
    gender: "",
    dob: "",
    city: "",
    district: "",
    address: "",
  },
});
