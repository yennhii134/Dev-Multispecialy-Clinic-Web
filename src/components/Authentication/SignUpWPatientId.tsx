import { AuthenService } from "@/services/Authen/AuthenService";
import { PatientService } from "@/services/Patient/PatientService";
import { Button, Form, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OTP } from "./OTP";

export const SignUpWPatientId = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [patientId, setPatientId] = useState<string>("");
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState<string>("");
  const { isLoading, typeLoading, signUp, checkExistUsername } =
    AuthenService();
  const { getById } = PatientService();
  const navigate = useNavigate();
  const [screenOTP, setScreenOTP] = useState<boolean>(false);

  const handleSignUp = () => {
    form.username = patientId;
    setScreenOTP(true);
    // signUp(form).then((response) => {
    //   if (response) {
    //     toast.success(response.data.data.message_VN);
    //     navigate("/");
    //   }
    // });
  };

  const handleGetById = async () => {
    const response = await getById(patientId);
    console.log("response handleGetById", response);

    if (response && !response?.status) {
      setError(response?.data?.message_VN);
    } else if (response && response?.status) {
      const data = response?.data;
      console.log("data", data);

      setForm({
        ...form,
        patient: {
          fullName: data?.fullName,
          phone: data?.phone,
          gender: data?.gender,
          dob: data?.dob,
          address: {
            address: data?.address?.address,
            state: data?.address?.state,
            city: data?.address?.city,
          },
        },
      });
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (patientId.length > 4) {
      const isValidPatientId = /^PAT\d{2,}$/.test(patientId);

      if (!isValidPatientId) {
        setError("Mã bệnh nhân không hợp lệ");
        return;
      }
      checkExistUsername(patientId).then((response) => {
        if (response.isExist) {
          setError(response.message_VN);
          setForm({});
          setIsDisabled(true);
        } else {
          handleGetById();
        }
      });
    } else {
      setError("");
      setForm({});
      setIsDisabled(true);
    }
  }, [patientId]);

  return (
    <>
      {screenOTP ? (
        <OTP form={form} />
      ) : (
        <div className="space-y-4">
          <Form.Item
            label="Mã bệnh nhân"
            layout="vertical"
            required
            help={error}
            validateStatus={error ? "error" : "success"}
          >
            <Input
              placeholder="Nhập mã bệnh nhân (VD: PAT01)"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại" layout="vertical">
            <Input
              disabled={isDisabled}
              value={form?.patient?.phone}
              onChange={(e) => {
                setForm({
                  ...form,
                  patient: {
                    ...form.patient,
                    phone: e.target.value,
                  },
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Họ và tên" layout="vertical" required>
            <Input
              disabled={isDisabled}
              value={form?.patient?.fullName}
              // onChange={(e) =>
              //   setForm({
              //     ...form,
              //     patient: {
              //       ...form.patient,
              //       fullName: e.target.value,
              //     },
              //   })
              // }
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
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     patient: {
                //       ...form.patient,
                //       gender: e.target.value,
                //     },
                //   });
                // }}
              >
                <Radio value={true}>Nữ</Radio>
                <Radio value={false}>Nam</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Ngày sinh" layout="vertical" required>
              <Input
                disabled={isDisabled}
                value={form?.patient?.dob}
                // onChange={(e) =>
                //   setForm({
                //     ...form,
                //     patient: {
                //       ...form.patient,
                //       dob: e.target.value,
                //     },
                //   })
                // }
              />
            </Form.Item>
          </div>
          <Form.Item label="Địa chỉ" layout="vertical" required>
            <Input
              disabled={isDisabled}
              value={
                form.patient?.address?.address &&
                `${form?.patient?.address?.address} - ${form?.patient?.address?.state} - ${form?.patient?.address?.city}`
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
            // name="confirmPassword"
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
            // onClick={() => setScreenOTP(true)}
            onClick={handleSignUp}
            loading={isLoading === typeLoading.signUp}
          >
            Đăng ký
          </Button>
        </div>
      )}
    </>
  );
};
