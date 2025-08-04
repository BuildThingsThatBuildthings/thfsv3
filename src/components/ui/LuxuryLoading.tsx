"use client";

import { motion } from "framer-motion";
import { QuantumOrb } from "./QuantumOrb";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LuxuryLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export const LuxuryLoading = ({ 
  size = 'md',
  message = "Preparing your healing experience...",
  className = ""
}: LuxuryLoadingProps) => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const sizeConfig = {
    sm: { container: "w-32 h-32", text: "text-sm" },
    md: { container: "w-48 h-48", text: "text-base" },
    lg: { container: "w-64 h-64", text: "text-lg" }
  };
  
  const config = sizeConfig[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Quantum Loading Animation */}
      <div className={`relative ${config.container} mb-8`}>
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-quantum-energy/10 via-flow-300/5 to-quantum-forest/10"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            filter: 'blur(20px)'
          }}
        />
        
        {/* Central Quantum Orb */}
        <QuantumOrb 
          size="lg"
          intensity="medium"
          position="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          delay={0}
          type="energy"
        />
        
        {/* Rotating energy rings */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute inset-4 border-2 border-quantum-energy/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                borderStyle: 'dashed',
                borderDasharray: '10 20'
              }}
            />
            
            <motion.div
              className="absolute inset-8 border border-flow-400/40 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                borderStyle: 'dotted'
              }}
            />
          </>
        )}
        
        {/* Energy particles */}
        {!prefersReducedMotion && Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * 360;
          const radius = 60;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-sage-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x}px, ${y}px)`,
                filter: 'drop-shadow(0 0 4px rgba(143, 166, 142, 0.6))'
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          );
        })}
      </div>
      
      {/* Luxury Loading Message */}
      <motion.div
        className="text-center max-w-md"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? {} : { duration: 1, delay: 0.5 }}
      >
        <p className={`${config.text} text-quantum-forest/80 font-medium mb-4`}>
          {message}
        </p>
        
        {/* Sophisticated progress indicator */}
        <div className="w-48 h-1 bg-quantum-neural/20 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-flow-400 via-quantum-energy to-flow-500 rounded-full"
            animate={prefersReducedMotion ? {} : {
              x: ['-100%', '100%']
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Breathing dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-quantum-energy rounded-full"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={prefersReducedMotion ? {} : {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};