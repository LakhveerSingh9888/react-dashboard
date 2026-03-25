import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '@features/auth/slice';
import { useLoginMutation } from '@features/auth/api';
import { Input } from '@shared/components/forms';

export const LoginForm = () => {
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit, setError } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data) => {
    setFormError('');
    try {
      const userData = await login({
        ...data,
        showSuccessToast: false,
        showErrorToast: false,
      }).unwrap();
      dispatch(setCredentials(userData));
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.data?.message || 'Login failed';
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
        label="Email"
        name="email"
        type="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
        }}
        placeholder="admin@example.com"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        control={control}
        rules={{ required: 'Password is required' }}
        placeholder="password"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};
