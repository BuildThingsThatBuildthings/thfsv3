"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface QuantumOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'low' | 'medium' | 'high';
  position?: string;
  delay?: number;
  type?: 'energy' | 'neural' | 'plasma';
  className?: string;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64',
};

const intensityMap = {
  low: { opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] },
  medium: { opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] },
  high: { opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] },
};

const typeMap = {
  energy: {
    gradient: 'radial-gradient(circle at 30% 40%, rgba(107, 142, 90, 0.6), rgba(125, 211, 192, 0.3), transparent 70%)',
    blur: 'blur-xl',
    glow: '0 0 20px rgba(107, 142, 90, 0.4)',
  },
  neural: {
    gradient: 'radial-gradient(ellipse at center, rgba(248, 250, 249, 0.3), rgba(125, 211, 192, 0.1), transparent 80%)',
    blur: 'blur-2xl',
    glow: '0 0 30px rgba(248, 250, 249, 0.2)',
  },
  plasma: {
    gradient: 'radial-gradient(circle, rgba(125, 211, 192, 0.5), rgba(107, 142, 90, 0.2), transparent 60%)',
    blur: 'blur-lg',
    glow: '0 0 25px rgba(125, 211, 192, 0.3)',
  },
};

export function QuantumOrb({
  size = 'md',
  intensity = 'medium',
  position = 'top-20 left-10',
  delay = 0,
  type = 'energy',
  className = '',
}: QuantumOrbProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Performance optimization: only animate when in viewport
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  const config = typeMap[type];
  const sizeClass = sizeMap[size];
  const animation = intensityMap[intensity];

  return (
    <motion.div
      className={`absolute ${sizeClass} ${position} ${config.blur} pointer-events-none gpu-accelerated contain-layout ${className}`}
      style={{
        background: config.gradient,
        borderRadius: '50%',
        filter: `${config.blur.replace('blur-', 'blur(')}px)`,
        boxShadow: config.glow,
        willChange: 'transform, opacity',
      }}
      animate={animation}
      transition={{
        duration: 6 + Math.random() * 2, // Slight randomization
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
      }}
      initial={{ opacity: 0 }}
    />
  );
}