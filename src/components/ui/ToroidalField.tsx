"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface ToroidalFieldProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'subtle' | 'medium' | 'high';
  position?: string;
  delay?: number;
  rotationSpeed?: number;
  pulseSpeed?: number;
}

export const ToroidalField = ({ 
  size = 'md',
  intensity = 'medium',
  position = 'top-1/2 left-1/2',
  delay = 0,
  rotationSpeed = 20,
  pulseSpeed = 4
}: ToroidalFieldProps) => {
  const sizeConfig = {
    sm: { width: 120, height: 120, strokeWidth: 1.5, particleCount: 8 },
    md: { width: 180, height: 180, strokeWidth: 2, particleCount: 12 },
    lg: { width: 240, height: 240, strokeWidth: 2.5, particleCount: 16 },
    xl: { width: 320, height: 320, strokeWidth: 3, particleCount: 20 }
  };

  const intensityConfig = {
    subtle: { opacity: 0.15, glowIntensity: 0.1, particleOpacity: 0.3 },
    medium: { opacity: 0.25, glowIntensity: 0.2, particleOpacity: 0.5 },
    high: { opacity: 0.4, glowIntensity: 0.3, particleOpacity: 0.7 }
  };

  const config = sizeConfig[size];
  const intensitySettings = intensityConfig[intensity];

  // Generate particle positions around the toroidal field
  const particles = useMemo(() => {
    const particleArray = [];
    for (let i = 0; i < config.particleCount; i++) {
      const angle = (i / config.particleCount) * Math.PI * 2;
      const majorRadius = config.width * 0.35;
      const minorRadius = config.width * 0.08;
      
      // Create torus-like distribution
      const torusAngle = (i / config.particleCount) * Math.PI * 4;
      const x = majorRadius * Math.cos(angle) + minorRadius * Math.cos(torusAngle) * Math.cos(angle);
      const y = majorRadius * Math.sin(angle) + minorRadius * Math.cos(torusAngle) * Math.sin(angle);
      
      particleArray.push({
        id: i,
        x: x + config.width / 2,
        y: y + config.height / 2,
        delay: (i / config.particleCount) * 2,
        size: Math.random() * 3 + 1
      });
    }
    return particleArray;
  }, [config]);

  return (
    <motion.div
      className={`absolute ${position} pointer-events-none -translate-x-1/2 -translate-y-1/2`}
      style={{ 
        width: config.width,
        height: config.height,
        filter: `drop-shadow(0 0 ${intensitySettings.glowIntensity * 40}px rgba(143, 166, 142, ${intensitySettings.glowIntensity}))`
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: intensitySettings.opacity,
        scale: 1,
        rotate: 360
      }}
      transition={{
        opacity: { duration: 2, delay },
        scale: { duration: 2, delay },
        rotate: { 
          duration: rotationSpeed,
          repeat: Infinity,
          ease: "linear",
          delay: delay * 0.5
        }
      }}
    >
      {/* Main Toroidal Ring Structure */}
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={`toroidal-gradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8FA68E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7A9178" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#657D63" stopOpacity="0.4" />
          </linearGradient>
          
          <radialGradient id={`toroidal-radial-${delay}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor="#8FA68E" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#7A9178" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#657D63" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* Outer ring */}
        <motion.ellipse
          cx={config.width / 2}
          cy={config.height / 2}
          rx={config.width * 0.42}
          ry={config.height * 0.42}
          fill="none"
          stroke={`url(#toroidal-gradient-${delay})`}
          strokeWidth={config.strokeWidth}
          opacity={0.7}
          animate={{
            strokeWidth: [config.strokeWidth, config.strokeWidth * 1.5, config.strokeWidth],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: pulseSpeed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay * 0.3
          }}
        />

        {/* Inner ring */}
        <motion.ellipse
          cx={config.width / 2}
          cy={config.height / 2}
          rx={config.width * 0.25}
          ry={config.height * 0.25}
          fill="none"
          stroke={`url(#toroidal-radial-${delay})`}
          strokeWidth={config.strokeWidth * 0.8}
          opacity={0.5}
          animate={{
            strokeWidth: [config.strokeWidth * 0.8, config.strokeWidth * 1.2, config.strokeWidth * 0.8],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: pulseSpeed * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay * 0.5
          }}
        />

        {/* Energy flow path */}
        <motion.path
          d={`M ${config.width * 0.1},${config.height / 2} 
              Q ${config.width * 0.3},${config.height * 0.2} 
                ${config.width / 2},${config.height * 0.15}
              Q ${config.width * 0.7},${config.height * 0.2} 
                ${config.width * 0.9},${config.height / 2}
              Q ${config.width * 0.7},${config.height * 0.8} 
                ${config.width / 2},${config.height * 0.85}
              Q ${config.width * 0.3},${config.height * 0.8} 
                ${config.width * 0.1},${config.height / 2}`}
          fill="none"
          stroke="#8FA68E"
          strokeWidth={config.strokeWidth * 0.5}
          strokeDasharray="4 6"
          opacity={0.3}
          animate={{
            strokeDashoffset: [0, -20, -40],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            strokeDashoffset: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            },
            opacity: {
              duration: pulseSpeed * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </svg>

      {/* Energy Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-sage-400 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            filter: `drop-shadow(0 0 ${particle.size * 2}px rgba(143, 166, 142, 0.6))`
          }}
          animate={{
            opacity: [0, intensitySettings.particleOpacity, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 360]
          }}
          transition={{
            duration: pulseSpeed * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay + delay
          }}
        />
      ))}

      {/* Central energy core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: config.width * 0.1,
          height: config.height * 0.1,
          background: 'radial-gradient(circle, rgba(143, 166, 142, 0.4) 0%, rgba(122, 145, 120, 0.2) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: `blur(1px) drop-shadow(0 0 ${config.width * 0.05}px rgba(143, 166, 142, 0.3))`
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: pulseSpeed * 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.8
        }}
      />
    </motion.div>
  );
};