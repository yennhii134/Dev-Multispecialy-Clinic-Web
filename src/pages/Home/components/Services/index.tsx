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
      <div className="col-span-1 flex flex-col items-center bg-white rounded-xl p-6 space-y-2">
        <div className=" flex items-center justify-center rounded-full size-14">
          <img src={props.image} alt="service" />
        </div>
        <div className="text-center text-xl font-bold mt-5">{props.title}</div>
        <div className="text-blue3 font-medium text-center">
          {props.description}
        </div>
      </div>
    );
  };
  return (
    <div className="py-12 px-10 bg-[#F0F9FF]">
      <div className="mb-8 text-3xl max-md:text-2xl font-semibold">
        CÁC DỊCH VỤ Y TẾ <span className="text-blue2 font-semibold">DMC</span>{" "}
        CUNG CẤP{" "}
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3">
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
