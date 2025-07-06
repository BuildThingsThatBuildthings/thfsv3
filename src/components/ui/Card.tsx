'use client';

import { CardProps } from '@/types';
import { motion } from 'framer-motion';

export function Card({ 
  children, 
  className = '', 
  hover = false 
}: CardProps) {
  const baseClasses = 'bg-white rounded-sm shadow-md border border-cream';
  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;
  
  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}