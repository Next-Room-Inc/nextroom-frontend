import { createApi } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../endpoints";
import { baseQuery } from "../functions";

export const ListingServices = createApi({
  reducerPath: "listing",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => ({
        url: API_URL.LISTINGS.GET_ALL.URL(),
        method: API_URL.LISTINGS.GET_ALL.METHOD,
      }),
    }),
  }),
});

export const { useGetAllListingsQuery } = ListingServices;
