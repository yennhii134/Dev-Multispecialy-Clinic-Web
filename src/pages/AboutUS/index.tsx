import bannerAboutUs from "@/assets/img/banner-about-us.png";
import scaled from "@/assets/img/scaled.png";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const title = [
  {
    title:
      "DMC được thành lập với tầm nhìn trở thành đơn vị dẫn đầu toàn quốc về lĩnh vực chăm sóc sức khỏe và là thương hiệu chăm sóc sức khỏe đáng tin cậy nhất ở Việt Nam.",
    year: 2020,
    img: scaled,
  },
  {
    title: "DMC đã phát triển mạnh mẽ với 17 phòng khám tại 17 tỉnh thành.",
    year: 2021,
    img: scaled,
  },
  {
    title:
      "DMC tiếp tục mở rộng mạng lưới chăm sóc sức khỏe tư nhân hàng đầu tại Việt Nam.",
    year: 2022,
    img: scaled,
  },
  {
    title: "DMC tiếp nối sứ mệnh mang lại dịch vụ chăm sóc sức khỏe tốt nhất.",
    year: 2023,
    img: scaled,
  },
  {
    title: "DMC đã góp phần vào việc nâng cao sức khỏe cộng đồng.",
    year: 2024,
    img: scaled,
  },
  {
    title:
      "DMC đã đóng góp vào việc xây dựng tương lai của ngành y tế tại Việt Nam và nâng cao sức khỏe cũng như sự thịnh vượng của quốc gia.",
    year: 2025,
  },
];
export const AboutUS = () => {
  const [year, setYear] = useState<number>(2020);
  const [titleIntroducation, setTitleIntroducation] = useState(title[0]);
  const transitionVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setYear((prevYear) => {
        const nextYear = prevYear === 2025 ? 2020 : prevYear + 1;
        setTitleIntroducation(
          title.find((item) => item.year === nextYear) || title[0]
        );
        return nextYear;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [year]);

  return (
    <div>
      <div className="relative">
        <div className="absolute text-blue2 font-semibold text-2xl lg:text-6xl left-[15%] top-1/3 space-y-4">
          <div>Về Chúng Tôi</div>
        </div>
        <img src={bannerAboutUs} alt="banner-about-us" />
      </div>
      <div className="py-20 flex items-center justify-center">
        <div className="w-2/3 text-center space-y-4">
          <div className="text-blue2 text-3xl font-semibold space-y-4">
            <p>Chào mừng đến với DMC</p>
            <p>Chúng tôi là mạng lưới chăm sóc sức khỏe tư nhân</p>
            <p>hàng đầu tại Việt Nam</p>
          </div>
          <div>
            <p className="font-light">
              DMC cam kết xuất sắc trong thực hành lâm sàng, giáo dục và nghiên
              cứu, mang đến dịch vụ chăm sóc dẫn đầu ngành cho người dân Việt
              Nam. Với hơn 1.000 nhân viên tại 17 phòng khám, mạng lưới chăm sóc
              sức khỏe của chúng tôi bao gồm hơn 2.000 giường bệnh và phục vụ
              năm triệu lượt khám bệnh mỗi năm. Từ năm 2020, DMC đã xây dựng
              được uy tín vững chắc trong việc cung cấp dịch vụ chăm sóc chất
              lượng cao cho những người quan trọng nhất: bệnh nhân của chúng
              tôi. Chúng tôi tự hào đóng góp vào việc xây dựng tương lai của
              ngành y tế tại Việt Nam và nâng cao sức khỏe cũng như sự thịnh
              vượng của quốc gia.
            </p>
          </div>
          <div>
            <p className="text-blue2 text-3xl font-semibold">Tầm nhìn</p>
          </div>
          <div>
            <p className="font-light">
              Trở thành đơn vị dẫn đầu toàn quốc về lĩnh vực chăm sóc sức khỏe
              và là thương hiệu chăm sóc sức khỏe đáng tin cậy nhất ở Việt Nam.
            </p>
          </div>
        </div>
      </div>
      <div className="py-20">
        <div className="flex flex-col items-center gap-6">
          <p className="text-blue2 text-3xl font-semibold">
            Câu chuyện của chúng tôi
          </p>
          <div className="flex text-xl text-blue2 py-6 gap-1">
            <div
              className={clsx("border-b-4 px-6", {
                "border-blue2": year === 2020,
                "border-gray-300": year !== 2020,
              })}
            >
              2020
            </div>
            <div
              className={clsx("border-b-4 border-gray-300 px-6", {
                "border-blue2": year === 2021,
                "border-gray-300": year !== 2021,
              })}
            >
              2021
            </div>

            <div
              className={clsx("border-b-4 border-gray-300 px-6", {
                "border-blue2": year === 2022,
                "border-gray-300": year !== 2022,
              })}
            >
              2022
            </div>
            <div
              className={clsx("border-b-4 border-gray-300 px-6", {
                "border-blue2": year === 2023,
                "border-gray-300": year !== 2023,
              })}
            >
              2023
            </div>
            <div
              className={clsx("border-b-4 border-gray-300 px-6", {
                "border-blue2": year === 2024,
                "border-gray-300": year !== 2024,
              })}
            >
              2024
            </div>
            <div
              className={clsx("border-b-4 border-gray-300 px-6", {
                "border-blue2": year === 2025,
                "border-gray-300": year !== 2025,
              })}
            >
              2025
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 py-4 bg-blue-50 overflow-hidden">
          <motion.div
            key={year}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            className="flex flex-col items-center justify-center text-center px-20 gap-4"
          >
            {" "}
            <p className="text-blue2 text-3xl font-semibold">
              {titleIntroducation.year}
            </p>
            <p className="font-light">{titleIntroducation.title}</p>
          </motion.div>
          <motion.div
            key={`image-${year}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
          >
            <img src={titleIntroducation.img} alt="scaled" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
