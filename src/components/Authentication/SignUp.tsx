import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { screenKey } from "./stores/screenKey";
import { SignUpWPatientId } from "./SignUpWPatientId";
import { SignUpWUsername } from "./SignUpWUsername";

export const SignUp = ({
  setIsScreen,
}: {
  setIsScreen: (value: string) => void;
}) => {
  const [valueRegister, setValueRegister] = useState("RegisterPatient");

  const onChange = (e: RadioChangeEvent) => {
    setValueRegister(e.target.value);
  };

  return (
    <div className="sign-up-wrapper space-y-4 p-6 max-w-[980px] bg-white shadow-xl rounded-lg w-full h-fit">
      <h1 className="text-3xl font-semibold text-blue2 font-logo text-center">
        Đăng ký
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
      <div className="space-y-4">
        {
          {
            RegisterPatient: <SignUpWPatientId setIsScreen={setIsScreen} />,
            RegisterUserName: <SignUpWUsername setIsScreen={setIsScreen} />,
          }[valueRegister]
        }
      </div>
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
