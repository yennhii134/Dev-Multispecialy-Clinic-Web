import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

export const Slide = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    console.log("handleBooking");
    navigate("/booking");
  };

  return (
    <div className="h-72 grid grid-cols-3 relative">
      <div className="h-full flex flex-col justify-evenly px-10 col-span-2">
        <h1 className=" text-4xl font-bold">Phòng khám đa khoa DMC</h1>
        <div className="flex">
          {/* <Link to="/booking"> */}
          <Button className="px-16 py-6 mr-3" onClick={handleBooking}>
            <span className="font-bold text-xl">Đặt lịch hẹn</span>
          </Button>
          {/* </Link> */}
          <Button className="px-16 py-6" onClick={handleBooking}>
            <span className="font-bold text-xl">Tra cứu</span>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-cover bg-center transform rotate-180 bg-[url('@/assets/svg/bg-slider.svg')]"></div>
    </div>
  );
};
