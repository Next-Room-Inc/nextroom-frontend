export interface StudentSignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  university: string;
  step?: number;
}
export interface StudentUpdatePayload {
  age: string;
  phoneNumber?: string;
  tag?: string;
  gender?: string;
  role?: string;
  pronouns?: string;
  step?: number;
  alternativeEmail?: string;
  alternativePhoneNumber?: string;
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

export interface ProfileProgressResponse {
  age: string;
  profilePhotoPath: string;
  pronouns: string;
  gender: string;
  alternativeEmail: string;
  alternativePhoneNumber: string;
  profileCompletionStep: number;
  launchWaitlist: string | null;
  membershipCardId: string;
}

export interface ResendVerificationPayload {
  email: string;
}
export interface StudentUser {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  photoFileName?: string;
  role?: "STUDENT";
  onboardingFormSubmitted?: boolean;
  onboardingFormSkipped?: boolean;
}

export interface CreateInviteResponse {
  slug: string;
  url: string;
  qrCodePath: string;
  status: string;
  inviterName: string;
}
