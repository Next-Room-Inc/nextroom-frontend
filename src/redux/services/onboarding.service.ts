import { createApi } from "@reduxjs/toolkit/query/react";
import * as interfaces from "../../utils/interfaces";
import { StudentInterestsResponse } from "../../utils/interfaces";
import { API_URL } from "../endpoints";
import { baseQuery } from "../functions";

export const OnboardingServices = createApi({
  reducerPath: "onboarding",
  baseQuery: baseQuery,
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
