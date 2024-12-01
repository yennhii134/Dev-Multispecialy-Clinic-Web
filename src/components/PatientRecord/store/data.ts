export const patientRecords = [
  {
    data: {
      id: 1,
      patient: {
        fullName: "Bùi Trí Thức",
        age: 22,
        priority: 3,
        patientId: "PAT06",
        phone: "0963015348",
        address: {
          city: "Cà Mau",
          state: "Đầm Dơi",
          address: "333 ấp Thuận Hòa, Xã Tân Đức",
        },
        dob: "2002-06-15",
        gender: true,
      },
      notes: "Dị ứng mẫn đỏ và ngứa khi dùng các loại thực phẩm chứa đậu",
      entries: [
        {
          id: 1,
          symptoms:
            "Dị ứng mẫn đỏ và ngứa khi dùng các loại thực phẩm chứa đậu",
          doctor: {
            employeeId: "DOC_2404",
            phone: "0988088099",
            fullName: "Hùng Quân Singer",
            address: null,
            gender: false,
            dob: "1995-04-24",
          },
          visitDate: "2024-11-26T19:38:06.000Z",
          diagnosis: null,
          treatmentPlan: null,
          medicalInformation: null,
          labRequests: [
            {
              labTest: {
                name: "Xét Nghiệm Máu",
                price: 110000,
              },
              requestDate: "2024-11-26T19:41:35.000Z",
              status: "completed",
              testResult: {
                result: "Normal",
                detail: [
                  {
                    name: "Hemoglobin",
                    unit: "g/dL",
                    range: "12.0-16.0",
                    value: 13.5,
                    status: "Normal",
                  },
                  {
                    name: "WBC",
                    unit: "x10^9/L",
                    range: "4.0-11.0",
                    value: 6.1,
                    status: "Normal",
                  },
                  {
                    name: "Platelets",
                    unit: "x10^9/L",
                    range: "150-450",
                    value: 250,
                    status: "Normal",
                  },
                  {
                    name: "RBC",
                    unit: "x10^12/L",
                    range: "4.0-5.5",
                    value: 4.7,
                    status: "Normal",
                  },
                  {
                    name: "Glucose",
                    unit: "mg/dL",
                    range: "70-100",
                    value: 95,
                    status: "Normal",
                  },
                ],
                notes:
                  "Kết quả xét nghiệm máu của bệnh nhân nằm trong giới hạn bình thường. Không phát hiện bất thường.",
                images: [
                  "https://bizweb.dktcdn.net/100/234/598/files/xet-nghiem-cong-thuc-mau.jpg?v=1503202730035",
                  "https://benhvienphuongdong.vn/public/uploads/2022/thang-3/benh-ly-lien-quan-den-hong-cau.jpg",
                ],
              },
            },
          ],
        },
      ],
    },
    message: "Success",
    statusCode: 200,
  },
];
