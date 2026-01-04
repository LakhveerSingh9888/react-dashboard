import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Select } from '@components/common/forms';

const DataPropExample = () => {
    const {
        control,
        handleSubmit,
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            username: '',
            bio: '',
            country: '',
        }
    });

    // Watch form data for display
    const formData = watch();

    const onSubmit = (data) => {
        alert('Form submitted successfully!');
        console.log('Form data:', data);
    };

    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Data Prop Example
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Email"
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
                    />

                    <Input
                        label="Username"
                        name="username"
                        control={control}
                        rules={{
                            required: 'Username is required'
                        }}
                    />

                    <Textarea
                        label="Bio"
                        name="bio"
                        control={control}
                        rules={{
                            required: 'Bio is required'
                        }}
                        rows={3}
                    />

                    <Select
                        label="Country"
                        name="country"
                        control={control}
                        rules={{
                            required: 'Country is required'
                        }}
                        options={countryOptions}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Submit
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        Form Data:
                    </h2>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm overflow-auto text-gray-800 dark:text-gray-200">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default DataPropExample;

