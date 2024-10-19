import {
  Button,
  DatePicker,
  Form,
  Radio,
  RadioChangeEvent,
  Select,
  TimePicker,
  TimePickerProps,
  AutoComplete,
} from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { DoctorData } from "@/data/doctor-data";
import { specialtyData } from "@/data/specialty-data";
import { useRecoilState, useSetRecoilState } from "recoil";
import { formValuesState, stepState } from "./stores";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { useGetByPhone } from "./hooks/useGetByPhone";

export const Step1 = ({ form }: { form: any }) => {
  const setStep = useSetRecoilState(stepState);
  const [formValues, setFormValues] = useRecoilState(formValuesState);
  const [doctors, setDoctors] = useState<
    { label: string; value: string; specialization: string }[]
  >([]);
  const [disableHours, setDisableHours] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23,
  ]);
  const { patients, setPatients, phone, setPhone } = useGetByPhone();

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
    setFormValues((prev) => ({ ...prev, specialty: value }));
  };

  const handleSelectDoctor = (value: string) => {
    // setFormValues((prev) => ({ ...prev, doctor: value }));
    // form.setFieldsValue({ doctor: value });
  };

  const handleDateAppointment: DatePickerProps<Dayjs[]>["onChange"] = (
    date,
    dateString
  ) => {
    setFormValues((prev) => ({
      ...prev,
      date: formatDate(dateString as string),
    }));
  };

  const handleTimeAppointment: TimePickerProps["onChange"] = (
    time,
    timeString
  ) => {
    setFormValues((prev) => ({ ...prev, time: timeString as string }));
  };

  const onSelect = (data: string, option: any) => {
    setFormValues((prev) => ({
      ...prev,
      phone: option.phone,
      fullName: option.fullName,
      address: option.address,
      gender: option.gender,
      dob: option.dob,
    }));
  };

  const handleSubmit = () => {
    if (!formValues.phone) {
      setFormValues((prev) => ({
        ...prev,
        phone: phone,
      }));
    }
    setStep(2);
  };

  const gridClasses = "grid grid-cols-2 gap-5";

  return (
    <>
      <div className={gridClasses}>
        <Form.Item
          label="Chọn loại dịch vụ khám"
          name="serviceType"
          initialValue={"InHour"}
          required
        >
          <Radio.Group
            buttonStyle="solid"
            onChange={(e: RadioChangeEvent) =>
              setFormValues((prev) => ({ ...prev, service: e.target.value }))
            }
          >
            <Radio.Button value="InHour">Khám Thường</Radio.Button>
            <Radio.Button value="OutHour">Khám Ngoài Giờ</Radio.Button>
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
          <AutoComplete
            options={patients}
            onSelect={onSelect}
            onSearch={(text) => {
              if (text.length <= 9) {
                setPatients([]);
              } else {
                setPhone(text);
              }
            }}
            placeholder="Nhập số điện thoại"
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
            setFormValues((prev) => ({ ...prev, symptoms: e.target.value }))
          }
        />
      </Form.Item>

      <div className="flex justify-end mt-3">
        <Button
          type="primary"
          className="w-full"
          disabled={
            !formValues.service ||
            !phone ||
            !formValues.specialty ||
            !formValues.date ||
            !formValues.time ||
            !formValues.symptoms
          }
          onClick={handleSubmit}
        >
          Tiếp tục
        </Button>
      </div>
    </>
  );
};
