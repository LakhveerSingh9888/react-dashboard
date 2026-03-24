import React from 'react';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

export const Input = React.forwardRef(
    ({ className, type = 'text', ...props }, ref) => {
        return (
            <InputText
                ref={ref}
                type={type}
                className={classNames('w-full', className)}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';
