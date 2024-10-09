import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  TimePicker,
  TimePickerProps,
} from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { DoctorData } from "@/data/doctor-data";
import { specialtyData } from "@/data/specialty-data";
import { useSetRecoilState } from "recoil";
import { formValuesState, stepState } from "../../stores/states";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";

export const Step1 = ({ form }: { form: any }) => {
  const setStep = useSetRecoilState(stepState);
  const setForm = useSetRecoilState(formValuesState);
  const [doctors, setDoctors] = useState<
    { label: string; value: string; specialization: string }[]
  >([]);
  const gridClasses = "grid grid-cols-2 gap-5";
  const [disableHours, setDisableHours] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23,
  ]);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const today = dayjs().endOf("day");
    const maxDate = dayjs().add(15, "day").endOf("day");
    return current < today || current > maxDate;
  };

  const handleSelectSpecialty = (value: string) => {
    form.setFieldsValue({ doctor: undefined });
    const doctorFilter = DoctorData.filter((doctor) => {
      return doctor.specialization === value;
    }).map((doctor) => ({
      label: doctor.lable,
      value: doctor.value,
      specialization: doctor.specialization,
    }));
    setDoctors(doctorFilter);
    setForm((prev) => ({ ...prev, specialty: value }));
  };

  const handleSelectDoctor = (value: string) => {
    setForm((prev) => ({ ...prev, doctor: value }));
    form.setFieldsValue({ doctor: value });
  };

  const handleDateAppointment: DatePickerProps<Dayjs[]>["onChange"] = (
    date,
    dateString
  ) => {
    setForm((prev) => ({
      ...prev,
      date: formatDate(dateString as string),
    }));
  };

  const handleTimeAppointment: TimePickerProps["onChange"] = (
    time,
    timeString
  ) => {
    setForm((prev) => ({ ...prev, time: timeString as string }));
  };

  return (
    <>
      <div className={gridClasses}>
        <Form.Item
          label="Chọn loại dịch vụ khám"
          name="serviceType"
          initialValue={"inHour"}
          required
        >
          <Radio.Group
            buttonStyle="solid"
            onChange={(e: RadioChangeEvent) =>
              setForm((prev) => ({ ...prev, service: e.target.value }))
            }
          >
            <Radio.Button value="inHour">Khám Thường</Radio.Button>
            {/* <Radio.Button value="outOfHour">Khám Vip</Radio.Button> */}
            <Radio.Button value="outOfHour">Khám Ngoài Giờ</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            onChange={(e) => {
              setForm((prev) => ({ ...prev, phone: e.target.value }));
            }}
          />
        </Form.Item>
      </div>

      <div className={gridClasses}>
        <Form.Item label="Chọn chuyên khoa" name="specialty" required>
          <Select
            showSearch
            placeholder="Chọn chuyên khoa"
            optionFilterProp="label"
            options={specialtyData}
            onChange={handleSelectSpecialty}
          ></Select>
        </Form.Item>
        <Form.Item label="Chọn bác sĩ" name="doctor">
          <Select
            showSearch
            placeholder="Chọn bác sĩ"
            optionFilterProp="label"
            options={doctors}
            onChange={handleSelectDoctor}
          ></Select>
        </Form.Item>
      </div>

      <div className={gridClasses}>
        <Form.Item label="Chọn ngày muốn khám" name="dateAppointment" required>
          <DatePicker
            format={"DD/MM/YYYY"}
            disabledDate={disabledDate}
            className="w-full"
            onChange={handleDateAppointment}
          />
        </Form.Item>
        <Form.Item label="Chọn giờ muốn khám" name="timeAppointment" required>
          <TimePicker
            format={"HH:mm"}
            minuteStep={15}
            disabledTime={() => ({
              disabledHours: () => disableHours,
            })}
            hideDisabledOptions
            className="w-full"
            onChange={handleTimeAppointment}
          ></TimePicker>
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
          placeholder="Nhập tình trạng sức khoẻ của bạn, câu hỏi dành cho bác sĩ và các vấn đề sức khỏe cần khám"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </Form.Item>

      <div className="flex justify-end mt-3">
        <Button type="primary" className="w-full" onClick={() => setStep(2)}>
          Tiếp tục
        </Button>
      </div>
    </>
  );
};
