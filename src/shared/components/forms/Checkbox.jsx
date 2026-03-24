import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';

const FormCheckbox = ({
    name,
    control,
    label,
    rules,
    className = '',
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={`flex flex-col gap-1.5 ${className}`}>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            inputId={name}
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.checked)}
                            invalid={!!fieldState.error}
                            {...props}
                        />
                        {label && (
                            <label
                                htmlFor={name}
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                            >
                                {label}
                            </label>
                        )}
                    </div>
                    {fieldState.error?.message && (
                        <span className="text-xs text-red-500 dark:text-red-400">
                            {fieldState.error.message}
                        </span>
                    )}
                </div>
            )}
        />
    );
};

export default FormCheckbox;
