import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { screenKey } from "./stores/screenKey";
import { SignUpWPatientId } from "./SignUpWPatientId";
import { SignUpWUsername } from "./SignUpWUsername";
import { formValue } from "./stores";
import { useResetRecoilState } from "recoil";
import { IAuthFormProps } from "@/types/Authentication";

export const SignUp = ({ setIsScreen }: IAuthFormProps) => {
  const [valueRegister, setValueRegister] = useState("RegisterUserName");
  const clearFormValue = useResetRecoilState(formValue);

  const onChange = (e: RadioChangeEvent) => {
    clearFormValue();
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
          <Radio.Button value={"RegisterUserName"}>Bệnh nhân mới</Radio.Button>
          <Radio.Button value={"RegisterPatient"}>Bệnh nhân cũ</Radio.Button>
        </Radio.Group>
      </div>
      <div className="space-y-4">
        {
          {
            RegisterUserName: <SignUpWUsername setIsScreen={setIsScreen} />,
            RegisterPatient: <SignUpWPatientId setIsScreen={setIsScreen} />,
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
