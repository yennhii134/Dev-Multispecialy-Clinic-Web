import { Form } from "antd";
import bgAppoinment from "@/assets/svg/bg-appointment.svg";
import { Step1, Step2 } from "./components";
import { useRecoilValue } from "recoil";
import { stepState } from "./stores/states";

export default function Appointment() {
  const step = useRecoilValue(stepState);
  const [form] = Form.useForm();
  return (
    <div className="grid grid-cols-3 p-5">
      <Form
        form={form}
        name="appointment"
        layout="vertical"
        className="flex flex-1 flex-col justify-between px-5 col-span-2"
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
      <div>
        <img src={bgAppoinment} alt="bgAppoinment" className="size-full" />
      </div>
    </div>
  );
}
