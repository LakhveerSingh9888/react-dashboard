import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '@store/slices/authSlice';
import { useLoginMutation } from '@store/api/authApi';
import { Input } from '@components/common/forms';

const Login = () => {
    const [formError, setFormError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [login, { isLoading }] = useLoginMutation();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        setFormError('');
        try {
            const userData = await login({
                ...data,
                showSuccessToast: false, // Form handles success by navigating
                showErrorToast: false,    // Form handles errors with custom UI
            }).unwrap();
            dispatch(setCredentials(userData));
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.data?.message || 'Login failed';
            // Set form-level error
            setFormError(errorMessage);
            // Or set field-specific errors if API returns them
            if (err.data?.errors) {
                Object.keys(err.data.errors).forEach((field) => {
                    setError(field, {
                        type: 'server',
                        message: err.data.errors[field]
                    });
                });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">{t('login')}</h2>

            {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                    {formError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label={t('email')}
                    name="email"
                    type="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address'
                        }
                    }}
                    placeholder="admin@example.com"
                />

                <Input
                    label={t('password')}
                    name="password"
                    type="password"
                    control={control}
                    rules={{
                        required: 'Password is required'
                    }}
                    placeholder="password"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                    {isLoading ? 'Loading...' : t('signIn')}
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Hint: admin@example.com / password
            </div>
        </div>
    );
};

export default Login;
