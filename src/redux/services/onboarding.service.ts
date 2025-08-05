import { API_URL, baseUrl } from "../endpoints";
import * as interfaces from "../../utils/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudentInterestsResponse } from "../../utils/interfaces";

export const OnboardingServices = createApi({
  reducerPath: "onboarding",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: any) => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (token) {
        // If the token exists, add it to the Authorization header
        headers.set("Authorization", `Bearer ${token}`);
      }
      console.log("Auth Token:", token);

      console.log("Request Headers:", headers);

      return headers;
    },
    responseHandler: async (response) => {
      console.log("🚀 ~ responseHandler: ~ response:", response);
      return response.headers.get("content-type")?.includes("application/json")
        ? response.json()
        : response.text();
    },
    validateStatus: (response, result) => {
      console.log("🚀 ~ response:", response);
      console.log("🚀 ~  result:", result);
      return [201, 200].includes(response.status);
    },
  }),
  endpoints: (builder) => ({
    submitOnboardingPreferences: builder.mutation({
      query: ({
        studentId,
        dto,
      }: {
        studentId: string;
        dto: {
          propertyPreference?: Record<string, unknown>;
          lifestylePreference?: Record<string, unknown>;
          roommatePreference?: Record<string, unknown>;
          situationResponse?: Record<string, unknown>;
        };
      }) => ({
        url: API_URL.ONBOARDING.SUBMIT_PREFERENCES.URL(studentId),
        method: API_URL.ONBOARDING.SUBMIT_PREFERENCES.METHOD,
        body: dto,
      }),
    }),
    updateOnboardingStatus: builder.mutation({
      query: (dto: interfaces.updateOnboardingStatusPayload) => ({
        url: API_URL.ONBOARDING.UPDATE_STATUS.URL(),
        method: API_URL.ONBOARDING.UPDATE_STATUS.METHOD,
        body: dto,
      }),
    }),
    getAllStudentInterests: builder.query<StudentInterestsResponse, void>({
      query: () => ({
        url: API_URL.ONBOARDING.GET_ALL_INTERESTS.URL(),
        method: API_URL.ONBOARDING.GET_ALL_INTERESTS.METHOD,
      }),
    }),
    getSubmittedPreferencesByStudentId: builder.query<any, string>({
      query: (studentId: string) => ({
        url: API_URL.ONBOARDING.GET_SUBMIT_PREFERENCES_BY_STUDENT_ID.URL(
          studentId
        ),
        method: API_URL.ONBOARDING.GET_SUBMIT_PREFERENCES_BY_STUDENT_ID.METHOD,
      }),
    }),
    getPreferencesStatus: builder.query<any, void>({
      query: (studentId: any) => ({
        url: API_URL.ONBOARDING.GET_PREFERENCES_STATUS.URL(studentId),
        method: API_URL.ONBOARDING.GET_PREFERENCES_STATUS.METHOD,
      }),
    }),
  }),
});

export const {
  useSubmitOnboardingPreferencesMutation,
  useUpdateOnboardingStatusMutation,
  useGetAllStudentInterestsQuery,
  useGetPreferencesStatusQuery,
  useGetSubmittedPreferencesByStudentIdQuery,
} = OnboardingServices;
