import { Entry } from "./store/type";
import { RowDetail } from "./RowDetail";

export const TestList: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <>
      {entries?.map((entry: Entry) => (
        <div key={entry.id} className="border-t mt-4 pt-4">
          <h3 className="text-lg font-semibold">Lần khám {entry.id}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <RowDetail name="Triệu chứng" value={entry.symptoms} />
            <RowDetail
              name="Bác sĩ"
              value={`${entry.doctor.fullName} (${entry.doctor.phone})`}
            />
            <RowDetail
              name="Ngày khám"
              value={new Date(entry.visitDate).toLocaleDateString()}
            />
            <RowDetail name="Chẩn đoán" value={entry.diagnosis || "Chưa có"} />
          </div>

          {/* Lab Requests */}
          {entry?.labRequests.length > 0 && (
            <div className="border-t mt-4 pt-2">
              <h4 className="text-md font-semibold mb-1">Yêu cầu xét nghiệm</h4>
              {entry.labRequests.map((lab, index) => (
                <div key={index} className="px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <RowDetail name="Tên xét nghiệm" value={lab.labTest.name} />
                    <RowDetail
                      name="Giá"
                      value={`${lab.labTest.price.toLocaleString()} VND`}
                    />
                    <RowDetail name="Trạng thái" value={lab.status} />
                    <RowDetail name="Kết quả" value={lab.testResult.result} />
                    <RowDetail name="Ghi chú" value={lab.testResult.notes} />
                  </div>

                  {/* Lab Details */}
                  <table className="mt-4 w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2">Tên chỉ số</th>
                        <th className="p-2">Giá trị</th>
                        <th className="p-2">Mức bình thường</th>
                        <th className="p-2">Đơn vị</th>
                        <th className="p-2">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lab.testResult.detail.map((detail, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="p-2">{detail.name}</td>
                          <td className="p-2">{detail.value}</td>
                          <td className="p-2">{detail.range}</td>
                          <td className="p-2">{detail.unit}</td>
                          <td className="p-2">
                            <span
                              className={`p-2 rounded ${
                                detail.status === "Normal"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {detail.status === "Normal"
                                ? "Bình thường"
                                : "Bất thường"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Images */}
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {lab.testResult.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt="Kết quả xét nghiệm"
                        className="size-auto object-contain col-span-1"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
