import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from '@features/auth/slice';
import { authApi } from '@features/auth/api';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});
