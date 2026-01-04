import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Select, Checkbox, Radio, Toggle, FileInput, MultiSelect } from '@components/common/forms';
import { Modal, ConfirmationModal } from '@components/common/modals';

const FormDemo = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            username: '',
            email: '',
            password: '',
            bio: '',
            country: '',
            terms: false,
            gender: '',
            notifications: false,
            file: null,
            interests: [],
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        { value: 'au', label: 'Australia' },
        { value: 'in', label: 'India' },
    ];

    const interestOptions = [
        { value: 'coding', label: 'Coding' },
        { value: 'design', label: 'Design' },
        { value: 'music', label: 'Music' },
        { value: 'sports', label: 'Sports' },
        { value: 'travel', label: 'Travel' },
        { value: 'reading', label: 'Reading' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Form Components Demo</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Input Components */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Text Inputs</h2>
                        <Input
                            label="Username"
                            name="username"
                            control={control}
                            rules={{ required: 'Username is required' }}
                            placeholder="Enter your username"
                        />

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
                            label="Password"
                            name="password"
                            type="password"
                            control={control}
                            rules={{ required: 'Password is required' }}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Textarea */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Textarea</h2>
                        <Textarea
                            label="Bio"
                            name="bio"
                            control={control}
                            rules={{ required: 'Bio is required' }}
                            placeholder="Tell us about yourself"
                            rows={4}
                        />
                    </div>

                    {/* Select */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select</h2>
                        <Select
                            label="Country"
                            name="country"
                            control={control}
                            rules={{ required: 'Please select a country' }}
                            options={countryOptions}
                            placeholder="Select your country"
                        />
                    </div>

                    {/* MultiSelect */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">MultiSelect</h2>
                        <MultiSelect
                            label="Interests"
                            name="interests"
                            control={control}
                            options={interestOptions}
                            placeholder="Select your interests"
                        />
                    </div>

                    {/* Checkbox */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Checkbox</h2>
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

                    {/* Radio */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Radio Buttons</h2>
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
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Toggle</h2>
                        <Toggle
                            name="notifications"
                            control={control}
                            label="Enable notifications"
                        />
                    </div>

                    {/* File Input */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">File Input</h2>
                        <FileInput
                            label="Upload File"
                            name="file"
                            control={control}
                            accept="image/*,.pdf"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Submit
                    </button>
                </form>

                {/* Modal Demos */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Modals</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            Open Generic Modal
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            Open Delete Modal
                        </button>
                    </div>
                </div>

                {/* Generic Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Example Modal"
                    footer={
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                        >
                            Close
                        </button>
                    }
                >
                    <p>This is a generic modal component. It can contain any content.</p>
                </Modal>

                {/* Delete Confirmation Modal */}
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => {
                        alert('Item deleted!');
                        setIsDeleteModalOpen(false);
                    }}
                    title="Delete Item"
                    message="Are you sure you want to delete this item? This action cannot be undone."
                    confirmText="Delete"
                    type="danger"
                />

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Current State:</h2>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm overflow-auto text-gray-800 dark:text-gray-200">
                        {JSON.stringify({
                            ...formData,
                            file: formData.file ? (formData.file.name || formData.file) : null
                        }, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default FormDemo;

