import React from 'react';

export const createHandleChange = (setData, options = {}) => {
    const { clearErrors = true } = options;

    return (e) => {
        const { name, value, type, checked, files } = e.target;

        let newValue;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (type === 'file') {
            newValue = files?.[0] || null;
        } else {
            newValue = value;
        }

        setData((prev) => {
            const updated = { ...prev, [name]: newValue };
            if (clearErrors && prev.errors?.[name]) {
                updated.errors = { ...prev.errors, [name]: '' };
            }
            return updated;
        });
    };
};

export const validateForm = (data, rules) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
        const rule = rules[field];
        const value = data[field];

        if (rule.required && !value) {
            errors[field] = rule.message || `${field} is required`;
            return;
        }

        if (!value) return;

        if (rule.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors[field] = rule.message || 'Invalid email address';
        }

        if (rule.minLength && value.length < rule.minLength) {
            errors[field] = rule.message || `Minimum ${rule.minLength} characters required`;
        }

        if (rule.maxLength && value.length > rule.maxLength) {
            errors[field] = rule.message || `Maximum ${rule.maxLength} characters allowed`;
        }

        if (rule.validate && typeof rule.validate === 'function') {
            const customError = rule.validate(value, data);
            if (customError) errors[field] = customError;
        }
    });

    return errors;
};

export const useForm = (initialData, validationRules = {}) => {
    const [data, setData] = React.useState(initialData);

    const handleChange = React.useMemo(() => createHandleChange(setData), []);

    const setErrors = React.useCallback((errors) => {
        setData((prev) => ({ ...prev, errors }));
    }, []);

    const handleSubmit = React.useCallback(
        (onSubmit) => (e) => {
            e.preventDefault();

            if (Object.keys(validationRules).length > 0) {
                const errors = validateForm(data, validationRules);
                if (Object.keys(errors).length > 0) {
                    setErrors(errors);
                    return;
                }
            }

            const { errors: _, ...cleanData } = data;
            onSubmit(cleanData);
        },
        [data, validationRules, setErrors]
    );

    const resetForm = React.useCallback(() => {
        setData(initialData);
    }, [initialData]);

    return { data, setData, handleChange, handleSubmit, setErrors, resetForm };
};
