import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import bgOtp from "@/assets/svg/bg-otp.svg";
import { useRecoilValue } from "recoil";
import { phoneState } from "./stores";
import { getApp, getApps, initializeApp } from "firebase/app";
import { ConfirmationResult, getAuth, RecaptchaVerifier } from "firebase/auth";
import { FirebaseService } from "@/services/Firebase.service";
import toast from "react-hot-toast";
import { AuthenService } from "@/services/Authen/AuthenService";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export const OTP = ({ form }: { form: any }) => {
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [otp, setOtp] = useState<string>("");
  // const phone = useRecoilValue<string>(phoneState);
  const { isLoading, typeLoading, signUp } = AuthenService();
  const navigate = useNavigate();
  console.log("phone", form.patient.phone);

  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isPeding, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  const handleSubmit = async () => {
    if (!confirmationResult) {
      try {
        setIsPending(true);
        const sendOTP = await FirebaseService.getInstance().sendOTP(
          form.patient.phone,
          recaptchaVerifier
        );
        setConfirmationResult(sendOTP);
        setIsPending(false);
        toast.success("Mã OTP đã được gửi");
      } catch (error: any) {
        toast(error.message, {
          icon: "❌",
          duration: 5000,
          style: {
            border: "1px solid #ff4d4f",
            boxShadow: "0 0 10px #ff4d4f",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });
        setIsPending(false);
      }
    } else {
      try {
        setIsPending(true);
        const verify = await FirebaseService.getInstance().confirmOTP(
          confirmationResult,
          otp
        );
        console.log(verify);
        setIsPending(false);
        toast.success("Xác thực thành công");
        setOtp("");
        handleSignUp();
      } catch (error: any) {
        toast(error.message, {
          icon: "❌",
          duration: 5000,
          style: {
            border: "1px solid #ff4d4f",
            boxShadow: "0 0 10px #ff4d4f",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResendOtp = () => {
    setTimeLeft(10);
  };

  const handleSignUp = () => {
    console.log("form", form);

    signUp(form).then((response) => {
      console.log("response handleSignUp", response);
      if (!response?.status) {
        toast.error(response?.data?.message_VN);
      } else {
        toast.success(response.data.message_VN);
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="w-full gap-10 flex items-center justify-between py-4">
        <div className="flex flex-col flex-1 space-y-14 px-4">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold font-logo text-blue2">
              XÁC THỰC OTP
            </h1>
            <div className="text-sm text-gray2">
              {`Mã OTP đã được gửi đến số điện thoại ${form.patient.phone}`}
            </div>
            <div>
              Vui lòng nhập mã OTP
            </div>
          </div>
          <div className="space-y-3">
            <Input.OTP
              length={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            />
            <div className="w-full flex justify-end">
              {timeLeft === 0 ? (
                <div
                  className="text-sm font-semibold text-blue2 cursor-pointer"
                  onClick={handleResendOtp}
                >
                  Gửi lại mã
                </div>
              ) : (
                <div className="text-sm">
                  Mã sẽ được gửi lại sau {timeLeft}s
                </div>
              )}
            </div>
          </div>
          <Button onClick={handleSubmit} type="primary">
            {isPeding ? (
              <span className="loading loading-spinner" />
            ) : confirmationResult ? (
              "Xác thực"
            ) : (
              "Gửi mã OTP"
            )}
          </Button>
        </div>
        <div className="max-sm:hidden flex items-center justify-center">
          <img src={bgOtp} alt="bg-otp" className="size-64 object-contain" />
        </div>
      </div>
      <div id="recaptcha-container" />
    </>
  );
};
