import {
  Button,
  DatePicker,
  Form,
  Radio,
  RadioChangeEvent,
  Select,
  TimePicker,
  TimePickerProps,
  Input,
  ConfigProvider,
} from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { useGetSpecializations } from "@/hooks/Doctor/useGetSpecializations";
import { userValue } from "@/stores/user";
import { AppointmentService } from "@/services/Appointment/AppointmentService";
import { useNavigate } from "react-router-dom";
import { Doctor } from "@/types/Doctor";
import { formValuesState } from "./stores";
import { FormValue, Service } from "@/types/Appointment";

export const Step1 = () => {
  const navigate = useNavigate();
  const [formAntd] = Form.useForm<FormValue>();
  const [form, setForm] = useRecoilState(formValuesState);
  const clearFormValue = useResetRecoilState(formValuesState);
  const { specializations, doctors } = useGetSpecializations();
  const [specializationFilter, setSpecializationFilter] = useState<string>();
  const [doctorsFilter, setDoctorsFilter] = useState<Doctor[]>([]);
  const user = useRecoilValue(userValue);
  const { appointment } = AppointmentService();
  const disableInHours = [0, 1, 2, 3, 4, 5, 6, 18, 19, 20, 21, 22, 23];
  const disbaleOutHours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 22, 23,
  ];

  useEffect(() => {
    if (user && user.patientId) {
      setForm((prev) => ({
        ...prev,
        patient: user,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (doctors.length > 0) {
      setDoctorsFilter(doctors);
    }
  }, [doctors]);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const today = dayjs().endOf("day");
    const maxDate = dayjs().add(15, "day").endOf("day");
    return current < today || current > maxDate;
  };

  const handleSelectSpecialty = (value: string) => {
    formAntd.setFieldsValue({ doctor: undefined });
    setForm((prev) => ({
      ...prev,
      doctor: {
        ...prev?.doctor,
        specialization: value,
        name: undefined,
      },
    }));
    setSpecializationFilter(value);
    setDoctorsFilter(
      doctors.filter(
        (doctor) => doctor.specialization.specialization_id === value
      )
    );
  };

  const handleSelectDoctor = (value: string) => {
    setForm((prev) => ({
      ...prev,
      doctor: {
        ...prev?.doctor,
        name: value,
      },
    }));

    const specialization = doctors.find((doctor) => doctor.fullName === value);
    setSpecializationFilter(specialization?.specialization.specialization_id);
  };

  const handleDateAppointment: DatePickerProps<Dayjs[]>["onChange"] = (
    _date,
    dateString
  ) => {
    if (!dateString) {
      setForm((prev) => ({ ...prev, date: "" }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      date: formatDate(dateString as string),
    }));
  };

  const handleTimeAppointment: TimePickerProps["onChange"] = (
    _time,
    timeString
  ) => {
    if (!timeString) {
      setForm((prev) => ({ ...prev, time: "" }));
      return;
    }
    setForm((prev) => ({ ...prev, time: timeString as string }));
  };

  const handleSubmit = async () => {
    if (user && user.patientId && form) {
      await appointment(form);
      clearFormValue();
      navigate("/");
    }
  };
  console.log("form", form);

  const gridClasses =
    "flex flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-5";

  return (
    <Form form={formAntd} layout="vertical">
      <div className={gridClasses}>
        <Form.Item
          label="Chọn loại dịch vụ khám"
          name={"service"}
          initialValue={Service.InHour}
          required
        >
          <Radio.Group
            buttonStyle="solid"
            onChange={(e: RadioChangeEvent) => {
              setForm((prev) => ({
                ...prev,
                service: e.target.value,
                time: null,
              }));
              formAntd.setFieldsValue({ time: undefined });
            }}
          >
            <Radio.Button value={Service.InHour}>Khám Thường</Radio.Button>
            <Radio.Button value={Service.OutHour}>Khám Ngoài Giờ</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainerDisabled: "white",
              colorTextDisabled: "black",
            },
          }}
        >
          <Form.Item label="Giá dịch vụ khám">
            <Input
              value={
                form?.service === Service.InHour ? "100.000 VND" : "150.000 VND"
              }
              disabled
            />
          </Form.Item>
        </ConfigProvider>
      </div>
      {/* <Form.Item
        label="Số điện thoại"
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
        <Input placeholder={user?.phone} disabled />
      </Form.Item> */}

      <div className={gridClasses}>
        <Form.Item label="Chọn chuyên khoa" required>
          <Select
            showSearch
            placeholder="Chọn chuyên khoa"
            optionFilterProp="label"
            value={specializationFilter}
            options={specializations}
            onChange={handleSelectSpecialty}
          />
        </Form.Item>
        <Form.Item label="Chọn bác sĩ" required name={"doctor"}>
          <Select
            showSearch
            placeholder="Chọn bác sĩ"
            optionFilterProp="label"
            options={doctorsFilter}
            onChange={handleSelectDoctor}
          />
        </Form.Item>
      </div>

      <div className={gridClasses}>
        <Form.Item label="Chọn ngày muốn khám" required>
          <DatePicker
            format={"DD/MM/YYYY"}
            disabledDate={disabledDate}
            className="w-full"
            onChange={handleDateAppointment}
          />
        </Form.Item>
        <Form.Item label="Chọn giờ muốn khám" required name={"time"}>
          <TimePicker
            format={"HH:mm"}
            minuteStep={15}
            disabledTime={() => ({
              disabledHours: () => {
                return form?.service === Service.InHour
                  ? disableInHours
                  : disbaleOutHours;
              },
            })}
            hideDisabledOptions
            className="w-full"
            showNow={false}
            onChange={handleTimeAppointment}
          />
        </Form.Item>
      </div>

      <Form.Item label="Nhập vấn đề sức khỏe cần khám" required>
        <TextArea
          showCount
          maxLength={200}
          placeholder="Nhập tình trạng sức khoẻ của bạn, câu hỏi dành cho bác sĩ và các vấn đề sức khỏe cần khám"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, symptoms: e.target.value }))
          }
        />
      </Form.Item>

      <div className="flex justify-end mt-3">
        <Button
          type="primary"
          className="w-full"
          disabled={
            !form?.service ||
            !form.doctor?.specialization ||
            !form.doctor?.name ||
            !form.date ||
            !form.time ||
            !form.symptoms
          }
          onClick={handleSubmit}
        >
          Đặt lịch
        </Button>
      </div>
    </Form>
  );
};
