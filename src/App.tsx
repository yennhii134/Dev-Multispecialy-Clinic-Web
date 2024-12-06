import { Route, Routes } from "react-router-dom";
import { Header } from "./layouts/Header";
import {
  Appointment,
  Authentication,
  Home,
  PatientRecord,
  PatientInfo,
} from "./pages";

export default function App() {
  return (
    <>
      <Header />
      <main className="mt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="booking" element={<Appointment />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="patient-record" element={<PatientRecord />} />
          <Route path="patient-info" element={<PatientInfo />} />
        </Routes>
      </main>
    </>
  );
}
