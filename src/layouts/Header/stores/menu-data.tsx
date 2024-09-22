import { CaretDownOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";

type MenuItem = Required<MenuProps>["items"][number];

const caretDownClasses = classNames(
  "text-secondary",
  "group-hover:text-primary-blue-50",
  "group-hover:transform",
  "group-hover:rotate-180"
);
export const menuData: MenuItem[] = [
  {
    label: <Link to="/">Giới thiệu</Link>,
    key: "desciption",
  },
  {
    label: (
      <Link to="/" className="group">
        <span className="mr-1">Chuyên khoa</span>
        <CaretDownOutlined className={`${caretDownClasses}`} />
      </Link>
    ),
    key: "specialties",
    children: [
      {
        label: <Link to="/">Ngoại tổng quá</Link>,
        key: "general-surgery",
      },
      {
        label: <Link to="/">Nội tổng quá</Link>,
        key: "internal-medicine",
      },
      {
        label: <Link to="/">Da liễu</Link>,
        key: "dermatology",
      },
      {
        label: <Link to="/">Sản phụ khoa</Link>,
        key: "obstetrics-gynecology",
      },
      {
        label: <Link to="/">Tai mũi họng</Link>,
        key: "otorhinolaryngology",
      },
      {
        label: <Link to="/">Nhi</Link>,
        key: "pediatrics",
      },
      {
        label: <Link to="/">Tiêu hóa</Link>,
        key: "gastroenterology",
      },
      {
        label: <Link to="/">Khác</Link>,
        key: "others",
      },
    ],
  },
  {
    label: (
      <Link to="/" className="group">
        Dịch vụ khách hàng{" "}
        <CaretDownOutlined className={`${caretDownClasses}`} />
      </Link>
    ),
    key: "customer-service",
    children: [
      {
        label: <Link to="/">Đặt hẹn khám bệnh</Link>,
        key: "appointment",
      },
      {
        label: <Link to="/">Hướng dẫn khám bệnh</Link>,
        key: "guide",
      },
      {
        label: <Link to="/">Bảng giá dịch vụ</Link>,
        key: "service-price",
      },
      {
        label: <Link to="/">Bảo hiểm xã hội</Link>,
        key: "social-insurance",
      },
    ],
  },
];
