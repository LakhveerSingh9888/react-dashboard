import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import languageReducer from './slices/languageSlice';
import { authApi } from './api/authApi';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        language: languageReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});
