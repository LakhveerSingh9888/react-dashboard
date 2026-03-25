import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { classNames } from 'primereact/utils';

// Simplified DropdownMenu built on PrimeReact Menu (popup mode).
// Usage:
//   <DropdownMenu model={items} trigger={<button>Open</button>} align="end" />
//
// For composable usage in TopNav, use PrimeReact Menu directly with a ref.

export const DropdownMenu = ({ model = [], trigger, className }) => {
  const menuRef = useRef(null);

  const triggerEl = React.cloneElement(trigger, {
    onClick: (e) => {
      menuRef.current?.toggle(e);
      trigger.props.onClick?.(e);
    },
  });

  return (
    <>
      {triggerEl}
      <Menu ref={menuRef} model={model} popup className={classNames(className)} />
    </>
  );
};

// Re-export sub-components for any existing composable usage
export const DropdownMenuTrigger = ({ children, onClick, asChild }) => {
  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e) => {
        onClick?.(e);
        children.props.onClick?.(e);
      },
    });
  }
  return <div onClick={onClick}>{children}</div>;
};

export const DropdownMenuContent = ({ children, isOpen, align = 'end', className }) => {
  if (!isOpen) return null;
  const alignClass = { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' };
  return (
    <div
      className={classNames(
        'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md dark:border-gray-800 dark:bg-gray-900',
        alignClass[align],
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DropdownMenuLabel = ({ children, className }) => (
  <div
    className={classNames(
      'px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-white',
      className,
    )}
  >
    {children}
  </div>
);

export const DropdownMenuItem = ({ children, className, onClick, ...props }) => (
  <div
    className={classNames(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm',
      'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white',
      className,
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);

export const DropdownMenuSeparator = ({ className }) => (
  <div className={classNames('-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800', className)} />
);
