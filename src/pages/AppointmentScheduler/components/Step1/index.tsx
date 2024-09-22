import { Button, DatePicker, Form, Radio, Select, TimePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiVipDiamondLine } from "react-icons/ri";
import { specialtyData } from "@/data/specialty-data";
import { useSetRecoilState } from "recoil";
import { stepState } from "../../stores/states";

export const Step1 = () => {
  const setStep = useSetRecoilState(stepState);
  const [disableHours, setDisableHours] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23,
  ]);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const today = dayjs().endOf("day");
    const maxDate = dayjs().add(15, "day").endOf("day");
    return current < today || current > maxDate;
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Chọn loại dịch vụ khám" name="serviceType" required>
          <Radio.Group defaultValue={"inHour"} buttonStyle="solid">
            <Radio.Button value="inHour">Khám trong giờ</Radio.Button>
            <Radio.Button value="outOfHour">Khám ngoài giờ</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Chọn lại hình khám bệnh" name="consultationType">
          <Radio.Group defaultValue={"regularConsultation"} buttonStyle="solid">
            <Radio.Button value="regularConsultation">
              <div className="flex items-center">
                <FaRegUser className="mr-1" />
                Khám thường
              </div>
            </Radio.Button>
            <Radio.Button value="vipConsultation">
              <div className="flex items-center">
                <RiVipDiamondLine className="mr-1" />
                Khám VIP
              </div>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Chọn chuyên khoa" name="specialty" required>
          <Select
            showSearch
            placeholder="Chọn chuyên khoa"
            optionFilterProp="label"
            options={specialtyData}
          ></Select>
        </Form.Item>
        <Form.Item label="Chọn bác sĩ" name="doctor">
          <Select
            showSearch
            placeholder="Chọn bác sĩ"
            optionFilterProp="label"
            options={[
              { label: "Bác sĩ A", value: "doctorA" },
              { label: "Bác sĩ B", value: "doctorB" },
              { label: "Bác sĩ C", value: "doctorC" },
            ]}
          ></Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Chọn ngày muốn khám" name="date" required>
          <DatePicker
            format={"DD/MM/YYYY"}
            disabledDate={disabledDate}
            className="w-full"
          />
        </Form.Item>
        <Form.Item label="Chọn khung giờ muốn khám" name="date" required>
          <TimePicker
            format={"HH:mm"}
            minuteStep={15}
            disabledTime={() => ({
              disabledHours: () => disableHours,
            })}
            hideDisabledOptions
            className="w-full"
          />
        </Form.Item>
      </div>
      <Form.Item
        label="Nhập vấn đề sức khỏe cần khám"
        name="description"
        required
      >
        <TextArea
          showCount
          maxLength={200}
          //   onChange={onChange}
          placeholder="Nhập tình trạng sức khoẻ của bạn, câu hỏi dành cho bác sĩ và các vấn đề sức khỏe cần khám"
          style={{ height: 120, resize: "none" }}
        />
      </Form.Item>
      <div className="flex justify-end">
        <Button type="primary" className="w-full" onClick={() => setStep(2)}>
          Tiếp tục
        </Button>
      </div>
    </>
  );
};
