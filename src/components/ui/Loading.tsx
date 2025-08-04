'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  variant?: 'simple' | 'luxury';
}

export function Loading({ 
  size = 'md', 
  text, 
  className = '',
  variant = 'simple'
}: LoadingProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  // Luxury variant with quantum styling
  if (variant === 'luxury') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        {/* Luxury quantum spinner */}
        <div className={`relative ${sizeClasses[size]}`}>
          {/* Outer quantum ring */}
          <motion.div
            className="absolute inset-0 border-2 border-quantum-energy/30 rounded-full"
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={prefersReducedMotion ? {} : {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              borderStyle: 'dashed',
              filter: 'drop-shadow(0 0 4px rgba(107, 142, 90, 0.3))'
            }}
          />
          
          {/* Inner energy core */}
          <motion.div
            className="absolute inset-2 bg-gradient-to-r from-quantum-energy to-flow-400 rounded-full"
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: 'blur(1px) drop-shadow(0 0 6px rgba(143, 166, 142, 0.4))'
            }}
          />
          
          {/* Quantum particles */}
          {!prefersReducedMotion && Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * 360;
            const radius = size === 'sm' ? 12 : size === 'md' ? 20 : 28;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-sage-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px)`,
                  filter: 'drop-shadow(0 0 2px rgba(143, 166, 142, 0.6))'
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            );
          })}
        </div>
        
        {text && (
          <motion.p 
            className="mt-4 text-sm text-quantum-forest/80 font-medium"
            animate={prefersReducedMotion ? {} : {
              opacity: [0.7, 1, 0.7]
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }
  
  // Simple variant (original styling enhanced with quantum colors)
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-quantum-energy/20 border-t-flow-500 rounded-full`}
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={prefersReducedMotion ? {} : {
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          filter: 'drop-shadow(0 0 4px rgba(61, 165, 95, 0.2))'
        }}
      />
      {text && (
        <motion.p 
          className="mt-3 text-sm text-quantum-forest/70 font-medium"
          animate={prefersReducedMotion ? {} : {
            opacity: [0.7, 1, 0.7]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}