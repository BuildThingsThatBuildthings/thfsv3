"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FlowingParticleProps {
  count?: number;
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'up' | 'diagonal' | 'circular';
  color?: 'plasma' | 'energy' | 'neural';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const speedMap = {
  slow: 15,
  medium: 12,
  fast: 8,
};

const sizeMap = {
  xs: 'w-1 h-1',
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
};

const colorMap = {
  plasma: 'bg-flow-400',
  energy: 'bg-sage-400',
  neural: 'bg-slate-200',
};

const directionPaths = {
  up: {
    initial: { x: 0, y: '100vh', scale: 0 },
    animate: { x: [-20, 20, -10, 10, 0], y: '-20vh', scale: [0, 1, 1, 0] },
  },
  diagonal: {
    initial: { x: '-10vw', y: '100vh', scale: 0 },
    animate: { x: '110vw', y: '-10vh', scale: [0, 1, 1, 0] },
  },
  circular: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  },
};

export function FlowingParticle({
  count = 3,
  speed = 'medium',
  direction = 'up',
  color = 'plasma',
  size = 'sm',
  className = '',
}: FlowingParticleProps) {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Stagger particle creation for performance
    const createParticles = () => {
      const newParticles = Array.from({ length: count }, (_, i) => i);
      setParticles(newParticles);
    };

    createParticles();
  }, [count]);

  const duration = speedMap[speed];
  const path = directionPaths[direction];
  const sizeClass = sizeMap[size];
  const colorClass = colorMap[color];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className={`absolute ${sizeClass} ${colorClass} rounded-full opacity-60 gpu-accelerated`}
          style={{
            filter: 'blur(0.5px)',
            willChange: 'transform',
            left: `${Math.random() * 100}%`,
            top: direction === 'circular' ? '50%' : undefined,
          }}
          initial={path.initial}
          animate={path.animate}
          transition={{
            duration: duration + Math.random() * 4, // Add randomization
            delay: particle * 2 + Math.random() * 3,
            repeat: Infinity,
            ease: direction === 'circular' ? 'linear' : 'easeOut',
            repeatDelay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}