import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '@features/auth/api';
import { Input } from '@shared/components/forms';

export const RegisterForm = () => {
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const { control, handleSubmit, setError, watch } = useForm({
        mode: 'onBlur',
        defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    });

    const password = watch('password');

    const onSubmit = async (data) => {
        setFormError('');
        try {
            await register({
                name: data.name,
                email: data.email,
                password: data.password,
                showSuccessToast: true,
                showErrorToast: false,
            }).unwrap();
            navigate('/login');
        } catch (err) {
            const errorMessage = err.data?.message || 'Registration failed';
            setFormError(errorMessage);
            if (err.data?.errors) {
                Object.keys(err.data.errors).forEach((field) => {
                    setError(field, { type: 'server', message: err.data.errors[field] });
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                    {formError}
                </div>
            )}
            <Input
                label="Full Name"
                name="name"
                type="text"
                control={control}
                rules={{ required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } }}
                placeholder="John Doe"
            />
            <Input
                label="Email"
                name="email"
                type="email"
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                }}
                placeholder="john@example.com"
            />
            <Input
                label="Password"
                name="password"
                type="password"
                control={control}
                rules={{ required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } }}
                placeholder="••••••••"
            />
            <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                control={control}
                rules={{
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                }}
                placeholder="••••••••"
            />
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
                {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:underline">Sign In</Link>
            </p>
        </form>
    );
};
