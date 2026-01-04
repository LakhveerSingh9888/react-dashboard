import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import InputLayout from './InputLayout';

const getAutoComplete = (name, autoComplete) => {
    if (autoComplete !== undefined) return autoComplete;
    
    const nameLower = name?.toLowerCase() || '';
    if (nameLower.includes('address')) return 'street-address';
    if (nameLower.includes('city')) return 'address-level2';
    if (nameLower.includes('state') || nameLower.includes('province')) return 'address-level1';
    if (nameLower.includes('zip') || nameLower.includes('postal')) return 'postal-code';
    if (nameLower.includes('country')) return 'country';
    if (nameLower.includes('comment') || nameLower.includes('message') || nameLower.includes('description')) return 'off';
    
    return undefined;
};

const Textarea = ({
    name,
    placeholder,
    label,
    rows = 4,
    className = '',
    autoComplete,
    // React Hook Form props (required)
    control,
    rules,
    ...rest
}) => {
    const baseStyles = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200 resize-y";
    const defaultBorderColor = "border-gray-300 dark:border-gray-600";
    const errorBorderColor = "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900";
    const normalFocusColor = "focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-900 dark:bg-gray-800 dark:text-white";

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
                const textareaStyles = `${baseStyles} ${errorStyles} ${className}`;

                // Ensure value is always a string for controlled inputs (not null or undefined)
                const textareaValue = field.value ?? '';

                const autoCompleteValue = getAutoComplete(name, autoComplete);
                
                return (
                    <InputLayout label={label} name={name} error={currentError}>
                        <textarea
                            id={name}
                            name={name}
                            {...field}
                            value={textareaValue}
                            placeholder={placeholder}
                            rows={rows}
                            className={textareaStyles}
                            autoComplete={autoCompleteValue}
                            {...rest}
                        />
                    </InputLayout>
                );
            }}
        />
    );
};

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    rows: PropTypes.number,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
    // React Hook Form props (required)
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
};

export default Textarea;
