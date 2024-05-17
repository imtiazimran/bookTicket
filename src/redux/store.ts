import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { userSlice } from './api/userSlice';

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
        // auth: authReducer, // Add your auth reducer to the store
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            apiSlice.middleware,
            userSlice.middleware
        );
    },
});
