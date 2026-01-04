import React from 'react';
import { cn } from '@utils/cn';

export const Avatar = ({ src, alt, className, children }) => {
    return (
        <div
            className={cn(
                'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
                className
            )}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || 'Avatar'}
                    className="aspect-square h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
};

export const AvatarFallback = ({ children, className }) => {
    return (
        <div
            className={cn(
                'flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
                className
            )}
        >
            {children}
        </div>
    );
};
