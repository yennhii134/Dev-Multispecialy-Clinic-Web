import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "./css/colors.scss";
import { RecoilRoot } from "recoil";
import AuthContextProvider from "./context/AuthContext";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { configStyleContainer, styleToast } from "./css/configStyle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </AuthContextProvider>
    </RecoilRoot>
  </StrictMode>
);
