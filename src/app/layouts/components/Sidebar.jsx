import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  BarChart2,
  Building2,
  Folder,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  PieChart,
  Users2,
  Activity,
  Edit,
} from 'lucide-react';
import { cn } from '@shared/utils/cn';
import { Badge } from '@shared/components/Badge';

const menuData = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: Home,
        badge: '2',
        children: [
          { id: 'analytics', label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
          {
            id: 'reports',
            label: 'Reports',
            href: '/dashboard/reports',
            icon: FileText,
            children: [
              {
                id: 'sales-reports',
                label: 'Sales Reports',
                href: '/dashboard/reports/sales',
                icon: TrendingUp,
              },
              {
                id: 'user-reports',
                label: 'User Reports',
                href: '/dashboard/reports/users',
                icon: Users2,
              },
            ],
          },
          {
            id: 'real-time',
            label: 'Real-time',
            href: '/dashboard/realtime',
            icon: Activity,
            isNew: true,
          },
        ],
      },
      {
        id: 'analytics',
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart2,
        children: [
          { id: 'overview', label: 'Overview', href: '/analytics/overview', icon: PieChart },
          {
            id: 'performance',
            label: 'Performance',
            href: '/analytics/performance',
            icon: TrendingUp,
          },
        ],
      },
      { id: 'organization', label: 'Organization', href: '/organization', icon: Building2 },
      { id: 'projects', label: 'Projects', href: '/projects', icon: Folder, badge: '12' },
      { id: 'form-inputs', label: 'Form Inputs', href: '/form-inputs', icon: Edit },
    ],
  },
];

const NavItem = memo(function NavItem({
  item,
  level = 0,
  parentId = '',
  expandedItems,
  toggleExpanded,
  showText,
  isMobile,
  handleNavigation,
}) {
  const itemId = `${parentId}-${item.id}`;
  const isExpanded = expandedItems.has(itemId);
  const hasChildren = item.children && item.children.length > 0;
  const showExpandIcon = hasChildren && showText;
  const paddingLeft = level === 0 ? 'px-3' : level === 1 ? 'pl-8 pr-3' : 'pl-12 pr-3';

  const content = (
    <div
      className={cn(
        'flex items-center py-2 text-sm rounded-md transition-colors sidebar-menu-item hover:bg-gray-50 dark:hover:bg-gray-800 relative group cursor-pointer',
        paddingLeft,
      )}
      onClick={() => {
        if (hasChildren) {
          toggleExpanded(itemId);
        } else if (item.href) {
          handleNavigation();
        }
      }}
      title={!showText ? item.label : undefined}
    >
      <item.icon className="h-4 w-4 flex-shrink-0 sidebar-menu-icon text-gray-700 dark:text-gray-300" />
      {showText && (
        <>
          <span className="ml-3 flex-1 transition-opacity duration-200 sidebar-menu-text text-gray-700 dark:text-gray-300">
            {item.label}
          </span>
          <div className="flex items-center space-x-1">
            {item.isNew && (
              <Badge variant="success" className="px-1.5 py-0.5 text-xs">
                New
              </Badge>
            )}
            {item.badge && (
              <Badge variant="info" className="px-1.5 py-0.5 text-xs">
                {item.badge}
              </Badge>
            )}
            {showExpandIcon && (
              <ChevronDown
                className={cn(
                  'h-3 w-3 transition-transform duration-200 text-gray-500',
                  isExpanded ? 'rotate-180' : 'rotate-0',
                )}
              />
            )}
          </div>
        </>
      )}
      {!showText && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {item.label}
          {item.badge && <span className="ml-1 text-blue-300">({item.badge})</span>}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {item.href && !hasChildren ? <Link to={item.href}>{content}</Link> : content}
      {hasChildren && isExpanded && showText && (
        <div className="mt-1 space-y-1">
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              level={level + 1}
              parentId={itemId}
              expandedItems={expandedItems}
              toggleExpanded={toggleExpanded}
              showText={showText}
              isMobile={isMobile}
              handleNavigation={handleNavigation}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export const Sidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  menuState,
  setMenuState,
  isHovered,
  setIsHovered,
  isMobile,
  setIsMobile,
}) => {
  const [previousDesktopState, setPreviousDesktopState] = useState('full');
  const [expandedItems, setExpandedItems] = useState(new Set());

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsMobile(!isDesktop);
      if (!isDesktop) {
        if (menuState !== 'hidden') {
          setPreviousDesktopState(menuState);
          setMenuState('hidden');
        }
      } else {
        if (menuState === 'hidden' && previousDesktopState !== 'hidden') {
          setMenuState(previousDesktopState);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuState, previousDesktopState]);

  const handleNavigation = useCallback(() => {
    if (isMobile) setIsMobileMenuOpen(false);
  }, [isMobile, setIsMobileMenuOpen]);

  const toggleExpanded = useCallback((itemId) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) newSet.delete(itemId);
      else newSet.add(itemId);
      return newSet;
    });
  }, []);

  const settingsItem = useMemo(
    () => ({ id: 'settings', label: 'Settings', href: '/settings', icon: Settings }),
    [],
  );
  const helpItem = useMemo(
    () => ({ id: 'help', label: 'Help', href: '/help', icon: HelpCircle }),
    [],
  );

  const getSidebarWidth = () => {
    if (isMobile) return 'w-64';
    if (menuState === 'collapsed' && isHovered) return 'w-64';
    return menuState === 'collapsed' ? 'w-16' : 'w-64';
  };

  const showText =
    menuState === 'full' ||
    (menuState === 'collapsed' && isHovered) ||
    (isMobile && isMobileMenuOpen);

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-gray-800">
        {showText ? (
          <Link to="/dashboard" className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white transition-opacity duration-200">
              Dashboard
            </span>
          </Link>
        ) : (
          <div className="flex justify-center w-full">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
        <div className="space-y-6">
          {menuData.map((section) => (
            <div key={section.id}>
              {showText && (
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 transition-opacity duration-200">
                  {section.label}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    parentId={section.id}
                    expandedItems={expandedItems}
                    toggleExpanded={toggleExpanded}
                    showText={showText}
                    isMobile={isMobile}
                    handleNavigation={handleNavigation}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="space-y-1">
          <NavItem
            item={settingsItem}
            expandedItems={expandedItems}
            toggleExpanded={toggleExpanded}
            showText={showText}
            isMobile={isMobile}
            handleNavigation={handleNavigation}
          />
          <NavItem
            item={helpItem}
            expandedItems={expandedItems}
            toggleExpanded={toggleExpanded}
            showText={showText}
            isMobile={isMobile}
            handleNavigation={handleNavigation}
          />
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <nav
          className={cn(
            'fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-gray-900',
            'border-r border-gray-200 dark:border-gray-800',
            'transform transition-all duration-300 ease-in-out will-change-transform',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          {sidebarContent}
        </nav>
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[65]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <nav
      className={cn(
        'fixed inset-y-0 left-0 z-[60] bg-white dark:bg-gray-900',
        'border-r border-gray-200 dark:border-gray-800 transition-colors duration-200 ease-in-out',
        menuState === 'hidden' ? 'w-0 border-r-0' : getSidebarWidth(),
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: menuState === 'hidden' ? 'hidden' : 'visible' }}
    >
      {menuState !== 'hidden' && sidebarContent}
    </nav>
  );
};
