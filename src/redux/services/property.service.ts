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
    getSavedProperties: builder.query<any, string>({
      query: () => ({
        url: API_URL.PROPERTY.GET_SAVED_PROPERTIES.URL(),
        method: API_URL.PROPERTY.GET_SAVED_PROPERTIES.METHOD,
      }),
    }),
    getSavedPropertyIds: builder.query<any, any>({
      query: () => ({
        url: API_URL.PROPERTY.GET_SAVED_PROPERTIES.URL(),
        method: API_URL.PROPERTY.GET_SAVED_PROPERTIES.METHOD,
      }),
      transformResponse: (response: any) => {
        return response?.reduce((acc: any, property: any) => {
          acc[property.propertyId] = true; // collect IDs into array
          return acc;
        }, {});
      },
      providesTags: ["getSavedPropertyIds"],
    }),
    addNewSaveProperty: builder.mutation<any, string>({
      query: (studentId: string) => ({
        url: API_URL.PROPERTY.ADD_NEW_SAVED_PROPERTY.URL(studentId),
        method: API_URL.PROPERTY.ADD_NEW_SAVED_PROPERTY.METHOD,
      }),
      invalidatesTags: ["getSavedPropertyIds"],
    }),
    deleteSaveProperty: builder.mutation<any, string>({
      query: (studentId: string) => ({
        url: API_URL.PROPERTY.DELETE_SAVED_PROPERTY.URL(studentId),
        method: API_URL.PROPERTY.DELETE_SAVED_PROPERTY.METHOD,
      }),
      invalidatesTags: ["getSavedPropertyIds"],
    }),
  }),
});

export const {
  useGetPropertyMatchesQuery,
  useGetEntrataPropertiesQuery,
  useGetAcceptedPropertyQuery,
  useExplorePropertiesQuery,
  useGetSavedPropertiesQuery,
  useGetSavedPropertyIdsQuery,
  useAddNewSavePropertyMutation,
  useDeleteSavePropertyMutation,
} = PropertyServices;
