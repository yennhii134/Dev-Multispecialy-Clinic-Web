import { AuthenService } from "@/services/Authen/AuthenService";
import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  Form,
  Input,
  Radio,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { phoneState } from "./stores";
import { PatientService } from "@/services/Patient/PatientService";
import { OTP } from "./OTP";
import toast from "react-hot-toast";

export const SignUpWUsername = () => {
  const [form, setForm] = useState<any>({});
  const [patients, setPatients] = useState<AutoCompleteProps["options"]>([]);
  const { getByPhone } = PatientService();
  const [phone, setPhone] = useRecoilState<string>(phoneState);
  const { isLoading, typeLoading, checkExistPatient } = AuthenService();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [screenOTP, setScreenOTP] = useState<boolean>(false);

  const handleSignUp = () => {
    checkExistPatient(form.patientId).then((response) => {
      if (response?.status) {
        setScreenOTP(true);
      } else {
        toast.error(response?.data.message_VN);
      }
    });
  };

  const handleGetPhone = async (phone: string) => {
    const response = await getByPhone(phone);
    if (response?.status && response?.data.length > 0) {
      const patient = response.data.map((patient: any, index: number) => {
        const dob = new Date(patient.dob).toLocaleDateString("en-GB");
        return {
          ...patient,
          key: index,
          value: patient.phone,
          label: `${patient.fullName} - ${patient.phone} - ${dob}`,
        };
      });
      setPatients(patient);
    }
  };

  const onSelectPatientByPhone = (_data: string, option: any) => {
    setForm({
      ...form,
      patientId: option.patientId,
      patient: {
        fullName: option.fullName,
        phone: option.phone,
        gender: option.gender,
        dob: option.dob,
        address: {
          address: option?.address?.address,
          state: option?.address?.state,
          city: option?.address?.city,
        },
      },
    });
  };
  useEffect(() => {
    setForm({});
    setPatients([]);
    setIsDisabled(true);
    if (phone.length > 9) {
      handleGetPhone(phone);
      setForm({
        ...form,
        patient: {
          ...form.patient,
          phone: phone,
        },
      });
      setIsDisabled(false);
    }
  }, [phone]);

  //   const handleSearch = (value: string) => {
  //     if (value.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)) {
  //       setPhone(value);
  //     }
  //   };

  return (
    <>
      {screenOTP ? (
        <OTP form={form} />
      ) : (
        <Form layout="vertical">
          <div className="space-y-4">
            <Form.Item
              label="Số điện thoại"
              required
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
              layout="vertical"
            >
              <AutoComplete
                options={form?.patient?.fullName ? [] : patients}
                onSelect={onSelectPatientByPhone}
                // onSearch={handleSearch}
                value={phone}
                onChange={(value) => setPhone(value)}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>
            <Form.Item
              label="Tên đăng nhập"
              layout="vertical"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập",
                },
                {
                  pattern: new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/),
                  message:
                    "Tên đăng nhập phải có ít nhất 1 ký tự số và chữ và phải lớn hơn 6 ký tự",
                },
              ]}
            >
              <Input
                value={form?.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                disabled={isDisabled}
                placeholder="Tên đăng nhập phải có ít nhất 1 ký tự số và chữ"
              />
            </Form.Item>
            <Form.Item label="Họ và tên" layout="vertical" required>
              <Input
                disabled={isDisabled}
                value={form?.patient?.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    patient: {
                      ...form.patient,
                      fullName: e.target.value,
                    },
                  })
                }
              />
            </Form.Item>
            <div className="grid grid-cols-2 gap-5 items-center">
              <Form.Item
                label="Giới tính"
                required
                layout="horizontal"
                initialValue={form?.patient?.gender}
              >
                <Radio.Group
                  value={form?.patient?.gender}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      patient: {
                        ...form.patient,
                        gender: e.target.value,
                      },
                    });
                  }}
                >
                  <Radio value={true}>Nữ</Radio>
                  <Radio value={false}>Nam</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Ngày sinh" layout="vertical" required>
                <Input
                  disabled={isDisabled}
                  value={form?.patient?.dob}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      patient: {
                        ...form.patient,
                        dob: e.target.value,
                      },
                    })
                  }
                />
              </Form.Item>
            </div>
            <Form.Item label="Địa chỉ" layout="vertical" required>
              <Input
                disabled={isDisabled}
                value={
                  form.patient?.address?.address &&
                  `${form?.patient?.address?.address} - ${form?.patient.address?.state} - ${form?.patient?.address?.city}`
                }
                // onChange={(e) =>
                //   setForm({
                //     ...form,
                //     patient: {
                //       ...form.patient,
                //       address: e.target.value,
                //     }
                //   })
                // }
              />
            </Form.Item>

            <Form.Item label="Email" layout="vertical" required>
              <Input
                disabled={isDisabled}
                value={form?.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item label="Mật khẩu" layout="vertical" required>
              <Input.Password
                disabled={isDisabled}
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              layout="vertical"
              required
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng xác nhận mật khẩu",
              //   },
              //   ({ getFieldValue }) => ({
              //     validator(_, value) {
              //       if (!value || getFieldValue("password") === value) {
              //         return Promise.resolve();
              //       }
              //       return Promise.reject(new Error("Mật khẩu không khớp"));
              //     },
              //   }),
              // ]}
            >
              <Input.Password
                disabled={isDisabled}
                value={form.confirmValue}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmValue: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Button
              type="primary"
              className="w-full"
              onClick={handleSignUp}
              loading={isLoading === typeLoading.signUp}
            >
              Đăng ký
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};
