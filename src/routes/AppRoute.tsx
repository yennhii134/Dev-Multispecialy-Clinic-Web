import {
  AboutUS,
  Appointment,
  AppointmentList,
  Authentication,
  Home,
  PatientInfo,
  PatientRecord,
  SpecialPage,
} from "@/pages";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth" element={<Authentication />} />
      <Route path="special" element={<SpecialPage />} />
      <Route path="about-us" element={<AboutUS />} />
      <Route element={<PrivateRoute />}>
        <Route path="booking" element={<Appointment />} />
        <Route path="patient-record" element={<PatientRecord />} />
        <Route path="patient-info" element={<PatientInfo />} />
        <Route path="appointments" element={<AppointmentList />} />
      </Route>
    </Routes>
  );
};
