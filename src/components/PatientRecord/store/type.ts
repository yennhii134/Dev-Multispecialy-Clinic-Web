export interface Address {
  city: string;
  state: string;
  address: string;
}

export interface LabDetail {
  name: string;
  unit: string;
  range: string;
  value: number;
  status: string;
  description?: string;
  notes?: string;
  recommendations?: string;
}

export interface LabTest {
  labTest: {
    name: string;
    price: number;
  };
  requestDate: string;
  status: string;
  testResult: {
    result: string;
    detail: LabDetail[];
    notes: string;
    images: string[];
  };
}

export interface Doctor {
  employeeId: string;
  phone: string;
  fullName: string;
  address: string | null;
  gender: boolean;
  dob: string;
}

export interface Entry {
  id: number;
  symptoms: string;
  doctor: Doctor;
  visitDate: string;
  diagnosis: string | null;
  treatmentPlan: string;
  medicalInformation: string | null;
  note: string;
  labRequests: LabTest[];
}

export interface Patient {
  fullName: string;
  age: number;
  priority: number;
  patientId: string;
  phone: string;
  address: Address;
  dob: string;
  gender: boolean;
}

export interface PatientRecordProps {
  id: number;
  patient: Patient;
  notes: string;

  entries: Entry[];
}

export interface IRowDetail {
  name: string;
  value: string | number;
}
