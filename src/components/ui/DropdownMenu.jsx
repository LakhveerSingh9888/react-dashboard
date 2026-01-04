import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@utils/cn';

export const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            {React.Children.map(children, (child) => {
                if (child.type === DropdownMenuTrigger) {
                    return React.cloneElement(child, { onClick: () => setIsOpen(!isOpen) });
                }
                if (child.type === DropdownMenuContent) {
                    return React.cloneElement(child, { isOpen, onClose: () => setIsOpen(false) });
                }
                return child;
            })}
        </div>
    );
};

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

export const DropdownMenuContent = ({ children, isOpen, onClose, align = 'end', className }) => {
    if (!isOpen) return null;

    const alignmentClasses = {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
    };

    return (
        <div
            className={cn(
                'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md',
                'dark:border-gray-800 dark:bg-gray-900',
                alignmentClasses[align],
                className
            )}
        >
            {children}
        </div>
    );
};

export const DropdownMenuLabel = ({ children, className }) => {
    return (
        <div
            className={cn(
                'px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-white',
                className
            )}
        >
            {children}
        </div>
    );
};

export const DropdownMenuItem = ({ children, className, onClick, ...props }) => {
    return (
        <div
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                'text-gray-900 dark:text-white',
                className
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export const DropdownMenuSeparator = ({ className }) => {
    return (
        <div
            className={cn(
                '-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800',
                className
            )}
        />
    );
};
