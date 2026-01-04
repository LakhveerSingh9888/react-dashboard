import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoadingSpinner from '@components/common/LoadingSpinner';
import App from '@/App';
import PublicLayout from '@layouts/PublicLayout';
import { DashboardLayout } from '@layouts/DashboardLayout';

// Lazy load pages
const Landing = lazy(() => import('@pages/public/Landing'));
const Login = lazy(() => import('@pages/auth/Login'));
const Dashboard = lazy(() => import('@pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('@pages/demo/NotFound'));
const FormDemo = lazy(() => import('@pages/demo/FormDemo'));
const DataPropExample = lazy(() => import('@pages/demo/DataPropExample'));
const FormHelpersExample = lazy(() => import('@pages/demo/FormHelpersExample'));
const TableDemo = lazy(() => import('@pages/demo/TableDemo'));
const ApiCallForm = lazy(() => import('@pages/demo/FormWithApiDataExample'));

// Placeholder components for lazy loaded routes
const Users = () => <div className="text-gray-800 dark:text-white">Users Page Placeholder</div>;
const Settings = () => <div className="text-gray-800 dark:text-white">Settings Page Placeholder</div>;

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, 
        errorElement: <Suspense fallback={<LoadingSpinner />}><NotFound /></Suspense>,
        children: [
            {
                element: <PublicLayout />,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<LoadingSpinner />}><Landing /></Suspense>,
                    },
                    {
                        path: 'login',
                        element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense>,
                    },
                    {
                        path: '404',
                        element: <Suspense fallback={<LoadingSpinner />}><NotFound /></Suspense>,
                    },
                    {
                        path: 'form-demo',
                        element: <Suspense fallback={<LoadingSpinner />}><FormDemo /></Suspense>,
                    },
                    {
                        path: 'data-prop-example',
                        element: <Suspense fallback={<LoadingSpinner />}><DataPropExample /></Suspense>,
                    },
                    {
                        path: 'form-helpers-example',
                        element: <Suspense fallback={<LoadingSpinner />}><FormHelpersExample /></Suspense>,
                    },
                    {
                        path: 'form-helpers-example/:id',
                        element: <Suspense fallback={<LoadingSpinner />}><ApiCallForm /></Suspense>,
                    },
                    {
                        path: 'table-demo',
                        element: <Suspense fallback={<LoadingSpinner />}><TableDemo /></Suspense>,
                    },
                ],
            },
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense>,
                    },
                    {
                        path: 'users',
                        element: <Users />,
                    },
                    {
                        path: 'settings',
                        element: <Settings />,
                    },
                ],
            },
            {
                path: '*',
                element: <Navigate to="/not-found" replace />,
            },
        ],
    },
]);

export default router;
