/**
 * Creates a reusable handleChange function for form inputs
 * Works with the data prop pattern where state contains values and errors
 * 
 * @param {Function} setData - State setter function
 * @param {Object} options - Configuration options
 * @param {boolean} options.clearErrors - Whether to clear errors on change (default: true)
 * @returns {Function} handleChange function
 * 
 * @example
 * const [data, setData] = useState({ email: '', errors: {} });
 * const handleChange = createHandleChange(setData);
 * 
 * <Input name="email" data={data} onChange={handleChange} />
 */
export const createHandleChange = (setData, options = {}) => {
    const { clearErrors = true } = options;

    return (e) => {
        const { name, value, type, checked, files } = e.target;

        // Determine the new value based on input type
        let newValue;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (type === 'file') {
            newValue = files?.[0] || null;
        } else {
            newValue = value;
        }

        setData((prev) => {
            const updated = {
                ...prev,
                [name]: newValue,
            };

            // Clear error for this field if clearErrors is true
            if (clearErrors && prev.errors?.[name]) {
                updated.errors = {
                    ...prev.errors,
                    [name]: '',
                };
            }

            return updated;
        });
    };
};

/**
 * Validates form data and returns errors object
 * 
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} errors object
 * 
 * @example
 * const rules = {
 *   email: { required: true, type: 'email' },
 *   username: { required: true, minLength: 3 }
 * };
 * const errors = validateForm(data, rules);
 */
export const validateForm = (data, rules) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
        const rule = rules[field];
        const value = data[field];

        // Required validation
        if (rule.required && !value) {
            errors[field] = rule.message || `${field} is required`;
            return;
        }

        // Skip other validations if field is empty and not required
        if (!value) return;

        // Email validation
        if (rule.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors[field] = rule.message || 'Invalid email address';
        }

        // Min length validation
        if (rule.minLength && value.length < rule.minLength) {
            errors[field] = rule.message || `Minimum ${rule.minLength} characters required`;
        }

        // Max length validation
        if (rule.maxLength && value.length > rule.maxLength) {
            errors[field] = rule.message || `Maximum ${rule.maxLength} characters allowed`;
        }

        // Custom validation function
        if (rule.validate && typeof rule.validate === 'function') {
            const customError = rule.validate(value, data);
            if (customError) {
                errors[field] = customError;
            }
        }
    });

    return errors;
};

/**
 * Custom hook for form management with data prop pattern
 * 
 * @param {Object} initialData - Initial form data
 * @param {Object} validationRules - Validation rules (optional)
 * @returns {Object} Form state and handlers
 * 
 * @example
 * const { data, handleChange, handleSubmit, setErrors } = useForm({
 *   email: '',
 *   username: '',
 *   errors: {}
 * }, {
 *   email: { required: true, type: 'email' },
 *   username: { required: true, minLength: 3 }
 * });
 */
export const useForm = (initialData, validationRules = {}) => {
    const [data, setData] = React.useState(initialData);

    const handleChange = React.useMemo(
        () => createHandleChange(setData),
        []
    );

    const setErrors = React.useCallback((errors) => {
        setData((prev) => ({ ...prev, errors }));
    }, []);

    const handleSubmit = React.useCallback(
        (onSubmit) => (e) => {
            e.preventDefault();

            // Validate if rules are provided
            if (Object.keys(validationRules).length > 0) {
                const errors = validateForm(data, validationRules);

                if (Object.keys(errors).length > 0) {
                    setErrors(errors);
                    return;
                }
            }

            // Call the onSubmit callback with clean data (without errors)
            const { errors: _, ...cleanData } = data;
            onSubmit(cleanData);
        },
        [data, validationRules, setErrors]
    );

    const resetForm = React.useCallback(() => {
        setData(initialData);
    }, [initialData]);

    return {
        data,
        setData,
        handleChange,
        handleSubmit,
        setErrors,
        resetForm,
    };
};

// For non-hook usage
import React from 'react';
