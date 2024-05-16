/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCoach } from "../../utils/types/types";
import { base } from "../../utils/baseApi";

// Function to get the token from local storage
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const baseUrl = base + "/api/v1/coach";

export const apiSlice = createApi({
  reducerPath: "ticketsApi",
  // Configure the baseQuery to include the token in the headers
  baseQuery: fetchBaseQuery({
    baseUrl,
    // headers: {
    //   authorization: `Bearer ${getToken()}`,
    // },
    // Add headers with the authorization token from local storage
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        console.log("Token:", token);
        headers.set("authorization", `Bearer ${token}`);
      }
      console.log("Headers:", headers);
      return headers;
    },
  }),
  tagTypes: ["Tickets"], // Define a tag for queries dependent on coach data
  endpoints: (builder) => ({
    fetchData: builder.query<TCoach, void>({
      query: () => `/?token=${getToken()}`,
      providesTags: ["Tickets"],
    }),
    getCaoch: builder.query({
      query: (id) => ({
        url: `/${id}?token=${getToken()}`,
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
        url: `/book/${data.id}?token=${getToken()}`,
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
    }),
  }),
});

export const {
  useFetchDataQuery,
  useGetCaochQuery,
  usePostDataMutation,
  useUpdateSeatMutation,
  useDeleteCoachMutation,
  useUnSelectSeatMutation,
} = apiSlice;
