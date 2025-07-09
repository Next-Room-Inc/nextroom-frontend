export interface StudentSignupPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    university: string;
    age: string;
    phoneNumber?: string;
    tag?: string;
    image?: string;
  }
export interface ForgotPasswordPayload {
    email: string; 
  }
export interface ResetPasswordPayload {
    newPassword: string; 
    token: string;
  }
export interface VerifyEmailPayload {
    token: string;
  }

  export interface ResendVerificationPayload {
    email: string; 
  }