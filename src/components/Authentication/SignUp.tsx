import { Button, Form, Input, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { screenKey } from "./stores/screenKey";
import { phoneState } from "./stores";
import { useRecoilState } from "recoil";
import { useGetPatientByPhone } from "@/hooks/useGetPatientByPhone";

export const SignUp = ({
  setIsScreen,
}: {
  setIsScreen: (value: string) => void;
}) => {
  const [valueRegister, setValueRegister] = useState("RegisterPatient");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { handleGetPhone } = useGetPatientByPhone();
  const [phone, setPhone] = useRecoilState<string>(phoneState);

  // const [phone, setPhone] = useRecoilState<string>(phoneState);
  const onChange = (e: RadioChangeEvent) => {
    setValueRegister(e.target.value);
  };

  return (
    <div className="sign-up-wrapper space-y-4 w-full">
      <h1 className="text-3xl font-bold text-blue2 font-logo text-center">
        ĐĂNG KÝ
      </h1>
      <div className="flex items-center justify-center">
        <Radio.Group
          onChange={onChange}
          value={valueRegister}
          buttonStyle="solid"
          className="space-x-4"
        >
          <Radio.Button value={"RegisterPatient"}>
            Đăng ký với mã bệnh nhân
          </Radio.Button>
          <Radio.Button value={"RegisterUserName"}>
            Đăng ký với tên đăng nhập
          </Radio.Button>
        </Radio.Group>
      </div>
      <div className="space-y-2">
        {
          {
            RegisterPatient: (
              <Form.Item label="Mã bệnh nhân" layout="vertical">
                <Input placeholder="Nhập mã bệnh nhân" />
              </Form.Item>
            ),
            RegisterUserName: (
              <>
                <Form.Item label="Số điện thoại" layout="vertical">
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>
                <Form.Item label="Tên đăng nhập" layout="vertical">
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isDisabled}
                    placeholder="Tên đăng nhập phải có ít nhất 1 ký tự số và chữ"
                  />
                </Form.Item>
              </>
            ),
          }[valueRegister]
        }
        <Form.Item label="Họ và tên" layout="vertical">
          <Input disabled={isDisabled} />
        </Form.Item>
        <Form.Item label="Số điện thoại" layout="vertical">
          <Input disabled={isDisabled} />
        </Form.Item>
        <Form.Item label="Mật khẩu" layout="vertical">
          <Input disabled={isDisabled} />
        </Form.Item>
        <Form.Item label="Xác nhận mật khẩu" layout="vertical">
          <Input disabled={isDisabled} />
        </Form.Item>
      </div>
      <Button
        type="primary"
        className="w-full"
        onClick={() => setIsScreen(screenKey.otp)}
      >
        Đăng ký
      </Button>
      <div className="flex gap-2 w-full justify-center">
        <div>Đã có tài khoản?</div>
        <i
          className="text-blue2 cursor-pointer"
          onClick={() => setIsScreen(screenKey.signIn)}
        >
          Đăng nhập
        </i>
      </div>
    </div>
  );
};