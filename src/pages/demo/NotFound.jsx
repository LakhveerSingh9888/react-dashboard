import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;

