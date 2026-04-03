import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const SUCCESS_THEME = { duration: 3000, iconTheme: { primary: '#10b981', secondary: '#ffffff' } };
const ERROR_THEME = { duration: 5000, iconTheme: { primary: '#ef4444', secondary: '#ffffff' } };

function App() {
  const theme = useSelector((state) => state.theme.mode);
  const themeColor = useSelector((state) => state.theme.color);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme-color', themeColor);
  }, [themeColor]);

  const toastOptions = useMemo(
    () => ({
      duration: 4000,
      style: {
        background: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? '#f9fafb' : '#111827',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
      },
      success: SUCCESS_THEME,
      error: ERROR_THEME,
    }),
    [theme],
  );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} toastOptions={toastOptions} />
      <Outlet />
    </>
  );
}

export default App;
