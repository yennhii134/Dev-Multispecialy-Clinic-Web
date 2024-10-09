import { Route, Routes } from "react-router-dom";
import { Header } from "./layouts/Header";
import Appointment from "./pages/Appointment";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <main className="mt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Appointment />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
