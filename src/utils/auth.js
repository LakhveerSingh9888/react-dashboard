import { store } from '@store';
import { logout } from '@store/slices/authSlice';

export const isAuthenticated = () => {
    const state = store.getState();
    return state.auth.isAuthenticated && !!state.auth.accessToken;
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const clearAuth = () => {
    store.dispatch(logout());
};

export const hasRole = (role) => {
    const state = store.getState();
    return state.auth.user?.role === role;
};
