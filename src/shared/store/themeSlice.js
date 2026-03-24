import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            // Apply dark class synchronously
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return savedTheme;
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            return 'dark';
        }
    }
    // Ensure light mode is set
    if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('dark');
    }
    return 'light';
};

const getInitialColor = () => {
    if (typeof window !== 'undefined') {
        const savedColor = localStorage.getItem('themeColor');
        if (savedColor) {
            // Apply theme color synchronously
            document.documentElement.setAttribute('data-theme-color', savedColor);
            return savedColor;
        }
    }
    // Set default theme color
    if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme-color', 'blue');
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
