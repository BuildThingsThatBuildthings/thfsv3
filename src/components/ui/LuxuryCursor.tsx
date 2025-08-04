"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLuxuryInteractions } from "@/hooks/useLuxuryInteractions";

interface LuxuryCursorProps {
  children: React.ReactNode;
  className?: string;
}

export const LuxuryCursor = ({ children, className = "" }: LuxuryCursorProps) => {
  const { 
    cursorPosition, 
    isHovering, 
    prefersReducedMotion, 
    luxuryIntensity,
    handleMouseEnter,
    handleMouseLeave
  } = useLuxuryInteractions();
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Luxury Cursor Glow Effect */}
      <AnimatePresence>
        {isVisible && isHovering && (
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{
              left: cursorPosition.x - 20,
              top: cursorPosition.y - 20,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: luxuryIntensity * 0.6,
              scale: 1 + (luxuryIntensity * 0.2)
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            {/* Outer quantum glow */}
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-r from-quantum-glow/20 via-flow-400/15 to-quantum-energy/20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                filter: 'blur(8px)',
                background: `radial-gradient(circle, rgba(80, 200, 120, ${luxuryIntensity * 0.3}) 0%, rgba(107, 142, 90, ${luxuryIntensity * 0.2}) 50%, transparent 100%)`
              }}
            />
            
            {/* Inner energy core */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: `radial-gradient(circle, rgba(143, 166, 142, ${luxuryIntensity}) 0%, rgba(122, 145, 120, ${luxuryIntensity * 0.5}) 100%)`,
                filter: `drop-shadow(0 0 ${luxuryIntensity * 8}px rgba(143, 166, 142, 0.6))`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};