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
export interface ForgotPasswordPayload {
    email: string; 
  }
export interface ResetPasswordPayload {
    email: string; 
    token?: string;
  }