import { Form } from "antd";
import appointmentScheduler from "@/assets/img/appointmentScheduler.png";
import { Step1, Step2 } from "./components";
import { useRecoilValue } from "recoil";
import { stepState } from "./states/states";

export default function AppointmentScheduler() {
  const [form] = Form.useForm();
  const step = useRecoilValue(stepState);

  return (
    <div className="flex p-5">
      <Form
        form={form}
        name="appointment"
        layout="vertical"
        className="flex flex-1 flex-col justify-between px-5"
      >
        <h1 className="text-2xl font-bold mb-4">
          Đặt lịch thăm khám tại&nbsp;
          <span className="text-primary-blue-200">DMC</span>
        </h1>
        {step === 1 ? <Step1 /> : <Step2 />}
      </Form>
      <div>
        <img src={appointmentScheduler} alt="appointmentScheduler" />
      </div>
    </div>
  );
}
