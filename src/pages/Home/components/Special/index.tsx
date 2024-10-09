import Special1 from "@/assets/img/special1.png";
import Special2 from "@/assets/img/special2.png";
import Special3 from "@/assets/img/special3.png";
import Special4 from "@/assets/img/special4.png";
import Special5 from "@/assets/img/special5.png";
import { FaLongArrowAltRight } from "react-icons/fa";

export const Special = () => {
  const ColImage = ({ image, title }: { image: string; title: string }) => (
    <div className="relative col-span-1">
      <img src={image} alt="special1" className="h-52 w-auto" />
      <div className="text-white absolute bottom-2 left-4 text-lg font-semibold">
        {title}
      </div>
    </div>
  );
  return (
    <div className="pt-32 pb-16">
      <div className="mx-40">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col justify-between">
            <h1 className="text-blue2 font-bold text-2xl">Chuyên khoa</h1>
            <div className="text-gray2 font-normal text-sm leading-6">
              DMC cung cấp một loạt các dịch vụ và chuyên khoa lâm sàng toàn
              diện, kết hợp chuyên môn y khoa với công nghệ tiên tiến để mang
              lại dịch vụ chăm sóc chất lượng cao nhất cho bệnh nhân.
            </div>
            <div className="flex items-center gap-2 text-blue2">
              Xem tất cả chuyên khoa
              <FaLongArrowAltRight />
            </div>
          </div>
          <ColImage image={Special1} title="Tim mạch" />
          <ColImage image={Special2} title="Nội tổng quát" />
          <ColImage image={Special3} title="Sản phụ" />
          <ColImage image={Special4} title="Chấn thương chỉnh hình" />
          <ColImage image={Special5} title="Nhi khoa" />
        </div>
      </div>
    </div>
  );
};
