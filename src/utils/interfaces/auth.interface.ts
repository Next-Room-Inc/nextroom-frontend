export interface StudentSignupPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    university: string;
    age: string;
    phoneNumber?: string;
    tag?: string;
  }