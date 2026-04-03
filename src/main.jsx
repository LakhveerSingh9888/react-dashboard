import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@app/providers';
import router from '@app/router';
import { store } from '@/shared/store';
import { setupAxiosInterceptors } from '@shared/utils/axios';
import 'primeicons/primeicons.css';
import '@styles/theme.css';

setupAxiosInterceptors(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
