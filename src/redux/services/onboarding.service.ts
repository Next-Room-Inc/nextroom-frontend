import { API_URL, baseUrl } from "../endpoints";
import * as interfaces from "../../utils/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OnboardingServices = createApi({
  reducerPath: "onboarding",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (token) {
        // If the token exists, add it to the Authorization header
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
    submitOnboardingPreferences: builder.mutation({
      query: (dto: interfaces.SubmitOnboardingPreferencesPayload) => ({
        url: API_URL.ONBOARDING.SUBMIT_PREFERENCES.URL(),
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
  }),
});

export const {
  useSubmitOnboardingPreferencesMutation,
  useUpdateOnboardingStatusMutation,
} = OnboardingServices;
