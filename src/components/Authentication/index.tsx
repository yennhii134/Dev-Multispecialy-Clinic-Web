import "./index.scss";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { OTP } from "./components/OTP";
import { useState } from "react";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { isModalAuthValue } from "@/stores/isModalAuth";
import { screenKey } from "./screenKey";

export const Authentication = () => {
  const [isScreen, setIsScreen] = useState<string>(screenKey.signIn);
  const [isModalAuth, setIsModalAuth] = useRecoilState(isModalAuthValue);

  const onCloseModal = () => {
    setIsModalAuth(false);
    setIsScreen(screenKey.signIn);
  };
  return (
    <Modal
      centered
      open={isModalAuth}
      onCancel={onCloseModal}
      footer={null}
      width={850}
    >
      <div className="auth_wrapper flex items-center mx-auto max-sm:px-2">
        {isScreen === screenKey.signIn ? (
          <SignIn setIsScreen={setIsScreen} />
        ) : isScreen === screenKey.signUp ? (
          <SignUp setIsScreen={setIsScreen} />
        ) : isScreen === screenKey.otp ? (
          <OTP />
        ) : null}
      </div>
    </Modal>
  );
};
