import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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

const formOptions = {
  roles: [
    { name: 'Admin', value: 'admin' },
    { name: 'Editor', value: 'editor' },
    { name: 'Viewer', value: 'viewer' },
    { name: 'Moderator', value: 'moderator' },
    { name: 'Contributor', value: 'contributor' },
    { name: 'Super Admin', value: 'super_admin' },
  ],
  categories: [
    { name: 'Technology', value: 'technology' },
    { name: 'Design', value: 'design' },
    { name: 'Marketing', value: 'marketing' },
    { name: 'Finance', value: 'finance' },
    { name: 'HR', value: 'hr' },
    { name: 'Sales', value: 'sales' },
    { name: 'Engineering', value: 'engineering' },
    { name: 'Operations', value: 'operations' },
    { name: 'Legal', value: 'legal' },
    { name: 'Customer Support', value: 'customer_support' },
  ],
  genders: [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' },
  ],
  countries: [
    { name: 'United States', value: 'us' },
    { name: 'United Kingdom', value: 'uk' },
    { name: 'Canada', value: 'ca' },
    { name: 'Germany', value: 'de' },
    { name: 'France', value: 'fr' },
    { name: 'Australia', value: 'au' },
    { name: 'India', value: 'in' },
    { name: 'Japan', value: 'jp' },
  ],
  languages: [
    { name: 'English', value: 'english' },
    { name: 'Spanish', value: 'spanish' },
    { name: 'French', value: 'french' },
    { name: 'German', value: 'german' },
    { name: 'Arabic', value: 'arabic' },
    { name: 'Chinese', value: 'chinese' },
    { name: 'Hindi', value: 'hindi' },
  ],
  priorities: [
    { name: 'Low', value: 'low' },
    { name: 'Medium', value: 'medium' },
    { name: 'High', value: 'high' },
    { name: 'Critical', value: 'critical' },
  ],
  statuses: [
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Pending', value: 'pending' },
    { name: 'Suspended', value: 'suspended' },
  ],
  experience: [
    { name: 'Fresher', value: 'fresher' },
    { name: 'Junior (1-3 yrs)', value: 'junior' },
    { name: 'Mid (3-5 yrs)', value: 'mid' },
    { name: 'Senior (5-8 yrs)', value: 'senior' },
    { name: 'Lead (8+ yrs)', value: 'lead' },
  ],
};

const UserOrderFields = ({ control, userIndex, onRemoveUser, canRemove }) => {
  const {
    fields: orderFields,
    append: appendOrder,
    remove: removeOrder,
  } = useFieldArray({
    control,
    name: `users.${userIndex}.orders`,
  });

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          User {userIndex + 1}
        </h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemoveUser}
            className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400"
          >
            Remove User
          </button>
        )}
      </div>

      <Input
        label="User Name"
        name={`users.${userIndex}.name`}
        control={control}
        rules={{ required: 'User name is required' }}
        placeholder="Enter user name"
      />

      <div className="ml-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Orders</label>
          <button
            type="button"
            onClick={() => appendOrder({ orderId: '', amount: '' })}
            className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            + Add Order
          </button>
        </div>
        {orderFields.map((orderField, orderIndex) => (
          <div key={orderField.id} className="flex gap-3 items-start">
            <div className="flex-1">
              <Input
                label="Order ID"
                name={`users.${userIndex}.orders.${orderIndex}.orderId`}
                control={control}
                rules={{ required: 'Order ID is required' }}
                placeholder="101"
              />
            </div>
            <div className="flex-1">
              <Input
                label="Amount"
                name={`users.${userIndex}.orders.${orderIndex}.amount`}
                type="number"
                control={control}
                rules={{ required: 'Amount is required', min: { value: 1, message: 'Min 1' } }}
                placeholder="250"
              />
            </div>
            {orderFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeOrder(orderIndex)}
                className="mt-7 text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FormShowcasePage = () => {
  const { control, handleSubmit, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      website: '',
      bio: '',
      role: '',
      adminCode: '',
      categories: [],
      gender: '',
      country: '',
      languages: [],
      address: {
        street: '',
        city: '',
        zipCode: '',
      },
      priority: '',
      status: '',
      experience: '',
      salary: '',
      startDate: '',
      agreeTerms: false,
      notifications: false,
      newsletter: false,
      darkMode: false,
      avatar: null,
      resume: null,
      users: [{ name: '', orders: [{ orderId: '', amount: '' }] }],
    },
  });

  const selectedRole = watch('role');

  const {
    fields: userFields,
    append: appendUser,
    remove: removeUser,
  } = useFieldArray({
    control,
    name: 'users',
  });

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
        <p className="text-gray-500 dark:text-gray-400 mt-1">All available form input components</p>
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
              rules={{
                required: 'Name is required',
                minLength: { value: 2, message: 'Min 2 characters' },
              }}
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
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Min 6 characters' },
              }}
              placeholder="Enter password"
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              control={control}
              rules={{
                pattern: { value: /^[+]?[\d\s()-]{7,15}$/, message: 'Invalid phone number' },
              }}
              placeholder="+1 (555) 123-4567"
            />
            <Input
              label="Website"
              name="website"
              type="url"
              control={control}
              rules={{
                pattern: { value: /^https?:\/\/.+\..+/, message: 'Enter a valid URL' },
              }}
              placeholder="https://example.com"
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

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Street"
              name="address.street"
              control={control}
              placeholder="123 Main Street"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input label="City" name="address.city" control={control} placeholder="New York" />
              <Input
                label="Zip Code"
                name="address.zipCode"
                control={control}
                rules={{
                  pattern: { value: /^[A-Za-z0-9\s-]{3,10}$/, message: 'Invalid zip code' },
                }}
                placeholder="10001"
              />
            </div>
            <Select
              label="Country"
              name="country"
              control={control}
              options={formOptions.countries.map((o) => ({ label: o.name, value: o.value }))}
              placeholder="Select country"
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
              options={formOptions.roles.map((o) => ({ label: o.name, value: o.value }))}
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
              options={formOptions.categories.map((o) => ({ label: o.name, value: o.value }))}
              rules={{ required: 'Select at least one category' }}
              placeholder="Select categories"
            />
            <MultiSelect
              label="Languages"
              name="languages"
              control={control}
              options={formOptions.languages.map((o) => ({ label: o.name, value: o.value }))}
              placeholder="Select languages you speak"
            />
          </CardContent>
        </Card>

        {/* Work Details */}
        <Card>
          <CardHeader>
            <CardTitle>Work Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Experience"
                name="experience"
                control={control}
                options={formOptions.experience.map((o) => ({ label: o.name, value: o.value }))}
                placeholder="Select experience level"
              />
              <Select
                label="Status"
                name="status"
                control={control}
                options={formOptions.statuses.map((o) => ({ label: o.name, value: o.value }))}
                placeholder="Select status"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Priority"
                name="priority"
                control={control}
                options={formOptions.priorities.map((o) => ({ label: o.name, value: o.value }))}
                placeholder="Select priority"
              />
              <Input
                label="Salary"
                name="salary"
                type="number"
                control={control}
                rules={{ min: { value: 0, message: 'Salary must be positive' } }}
                placeholder="50000"
              />
            </div>
            <Input label="Start Date" name="startDate" type="date" control={control} />
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
                {formOptions.genders.map((g) => (
                  <Radio
                    key={g.value}
                    name="gender"
                    value={g.value}
                    label={g.name}
                    control={control}
                    rules={{ required: 'Please select gender' }}
                  />
                ))}
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
            <Toggle label="Enable notifications" name="notifications" control={control} />
            <Checkbox label="Subscribe to newsletter" name="newsletter" control={control} />
            <Toggle label="Dark mode preference" name="darkMode" control={control} />
          </CardContent>
        </Card>

        {/* File Input */}
        <Card>
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileInput label="Avatar" name="avatar" control={control} accept="image/*" />
            <FileInput label="Resume" name="resume" control={control} accept=".pdf,.doc,.docx" />
          </CardContent>
        </Card>

        {/* Users & Orders (Dynamic) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Users & Orders</CardTitle>
              <Button
                type="button"
                variant="outline"
                onClick={() => appendUser({ name: '', orders: [{ orderId: '', amount: '' }] })}
              >
                + Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {userFields.map((userField, userIndex) => (
              <UserOrderFields
                key={userField.id}
                control={control}
                userIndex={userIndex}
                onRemoveUser={() => removeUser(userIndex)}
                canRemove={userFields.length > 1}
              />
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default FormShowcasePage;
