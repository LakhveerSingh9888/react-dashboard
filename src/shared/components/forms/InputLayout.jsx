import React from 'react';
import PropTypes from 'prop-types';

const InputLayout = ({ label, name, error, children, className = '' }) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && name && (
                <label
                    id={`${name}-label`}
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    {label}
                </label>
            )}
            {label && !name && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {label}
                </span>
            )}
            <div className="relative">
                {children}
            </div>
            {error && (
                <span className="text-xs text-red-500 dark:text-red-400 mt-1">
                    {error}
                </span>
            )}
        </div>
    );
};

InputLayout.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default InputLayout;
