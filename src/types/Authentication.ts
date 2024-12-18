import { Patient } from "./User";

export interface IFormValue {
  patient?: Patient;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IAuthFormProps {
  setIsScreen: (value: string) => void;
}
