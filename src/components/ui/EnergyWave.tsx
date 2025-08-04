"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface EnergyWaveProps {
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  intensity?: 'subtle' | 'medium' | 'high';
  speed?: number;
  delay?: number;
  amplitude?: number;
  frequency?: number;
}

export const EnergyWave = ({
  direction = 'horizontal',
  intensity = 'medium',
  speed = 8,
  delay = 0,
  amplitude = 40,
  frequency = 3
}: EnergyWaveProps) => {
  const intensityConfig = {
    subtle: { opacity: 0.08, blur: 1.5, glowIntensity: 0.04 },
    medium: { opacity: 0.15, blur: 2, glowIntensity: 0.08 },
    high: { opacity: 0.25, blur: 2.5, glowIntensity: 0.12 }
  };

  const settings = intensityConfig[intensity];

  // Generate wave path based on direction and parameters
  const wavePath = useMemo(() => {
    const points: string[] = [];
    const segments = 100;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let x: number, y: number;
      
      switch (direction) {
        case 'horizontal':
          x = t * 100;
          y = 50 + Math.sin(t * Math.PI * frequency) * (amplitude / 100) * 50;
          break;
        case 'vertical':
          x = 50 + Math.sin(t * Math.PI * frequency) * (amplitude / 100) * 50;
          y = t * 100;
          break;
        case 'diagonal':
          x = t * 100;
          y = t * 100 + Math.sin(t * Math.PI * frequency) * (amplitude / 100) * 25;
          break;
        default:
          x = t * 100;
          y = 50;
      }
      
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  }, [direction, amplitude, frequency]);

  // Generate secondary wave with phase offset
  const secondaryWavePath = useMemo(() => {
    const points: string[] = [];
    const segments = 100;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const phaseOffset = Math.PI / 3; // 60 degree phase shift
      let x: number, y: number;
      
      switch (direction) {
        case 'horizontal':
          x = t * 100;
          y = 50 + Math.sin(t * Math.PI * frequency + phaseOffset) * (amplitude / 100) * 30;
          break;
        case 'vertical':
          x = 50 + Math.sin(t * Math.PI * frequency + phaseOffset) * (amplitude / 100) * 30;
          y = t * 100;
          break;
        case 'diagonal':
          x = t * 100;
          y = t * 100 + Math.sin(t * Math.PI * frequency + phaseOffset) * (amplitude / 100) * 15;
          break;
        default:
          x = t * 100;
          y = 50;
      }
      
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  }, [direction, amplitude, frequency]);

  const containerClasses = direction === 'diagonal' 
    ? "absolute inset-0 pointer-events-none transform rotate-12"
    : "absolute inset-0 pointer-events-none";

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: settings.opacity }}
      transition={{ duration: 2, delay }}
      style={{
        filter: `blur(${settings.blur}px) drop-shadow(0 0 ${settings.glowIntensity * 100}px rgba(143, 166, 142, ${settings.glowIntensity}))`
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={`wave-gradient-${delay}`} gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#8FA68E" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#7A9178" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#657D63" stopOpacity="0.4" />
            <stop offset="90%" stopColor="#8FA68E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <linearGradient id={`wave-gradient-secondary-${delay}`} gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#B8C7B6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#9DB19B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <filter id={`wave-glow-${delay}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Primary energy wave - Organic breathing animation */}
        <motion.path
          d={wavePath}
          fill="none"
          stroke={`url(#wave-gradient-${delay})`}
          strokeWidth="0.4"
          strokeLinecap="round"
          filter={`url(#wave-glow-${delay})`}
          animate={{
            pathOffset: [0, 1],
            strokeWidth: [0.3, 0.8, 0.3],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            pathOffset: {
              duration: speed * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            strokeWidth: {
              duration: speed * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: speed * 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        {/* Secondary wave for depth - More organic breathing */}
        <motion.path
          d={secondaryWavePath}
          fill="none"
          stroke={`url(#wave-gradient-secondary-${delay})`}
          strokeWidth="0.2"
          strokeLinecap="round"
          strokeDasharray="1 6"
          animate={{
            pathOffset: [0, 1],
            strokeDashoffset: [0, -15],
            opacity: [0.2, 0.5, 0.2],
            strokeWidth: [0.2, 0.4, 0.2]
          }}
          transition={{
            pathOffset: {
              duration: speed * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay * 0.5
            },
            strokeDashoffset: {
              duration: speed * 0.7,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: speed * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay * 0.3
            },
            strokeWidth: {
              duration: speed * 1.1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </svg>

      {/* Subtle energy flow indicators */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-sage-200 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: direction === 'horizontal' ? '50%' : `${20 + i * 30}%`,
              filter: 'drop-shadow(0 0 2px rgba(143, 166, 142, 0.4))'
            }}
            animate={{
              [direction === 'horizontal' ? 'x' : 'y']: [0, direction === 'horizontal' ? '60vw' : '60vh'],
              opacity: [0, 0.6, 0],
              scale: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: speed * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8 + delay
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};