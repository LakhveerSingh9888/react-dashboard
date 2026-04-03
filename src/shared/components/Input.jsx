import { forwardRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { cn } from '@shared/utils/cn';

export const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return <InputText ref={ref} type={type} className={cn('w-full', className)} {...props} />;
});

Input.displayName = 'Input';
