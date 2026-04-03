import { forwardRef } from 'react';
import { Button as PrimeButton } from 'primereact/button';
import { cn } from '@shared/utils/cn';

const variantMap = {
  default: {},
  ghost: { text: true },
  outline: { outlined: true },
  destructive: { severity: 'danger' },
  secondary: { severity: 'secondary' },
  success: { severity: 'success' },
};

const sizeMap = {
  sm: 'small',
  md: null,
  lg: 'large',
};

export const Button = forwardRef(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variantProps = variantMap[variant] || {};
    const primeSize = sizeMap[size];

    return (
      <PrimeButton
        ref={ref}
        size={primeSize}
        className={cn(className)}
        {...variantProps}
        {...props}
      >
        {children}
      </PrimeButton>
    );
  },
);

Button.displayName = 'Button';
