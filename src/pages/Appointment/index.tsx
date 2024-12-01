import { Form } from "antd";
import appointmentScheduler from "@/assets/img/appointmentScheduler.png";
import { Step1, Step2 } from "@/components/Appointment";
import { useRecoilValue } from "recoil";
import { stepState } from "@/components/Appointment/stores";

export const Appointment = () => {
  const step = useRecoilValue(stepState);
  const [form] = Form.useForm();
  return (
    <div className="size-full flex justify-center">
      <img
        src={appointmentScheduler}
        alt="bgAppoinment"
        className="object-contain max-md:hidden"
      />
      <div className="md:w-[1220px] flex justify-between gap-2 p-5">
        <Form
          form={form}
          name="appointment"
          layout="vertical"
          className="flex w-full flex-col px-5"
        >
          <h1 className="text-2xl font-bold mb-4">
            Đặt lịch thăm khám tại&nbsp;
            <span className="text-blue2">DMC</span>
          </h1>
          {
            {
              1: <Step1 form={form} />,
              2: <Step2 form={form} />,
            }[step]
          }
        </Form>
      </div>
    </div>
  );
};
