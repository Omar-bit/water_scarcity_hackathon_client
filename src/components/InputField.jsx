import { useState } from 'react';

function InputField({
  label,
  placeholder,
  type,
  id,
  name,
  value,
  onChange,
  required,
  className,
  ...rest
}) {
  type = type || 'text';
  required = required || false;
  label = label || '';
  placeholder = placeholder || '';
  name = name || label.toLowerCase();
  id = id || name;

  return (
    <div className={` shadow-lg flex flex-col gap-1 ${className?.container}`}>
      <label htmlFor={name} className=' text-black font-semibold'>
        {label}:
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`border border-black rounded-md p-2 ${className?.input} `}
        {...rest}
      />
    </div>
  );
}

export default InputField;
