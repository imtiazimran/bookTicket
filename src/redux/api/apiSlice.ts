import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCoach } from "../../utils/types/types";

// const baseUrl = "http://localhost:3000/api/v1/coach";
const baseUrl = "https://book-ticket-backend.vercel.app/api/v1/coach";


export const apiSlice = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Tickets"], // Define a tag for queries dependent on coach data
  endpoints: (builder) => ({
    fetchData: builder.query<TCoach, void>({
      query: () => "/",
      providesTags: ["Tickets"], 
    }),
    singleCoach: builder.query<TCoach, string>({
      query: (id) => `/${id}`,
      providesTags: () => [{ type: "Tickets" }],
    }),
    postData: builder.mutation<TCoach, Partial<TCoach>>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tickets"], // Invalidate "Tickets" tag upon mutation
    }),
    updateSeat: builder.mutation<TCoach, Partial<TCoach>>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tickets"], // Invalidate "Tickets" tag upon mutation
    }),
  }),
});

export const {
  useFetchDataQuery,
  useSingleCoachQuery,
  usePostDataMutation,
  useUpdateSeatMutation,
} = apiSlice;
