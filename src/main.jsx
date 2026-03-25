import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@app/providers';
import router from '@app/router';
import { store } from '@/shared/store';
import { setupAxiosInterceptors } from '@shared/utils/axios';
import 'primeicons/primeicons.css';
import '@styles/theme.css';

const initializeTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    const savedColor = localStorage.getItem('themeColor');

    if (savedTheme) {
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    if (savedColor) {
      document.documentElement.setAttribute('data-theme-color', savedColor);
    } else {
      document.documentElement.setAttribute('data-theme-color', 'blue');
    }
  }
};

initializeTheme();

setupAxiosInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>,
);
