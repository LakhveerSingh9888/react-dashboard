import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';

export const DashboardLayout = () => {
    const theme = useSelector((state) => state.theme.mode);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [menuState, setMenuState] = useState('full');
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Listen for menu state changes from Sidebar
    useEffect(() => {
        const checkMenuState = () => {
            if (typeof window !== 'undefined') {
                if (window.menuState) {
                    setMenuState(window.menuState);
                }
                if (window.isHovered !== undefined) {
                    setIsHovered(window.isHovered);
                }
                if (window.isMobile !== undefined) {
                    setIsMobile(window.isMobile);
                }
            }
        };

        // Check initial state
        checkMenuState();

        // Set up interval to check for changes
        const interval = setInterval(checkMenuState, 50);

        return () => clearInterval(interval);
    }, []);

    // Calculate margin based on menu state and hover - only for desktop
    const getMarginLeft = () => {
        if (isMobile) {
            return '0'; // No margin on mobile, sidebar is overlay
        }
        if (menuState === 'hidden') {
            return '0';
        }
        // If collapsed and hovered, expand temporarily
        if (menuState === 'collapsed' && isHovered) {
            return '16rem'; // 256px - full width
        }
        if (menuState === 'collapsed') {
            return '4rem'; // 64px - collapsed width
        }
        return '16rem'; // 256px - full width
    };

    const handleMenuToggle = () => {
        if (typeof window !== 'undefined' && window.toggleMenuState) {
            window.toggleMenuState();
        }
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={`flex h-screen ${theme === 'dark' ? 'dark' : ''}`}>
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div
                className="w-full flex flex-1 flex-col transition-all duration-300 ease-in-out min-w-0"
                style={{
                    marginLeft: getMarginLeft(),
                }}
            >
                <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-gray-900">
                    <TopNav onMenuToggle={handleMenuToggle} onMobileMenuToggle={handleMobileMenuToggle} />
                </header>
                <main className="flex-1 overflow-auto p-3 sm:p-6 bg-gray-50 dark:bg-gray-950 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
