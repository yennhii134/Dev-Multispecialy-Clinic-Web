import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "./theme/colors.scss";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import { configStyleContainer, styleToast } from "./theme/configStyle";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
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
    </RecoilRoot>
  </StrictMode>
);
