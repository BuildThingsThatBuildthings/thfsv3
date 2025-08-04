"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LuxuryTooltipProps {
  children: ReactNode;
  content: string | ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const LuxuryTooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 300,
  className = ""
}: LuxuryTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const updateTooltipPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x = 0;
    let y = 0;
    
    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top - tooltipRect.height - 12;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.bottom + 12;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - 12;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      case 'right':
        x = triggerRect.right + 12;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
    }
    
    // Keep tooltip within viewport bounds
    x = Math.max(8, Math.min(x, viewportWidth - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, viewportHeight - tooltipRect.height - 8));
    
    setTooltipPosition({ x, y });
  };
  
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };
  
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };
  
  useEffect(() => {
    if (isVisible) {
      updateTooltipPosition();
      
      const handleScroll = () => updateTooltipPosition();
      const handleResize = () => updateTooltipPosition();
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible, position, updateTooltipPosition]);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const getArrowStyles = () => {
    const arrowSize = 6;
    const arrowColor = 'rgba(248, 250, 249, 0.95)';
    
    switch (position) {
      case 'top':
        return {
          bottom: -arrowSize,
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid ${arrowColor}`
        };
      case 'bottom':
        return {
          top: -arrowSize,
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid ${arrowColor}`
        };
      case 'left':
        return {
          right: -arrowSize,
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid ${arrowColor}`
        };
      case 'right':
        return {
          left: -arrowSize,
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid ${arrowColor}`
        };
    }
  };
  
  return (
    <div 
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      
      {/* Luxury Tooltip Portal */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y
            }}
            initial={prefersReducedMotion ? { opacity: 0 } : {
              opacity: 0,
              scale: 0.8,
              y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
              x: position === 'left' ? 10 : position === 'right' ? -10 : 0
            }}
            animate={prefersReducedMotion ? { opacity: 1 } : {
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0
            }}
            exit={prefersReducedMotion ? { opacity: 0 } : {
              opacity: 0,
              scale: 0.8,
              y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
              x: position === 'left' ? 10 : position === 'right' ? -10 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.15
            }}
          >
            {/* Luxury tooltip container */}
            <div className="relative">
              {/* Background with luxury styling */}
              <div 
                className="px-4 py-2 bg-quantum-neural/95 backdrop-blur-md border border-quantum-energy/20 rounded-lg shadow-xl"
                style={{
                  boxShadow: '0 8px 32px rgba(26, 61, 46, 0.15), 0 0 20px rgba(143, 166, 142, 0.1)'
                }}
              >
                {/* Subtle quantum glow */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-30"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(143, 166, 142, 0.1) 0%, transparent 70%)',
                    filter: 'blur(8px)'
                  }}
                  animate={prefersReducedMotion ? {} : {
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={prefersReducedMotion ? {} : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 text-sm text-quantum-forest font-medium whitespace-nowrap">
                  {content}
                </div>
              </div>
              
              {/* Luxury arrow */}
              <div 
                className="absolute w-0 h-0"
                style={getArrowStyles()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};