import { Header } from "./layouts/Header";
import { AppRoute } from "./routes/AppRoute";

export default function App() {
  return (
    <>
      <Header />
      <main className="mt-24">
        <AppRoute />
      </main>
    </>
  );
}
