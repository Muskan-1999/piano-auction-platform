import React from 'react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center'

  const variants = {
    primary: 'bg-luxury-500 hover:bg-luxury-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-white border-2 border-luxury-500 text-luxury-600 hover:bg-luxury-50',
    outline: 'border-2 border-luxury-500 text-luxury-600 hover:bg-luxury-50',
    ghost: 'text-luxury-600 hover:bg-luxury-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
