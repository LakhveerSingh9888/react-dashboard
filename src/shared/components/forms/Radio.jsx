import React from 'react';
import { Controller } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';

const FormRadio = ({
    name,
    value,
    label,
    rules,
    control,
    className = '',
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={`flex items-center gap-2 ${className}`}>
                    <RadioButton
                        inputId={`${name}-${value}`}
                        value={value}
                        checked={field.value === value}
                        onChange={(e) => field.onChange(e.value)}
                        invalid={!!fieldState.error}
                        {...props}
                    />
                    {label && (
                        <label
                            htmlFor={`${name}-${value}`}
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                        >
                            {label}
                        </label>
                    )}
                </div>
            )}
        />
    );
};

export default FormRadio;
