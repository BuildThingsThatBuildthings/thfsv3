"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LuxuryParallaxProps {
  children: ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const LuxuryParallax = ({ 
  children, 
  intensity = 'medium',
  direction = 'up',
  className = ""
}: LuxuryParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const intensityConfig = {
    subtle: { range: 20, scale: 0.02 },
    medium: { range: 50, scale: 0.05 },
    strong: { range: 100, scale: 0.1 }
  };
  
  const config = intensityConfig[intensity];
  
  // Create transforms based on direction
  const transforms = {
    up: {
      y: useTransform(scrollYProgress, [0, 1], [config.range, -config.range]),
      x: useTransform(scrollYProgress, [0, 1], [0, 0])
    },
    down: {
      y: useTransform(scrollYProgress, [0, 1], [-config.range, config.range]),
      x: useTransform(scrollYProgress, [0, 1], [0, 0])
    },
    left: {
      x: useTransform(scrollYProgress, [0, 1], [config.range, -config.range]),
      y: useTransform(scrollYProgress, [0, 1], [0, 0])
    },
    right: {
      x: useTransform(scrollYProgress, [0, 1], [-config.range, config.range]),
      y: useTransform(scrollYProgress, [0, 1], [0, 0])
    }
  };
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + config.scale, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: transforms[direction].x,
        y: transforms[direction].y,
        scale,
        opacity
      }}
    >
      {children}
    </motion.div>
  );
};