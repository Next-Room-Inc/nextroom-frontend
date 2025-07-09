import { API_URL, baseUrl } from "../endpoints";
import * as interfaces from "../../utils/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthServices = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl,
    responseHandler: async (response) => {
      console.log("🚀 ~ responseHandler: ~ response:", response);
      return response.headers.get("content-type")?.includes("application/json")
        ? response.json()
        : response.text();
    },
    validateStatus: (response, result) => {
      console.log("🚀 ~ response, result:", response, result);
      return [201, 200].includes(response.status);
    },
  }),
  endpoints: (builder) => ({
    studentSignup: builder.mutation({
      query: (dto: interfaces.StudentSignupPayload) => ({
        url: API_URL.AUTH.STUDENT_SIGNUP.URL(),
        method: API_URL.AUTH.STUDENT_SIGNUP.METHOD,
        body: dto,
      }),
    }),
    studentLogin: builder.mutation({
      query: (dto: interfaces.StudentSignupPayload) => ({
        url: API_URL.AUTH.STUDENT_LOGIN.URL(),
        method: API_URL.AUTH.STUDENT_LOGIN.METHOD,
        body: dto,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (dto: interfaces.ForgotPasswordPayload) => ({
        url: API_URL.AUTH.FORGOT_PASSWORD.URL(),
        method: API_URL.AUTH.FORGOT_PASSWORD.METHOD,
        body: dto,
      }),
    }),
    resetPassword: builder.mutation({
      query: (dto: interfaces.ResetPasswordPayload) => ({
        url: API_URL.AUTH.RESET_PASSWORD.URL(),
        method: API_URL.AUTH.RESET_PASSWORD.METHOD,
        body: dto,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (dto: interfaces.VerifyEmailPayload) => ({
        url: API_URL.AUTH.VERIFY_EMAIL.URL(),
        method: API_URL.AUTH.VERIFY_EMAIL.METHOD,
        body: dto,
      }),
    }),
    resendVerification: builder.mutation({
      query: (dto: interfaces.VerifyEmailPayload) => ({
        url: API_URL.AUTH.RESEND_VERIFICATION.URL(),
        method: API_URL.AUTH.RESEND_VERIFICATION.METHOD,
        body: dto,
      }),
    }),
  }),
});

export const {
  useStudentSignupMutation,
  useStudentLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation
} = AuthServices;
