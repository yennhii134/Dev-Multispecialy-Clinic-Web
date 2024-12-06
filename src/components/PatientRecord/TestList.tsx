import { Entry } from "./store/type";
import { RowDetail } from "./RowDetail";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const TestList: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <div className="flex flex-col gap-7">
      {entries.length > 0 &&
        entries.map((entry: Entry) => (
          <div key={entry.id} className="mt-4 pt-4">
            <div className="flex justify-center font-semibold text-xl mb-4 bg-primary-500 text-white py-2">
              Phiếu khám bệnh (
              {format(new Date(entry?.visitDate), "dd/MM/yyyy", {
                locale: vi,
              })}
              )
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <RowDetail
                name="Ngày khám"
                value={format(
                  new Date(entry.visitDate),
                  "HH:mm - EEEE, dd/MM/yyyy",
                  {
                    locale: vi,
                  }
                )}
              />
              <RowDetail
                name="Bác sĩ"
                value={`${entry?.doctor?.fullName} (${entry?.doctor?.phone})`}
              />
              <RowDetail name="Triệu chứng" value={entry.symptoms} />
              <RowDetail name="Ghi chú" value={entry.note} />

              <RowDetail
                name="Chẩn đoán"
                value={entry.diagnosis || "Chưa có"}
              />

              <RowDetail name="Kế hoạch điều trị" value={entry.treatmentPlan} />
            </div>
            <div className="text-lg font-semibold mt-2">Kết quả xét nghiệm</div>

            {entry?.labRequests.length > 0 && (
              <div className="mt-4 pt-2">
                {/* <div className="flex justify-center text-md font-semibold text-xl py-4">
                Danh sách xét nghiệm
              </div> */}
                <div className="flex flex-col gap-4">
                  {entry.labRequests.map((lab, index) => (
                    <div key={index} className="space-y-4">
                      <div className="w-full flex justify-center text-lg font-semibold">
                        <span className="bg-gray-200 rounded-md p-2">
                          {lab.labTest.name.toLocaleUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-4">
                        <RowDetail
                          name="Giá"
                          value={`${lab.labTest.price.toLocaleString()} VND`}
                        />
                        <RowDetail
                          name="Trạng thái"
                          value={
                            lab.status === "completed"
                              ? "Hoàn thành"
                              : "Chưa hoàn thành"
                          }
                        />
                        <RowDetail
                          name="Kết quả"
                          value={lab.testResult.result}
                        />
                        <RowDetail
                          name="Ghi chú"
                          value={lab.testResult.notes}
                        />
                      </div>

                      <table className="mt-4 w-full text-left border-collapse px-4">
                        <thead>
                          <tr className="border-b">
                            <th className="py-4">Tên chỉ số</th>
                            <th className="py-4">Giá trị</th>
                            <th className="py-4">Mức bình thường</th>
                            <th className="py-4">Đơn vị</th>
                            <th className="py-4">Mô tả</th>
                            <th className="py-4">Gợi ý</th>
                            <th className="py-4">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lab.testResult.detail.map((detail, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="py-4">{detail.name}</td>
                              <td className="py-4">{detail.value}</td>
                              <td className="py-4">{detail.range}</td>
                              <td className="py-4">{detail.unit}</td>
                              <td className="py-4">
                                {detail.description || detail.notes}
                              </td>
                              <td className="py-4">{detail.recommendations}</td>
                              <td className="py-4">
                                <span
                                  className={`p-2 rounded ${
                                    detail.status === "Bình thường"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {detail.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="mt-4 grid grid-cols-2 gap-4 px-4 ">
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
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
