import { Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { cn } from '@shared/utils/cn';
import InputLayout from './InputLayout';

const FormSelect = ({
  name,
  control,
  label,
  rules,
  options = [],
  placeholder = 'Select an option',
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
          <Dropdown
            inputId={name}
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.value)}
            options={options}
            placeholder={loading ? 'Loading...' : placeholder}
            disabled={loading}
            loading={loading}
            invalid={!!fieldState.error}
            className={cn('w-full', className)}
            {...props}
          />
        </InputLayout>
      )}
    />
  );
};

export default FormSelect;
