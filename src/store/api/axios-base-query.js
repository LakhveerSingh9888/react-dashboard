import axiosInstance from '@utils/axios';

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params, headers, showSuccessToast, showErrorToast }) => {
            try {
                const result = await axiosInstance({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                    showSuccessToast,
                    showErrorToast,
                });
                return { data: result.data };
            } catch (axiosError) {
                const err = axiosError;
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };
