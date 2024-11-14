import "./index.scss";
import { SignIn, OTP, SignUp } from "@/components/Authentication";
import { useState } from "react";
import { screenKey } from "@/components/Authentication/stores/screenKey";

export const Authentication = () => {
  const [isScreen, setIsScreen] = useState<string>(screenKey.signIn);

  return (
    <div className="auth_wrapper h-screen pt-4 flex justify-center mx-auto max-sm:px-2 bg-[url('@/assets/img/team-bg-img.jpg')]">
      {isScreen === screenKey.signIn ? (
        <SignIn setIsScreen={setIsScreen} />
      ) : isScreen === screenKey.signUp ? (
        <SignUp setIsScreen={setIsScreen} />
      ) : isScreen === screenKey.otp ? (
        <OTP />
      ) : null}
    </div>
  );
};
