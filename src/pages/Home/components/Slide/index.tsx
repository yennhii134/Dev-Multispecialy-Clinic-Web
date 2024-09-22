import { Button } from "antd";
import slider from "@/assets/img/slider-1.png";
import { Link } from "react-router-dom";
import bgSlider from "@/assets/svg/bg-slider.svg";

export const Slide = () => {
  return (
    <div className="h-72 grid grid-cols-3 relative">
      <div className="h-full flex flex-col justify-evenly px-10 col-span-2">
        <h1 className=" text-4xl font-bold">Phòng khám đa khoa DMC</h1>
        <div className="flex">
          <Button className="px-16 py-6 mr-3">
            <Link to="/booking" className="font-bold text-xl">
              Đặt lịch hẹn
            </Link>
          </Button>
          <Button className="px-16 py-6">
            <span className="font-bold text-xl">Tra cứu</span>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-cover bg-center transform rotate-180 bg-[url('@/assets/svg/bg-slider.svg')]"></div>
    </div>
  );
};
