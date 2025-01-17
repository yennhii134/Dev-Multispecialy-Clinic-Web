import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { formValue } from "./stores";
import { getApp, getApps, initializeApp } from "firebase/app";
import { ConfirmationResult, getAuth, RecaptchaVerifier } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthenService } from "@/services/Authen/AuthenService";
import { useNavigate } from "react-router-dom";
import { FirebaseService } from "@/services/Firebase.service";
import { useAuthContext } from "@/context/AuthContext";

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
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [otp, setOtp] = useState<string>("");
  const { isLoading, typeLoading, signUp, signIn } = AuthenService();
  const navigate = useNavigate();
  const form = useRecoilValue(formValue);
  const [isPeding, setIsPending] = useState<boolean>(false);
  console.log("form in OTP", form);

  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();
  const { setAccessToken } = useAuthContext();

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
    if (!confirmationResult && form?.patient?.phone) {
      try {
        setIsPending(true);
        const sendOTP = await FirebaseService.getInstance().sendOTP(
          form?.patient?.phone!,
          recaptchaVerifier
        );
        setTimeLeft(30);
        setConfirmationResult(sendOTP);
        setIsPending(false);
        toast.success("Mã OTP đã được gửi");
      } catch (error: any) {
        toast.error(error.message);
        setIsPending(false);
      }
    } else {
      try {
        setIsPending(true);
        if (confirmationResult) {
          const verify = await FirebaseService.getInstance().confirmOTP(
            confirmationResult,
            otp
          );
          console.log("verify", verify);
          setIsPending(false);
          toast.success("Xác thực thành công");
          setOtp("");
          handleSignUp();
        }
      } catch (error: any) {
        toast.error(error.message);
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

  const handleResendOtp = async () => {
    if (recaptchaVerifier) {
      console.log("Clear recaptchaVerifier");
      
      recaptchaVerifier.clear();
      setRecaptchaVerifier(null);
    }

    const newRecaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setRecaptchaVerifier(newRecaptchaVerifier);

    try {
      setIsPending(true);
      const sendOTP = await FirebaseService.getInstance().sendOTP(
        form?.patient?.phone!,
        newRecaptchaVerifier
      );
      setConfirmationResult(sendOTP);
      setIsPending(false);
      setTimeLeft(30); // Reset timer
      toast.success("Mã OTP đã được gửi");
    } catch (error: any) {
      toast.error(error.message);
      setIsPending(false);
    }
  };

  const handleSignUp = () => {
    signUp(form).then((response) => {
      if (!response?.status) {
        toast.error(response?.data?.message);
      } else {
        toast.success(response.data.message);
        signIn({
          username: form?.username,
          password: form?.password,
        }).then((response) => {
          if (!response?.status) {
            console.log("response handleSignIn", response);
          } else {
            setAccessToken(response?.data?.access_token);
            navigate("/");
          }
        });
      }
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-xl gap-10 flex items-center justify-between h-fit p-10">
        <div className="flex flex-col flex-1 space-y-14 px-4">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold font-logo text-blue2">
              XÁC THỰC OTP
            </h1>
            <div className="text-sm text-gray2">
              Mã OTP đã được gửi đến số điện thoại
              <span className="ml-1 font-semibold">
                *******{form?.patient?.phone?.slice(-3)}
              </span>
            </div>
            <div>Vui lòng nhập mã OTP</div>
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
                  onClick={() => {
                    setConfirmationResult(undefined);
                    setRecaptchaVerifier(null);
                    handleResendOtp();
                  }}
                >
                  Gửi lại mã
                </div>
              ) : isPeding ? (
                <span className="loading loading-spinner" />
              ) : (
                <div className="text-sm text-gray2">
                  Gửi lại mã sau {timeLeft}s
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            type="primary"
            loading={isLoading === typeLoading.signUp}
          >
            {isPeding ? (
              <span className="loading loading-spinner" />
            ) : confirmationResult ? (
              "Xác thực"
            ) : (
              "Gửi mã OTP"
            )}
          </Button>
        </div>
      </div>
      <div id="recaptcha-container" />
    </div>
  );
};
