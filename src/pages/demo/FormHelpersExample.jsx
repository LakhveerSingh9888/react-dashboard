import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Select, Checkbox, Radio, Toggle, FileInput, MultiSelect } from '@components/common/forms';

const FormHelpersExample = () => {
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingInterests, setLoadingInterests] = useState(false);
    const [countryOptions, setCountryOptions] = useState([]);
    const [interestOptions, setInterestOptions] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            // Flat fields
            email: '',
            username: '',
            password: '',
            bio: '',
            country: '',
            terms: false,
            gender: '',
            notifications: false,
            file: undefined,
            interests: [],
            // Nested objects example
            user: {
                firstName: '',
                lastName: '',
                age: '',
            },
            address: {
                street: '',
                city: '',
                zipCode: '',
                country: '',
            },
            preferences: {
                theme: 'light',
                language: 'en',
                notifications: false,
            },
        }
    });

    // Watch form data for display
    const formData = watch();

    const onSubmit = (data) => {
        alert('Form submitted successfully!');
        console.log('Form data:', data);
    };

    // Simulate API call for countries
    useEffect(() => {
        const fetchCountries = async () => {
            setLoadingCountries(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            setCountryOptions([
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada', disabled: true },
                { value: 'au', label: 'Australia', disabled: true },
                { value: 'in', label: 'India' },
            ]);
            setLoadingCountries(false);
        };
        fetchCountries();
    }, []);

    // Simulate API call for interests
    useEffect(() => {
        const fetchInterests = async () => {
            setLoadingInterests(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            setInterestOptions([
                { value: 'coding', label: 'Coding' },
                { value: 'design', label: 'Design' },
                { value: 'music', label: 'Music' },
                { value: 'sports', label: 'Sports' },
                { value: 'travel', label: 'Travel' },
                { value: 'reading', label: 'Reading', disabled: true },
            ]);
            setLoadingInterests(false);
        };
        fetchInterests();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
             {loadingCountries && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                                Loading form data...
                            </p>
                        </div>
                    </div>
                )}
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Form Helpers Example
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Using <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">React Hook Form</code> with Controller integrated in components
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Text Inputs */}
                   
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Text Inputs</h2>
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
                            placeholder="Enter your email"
                        />

                        <Input
                            label="Username"
                            name="username"
                            control={control}
                            rules={{
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters'
                                }
                            }}
                            placeholder="Min 3 characters"
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            }}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Textarea */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Textarea</h2>
                        <Textarea
                            label="Bio"
                            name="bio"
                            control={control}
                            rules={{
                                required: 'Bio is required',
                                minLength: {
                                    value: 10,
                                    message: 'Bio must be at least 10 characters'
                                }
                            }}
                            placeholder="Min 10 characters"
                            rows={4}
                        />
                    </div>

                    {/* Select with Loading */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Select (with Loading State)</h2>
                        <Select
                            label="Country"
                            name="country"
                            control={control}
                            rules={{
                                required: 'Please select a country'
                            }}
                            options={countryOptions}
                            placeholder="Select your country"
                            loading={loadingCountries}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {loadingCountries ? 'Loading countries from API...' : `${countryOptions.length} countries loaded`}
                        </p>
                    </div>

                    {/* MultiSelect with Loading */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">MultiSelect (with Loading State)</h2>
                        <MultiSelect
                            label="Interests"
                            name="interests"
                            control={control}
                            options={interestOptions}
                            placeholder="Select your interests"
                            loading={loadingInterests}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {loadingInterests ? 'Loading interests from API...' : `${interestOptions.length} interests loaded`}
                        </p>
                    </div>

                    {/* Checkbox */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Checkbox</h2>
                        <Checkbox
                            name="terms"
                            control={control}
                            rules={{
                                required: 'You must accept the terms',
                                validate: (value) => value === true || 'You must accept the terms'
                            }}
                            label="I accept the terms and conditions"
                        />
                    </div>

                    {/* Radio Buttons */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Radio Buttons</h2>
                        <div className="space-y-2">
                            <Radio
                                name="gender"
                                value="male"
                                control={control}
                                rules={{ required: 'Please select a gender' }}
                                label="Male"
                            />
                            <Radio
                                name="gender"
                                value="female"
                                control={control}
                                rules={{ required: 'Please select a gender' }}
                                label="Female"
                            />
                            <Radio
                                name="gender"
                                value="other"
                                control={control}
                                rules={{ required: 'Please select a gender' }}
                                label="Other"
                            />
                        </div>
                    </div>

                    {/* Toggle */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Toggle</h2>
                        <Toggle
                            name="notifications"
                            control={control}
                            label="Enable notifications"
                        />
                    </div>

                    {/* File Input */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">File Input</h2>
                        <FileInput
                            label="Upload File"
                            name="file"
                            control={control}
                            accept="image/*,.pdf"
                        />
                    </div>

                    {/* Nested Objects Example */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Nested Objects - User Info</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                name="user.firstName"
                                control={control}
                                rules={{
                                    required: 'First name is required'
                                }}
                                placeholder="Enter first name"
                            />
                            <Input
                                label="Last Name"
                                name="user.lastName"
                                control={control}
                                rules={{
                                    required: 'Last name is required'
                                }}
                                placeholder="Enter last name"
                            />
                            <Input
                                label="Age"
                                name="user.age"
                                type="number"
                                control={control}
                                rules={{
                                    required: 'Age is required',
                                    min: {
                                        value: 18,
                                        message: 'Must be at least 18 years old'
                                    }
                                }}
                                placeholder="Enter age"
                            />
                        </div>
                    </div>

                    {/* Nested Objects - Address */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Nested Objects - Address</h2>
                        <Input
                            label="Street"
                            name="address.street"
                            control={control}
                            rules={{
                                required: 'Street is required'
                            }}
                            placeholder="Enter street address"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="City"
                                name="address.city"
                                control={control}
                                rules={{
                                    required: 'City is required'
                                }}
                                placeholder="Enter city"
                            />
                            <Input
                                label="Zip Code"
                                name="address.zipCode"
                                control={control}
                                rules={{
                                    required: 'Zip code is required'
                                }}
                                placeholder="Enter zip code"
                            />
                        </div>
                        <Select
                            label="Country"
                            name="address.country"
                            control={control}
                            rules={{
                                required: 'Please select a country'
                            }}
                            options={countryOptions}
                            placeholder="Select country"
                        />
                    </div>

                    {/* Nested Objects - Preferences */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Nested Objects - Preferences</h2>
                        <Select
                            label="Theme"
                            name="preferences.theme"
                            control={control}
                            options={[
                                { value: 'light', label: 'Light' },
                                { value: 'dark', label: 'Dark' },
                                { value: 'auto', label: 'Auto' },
                            ]}
                            placeholder="Select theme"
                        />
                        <Select
                            label="Language"
                            name="preferences.language"
                            control={control}
                            options={[
                                { value: 'en', label: 'English' },
                                { value: 'es', label: 'Spanish' },
                                { value: 'fr', label: 'French' },
                            ]}
                            placeholder="Select language"
                        />
                        <Toggle
                            name="preferences.notifications"
                            control={control}
                            label="Enable notifications"
                        />
                    </div>

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

export default FormHelpersExample;

