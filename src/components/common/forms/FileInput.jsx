import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import InputLayout from './InputLayout';

const FileInput = ({
    name,
    label,
    accept,
    multiple = false,
    className = '',
    // React Hook Form props (required)
    control,
    rules,
    ...rest
}) => {
    const baseStyles = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-100";
    const defaultBorderColor = "border-gray-300 dark:border-gray-600";
    const errorBorderColor = "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900";
    const normalFocusColor = "focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-900 dark:bg-gray-800 dark:text-white";

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange: fieldOnChange, onBlur, name: fieldName }, fieldState }) => {
                const currentError = fieldState?.error?.message;
                const errorStyles = currentError 
                    ? errorBorderColor 
                    : `${defaultBorderColor} ${normalFocusColor}`;
                const fileInputStyles = `${baseStyles} ${errorStyles} ${className}`;

                return (
                    <InputLayout label={label} name={name} error={currentError}>
                        <input
                            type="file"
                            id={name}
                            name={fieldName}
                            onChange={(e) => {
                                const files = e.target.files;
                                fieldOnChange(multiple ? files : files?.[0] || undefined);
                            }}
                            onBlur={onBlur}
                            accept={accept}
                            multiple={multiple}
                            className={fileInputStyles}
                            {...rest}
                        />
                    </InputLayout>
                );
            }}
        />
    );
};

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    className: PropTypes.string,
    // React Hook Form props (required)
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
};

export default FileInput;
