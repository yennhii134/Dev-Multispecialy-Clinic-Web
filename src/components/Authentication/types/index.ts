export type formSignUp = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  patient?: {
    patientId?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    address?: {
      address: string;
      city: string;
      state: string;
    };
    dob?: Date;
    gender?: boolean;
  };
};
