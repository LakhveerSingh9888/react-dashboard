import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <footer className="bg-white dark:bg-gray-800 py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                © {new Date().getFullYear()} React Boilerplate. All rights reserved.
            </footer>
        </div>
    );
};

export default PublicLayout;
