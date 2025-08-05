import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EntrataProperty } from "../../utils/interfaces/property.interface";
import { API_URL, baseUrl } from "../endpoints";

export const PropertyServices = createApi({
  reducerPath: "property",
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
      console.log("🚀 ~ response:", response);
      console.log("🚀 ~  result:", result);
      return [201, 200].includes(response.status);
    },
  }),
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
