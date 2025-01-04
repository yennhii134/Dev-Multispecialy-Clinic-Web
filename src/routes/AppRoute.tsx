import {
  Appointment,
  AppointmentList,
  Authentication,
  Home,
  PatientInfo,
  PatientRecord,
} from "@/pages";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth" element={<Authentication />} />
      <Route element={<PrivateRoute />}>
        <Route path="booking" element={<Appointment />} />
        <Route path="patient-record" element={<PatientRecord />} />
        <Route path="patient-info" element={<PatientInfo />} />
        <Route path="appointments" element={<AppointmentList />} />
      </Route>
    </Routes>
  );
};
