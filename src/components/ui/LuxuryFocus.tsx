"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LuxuryFocusProps {
  children: ReactNode;
  className?: string;
  focusRingColor?: 'quantum' | 'flow' | 'sage';
}

export const LuxuryFocus = ({ 
  children, 
  className = "",
  focusRingColor = 'flow'
}: LuxuryFocusProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const colorConfig = {
    quantum: {
      ring: 'rgba(107, 142, 90, 0.4)',
      glow: 'rgba(143, 166, 142, 0.6)',
      particles: '#8FA68E'
    },
    flow: {
      ring: 'rgba(61, 165, 95, 0.4)',
      glow: 'rgba(80, 191, 129, 0.6)',
      particles: '#3da55f'
    },
    sage: {
      ring: 'rgba(143, 166, 142, 0.4)',
      glow: 'rgba(122, 145, 120, 0.6)',
      particles: '#8FA68E'
    }
  };
  
  const config = colorConfig[focusRingColor];
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let mouseDown = false;
    
    const handleMouseDown = () => {
      mouseDown = true;
    };
    
    const handleMouseUp = () => {
      mouseDown = false;
    };
    
    const handleFocus = () => {
      setIsFocused(true);
      setIsKeyboardFocus(!mouseDown);
    };
    
    const handleBlur = () => {
      setIsFocused(false);
      setIsKeyboardFocus(false);
    };
    
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
    
    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, []);
  
  return (
    <div ref={ref} className={`relative ${className}`} tabIndex={0}>
      {children}
      
      {/* Luxury Focus Ring */}
      {isFocused && isKeyboardFocus && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Main focus ring */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2"
            style={{
              borderColor: config.ring,
              boxShadow: `0 0 0 4px ${config.ring}, 0 0 20px ${config.glow}`
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.02, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Quantum energy particles around focus */}
          {!prefersReducedMotion && Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * 360;
            const radius = 25;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: config.particles,
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px)`,
                  filter: `drop-shadow(0 0 3px ${config.glow})`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            );
          })}
          
          {/* Subtle inner glow */}
          <motion.div
            className="absolute inset-2 rounded-md opacity-20"
            style={{
              background: `radial-gradient(circle, ${config.glow} 0%, transparent 70%)`,
              filter: 'blur(8px)'
            }}
            animate={prefersReducedMotion ? {} : {
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </div>
  );
};