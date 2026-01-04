import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { ChevronDown, Check, X } from 'lucide-react';
import InputLayout from './InputLayout';
import useClickOutside from '@hooks/useClickOutside';

// Internal component that handles the UI and state
const MultiSelectUI = ({
    value = [],
    onChange,
    error,
    options = [],
    label,
    placeholder = 'Select options',
    className = '',
    disabled = false,
    loading = false,
    name,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useClickOutside(containerRef, () => setIsOpen(false));

    const currentValues = value || [];
    const currentError = error;

    const handleToggle = (optionValue) => {
        if (disabled || loading) return;
        
        // Check if the option is disabled
        const option = options.find(o => o.value === optionValue);
        if (option?.disabled) return;

        const newValues = currentValues.includes(optionValue)
            ? currentValues.filter(v => v !== optionValue)
            : [...currentValues, optionValue];

        onChange(newValues);
    };

    const handleSelectAll = () => {
        if (disabled || loading) return;

        // Only include non-disabled options
        const enabledOptions = options.filter(o => !o.disabled);
        const allValues = enabledOptions.map(o => o.value);
        const isAllSelected = allValues.length > 0 && allValues.every(v => currentValues.includes(v));

        const newValues = isAllSelected ? [] : allValues;
        onChange(newValues);
    };

    const removeValue = (e, valToRemove) => {
        e.stopPropagation();
        if (disabled || loading) return;
        const newValues = currentValues.filter(v => v !== valToRemove);
        onChange(newValues);
    };

    const selectedLabels = useMemo(() => {
        return options
            .filter(o => currentValues.includes(o.value))
            .map(o => o.label);
    }, [options, currentValues]);

    // Only check enabled options for "Select All"
    const enabledOptions = options.filter(o => !o.disabled);
    const isAllSelected = enabledOptions.length > 0 && enabledOptions.every(o => currentValues.includes(o.value));

    // Styles
    const baseStyles = "w-full min-h-[42px] px-3 py-2 border rounded-md shadow-sm flex items-center justify-between cursor-pointer transition-colors duration-200 bg-white dark:bg-gray-800";
    const defaultBorderColor = "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500";
    const errorBorderColor = "border-red-500 dark:border-red-500 ring-1 ring-red-500";
    const focusStyles = isOpen ? "ring-2 ring-blue-500 border-blue-500 dark:ring-blue-600 dark:border-blue-600" : "";
    const disabledStyles = disabled || loading ? "opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900" : "";
    const loadingStyles = loading ? "cursor-wait" : "";

    const containerClasses = `
        ${baseStyles}
        ${currentError ? errorBorderColor : defaultBorderColor}
        ${focusStyles}
        ${disabledStyles}
        ${loadingStyles}
        ${className}
    `;

    return (
        <InputLayout label={label} name={name} error={currentError}>
            <div className="relative" ref={containerRef}>
                {/* Hidden input for form association and accessibility */}
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={currentValues.join(',')}
                    readOnly
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
                />
                {/* Trigger */}
                <div
                    id={`${name}-trigger`}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={`${name}-listbox`}
                    aria-labelledby={`${name}-label`}
                    className={containerClasses}
                    onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (!disabled && !loading) setIsOpen(!isOpen);
                        }
                    }}
                    tabIndex={disabled || loading ? -1 : 0}
                >
                    <div className="flex flex-wrap gap-1.5 flex-1 pr-2">
                        {loading ? (
                            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-300 border-t-blue-600"></div>
                                Loading options...
                            </span>
                        ) : currentValues.length === 0 ? (
                            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
                        ) : (
                            currentValues.length > 3 ? (
                                <span className="text-gray-900 dark:text-gray-100 font-medium">
                                    {currentValues.length} selected
                                </span>
                            ) : (
                                selectedLabels.map((labelText, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                                    >
                                        {labelText}
                                        <button
                                            type="button"
                                            onClick={(e) => removeValue(e, options.find(o => o.label === labelText)?.value)}
                                            className="ml-1 hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))
                            )
                        )}
                    </div>
                    {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                    ) : (
                        <ChevronDown
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                        />
                    )}
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div 
                        id={`${name}-listbox`}
                        role="listbox"
                        aria-label={label || 'Select options'}
                        className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100"
                    >
                        {options.length > 0 && (
                            <div
                                className="px-3 py-2 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer flex items-center gap-2"
                                onClick={handleSelectAll}
                            >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isAllSelected
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-gray-300 dark:border-gray-600'
                                    }`}>
                                    {isAllSelected && <Check size={12} className="text-white" />}
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Select All
                                </span>
                            </div>
                        )}

                        {options.map((option) => {
                            const isSelected = currentValues.includes(option.value);
                            const isOptionDisabled = option.disabled || false;
                            return (
                                <div
                                    key={option.value}
                                    className={`px-3 py-2 flex items-center gap-2 ${
                                        isOptionDisabled 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer'
                                    }`}
                                    onClick={() => !isOptionDisabled && handleToggle(option.value)}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                        isSelected
                                            ? 'bg-blue-600 border-blue-600'
                                            : isOptionDisabled
                                            ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700'
                                            : 'border-gray-300 dark:border-gray-600'
                                    }`}>
                                        {isSelected && <Check size={12} className="text-white" />}
                                    </div>
                                    <span className={`text-sm ${
                                        isSelected 
                                            ? 'text-gray-900 dark:text-white font-medium' 
                                            : isOptionDisabled
                                            ? 'text-gray-400 dark:text-gray-500'
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                        {option.label}
                                    </span>
                                </div>
                            );
                        })}

                        {loading && (
                            <div className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                                    Loading options...
                                </div>
                            </div>
                        )}
                        {!loading && options.length === 0 && (
                            <div className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                No options available
                            </div>
                        )}
                    </div>
                )}
            </div>
        </InputLayout>
    );
};

const MultiSelect = ({
    name,
    options = [],
    label,
    placeholder = 'Select options',
    className = '',
    disabled = false,
    loading = false,
    // React Hook Form props (required)
    control,
    rules,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <MultiSelectUI
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState?.error?.message}
                    options={options}
                    label={label}
                    placeholder={placeholder}
                    className={className}
                    disabled={disabled}
                    loading={loading}
                    name={name}
                />
            )}
        />
    );
};

MultiSelect.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
        })
    ).isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    // React Hook Form props (required)
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
};

export default MultiSelect;
