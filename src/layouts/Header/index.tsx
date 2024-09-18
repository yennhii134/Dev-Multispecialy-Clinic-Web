import "./index.scss";
import LogoDMC from "@/assets/img/logoDMC.png";
import { PhoneFilled } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];
const menuData: MenuItem[] = [
  {
    label: <a href="/">Trang chủ</a>,
    key: "home",
  },
  {
    label: <a href="/">Giới thiệu</a>,
    key: "desciption",
  },
  {
    label: "Đội ngũ bác sĩ",
    key: "doctors",
    children: [
      {
        type: "group",
        children: [
          { label: "Bác sĩ A", key: "doctorA" },
          { label: "Bác sĩ B", key: "doctorB" },
        ],
      },
    ],
  },
];

export const Header = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="header-wrapper px-3 w-full h-24 flex items-center justify-between">
      <div className="flex items-center">
        <img src={LogoDMC} alt="logo" className="size-20 object-contain mx-3" />
        <h1 className="text-primary-blue-50 font-bold text-3xl">
          Phòng khám đa khoa DMC
        </h1>
      </div>
      <div className="flex-grow mx-4">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={menuData}
          className=" w-full"
        />
      </div>
      <div className="flex items-center">
        <div className="bg-slate-200 flex items-center justify-center rounded-full size-8">
          <PhoneFilled />
        </div>
        <div className="ml-2">
          <p className="text-secondary text-sm">Đường dây nóng </p>
          <p className="font-medium">1900 1234</p>
        </div>
        
      </div>
    </div>
  );
};
