import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import InputLayout from './InputLayout';

const Input = ({
    type = 'text',
    name,
    placeholder,
    label,
    className = '',
    control,
    rules,
    autoComplete,
    ...rest
}) => {
    const baseInputStyles = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200";
    const defaultBorderColor = "border-gray-300 dark:border-gray-600";
    const errorBorderColor = "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900 dark:text-black ";
    const normalFocusColor = "focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-900 dark:bg-gray-800 dark:text-white";

    const getAutoComplete = () => {
        if (autoComplete !== undefined) return autoComplete;
        
        if (type === 'email') return 'email';
        if (type === 'password') {
            const nameLower = name.toLowerCase();
            if (nameLower.includes('new') || nameLower.includes('confirm')) {
                return 'new-password';
            }
            return 'current-password';
        }
        if (type === 'tel') return 'tel';
        if (name.toLowerCase().includes('username')) return 'username';
        if (name.toLowerCase().includes('name')) {
            if (name.toLowerCase().includes('first')) return 'given-name';
            if (name.toLowerCase().includes('last')) return 'family-name';
            return 'name';
        }
        
        return undefined;
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const currentError = fieldState?.error?.message;
                const errorStyles = currentError 
                    ? errorBorderColor 
                    : `${defaultBorderColor} ${normalFocusColor}`;
                const finalStyles = `${baseInputStyles} ${errorStyles} ${className}`;
                
                const inputValue = field.value ?? '';
                const autoCompleteValue = getAutoComplete();
                
                return (
                    <InputLayout label={label} name={name} error={currentError}>
                        <input
                            type={type}
                            id={name}
                            name={name}
                            {...field}
                            value={inputValue}
                            placeholder={placeholder}
                            className={finalStyles}
                            autoComplete={autoCompleteValue}
                            {...rest}
                        />
                    </InputLayout>
                );
            }}
        />
    );
};

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
    autoComplete: PropTypes.string,
};

export default Input;
