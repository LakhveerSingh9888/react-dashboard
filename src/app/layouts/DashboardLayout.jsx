import { useState, useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';

export const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuState, setMenuState] = useState('full');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mainStyle = useMemo(() => {
    if (isMobile || menuState === 'hidden') return { marginLeft: '0' };
    if (menuState === 'collapsed' && isHovered) return { marginLeft: '16rem' };
    if (menuState === 'collapsed') return { marginLeft: '4rem' };
    return { marginLeft: '16rem' };
  }, [isMobile, menuState, isHovered]);

  const handleMenuToggle = useCallback(() => {
    setMenuState((prev) => {
      switch (prev) {
        case 'full':
          return 'collapsed';
        case 'collapsed':
          return 'hidden';
        case 'hidden':
          return 'full';
        default:
          return 'full';
      }
    });
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        menuState={menuState}
        setMenuState={setMenuState}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />
      <div
        className="w-full flex flex-1 flex-col transition-[margin-left] duration-300 ease-in-out min-w-0"
        style={mainStyle}
      >
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 shrink-0 bg-white dark:bg-gray-900">
          <TopNav onMenuToggle={handleMenuToggle} onMobileMenuToggle={handleMobileMenuToggle} />
        </header>
        <main className="flex-1 overflow-auto p-3 sm:p-6 bg-gray-50 dark:bg-gray-950 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
