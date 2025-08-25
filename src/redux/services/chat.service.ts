import { createApi } from "@reduxjs/toolkit/query/react";
import * as interfaces from "@src/utils/interfaces";
import { API_URL } from "../endpoints";
import { baseQuery } from "../functions";

export const ChatServices = createApi({
  reducerPath: "chat",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (dto: interfaces.StudentSignupPayload) => ({
        url: API_URL.AUTH.STUDENT_SIGNUP.URL(),
        method: API_URL.AUTH.STUDENT_SIGNUP.METHOD,
        body: dto,
      }),
    }),
    getMessage: builder.query({
      query: (dto: interfaces.StudentSignupPayload) => ({
        url: API_URL.AUTH.STUDENT_LOGIN.URL(),
        method: API_URL.AUTH.STUDENT_LOGIN.METHOD,
        body: dto,
      }),
    }),
    singleChatMessages: builder.query({
      query: (dto: interfaces.ForgotPasswordPayload) => ({
        url: API_URL.AUTH.FORGOT_PASSWORD.URL(),
        method: API_URL.AUTH.FORGOT_PASSWORD.METHOD,
        body: dto,
      }),
    }),
    singleUserMessages: builder.query({
      query: (dto: interfaces.ResetPasswordPayload) => ({
        url: API_URL.AUTH.RESET_PASSWORD.URL(),
        method: API_URL.AUTH.RESET_PASSWORD.METHOD,
        body: dto,
      }),
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetMessageQuery,
  useSingleChatMessagesQuery,
  useSingleUserMessagesQuery,
} = ChatServices;
