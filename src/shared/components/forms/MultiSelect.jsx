import { Controller } from 'react-hook-form';
import { MultiSelect } from 'primereact/multiselect';
import { cn } from '@shared/utils/cn';
import InputLayout from './InputLayout';

const FormMultiSelect = ({
  name,
  control,
  label,
  rules,
  options = [],
  placeholder = 'Select options',
  disabled = false,
  loading = false,
  className = '',
  containerClass = '',
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <InputLayout
          label={label}
          name={name}
          error={fieldState.error?.message}
          className={containerClass}
        >
          <MultiSelect
            inputId={name}
            value={field.value ?? []}
            onChange={(e) => field.onChange(e.value)}
            options={options}
            placeholder={loading ? 'Loading...' : placeholder}
            disabled={disabled || loading}
            loading={loading}
            display="chip"
            invalid={!!fieldState.error}
            className={cn('w-full', className)}
            {...props}
          />
        </InputLayout>
      )}
    />
  );
};

export default FormMultiSelect;
