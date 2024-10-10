import { Button, Input } from "antd";
import { useEffect, useState, useTransition } from "react";
import bgOtp from "@/assets/svg/bg-otp.svg";
import { useRecoilValue } from "recoil";
import { phoneState } from "../stores";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

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

export const OTP = () => {
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [otp, setOtp] = useState<string>("");
  const phone = useRecoilValue<string>(phoneState);

  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [error, setError] = useState<any | "">("");
  const [success, setSuccess] = useState<any | "">("");
  const [isPeding, startTransaction] = useTransition();

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log("Recaptcha resolved with response:", response);
        },
      }
    );
    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  const handleSubmit = () => {
    if (!confirmationResult) {
      startTransaction(() => {
        setError("");
        if (!recaptchaVerifier) {
          return setError("RecaptchaVerifier not found");
        }
        try {
          const phone_formatted =
            phone[0] === "0" ? phone.replace("0", "+84") : phone;
          signInWithPhoneNumber(auth, phone_formatted, recaptchaVerifier).then(
            (result) => {
              setConfirmationResult(result);
            }
          );
          console.log(confirmationResult);
          setSuccess("OTP sent successfully");
        } catch (error) {
          setError(error);
          console.error(error);
        }
      });
    } else {
      console.log("OTP sent successfully");
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleSubmitOTP = (value: string) => {
    setOtp(value);
  };

  const handleResendOtp = () => {
    setTimeLeft(10);
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
              {`Mã OTP đã được gửi đến số điện thoại của bạn: ${phone}`}
            </div>
            <div>
              Vui lòng nhập mã OTP đã được gửi đến số điện thoại của bạn
            </div>
          </div>
          <div className="space-y-3">
            <Input.OTP length={6} onChange={handleSubmitOTP} />
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
