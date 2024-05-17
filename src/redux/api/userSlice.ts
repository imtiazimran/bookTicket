import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base } from "../../utils/baseApi";
import { getToken } from "../../utils/getToken";


const baseUrl = base + "/api/v1/user";
export const userSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["user"],

    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
              url: `/me?token=${getToken()}`,
              method: "GET",
            }),
            providesTags: ["user"],
          }),
    })
})

export const {
  useGetUserQuery
} = userSlice;