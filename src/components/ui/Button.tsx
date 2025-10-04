import * as React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'default'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-space-cyan/50'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border border-space-cyan text-space-cyan hover:bg-space-cyan hover:text-space-black',
    default: 'bg-gray-600 text-white hover:bg-gray-700'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant as keyof typeof variantClasses]}
        ${sizeClasses[size as keyof typeof sizeClasses]}
        ${disabledClasses}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}

export default Button
