import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return 'light';
};

const getInitialColor = () => {
    if (typeof window !== 'undefined') {
        const savedColor = localStorage.getItem('themeColor');
        if (savedColor) {
            return savedColor;
        }
    }
    return 'blue';
};

const initialState = {
    mode: getInitialTheme(),
    color: getInitialColor(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.mode);
            if (state.mode === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem('theme', state.mode);
            if (state.mode === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        setColor: (state, action) => {
            state.color = action.payload;
            localStorage.setItem('themeColor', state.color);
        },
    },
});

export const { toggleTheme, setTheme, setColor } = themeSlice.actions;
export default themeSlice.reducer;
