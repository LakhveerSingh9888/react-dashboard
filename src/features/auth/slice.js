import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user || state.user; // Keep existing user if not provided
            state.accessToken = accessToken;
            if (refreshToken) {
                state.refreshToken = refreshToken;
            }
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
