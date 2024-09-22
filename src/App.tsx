import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppointmentScheduler from "./pages/AppointmentScheduler";
import { Header } from "./layouts/Header";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<AppointmentScheduler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
