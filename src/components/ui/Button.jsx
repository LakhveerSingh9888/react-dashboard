import React from 'react';
import { cn } from '@utils/cn';

const buttonVariants = {
    default: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100',
    ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
};

const buttonSizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-11 px-8 text-base',
};

export const Button = React.forwardRef(
    ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
                    'disabled:pointer-events-none disabled:opacity-50',
                    buttonVariants[variant],
                    buttonSizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
