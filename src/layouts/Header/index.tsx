import "./index.scss";
import LogoDMC from "@/assets/img/logoDMC.png";
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { menuData } from "./stores/menu-data";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export const Header = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const Contact = (props: {
    title: string;
    value: string;
    icon: JSX.Element;
  }) => (
    <div className="flex items-center my-1">
      <div className="bg-slate-50 flex items-center justify-center rounded-full size-7 mr-1">
        {props.icon}
      </div>
      <p className="text-white font-medium ml-2">{props.value}</p>
    </div>
  );
  return (
    <div className="header-wrapper">
      <div className="grid grid-cols-2 bg-gradient-to-r from-[#F0F9FF] to-primary-blue-50">
        <div className="col-start-2  flex flex-row-reverse justify-evenly">
          <Contact
            title="Hotline"
            value="1900 1234"
            icon={<FaPhoneAlt className="text-primary-blue-50" />}
          />
          <Contact
            title="Email"
            value="dmc@gmail.com"
            icon={<MdEmail className="text-primary-blue-50" />}
          />
          <Contact
            title="Địa chỉ"
            value="12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM"
            icon={<MdLocationPin className="text-primary-blue-50" />}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-between px-3">
        <Link to="/" className="flex items-center">
          <img
            src={LogoDMC}
            alt="logo"
            className="size-20 object-contain mx-3"
          />
          <i className="font-logo text-primary-blue-50 font-bold text-4xl">
            DMC
          </i>
        </Link>
        <div className="flex-grow">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={menuData}
            className=" w-full"
            theme={"light"}
          />
        </div>
        <div className="flex items-center">
          {/* <RiLoginCircleFill className="text-[#d02f5a] text-4xl mr-1" /> */}
          <div className="text-primary-blue-50 font-bold">
            Đăng nhập / Đăng ký
          </div>
        </div>
      </div>
    </div>
  );
};
