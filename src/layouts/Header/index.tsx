import "./index.scss";
import { Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/img/logoDMC3.png";
import { useRecoilValue } from "recoil";
import { userValue } from "@/stores/user";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { EditFilled } from "@ant-design/icons";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useRecoilValue(userValue);
  const isScreenAuth = location.pathname.includes("/auth");
  const { setAccessToken } = useAuthContext();

  const handleLogout = () => {
    setAccessToken(null);
    navigate("/");
    toast.success("Đăng xuất thành công");
  };

  return (
    <div className="header-wrapper bg-white fixed top-0 left-0 z-50 w-full">
      <div className="w-full flex items-center justify-between pl-20 pr-10 space-x-4 ">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="size-24 object-cover mx-3" />
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div
                className="flex items-center gap-2 bg-primary-500 py-2 px-3 rounded-xl text-white cursor-pointer"
                onClick={() => navigate("/patient-record")}
              >
                <FaUserCircle className="text-2xl" />
                <span className="max-lg:hidden">Tra cứu hồ sơ bệnh án</span>
              </div>
              <div
                className="flex items-center gap-2 bg-primary-500 py-2 px-3 rounded-xl text-white cursor-pointer"
                onClick={() => navigate("patient-info")}
              >
                <EditFilled className="text-2xl" />
                <span className="max-lg:hidden">Chỉnh sửa thông tin</span>
              </div>
              <div
                className="flex items-center gap-2  py-2 px-3 border border-primary-500 rounded-xl text-primary-500 cursor-pointer"
                onClick={handleLogout}
              >
                <IoLogOutOutline className="text-2xl" />
                <span className="max-lg:hidden">Đăng xuất</span>
              </div>
            </>
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
