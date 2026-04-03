import { Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { cn } from '@shared/utils/cn';
import InputLayout from './InputLayout';

const FormInput = ({
  name,
  control,
  label,
  rules,
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
          <InputText
            id={name}
            {...field}
            value={field.value ?? ''}
            invalid={!!fieldState.error}
            className={cn('w-full', className)}
            {...props}
          />
        </InputLayout>
      )}
    />
  );
};

export default FormInput;
