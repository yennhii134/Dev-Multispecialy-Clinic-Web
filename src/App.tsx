import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppointmentScheduler from "./pages/AppointmentScheduler";
import { Header } from "./layouts/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AppointmentScheduler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
