import React from 'react';
import { cn } from '@utils/cn';

const getAutoComplete = (type, name, autoComplete) => {
    if (autoComplete !== undefined) return autoComplete;
    
    if (type === 'email') return 'email';
    if (type === 'password') {
        const nameLower = name?.toLowerCase() || '';
        if (nameLower.includes('new') || nameLower.includes('confirm')) {
            return 'new-password';
        }
        return 'current-password';
    }
    if (type === 'tel') return 'tel';
    if (name?.toLowerCase().includes('username')) return 'username';
    if (name?.toLowerCase().includes('name')) {
        if (name.toLowerCase().includes('first')) return 'given-name';
        if (name.toLowerCase().includes('last')) return 'family-name';
        return 'name';
    }
    if (type === 'search') return 'off';
    
    return undefined;
};

export const Input = React.forwardRef(
    ({ className, type = 'text', name, autoComplete, ...props }, ref) => {
        const autoCompleteValue = getAutoComplete(type, name, autoComplete);
        
        return (
            <input
                type={type}
                ref={ref}
                name={name}
                autoComplete={autoCompleteValue}
                className={cn(
                    'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
                    'placeholder:text-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500',
                    'dark:focus:ring-gray-600',
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';
