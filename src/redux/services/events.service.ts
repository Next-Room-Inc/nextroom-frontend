import { createApi } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../endpoints";
import { baseQuery } from "../functions";

export const EventsServices = createApi({
  reducerPath: "events",
  baseQuery: baseQuery,
  tagTypes: ["UserEvents", "UpcomingEvents", "RegisterEvents"], // ✅ define tags
  endpoints: (builder) => ({
    getAllUpcommingEvents: builder.query<any, void>({
      query: () => ({
        url: API_URL.EVENTS.GET_ALL_UPCOMMING_EVENTS.URL(),
        method: API_URL.EVENTS.GET_ALL_UPCOMMING_EVENTS.METHOD,
      }),
      providesTags: ["UpcomingEvents"], // ✅ add tag
    }),
    getAllUserEvents: builder.query<any, number | null>({
      query: (id) => ({
        url: API_URL.EVENTS.GET_USER_EVENTS.URL(id),
        method: API_URL.EVENTS.GET_USER_EVENTS.METHOD,
      }),
      providesTags: ["UserEvents"], // ✅ add tag
    }),
    registerUserEvent: builder.mutation({
      query: ({ userId, eventId }) => ({
        url: API_URL.EVENTS.REGISTER_USER_EVENTS.URL(userId, eventId),
        method: API_URL.EVENTS.REGISTER_USER_EVENTS.METHOD,
      }),
      invalidatesTags: ["UserEvents"], // ✅ refetch when cancel is called
    }),
    cancelUserEvents: builder.mutation({
      query: ({ userId, eventId }) => ({
        url: API_URL.EVENTS.CANCEL_USER_EVENTS.URL(userId, eventId),
        method: API_URL.EVENTS.CANCEL_USER_EVENTS.METHOD,
      }),
      invalidatesTags: ["UserEvents"], // ✅ refetch when cancel is called
    }),
  }),
});

export const {
  useGetAllUpcommingEventsQuery,
  useGetAllUserEventsQuery,
  useCancelUserEventsMutation,
  useRegisterUserEventMutation,
} = EventsServices;
