import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/baseApi';

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery: axiosBaseQuery({ baseUrl: '' }),
    tagTypes: ['Settings'],
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: () => ({ url: '/settings', method: 'GET' }),
            providesTags: ['Settings'],
        }),
        updateSettings: builder.mutation({
            query: (data) => ({ url: '/settings', method: 'PUT', data }),
            invalidatesTags: ['Settings'],
        }),
    }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
