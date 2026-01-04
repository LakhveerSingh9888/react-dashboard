import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const Toggle = ({
    name,
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
                    <label className="flex items-center justify-between cursor-pointer">
                        {label && (
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {label}
                            </span>
                        )}
                        <div className="relative">
                            <input
                                type="checkbox"
                                id={name}
                                name={name}
                                checked={field.value || false}
                                onChange={(e) => field.onChange(e.target.checked)}
                                onBlur={field.onBlur}
                                className="sr-only peer"
                                {...rest}
                            />
                            <div className={`w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${fieldState?.error ? 'ring-2 ring-red-500' : ''
                                }`}></div>
                        </div>
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

Toggle.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    // React Hook Form props (required)
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
};

export default Toggle;
