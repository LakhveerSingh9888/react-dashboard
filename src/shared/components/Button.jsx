import React from 'react';
import { Button as PrimeButton } from 'primereact/button';
import { classNames } from 'primereact/utils';

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

export const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variantProps = variantMap[variant] || {};
    const primeSize = sizeMap[size];

    return (
      <PrimeButton
        ref={ref}
        size={primeSize}
        className={classNames(className)}
        {...variantProps}
        {...props}
      >
        {children}
      </PrimeButton>
    );
  },
);

Button.displayName = 'Button';
