import { RecoilRoot } from "recoil";
import { Header } from "./layouts/Header";
import { AppRoute } from "./routes/AppRoute";
import AuthContextProvider from "./context/AuthContext";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { configStyleContainer, styleToast } from "./css/configStyle";

export default function App() {
  return (
    <RecoilRoot>
      <AuthContextProvider>
        <ConfigProvider theme={configStyleContainer.theme}>
          <BrowserRouter>
            <Toaster
              toastOptions={{
                success: {
                  icon: "✅",
                  duration: 5000,
                  style: {
                    ...styleToast,
                    border: "1px solid #07f8a0",
                    boxShadow: "0 0 10px #07f8a0",
                  },
                },
                error: {
                  icon: "❌",
                  duration: 5000,
                  style: {
                    ...styleToast,
                    border: "1px solid #ff4d4f",
                    boxShadow: "0 0 10px #ff4d4f",
                  },
                },
              }}
            />
            <>
              <Header />
              <main className="mt-24">
                <AppRoute />
              </main>
            </>
          </BrowserRouter>
        </ConfigProvider>
      </AuthContextProvider>
    </RecoilRoot>
  );
}
