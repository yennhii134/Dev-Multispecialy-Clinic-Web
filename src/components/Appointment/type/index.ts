export enum Service {
  InHour = "InHour",
  OutHour = "OutHour",
}
export enum Gender {
  false = "Nam",
  true = "Nữ",
}
export type formValue = {
  service?: Service;
  date?: string;
  time?: string;
  symptoms?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: true;
  address?: {
    address?: string;
    city?: string;
    state?: string;
  };
  doctor?: {
    name?: string;
    specialization?: string;
  };
};
