import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setColor } from '@/shared/store/themeSlice';
import { logout } from '@features/auth/slice';
import { Sun, Moon, LogOut, User, Palette } from 'lucide-react';

const THEME_COLORS = [
  { name: 'Blue', value: 'blue', bg: 'bg-blue-600' },
  { name: 'Purple', value: 'purple', bg: 'bg-purple-600' },
  { name: 'Green', value: 'green', bg: 'bg-green-600' },
  { name: 'Orange', value: 'orange', bg: 'bg-orange-600' },
  { name: 'Pink', value: 'pink', bg: 'bg-pink-600' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const themeColor = useSelector((state) => state.theme.color);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (color) => {
    dispatch(setColor(color));
    setShowColorPicker(false);
  };

  const getNavbarClasses = () => {
    const baseClasses =
      'shadow-md px-6 py-4 flex justify-between items-center transition-colors duration-200';
    const colorMap = {
      blue: theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600',
      purple: theme === 'dark' ? 'bg-purple-900' : 'bg-purple-600',
      green: theme === 'dark' ? 'bg-green-900' : 'bg-green-600',
      orange: theme === 'dark' ? 'bg-orange-900' : 'bg-orange-600',
      pink: theme === 'dark' ? 'bg-pink-900' : 'bg-pink-600',
    };
    return `${baseClasses} ${colorMap[themeColor] || colorMap.blue}`;
  };

  return (
    <nav className={getNavbarClasses()}>
      <div className="flex items-center">
        <img src="/assets/logo.svg" alt="Logo" className="h-12 w-auto object-contain" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            title="Change Color Theme"
          >
            <Palette size={20} />
          </button>
          {showColorPicker && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowColorPicker(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase px-2 py-1">
                    Choose Color
                  </p>
                  {THEME_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleColorChange(color.value)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        themeColor === color.value
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${color.bg}`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {color.name}
                      </span>
                      {themeColor === color.value && (
                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {isAuthenticated && (
          <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-white/20">
            <div className="flex items-center space-x-2 text-white">
              <User size={20} />
              <span className="font-medium">{user?.name || 'User'}</span>
            </div>
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center space-x-1 text-red-200 hover:text-red-100 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
