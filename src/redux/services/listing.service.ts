import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, baseUrl } from "../endpoints";

export const ListingServices = createApi({
  reducerPath: "listing",
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
    getAllListings: builder.query({
      query: () => ({
        url: API_URL.LISTINGS.GET_ALL.URL(),
        method: API_URL.LISTINGS.GET_ALL.METHOD,
      }),
    }),
  }),
});

export const { useGetAllListingsQuery } = ListingServices;
