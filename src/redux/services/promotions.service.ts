import { createApi } from "@reduxjs/toolkit/query/react";
import * as interfaces from "@src/utils/interfaces";
import { API_URL } from "../endpoints";
import { baseQuery } from "../functions";

export const PromotionServices = createApi({
  reducerPath: "promotion",
  baseQuery: baseQuery,
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
