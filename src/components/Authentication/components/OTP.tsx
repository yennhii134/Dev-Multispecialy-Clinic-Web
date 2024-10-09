import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import bgOtp from "@/assets/svg/bg-otp.svg";

export const OTP = () => {
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [otp, setOtp] = useState<string>("");

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
    <div className="w-full gap-10 flex items-center justify-between py-4">
      <div className="flex flex-col flex-1 space-y-14 px-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold font-logo text-blue2">
            XÁC THỰC OTP
          </h1>
          <div>Vui lòng nhập mã OTP đã được gửi đến số điện thoại của bạn</div>
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
              <div className="text-sm">Mã sẽ được gửi lại sau {timeLeft}s</div>
            )}
          </div>
        </div>
        <Button
          type="primary"
          // disabled={!submitForm}
          // onClick={handleVerifyOTP}
          // loading={isLoading}
        >
          Xác nhận
        </Button>
      </div>
      <div className="max-sm:hidden flex items-center justify-center">
        <img src={bgOtp} alt="bg-otp" className="size-64 object-contain" />
      </div>
    </div>
  );
};
