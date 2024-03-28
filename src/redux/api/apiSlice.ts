import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/v1/coach";

interface CoachData {
  // Define the type for the coach data
}

export const apiSlice = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Tickets"], // Define a tag for queries dependent on coach data
  endpoints: (builder) => ({
    fetchData: builder.query<CoachData[], void>({
      query: () => "/",
      providesTags: ["Tickets"], // Provide the "Tickets" tag for this query
    }),
    singleCoach: builder.query<CoachData, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Tickets" }],
    }),
    postData: builder.mutation<CoachData, Partial<CoachData>>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tickets"], // Invalidate "Tickets" tag upon mutation
    }),
    updateSeat: builder.mutation<CoachData, Partial<CoachData>>({
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
