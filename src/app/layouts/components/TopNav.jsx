import { useRef } from 'react';
import { Menu, Search, Bell, Settings, User, ChevronDown, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Menu as PrimeMenu } from 'primereact/menu';
import { ThemeToggle } from './ThemeToggle';

export const TopNav = ({ onMenuToggle, onMobileMenuToggle }) => {
  const userMenuRef = useRef(null);

  const userMenuItems = [
    {
      label: 'My Account',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: () => {},
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          command: () => {},
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      className: 'text-red-600',
      command: () => {},
    },
  ];

  return (
    <div className="flex items-center justify-between h-full px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        <Button
          text
          size="small"
          onClick={onMenuToggle}
          className="hidden lg:flex p-2 text-gray-600 dark:text-gray-300"
          title="Toggle Menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <Button
          text
          size="small"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
          title="Toggle Mobile Menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <nav className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <Link
            to="/dashboard"
            className="flex items-center hover:text-gray-900 dark:hover:text-white"
          >
            <Home className="h-4 w-4 mr-1" />
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Overview</span>
        </nav>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <label htmlFor="topnav-search" className="sr-only">
            Search
          </label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10 pointer-events-none" />
          <InputText
            id="topnav-search"
            type="search"
            placeholder="Search..."
            className="w-full pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          text
          size="small"
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <Button
          text
          size="small"
          className="relative p-2 text-gray-600 dark:text-gray-300"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold bg-red-500 text-white rounded-full">
            3
          </span>
        </Button>
        <Button
          text
          size="small"
          className="p-2 text-gray-600 dark:text-gray-300"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <PrimeMenu ref={userMenuRef} model={userMenuItems} popup className="mt-2" />
        <Button
          text
          onClick={(e) => userMenuRef.current?.toggle(e)}
          className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-300"
          aria-label="User menu"
        >
          <Avatar
            icon="pi pi-user"
            shape="circle"
            className="h-8 w-8 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          />
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900 dark:text-white">John Doe</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Administrator</span>
          </div>
          <ChevronDown className="hidden lg:block h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};
