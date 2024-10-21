import { Route, Routes } from "react-router-dom";
import { Header } from "./layouts/Header";
import Appointment from "./pages/Appointment";
import { Home } from "./pages/Home";
import { Authentication } from "./pages/Authentication";

function App() {
  return (
    <>
      <Header />
      <main className="mt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Appointment />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
