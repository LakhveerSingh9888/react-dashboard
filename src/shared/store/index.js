import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from '@features/auth/slice';
import { authApi } from '@features/auth/api';
import { dashboardApi } from '@features/dashboard/api';
import { settingsApi } from '@features/settings/api';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(settingsApi.middleware),
});
