import { Slide, Doctors, Services, Special } from "./components";

export const Home = () => {
  return (
    <div>
      <Slide />
      <Services />
      <Special />
      {/* <Doctors /> */}
    </div>
  );
};
