"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { QuantumOrb } from "./QuantumOrb";

interface LuxuryPageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const LuxuryPageTransition = ({ children, className = "" }: LuxuryPageTransitionProps) => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const pageVariants = {
    initial: prefersReducedMotion ? { opacity: 0 } : {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      scale: 0.98
    },
    in: prefersReducedMotion ? { opacity: 1 } : {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1
    },
    out: prefersReducedMotion ? { opacity: 0 } : {
      opacity: 0,
      y: -20,
      filter: "blur(5px)",
      scale: 1.02
    }
  };
  
  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.8, 0.25, 1],
    duration: prefersReducedMotion ? 0.15 : 0.6
  };
  
  return (
    <motion.div
      className={`relative ${className}`}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Subtle luxury overlay during transition */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Luxury quantum background */}
          <div className="absolute inset-0 bg-gradient-to-br from-quantum-forest/80 via-quantum-energy/60 to-quantum-neural/70 backdrop-blur-sm" />
          
          {/* Central quantum orb during transition */}
          <div className="absolute inset-0 flex items-center justify-center">
            <QuantumOrb 
              size="lg"
              intensity="high"
              position="relative"
              delay={0}
              type="energy"
            />
          </div>
          
          {/* Elegant loading message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="mt-32 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-quantum-neural text-sm font-medium tracking-wider uppercase">
                Transitioning...
              </p>
              
              {/* Breathing dots */}
              <div className="flex justify-center gap-1 mt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-quantum-neural rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {children}
    </motion.div>
  );
};