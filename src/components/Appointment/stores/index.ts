import { atom } from "recoil";

export const stepState = atom({
  key: "stepState",
  default: 1,
});

export const formValuesState = atom({
  key: "formValuesState",
  default: {
    service: "InHour",
    date: "",
    time: "",
    doctor: "",
    specialty: "",
    symptoms: "",
    phone: "",
    fullName: "",
    email: "",
    gender: null,
    dob: "",
    specialization: "",
    city: "",
    district: "",
    address: "",
  },
});
