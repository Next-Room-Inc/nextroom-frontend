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
  }),
});

export const { useGetEntrataPropertiesQuery } = PropertyServices;
