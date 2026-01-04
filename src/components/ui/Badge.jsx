import React from 'react';
import { cn } from '@utils/cn';

const badgeVariants = {
    default: 'bg-gray-900 text-white dark:bg-white dark:text-gray-900',
    secondary: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white',
    destructive: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
};

export const Badge = ({ className, variant = 'info', children, ...props }) => {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
                badgeVariants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
