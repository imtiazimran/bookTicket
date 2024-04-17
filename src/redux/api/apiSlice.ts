import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCoach } from "../../utils/types/types";
import { base } from "../../utils/baseApi";

export const baseUrl = base+'/api/v1/coach';


export const apiSlice = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Tickets"], // Define a tag for queries dependent on coach data
  endpoints: (builder) => ({
    fetchData: builder.query<TCoach, void>({
      query: () => "/",
      providesTags: ["Tickets"],
    }),
    getCaoch: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["Tickets"],
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
        url: `/book/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tickets"], // Invalidate "Tickets" tag upon mutation
    }),
    unSelectSeat: builder.mutation({
      query: (data) => ({
        url: `/unBook/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),
    deleteCoach: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    })
  }),
});

export const {
  useFetchDataQuery,
  useGetCaochQuery,
  usePostDataMutation,
  useUpdateSeatMutation,
  useDeleteCoachMutation,
  useUnSelectSeatMutation
} = apiSlice;
