import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Toggle,
  FileInput,
  MultiSelect,
} from '@shared/components/forms';
import { Button } from '@shared/components/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@shared/components/Card';

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

const categoryOptions = [
  { label: 'Technology', value: 'technology' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'HR', value: 'hr' },
];

const FormShowcasePage = () => {
  const { control, handleSubmit, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      bio: '',
      role: '',
      adminCode: '',
      categories: [],
      gender: '',
      agreeTerms: false,
      notifications: false,
      avatar: null,
    },
  });

  const selectedRole = watch('role');

  const onSubmit = (data) => {
    console.log('Form data:', data);
    toast.success('Form submitted successfully!');
  };

  const onReset = () => {
    reset();
    toast('Form reset', { icon: '🔄' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Form Inputs</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          All available form input components
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Text Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Text Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Name"
              name="name"
              control={control}
              rules={{ required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } }}
              placeholder="Enter your name"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              }}
              placeholder="user@example.com"
            />
            <Input
              label="Password"
              name="password.minPass"
              type="password"
              control={control}
              rules={{ required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } }}
              placeholder="Enter password"
            />
          </CardContent>
        </Card>

        {/* Textarea */}
        <Card>
          <CardHeader>
            <CardTitle>Textarea</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              label="Bio"
              name="bio"
              control={control}
              rules={{ maxLength: { value: 500, message: 'Max 500 characters' } }}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Select & MultiSelect */}
        <Card>
          <CardHeader>
            <CardTitle>Select & MultiSelect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Role"
              name="role"
              control={control}
              options={roleOptions}
              rules={{ required: 'Please select a role' }}
              placeholder="Choose a role"
            />
            {selectedRole === 'admin' && (
              <Input
                label="Admin Code"
                name="adminCode"
                control={control}
                rules={{ required: 'Admin code is required' }}
                placeholder="Enter admin access code"
              />
            )}
            <MultiSelect
              label="Categories"
              name="categories"
              control={control}
              options={categoryOptions}
              rules={{ required: 'Select at least one category' }}
              placeholder="Select categories"
            />
          </CardContent>
        </Card>

        {/* Radio Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Radio Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
              <div className="flex gap-6">
                <Radio name="gender" value="male" label="Male" control={control} rules={{ required: 'Please select gender' }} />
                <Radio name="gender" value="female" label="Female" control={control} rules={{ required: 'Please select gender' }} />
                <Radio name="gender" value="other" label="Other" control={control} rules={{ required: 'Please select gender' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkbox & Toggle */}
        <Card>
          <CardHeader>
            <CardTitle>Checkbox & Toggle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Checkbox
              label="I agree to the terms and conditions"
              name="agreeTerms"
              control={control}
              rules={{ required: 'You must agree to the terms' }}
            />
            <Toggle
              label="Enable notifications"
              name="notifications"
              control={control}
            />
          </CardContent>
        </Card>

        {/* File Input */}
        <Card>
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <FileInput
              label="Avatar"
              name="avatar"
              control={control}
              accept="image/*"
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormShowcasePage;
