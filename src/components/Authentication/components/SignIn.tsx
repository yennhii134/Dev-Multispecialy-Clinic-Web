import { Button, Form, Input } from "antd";
import { TbLockSquareRounded, TbUserCircle } from "react-icons/tb";
import bgAuthen from "@/assets/svg/bg-auth.svg";
import { screenKey } from "../screenKey";

export const SignIn = ({
  setIsScreen,
}: {
  setIsScreen: (value: string) => void;
}) => {
  return (
    <div className="py-4 flex justify-between gap-2 w-full">
      <div className="flex flex-col flex-1 space-y-10">
        <h1 className="text-3xl font-bold text-blue2 font-logo text-center">
          ĐĂNG NHẬP
        </h1>
        <Form className="flex flex-col" layout="vertical">
          <Form.Item label={<div className="font-medium">Số điện thoại</div>}>
            <Input
              allowClear
              placeholder="Nhập số điện thoại"
              prefix={<TbUserCircle className="text-base text-blue2" />}
            />
          </Form.Item>
          <Form.Item label={<div className="font-medium">Mật khẩu</div>}>
            <Input.Password
              allowClear
              placeholder="Nhập mật khẩu"
              prefix={<TbLockSquareRounded className="text-base text-blue2" />}
            />
          </Form.Item>
          <Button type="primary">Đăng nhập</Button>
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
