import React from 'react';
import { Controller } from 'react-hook-form';
import { FileUpload } from 'primereact/fileupload';
import InputLayout from './InputLayout';

const FormFileInput = ({
  name,
  control,
  label,
  rules,
  accept,
  multiple = false,
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
          <FileUpload
            name={name}
            mode="basic"
            accept={accept}
            multiple={multiple}
            auto={false}
            chooseLabel="Choose File"
            onSelect={(e) => field.onChange(multiple ? e.files : e.files[0])}
            className={className}
            {...props}
          />
        </InputLayout>
      )}
    />
  );
};

export default FormFileInput;
