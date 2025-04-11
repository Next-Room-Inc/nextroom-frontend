import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, baseUrl } from "../endpoints";
import * as interfaces from "../../utils/interfaces";

export const PromotionsServices = createApi({
  reducerPath: "promotions",
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

export const { useSendPromotionEmailMutation } = PromotionsServices;
