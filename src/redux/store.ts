import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { authenticationApi } from './api/authApiSlice';
// import authReducer from './authentication/authReducer';

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        // auth: authReducer, // Add your auth reducer to the store
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            apiSlice.middleware,
            authenticationApi.middleware
        );
    },
});
