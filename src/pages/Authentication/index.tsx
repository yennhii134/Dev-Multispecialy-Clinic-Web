import "./index.scss";
import { SignIn, OTP, SignUp } from "@/components/Authentication";
import { useState } from "react";
import { screenKey } from "@/components/Authentication/stores/screenKey";

export const Authentication = () => {
  const [isScreen, setIsScreen] = useState<string>(screenKey.signIn);
  return (
    <div className="auth_wrapper w-2/3 pt-4 flex items-center justify-center mx-auto max-sm:px-2">
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
