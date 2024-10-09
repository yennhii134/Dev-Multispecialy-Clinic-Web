import { Slide, Doctors, Services, Special } from "./components";
import { configStyleHome } from "@/theme/configStyle";
import { ConfigProvider } from "antd";

export const Home = () => {
  return (
    <ConfigProvider theme={configStyleHome.theme}>
      <Slide />
      <Services />
      <Special />
      {/* <Doctors /> */}
    </ConfigProvider>
  );
};
