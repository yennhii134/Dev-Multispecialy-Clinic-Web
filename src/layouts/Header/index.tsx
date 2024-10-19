import "./index.scss";
import { Button, Menu, MenuProps } from "antd";
import { useState } from "react";
import { menuData } from "./stores/menu-data";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isModalAuthValue } from "@/stores/isModalAuth";
import { Authentication } from "@/pages/Authentication";
import Logo from "@/assets/img/logoDMC3.png";

export const Header = () => {
  const [current, setCurrent] = useState("mail");
  const setIsModalAuth = useSetRecoilState(isModalAuthValue);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="header-wrapper bg-white fixed top-0 left-0 z-50 w-full py-4">
      <div className="w-full flex items-center justify-between px-20 space-x-4 ">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="size-24 object-cover mx-3" />
          {/* <i className="font-logo text-blue1 font-bold text-4xl">DMC</i> */}
        </Link>
        {/* <div className="flex-grow">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={menuData}
            className=" flex-1"
            theme={"light"}
          />
        </div> */}
        <div className="flex items-center">
          <Button
            type="primary"
            className="px-6 py-[10px] rounded-2xl"
            onClick={() => setIsModalAuth(true)}
          >
            Đăng nhập / Đăng ký
          </Button>
        </div>
      </div>
      <Authentication />
    </div>
  );
};
