import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import InputLayout from './InputLayout';

const Select = ({
    name,
    options = [],
    label,
    placeholder = 'Select an option',
    className = '',
    loading = false,
    // React Hook Form props (required)
    control,
    rules,
    ...rest
}) => {
    const baseStyles = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200";
    const defaultBorderColor = "border-gray-300 dark:border-gray-600";
    const errorBorderColor = "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900 dark:text-black";
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
                const loadingStyles = loading ? 'opacity-60 cursor-wait' : '';
                const selectStyles = `${baseStyles} ${errorStyles} ${loadingStyles} ${className}`;

                // Ensure value is always a string for controlled inputs (not null or undefined)
                const selectValue = field.value ?? '';

                return (
                    <InputLayout label={label} name={name} error={currentError}>
                        <div className="relative">
                            <select
                                id={name}
                                name={name}
                                {...field}
                                value={selectValue}
                                className={selectStyles}
                                disabled={loading}
                                {...rest}
                            >
                                {placeholder && (
                                    <option value="" disabled>
                                        {loading ? 'Loading options...' : placeholder}
                                    </option>
                                )}
                                {loading ? (
                                    <option value="" disabled>
                                        Loading...
                                    </option>
                                ) : (
                                    options.map((option, index) => (
                                        <option 
                                            key={option.value || index} 
                                            value={option.value}
                                            disabled={option.disabled || false}
                                        >
                                            {option.label}
                                        </option>
                                    ))
                                )}
                            </select>
                            {loading && (
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                                </div>
                            )}
                        </div>
                    </InputLayout>
                );
            }}
        />
    );
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
        })
    ).isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    loading: PropTypes.bool,
    // React Hook Form props (required)
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
};

export default Select;
