import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";

export const Footer = () => {
  const Contact = (props: {
    title: string;
    value: string;
    icon: JSX.Element;
  }) => (
    <div className="flex items-center my-1">
      <div className="bg-slate-50 flex items-center justify-center rounded-full size-7 mr-1">
        {props.icon}
      </div>
      <p className="text-white font-medium ml-2">{props.value}</p>
    </div>
  );
  return (
    <div className="grid grid-cols-2 bg-gradient-to-r from-[#F0F9FF] to-sky-300">
      <div className="col-start-2  flex flex-row-reverse justify-evenly">
        <Contact
          title="Hotline"
          value="1900 1234"
          icon={<FaPhoneAlt className="text-blue1" />}
        />
        <Contact
          title="Email"
          value="dmc@gmail.com"
          icon={<MdEmail className="text-blue1" />}
        />
        <Contact
          title="Địa chỉ"
          value="12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM"
          icon={<MdLocationPin className="text-blue1" />}
        />
      </div>
    </div>
  );
};
