import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const Radio = ({
    name,
    value,
    label,
    className = '',
    // React Hook Form props (required)
    control,
    rules,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={`flex flex-col gap-1.5 ${className}`}>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            id={`${name}-${value}`}
                            name={name}
                            value={value}
                            checked={field.value === value}
                            onChange={() => field.onChange(value)}
                            onBlur={field.onBlur}
                            className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-600 transition-colors duration-200 ${fieldState?.error ? 'border-red-500 dark:border-red-500' : ''
                                }`}
                            {...rest}
                        />
                        {label && (
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {label}
                            </span>
                        )}
                    </label>
                    {fieldState?.error?.message && (
                        <span className="text-xs text-red-500 dark:text-red-400 mt-1">
                            {fieldState?.error?.message}
                        </span>
                    )}
                </div>
            )}
        />
    );
};

Radio.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    // React Hook Form props (required)
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
};

export default Radio;
