import { Controller } from 'react-hook-form';
import { InputTextarea } from 'primereact/inputtextarea';
import { cn } from '@shared/utils/cn';
import InputLayout from './InputLayout';

const FormTextarea = ({
  name,
  control,
  label,
  rules,
  rows = 4,
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
          <InputTextarea
            id={name}
            {...field}
            value={field.value ?? ''}
            rows={rows}
            autoResize
            invalid={!!fieldState.error}
            className={cn('w-full', className)}
            {...props}
          />
        </InputLayout>
      )}
    />
  );
};

export default FormTextarea;
