import { Slide, Doctors, Services } from "./components";
import { configStyleHome } from "@/theme/configStyle";
import { ConfigProvider } from "antd";

export const Home = () => {
  return (
    <ConfigProvider theme={configStyleHome.theme}>
      <Slide />
      <Services />
      {/* <Doctors /> */}
    </ConfigProvider>
  );
};
