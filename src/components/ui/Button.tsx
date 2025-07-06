'use client';

import { ButtonProps } from '@/types';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  href, 
  disabled = false, 
  className = '' 
}: ButtonProps) {
  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-terracotta-500 text-white hover:bg-terracotta-600 focus:ring-terracotta-500 shadow-md hover:shadow-lg',
    secondary: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500 shadow-md hover:shadow-lg',
    outline: 'border-2 border-terracotta-500 text-terracotta-500 hover:bg-terracotta-500 hover:text-white focus:ring-terracotta-500'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-sm',
    md: 'px-6 py-3 text-base rounded-sm',
    lg: 'px-8 py-4 text-lg rounded-sm'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  const buttonContent = (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.button>
  );
  
  if (href && !disabled) {
    return (
      <Link href={href}>
        {buttonContent}
      </Link>
    );
  }
  
  return buttonContent;
}