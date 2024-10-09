import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "./theme/colors.scss";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import { configStyleContainer } from "./theme/configStyle.ts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <ConfigProvider theme={configStyleContainer.theme}>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </RecoilRoot>
  </StrictMode>
);
