import React from 'react';
import { Controller } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';

const FormToggle = ({
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
                    <div className="flex items-center justify-between">
                        {label && (
                            <label
                                htmlFor={name}
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                            >
                                {label}
                            </label>
                        )}
                        <InputSwitch
                            inputId={name}
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.value)}
                            invalid={!!fieldState.error}
                            {...props}
                        />
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

export default FormToggle;
