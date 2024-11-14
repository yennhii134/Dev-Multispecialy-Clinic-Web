import "./index.scss";
import { Button, Dropdown, MenuProps } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/img/logoDMC3.png";
import { useRecoilValue } from "recoil";
import { userValue } from "@/stores/user";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthenService } from "@/services/Authen/AuthenService";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useRecoilValue(userValue);
  const { logout } = AuthenService();
  const isScreenAuth = location.pathname.includes("/auth");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-2" onClick={handleLogout}>
          <IoLogOutOutline className="text-blue2 text-2xl" />
          Đăng xuất
        </div>
      ),
    },
  ];

  return (
    <div className="header-wrapper bg-white fixed top-0 left-0 z-50 w-full">
      <div className="w-full flex items-center justify-between px-20 space-x-4 ">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="size-24 object-cover mx-3" />
        </Link>
        <div className="flex items-center">
          {user ? (
            <Dropdown menu={{ items }} placement="bottom">
              <div className="flex items-center space-x-4">
                <FaUserCircle className="text-blue2 text-2xl" />
              </div>
            </Dropdown>
          ) : (
            <>
              {!isScreenAuth && (
                <Button
                  type="primary"
                  className="px-6 py-[10px] rounded-2xl"
                  onClick={() => navigate("/auth")}
                >
                  Đăng nhập / Đăng ký
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
