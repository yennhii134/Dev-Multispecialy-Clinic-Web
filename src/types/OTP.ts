import { IFormValue } from "./Authentication";
import { Patient } from "./User";

export enum OTPScreen {
  Authen = "Authen",
  UpdateInfo = "UpdateInfo",
}

export interface OTPProps {
  screen: OTPScreen;
  form: Patient | IFormValue;
}
