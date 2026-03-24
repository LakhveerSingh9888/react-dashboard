import React from 'react';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

const severityMap = {
    default: null,
    secondary: 'secondary',
    destructive: 'danger',
    success: 'success',
    warning: 'warning',
    info: 'info',
};

export const Badge = ({ className, variant = 'info', children, value, ...props }) => {
    const severity = severityMap[variant] ?? null;

    return (
        <Tag
            severity={severity}
            value={value ?? children}
            className={classNames(className)}
            {...props}
        />
    );
};
