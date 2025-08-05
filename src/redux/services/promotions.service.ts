import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, baseUrl } from "../endpoints";
import * as interfaces from "../../utils/interfaces";

export const PromotionServices = createApi({
  reducerPath: "promotion",
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
    sendPromotionEmail: builder.mutation({
      query: (sendPromotionEmailDto: interfaces.SendPromotionEmailPayload) => ({
        url: API_URL.PROMOTION.SEND_EMAIL.URL(),
        method: API_URL.PROMOTION.SEND_EMAIL.METHOD,
        body: sendPromotionEmailDto,
      }),
    }),
  }),
});

export const { useSendPromotionEmailMutation } = PromotionServices;
