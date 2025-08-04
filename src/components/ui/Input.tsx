'use client';

// Local interface since it's not exported from main types
interface InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
import { useState } from 'react';

export function Input({
  label,
  error,
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = ''
}: InputProps) {
  const [focused, setFocused] = useState(false);
  
  const inputClasses = `
    w-full px-4 py-3 border rounded-sm transition-all duration-200
    focus:outline-none focus:border-flow-600
    ${error ? 'border-red-500' : 'border-slate-300'}
    ${focused ? 'border-terracotta-500' : ''}
    disabled:bg-slate-100 disabled:cursor-not-allowed
    ${className}
  `;
  
  const labelClasses = `
    block text-sm font-medium mb-2 text-slate-700
    ${required ? "after:content-['*'] after:ml-1 after:text-red-500" : ''}
  `;
  
  return (
    <div className="w-full">
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <p 
          id={`${label}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}