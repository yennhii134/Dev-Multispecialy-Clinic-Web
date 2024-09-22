import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cityState, districtState, stepState } from "../../stores/states";
import {  useState } from "react";
import { useAddress } from "../../hooks/useAddress";

export const Step2 = () => {
  const setStep = useSetRecoilState(stepState);
  const [city, setCity] = useRecoilState(cityState);
  // const [district, setDistrict] = useRecoilState(districtState);
  const [district, setDistrict] = useState<any>([]);
  const { fetchAddressData, fetchDistrictData } = useAddress();
  const cityData = fetchAddressData();
  const districtData = fetchDistrictData();

  console.log(cityData, districtData);

  const handleSelectCity = (value: string) => {
    setCity(value);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Số điện thoại" name="phone" required>
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item label="Họ và tên" name="name" required>
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Ngày sinh" name="date" required>
          <DatePicker format={"DD/MM/YYYY"} className="w-full" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="name"
          tooltip="Nhập email để nhận được các thông báo về lịch hẹn, tái khám,..."
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
      </div>
      <div className="flex">
        <Form.Item label="Giới tính" name="gender" required layout="horizontal">
          <Radio.Group>
            <Radio value="female">Nữ</Radio>
            <Radio value="male">Nam</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Form.Item label="Tỉnh/Thành phố" name="city" required>
          <Select
            showSearch
            placeholder="Chọn tỉnh/thành phố"
            optionFilterProp="label"
            options={cityData}
            onChange={handleSelectCity}
          ></Select>
        </Form.Item>
        <Form.Item label="Quận/Huyện" name="district" required>
          <Select
            showSearch
            placeholder="Chọn quận/huyện"
            optionFilterProp="label"
            options={districtData}
            onChange={(value) => setDistrict(value)}
          ></Select>
        </Form.Item>
      </div>
      <Form.Item label="Địa chỉ" name="address" required>
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>
      <div className="grid grid-cols-2 gap-5">
        <Button className="w-full" onClick={() => setStep(1)}>
          Quay lại
        </Button>
        <Button type="primary" className="w-full">
          Đăng ký
        </Button>
      </div>
    </>
  );
};
