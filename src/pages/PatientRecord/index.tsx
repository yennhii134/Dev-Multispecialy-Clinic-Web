import { RowDetail } from "@/components/PatientRecord/RowDetail";
import { patientRecords } from "@/components/PatientRecord/store/data";
import { TestList } from "@/components/PatientRecord/TestList";
import { PatientService } from "@/services/Patient/PatientService";
import { userValue } from "@/stores/user";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const PatientRecord = () => {
  //   const { patient, notes, entries } = patientRecords[0].data;
  const user = useRecoilValue(userValue);
  const { getMedicalRecord } = PatientService();
  const [patientRecord, setPatientRecord] = useState<any>();

  const fetchMedicalRecord = async () => {
    if (user?.patientId) {
      const response = await getMedicalRecord(user.patientId);
      if (response?.data.data) setPatientRecord(response?.data.data);
    }
  };

  useEffect(() => {
    fetchMedicalRecord();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center text-primary-600 bg-primary-100 p-2 rounded-xl">
          Hồ sơ bệnh nhân
        </h1>
      </div>
      {patientRecord ? (
        <div className="space-y-6">
          {/* Patient Information */}
          <div className="border p-4 rounded-xl space-y-1">
            <h2 className="text-xl font-semibold">Thông tin bệnh nhân</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <RowDetail
                name="Họ tên"
                value={patientRecord?.patient.fullName}
              />
              <RowDetail name="Tuổi" value={patientRecord?.patient.age} />
              <RowDetail
                name="Giới tính"
                value={patientRecord?.patient.gender ? "Nam" : "Nữ"}
              />
              <RowDetail
                name="Mã bệnh nhân"
                value={patientRecord?.patient.patientId}
              />
              <RowDetail
                name="Số điện thoại"
                value={patientRecord?.patient.phone}
              />
              <RowDetail
                name="Địa chỉ"
                value={`${patientRecord?.patient.address.address}, ${patientRecord?.patient.address.state}, ${patientRecord?.patient.address.city}`}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="border p-4 rounded-xl space-y-1">
            <h2 className="text-xl font-semibold">Ghi chú</h2>
            <p>{patientRecord?.notes}</p>
          </div>

          {/* Entries */}
          <div className="border p-4 rounded-xl space-y-1">
            <h2 className="text-xl font-semibold">Lịch sử khám bệnh</h2>
            <TestList entries={patientRecord?.entries} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p>Không tìm thấy hồ sơ bệnh nhân</p>
        </div>
      )}
    </div>
  );
};
