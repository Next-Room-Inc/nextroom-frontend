import { createApi } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../endpoints";
import { baseQuery } from "../functions";
// import { details } from "framer-motion/client";
// import { Events } from "@src/pages/student-dashboard/components/dashboard/Events";

export const OffersServices = createApi({
  reducerPath: "offers",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllOffers: builder.query<any, void>({
      query: () => ({
        url: API_URL.OFFERS.GET_ALL.URL(),
        method: API_URL.OFFERS.GET_ALL.METHOD,
      }),
    }),
    claimOffer: builder.mutation({
      query: ({ userId, offerId }) => {
        return {
          url: API_URL.OFFERS.CLAIM_OFFER.URL(userId, offerId),
          method: API_URL.OFFERS.CLAIM_OFFER.METHOD,
        };
      },
    }),
  }),
});

export const { useGetAllOffersQuery, useClaimOfferMutation } = OffersServices;
