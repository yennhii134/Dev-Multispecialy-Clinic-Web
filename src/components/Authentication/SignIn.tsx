import { Button, Form, Input } from "antd";
import { TbLockSquareRounded, TbUserCircle } from "react-icons/tb";
import bgAuthen from "@/assets/svg/bg-auth.svg";
import { screenKey } from "@/components/Authentication/stores/screenKey";
import { AuthenService } from "@/services/Authen/AuthenService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userValue } from "@/stores/user";

export const SignIn = ({
  setIsScreen,
}: {
  setIsScreen: (value: string) => void;
}) => {
  const { isLoading, typeLoading, signIn } = AuthenService();
  const [form] = Form.useForm();
  const setUser = useSetRecoilState(userValue);
  const navigate = useNavigate();

  const handleSignIn = async (values: any) => {
    const response = await signIn(values);
    console.log("response", response);
    if (response?.status === false) {
      toast.error("Sai tên đăng nhập hoặc mật khẩu");
    } else {
      toast.success("Đăng nhập thành công");
      localStorage.setItem("access_token", response?.data.access_token);
      // setUser(response);
      // navigate("/");
    }
  };

  return (
    <div className="flex justify-between gap-2 w-full">
      <div className="flex flex-col flex-1 space-y-10">
        <h1 className="text-3xl font-bold text-blue2 font-logo text-center">
          ĐĂNG NHẬP
        </h1>
        <Form
          form={form}
          className="flex flex-col"
          layout="vertical"
          onFinish={handleSignIn}
        >
          <Form.Item
            name="username"
            label={
              <div className="font-medium">Tên đăng nhập/mã bệnh nhân</div>
            }
          >
            <Input
              allowClear
              placeholder="Nhập tên đăng nhập hoặc mã bệnh nhân"
              prefix={<TbUserCircle className="text-base text-blue2" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<div className="font-medium">Mật khẩu</div>}
          >
            <Input.Password
              allowClear
              placeholder="Nhập mật khẩu"
              prefix={<TbLockSquareRounded className="text-base text-blue2" />}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading === typeLoading.signIn}
          >
            Đăng nhập
          </Button>
        </Form>
        <div className="flex justify-between max-sm:flex-col">
          <div>
            Chưa có tài khoản?
            <i
              className="text-blue2 cursor-pointer ml-1"
              onClick={() => setIsScreen(screenKey.signUp)}
            >
              Đăng ký
            </i>
          </div>
          <i className="text-blue2 cursor-pointer">Quên mật khẩu?</i>
        </div>
      </div>
      <div className="max-sm:hidden flex items-center">
        <img
          src={bgAuthen}
          alt="bg-signup"
          className="size-64 object-contain"
        />
      </div>
    </div>
  );
};
