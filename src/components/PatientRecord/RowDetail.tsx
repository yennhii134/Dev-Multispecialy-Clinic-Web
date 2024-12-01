import { IRowDetail } from "./store/type";

export const RowDetail: React.FC<IRowDetail> = ({ name, value }) => (
  <div>
    <strong>{name}:</strong> {value}
  </div>
);
