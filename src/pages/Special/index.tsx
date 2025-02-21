import bannerSpecial from "@/assets/img/banner-special.png";
import { Special } from "@/components/Home";
import { Appointment } from "../Appointment";

export const SpecialPage = () => {
  const SpecialistCategory = ({
    index,
    desciptions,
  }: {
    index: string;
    desciptions: string[];
  }) => {
    return (
      <div className="flex gap-4 text-xs md:text-lg">
        <div>{index}</div>
        <div className="border border-white"></div>
        <div>
          {desciptions.map((desciption) => (
            <div>{desciption}</div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="relative">
        <div className="absolute text-blue2 font-semibold text-2xl lg:text-6xl left-1/4 top-1/3 space-y-4">
          <div>Chuyên</div>
          <div>Khoa</div>
        </div>
        <img src={bannerSpecial} alt="banner" />
      </div>
      <Special />
      <div className="transparent-gradient text-white px-10 md:px-20 lg:px-52 py-20 mb-10">
        <div className="pb-10 text-2xl font-semibold">Danh Mục Chuyên Khoa</div>
        <div className="grid grid-cols-2 md:grid-cols-3 max-md:gap-4">
          <div className="col-span-1 flex flex-col gap-6">
            <SpecialistCategory
              index="B"
              desciptions={["Bác sĩ gia đình", "Bệnh truyền nhiễm"]}
            />
            <SpecialistCategory
              index="C"
              desciptions={[
                "Cấp cứu",
                "Chuẩn đoán hình ảnh",
                "Chấn thương chỉnh hình",
                "Chăm sóc giảm nhẹ",
              ]}
            />
            <SpecialistCategory index="D" desciptions={["Da liễu"]} />
            <SpecialistCategory
              index="H"
              desciptions={["Hô hấp", "Huyết học Lâm sàng"]}
            />
            <SpecialistCategory index="L" desciptions={["Lão khoa"]} />
          </div>
          <div className="col-span-1 flex flex-col gap-6">
            <SpecialistCategory
              index="N"
              desciptions={[
                "Nha khoa",
                "Nhãn khoa",
                "Nhi khoa",
                "Nội tổng quát",
                "Nội cơ xương khớp",
                "Nội tiết",
              ]}
            />
            <SpecialistCategory
              index="P"
              desciptions={["Phục hồi chức năng"]}
            />
            <SpecialistCategory index="R" desciptions={["Răng hàm mặt"]} />
            <SpecialistCategory
              index="S"
              desciptions={["Sản phụ khoa", "Sơ sinh", "Sức khỏe tâm thần"]}
            />
          </div>
          <div className="col-span-1 flex flex-col gap-6">
            <SpecialistCategory
              index="T"
              desciptions={[
                "Tai mũi họng",
                "Thận",
                "Thần kinh",
                "Thẩm mỹ mắt",
                "Tiêu hóa",
                "Tim mạch",
                "Tiết niệu",
              ]}
            />
            <SpecialistCategory
              index="U"
              desciptions={["Ung bướu", "Ung thư"]}
            />
            <SpecialistCategory
              index="X"
              desciptions={["Xét nghiệm", "Xương khớp"]}
            />
          </div>
        </div>
      </div>

      <Appointment />
    </div>
  );
};
