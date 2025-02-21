import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { AppRoute } from "./routes/AppRoute";

export default function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <main className="mt-24">
        <AppRoute />
      </main>
      <Footer />
    </div>
  );
}
