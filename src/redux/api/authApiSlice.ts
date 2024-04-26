/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tuser } from '../../utils/types/types';
import { base } from '../../utils/baseApi';

interface LoginResponse {
    token: string;
    user: Tuser;
}

export const authenticationApi = createApi({
    reducerPath: 'authenticationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: base,
        prepareHeaders: (headers) => {
            // Add credentials: 'include' to the headers
            headers.set('credentials', 'include');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        LoginUser: builder.query<LoginResponse, void>({
            query: () => '/auth/google',
        }),
        LogoutUser: builder.query({
            query: () => '/logout',
        })
    }),
});

export const { useLoginUserQuery, useLogoutUserQuery } = authenticationApi;
