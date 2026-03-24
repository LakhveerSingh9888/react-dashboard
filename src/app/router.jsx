import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Spinner from '@shared/components/Spinner';
import App from '@app/App';
import PublicLayout from '@app/layouts/PublicLayout';
import { DashboardLayout } from '@app/layouts/DashboardLayout';

const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@features/auth/pages/RegisterPage'));
const DashboardPage = lazy(() => import('@features/dashboard/pages/DashboardPage'));
const SettingsPage = lazy(() => import('@features/settings/pages/SettingsPage'));

const NotFound = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Page not found</p>
        </div>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                element: <PublicLayout />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <LoginPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'login',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <LoginPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'register',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <RegisterPage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: 'dashboard',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <DashboardPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'settings',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <SettingsPage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: '*',
                element: <Navigate to="/login" replace />,
            },
        ],
    },
]);

export default router;
