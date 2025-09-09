import { createApi } from "@reduxjs/toolkit/query/react";
import * as interfaces from "@src/utils/interfaces";
import { API_URL } from "../endpoints";
import { baseQuery } from "../functions";

export const AuthServices = createApi({
  reducerPath: "auth",
  baseQuery: baseQuery,
  tagTypes: ["ProfileProgress", "ProfilePhoto"], // ✅ define tags
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
      query: ({ token }: interfaces.VerifyEmailPayload) => ({
        url: API_URL.AUTH.VERIFY_EMAIL.URL(token),
        method: API_URL.AUTH.VERIFY_EMAIL.METHOD,
      }),
    }),
    resendVerification: builder.mutation({
      query: (dto: interfaces.ResendVerificationPayload) => ({
        url: API_URL.AUTH.RESEND_VERIFICATION.URL(),
        method: API_URL.AUTH.RESEND_VERIFICATION.METHOD,
        body: dto,
      }),
    }),
    createInvite: builder.query<interfaces.CreateInviteResponse, void>({
      query: () => ({
        url: API_URL.AUTH.CRAETE_INVITE.URL(),
        method: API_URL.AUTH.CRAETE_INVITE.METHOD,
        body: {},
      }),
    }),
    updateProfileDetails: builder.mutation({
      query: (dto: any) => ({
        url: API_URL.AUTH.UPDATE_PROFILE_DETAILS.URL(),
        method: API_URL.AUTH.UPDATE_PROFILE_DETAILS.METHOD,
        body: dto,
      }),
      invalidatesTags: ["ProfileProgress", "ProfilePhoto"], // ✅ refetch when cancel is called
    }),

    getMembershipCard: builder.query<any, number | null>({
      query: (studentId) => ({
        url: API_URL.AUTH.GET_MEMBERSHIP_CARD.URL(studentId),
        method: API_URL.AUTH.GET_MEMBERSHIP_CARD.METHOD,
      }),
      // invalidatesTags: ["getSavedPropertyIds"],
    }),
    getProfileProgress: builder.query<interfaces.ProfileProgressResponse, any>({
      query: (studentId) => ({
        url: API_URL.AUTH.GET_PROFILE_PROGRESS.URL(studentId),
        method: API_URL.AUTH.GET_PROFILE_PROGRESS.METHOD,
      }),
      // invalidatesTags: ["getSavedPropertyIds"],
      providesTags: ["ProfileProgress"], // ✅ add tag
    }),
    getProfilePhoto: builder.query<any, number | null>({
      query: (studentId) => ({
        url: API_URL.AUTH.GET_PROFILE_PHOTO.URL(studentId),
        method: API_URL.AUTH.GET_PROFILE_PHOTO.METHOD,
      }),
      // invalidatesTags: ["getSavedPropertyIds"],
      providesTags: ["ProfilePhoto"], // ✅ add tag
    }),
  }),
});

export const {
  useStudentSignupMutation,
  useStudentLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useCreateInviteQuery,
  useUpdateProfileDetailsMutation,
  useGetProfileProgressQuery,
  useGetMembershipCardQuery,
  useGetProfilePhotoQuery,
} = AuthServices;
