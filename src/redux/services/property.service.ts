import { createApi } from "@reduxjs/toolkit/query/react";
import { EntrataProperty } from "../../utils/interfaces/property.interface";
import { API_URL } from "../endpoints";
import { baseQuery } from "../functions";

export const PropertyServices = createApi({
  reducerPath: "property",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getEntrataProperties: builder.query<EntrataProperty[], void>({
      query: () => ({
        url: API_URL.PROPERTY.GET_ENTRATA_PROPERTIES.URL(),
        method: API_URL.PROPERTY.GET_ENTRATA_PROPERTIES.METHOD,
      }),
    }),
    getPropertyMatches: builder.query<any, string>({
      query: (studentId: string) => ({
        url: API_URL.PROPERTY.MATCHES.URL(studentId),
        method: API_URL.PROPERTY.MATCHES.METHOD,
      }),
    }),
    exploreProperties: builder.query<any, string | null>({
      query: (query: string | null = null) => ({
        url: API_URL.PROPERTY.EXPLORE.URL(query),
        method: API_URL.PROPERTY.EXPLORE.METHOD,
      }),
    }),
    getAcceptedProperty: builder.query<any, string>({
      query: (studentId: string) => ({
        url: API_URL.PROPERTY.ACCEPTED_PROPERTY.URL(studentId),
        method: API_URL.PROPERTY.ACCEPTED_PROPERTY.METHOD,
      }),
    }),
  }),
});

export const {
  useGetPropertyMatchesQuery,
  useGetEntrataPropertiesQuery,
  useGetAcceptedPropertyQuery,
  useExplorePropertiesQuery,
} = PropertyServices;
