import { FaStethoscope } from "react-icons/fa";
import skTongQuat from "@/assets/img/sk-tong-quat.png";
import skBaoHiem from "@/assets/img/bao-hiem-y-te.png";
import khamChuDong from "@/assets/img/kham-benh-chu-dong.png";

export const Services = () => {
  const ServiceItem = (props: {
    title: string;
    description: string;
    image: string;
  }) => {
    return (
      <div className="col-span-1 flex flex-col items-center bg-white rounded-xl p-6">
        <div className=" flex items-center justify-center rounded-full size-14">
          <img src={props.image} alt="service" />
        </div>
        <h3 className="text-xl font-bold mt-5">{props.title}</h3>
        <p className="text-primary-blue-200 font-medium text-center">
          {props.description}
        </p>
      </div>
    );
  };
  return (
    <div className="py-12 px-6 bg-[#F0F9FF]">
      <div className="mb-8 text-3xl font-semibold">
        CÁC DỊCH VỤ Y TẾ{" "}
        <span className="text-primary-blue-50 font-semibold">DMC</span> CUNG CẤP{" "}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <ServiceItem
          title="Khám sức khỏe tổng quát"
          description="Khám sức khỏe tổng quát hàng năm, định kỳ"
          image={skTongQuat}
        />
        <ServiceItem
          title="Bảo hiểm y tế"
          description="Hỗ trợ khám chữa bệnh, mua thuốc"
          image={skBaoHiem}
        />
        <ServiceItem
          title="Khám chữa bệnh chủ động"
          description="Khám chữa bệnh đầy đủ chuyên khoa, khám sức khỏe tổng quát định kỳ cho người dân"
          image={khamChuDong}
        />
      </div>
    </div>
  );
};
