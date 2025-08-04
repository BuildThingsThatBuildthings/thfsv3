'use client';

import { motion } from 'framer-motion';

interface FramedLayoutProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  borderColor?: 'white' | 'cream' | 'sage';
  shadow?: boolean;
}

export function FramedLayout({
  children,
  className = '',
  padding = 'lg',
  borderColor = 'white',
  shadow = true
}: FramedLayoutProps) {
  const paddingClasses = {
    sm: 'p-4 md:p-6',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
    xl: 'p-12 md:p-16'
  };
  
  const borderClasses = {
    white: 'border-white',
    cream: 'border-cream',
    sage: 'border-sage'
  };
  
  const shadowClass = shadow ? 'shadow-2xl' : '';
  
  return (
    <motion.section 
      className={`bg-white ${paddingClasses[padding]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Framed container - Elegant design inspired */}
      <div className={`
        relative h-full 
        border-8 ${borderClasses[borderColor]} 
        ${shadowClass} 
        overflow-hidden 
        rounded-sm 
        bg-white
        ${className}
      `}>
        {children}
      </div>
    </motion.section>
  );
}