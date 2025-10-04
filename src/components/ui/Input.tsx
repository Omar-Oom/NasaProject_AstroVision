import React from 'react'

interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  className?: string
  required?: boolean
  disabled?: boolean
  step?: string | number
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className = '',
  required = false,
  disabled = false,
  step
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-space-cyan">
          {label}
          {required && <span className="text-space-magenta ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        step={step}
        className={`
          input-field w-full
          ${error ? 'border-space-magenta' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      />
      {error && (
        <p className="text-space-magenta text-sm">{error}</p>
      )}
    </div>
  )
}

export default Input
