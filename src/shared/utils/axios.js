import axios from 'axios';
import toast from 'react-hot-toast';
import { logout, setCredentials } from '@features/auth/slice';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const setupAxiosInterceptors = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            const showSuccessToast = response.config?.showSuccessToast !== false;
            if (showSuccessToast && response.data?.message) {
                toast.success(response.data.message);
            }
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            const showErrorToast = originalRequest?.showErrorToast !== false;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (!refreshToken) throw new Error('No refresh token');

                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/auth/refresh`,
                        { refreshToken }
                    );

                    const { accessToken, refreshToken: newRefreshToken } = response.data;
                    localStorage.setItem('accessToken', accessToken);
                    if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

                    store.dispatch(setCredentials({ accessToken, refreshToken: newRefreshToken || refreshToken }));

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    }
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    toast.error('Session expired. Please login again.');
                    store.dispatch(logout());
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }

            if (showErrorToast) {
                const errorMessage =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    error.message ||
                    'An error occurred';
                toast.error(errorMessage);
            }

            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
