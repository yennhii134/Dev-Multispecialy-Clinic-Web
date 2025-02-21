import LogoWhite from "@/assets/img/logo-white.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-blue2 py-4 text-white text-sm lg:px-20 xl:px-52 mt-12">
      <div className="flex flex-col items-center lg:grid lg:grid-cols-3 lg:h-3/4 max-lg:space-y-6">
        <div className="col-span-1 flex flex-col justify-center items-center lg:items-start h-full space-y-4">
          <img src={LogoWhite} alt="logo" className="w-20 object-cover" />
          <div>
            Tầng 11, Friendship Tower, 31 Lê Duẩn, Phường Bến Nghé, Quận 1, TP
            HCM
          </div>
          <div>T: (028) 3820 6001</div>
        </div>
        <div className="col-span-1 flex items-center justify-between lg:justify-center h-full lg:space-x-10 w-full px-20">
          <div className="flex flex-col space-y-4">
            <div>Về chúng tôi</div>
            <div>Mạng Lưới</div>
            <div>Bác Sĩ</div>
            <div>Tuyển Dụng</div>
            <div>Cộng Đồng</div>
          </div>
          <div className="flex flex-col space-y-4">
            <div>Hội thảo & Hội nghị</div>
            <div>Tin Tức</div>
            <div>Trung Tâm Xét Nghiệm</div>
            <div>Chính Sách Quyền Riêng Tư</div>
            <div>Liên Hệ</div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center h-full space-y-4">
          <div className="max-lg:text-center">
            Theo dõi bản tin của chúng tôi
          </div>
          <div>
            <input
              type="text"
              placeholder="Email của bạn"
              className="w-60 h-8 rounded-2xl px-2 bg-blue2 border border-white text-white placeholder:text-white placeholder:text-[10px]"
            />
            <button className="bg-[#abdfe1] w-16 h-8 rounded-2xl -ml-6">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-white py-4"></div>
      <div className="pt-4 flex flex-col lg:flex-row items-center lg:justify-between max-lg:pb-4 space-y-2">
        <div>Copy right 2024 © DMC Corporation</div>
        <div className="flex">
          <div className="flex items-end">Kết nối với chúng tôi</div>
          <FaFacebook className="text-2xl mx-2" />
          <FaLinkedin className="text-2xl" />
        </div>
      </div>
    </div>
  );
};
