import { SignIn, SignUp } from "@/components/Authentication";
import { useState } from "react";
import { screenKey } from "@/components/Authentication/stores/screenKey";
import { OTP } from "@/components/OTP";
import { useRecoilValue } from "recoil";
import { formValue } from "@/components/Authentication/stores";
import { OTPScreen } from "@/types/OTP";
import { IFormValue } from "@/types/Authentication";

export const Authentication = () => {
  const [isScreen, setIsScreen] = useState<string>(screenKey.signIn);
  const form = useRecoilValue(formValue);
  return (
    <div className="auth_wrapper h-screen pt-4 flex justify-center mx-auto max-sm:px-2 bg-[url('@/assets/img/team-bg-img.jpg')]">
      {isScreen === screenKey.signIn ? (
        <SignIn setIsScreen={setIsScreen} />
      ) : isScreen === screenKey.signUp ? (
        <SignUp setIsScreen={setIsScreen} />
      ) : isScreen === screenKey.otp ? (
        <OTP screen={OTPScreen.Authen} form={form as IFormValue} />
      ) : null}
    </div>
  );
};
