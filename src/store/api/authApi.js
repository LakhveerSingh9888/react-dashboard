import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios-base-query";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery({ baseUrl: "" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (input) => {
                const { showSuccessToast = true, showErrorToast = true, ...credentials } = input || {};
                return {
                    url: "/login",
                    method: "POST",
                    data: credentials,
                    showSuccessToast,
                    showErrorToast,
                };
            },
        }),

        register: builder.mutation({
            query: (input) => {
                const { showSuccessToast = true, showErrorToast = true, ...userData } = input || {};
                return {
                    url: "/auth/register",
                    method: "POST",
                    data: userData,
                    showSuccessToast,
                    showErrorToast,
                };
            },
        }),

        profile: builder.query({
            query: (input = {}) => {
                const { showSuccessToast = true, showErrorToast = true } = input;
                return {
                    url: "/auth/profile",
                    method: "GET",
                    showSuccessToast,
                    showErrorToast,
                };
            },
            providesTags: ["User"],
        }),

        refresh: builder.mutation({
            query: (input) => {
                const { showSuccessToast = true, showErrorToast = true, refreshToken } = input || {};
                return {
                    url: "/auth/refresh",
                    method: "POST",
                    data: { refreshToken },
                    showSuccessToast,
                    showErrorToast,
                };
            },
        }),
        forgotPassword: builder.mutation({
            query: (input) => {
                const { showSuccessToast = true, showErrorToast = true, email } = input || {};
                return {
                    url: "/auth/forgot-password",
                    method: "POST",
                    data: { email },
                    showSuccessToast,
                    showErrorToast,
                };
            },
        }),
        resetPassword: builder.mutation({
            query: (input) => {
                const { showSuccessToast = true, showErrorToast = true, token, password } = input || {};
                return {
                    url: "/auth/reset-password",
                    method: "POST",
                    data: { token, password },
                    showSuccessToast,
                    showErrorToast,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useProfileQuery,
    useRefreshMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
