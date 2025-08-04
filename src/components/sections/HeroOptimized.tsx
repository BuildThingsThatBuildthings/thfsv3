"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui";

// Performance-optimized media query hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Intersection Observer hook for performance
const useInView = () => {
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, inView] as const;
};

// Performance-optimized Quantum Orb
const QuantumOrb = ({ 
  size = 'w-32 h-32', 
  type = 'energy', 
  position = 'top-20 left-10', 
  delay = 0,
  isMobile = false,
  prefersReducedMotion = false
}: {
  size?: string;
  type?: 'energy' | 'plasma' | 'nature' | 'neural';
  position?: string;
  delay?: number;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}) => {
  const orbConfigs = {
    energy: {
      baseColor: 'bg-quantum-energy/12',
      glowColor: 'shadow-quantum-glow/30',
      pulseIntensity: [0.8, 1.3, 0.8]
    },
    plasma: {
      baseColor: 'bg-quantum-plasma/15',
      glowColor: 'shadow-cyan-400/20',
      pulseIntensity: [0.9, 1.4, 0.9]
    },
    nature: {
      baseColor: 'bg-flow-400/10',
      glowColor: 'shadow-flow-500/25',
      pulseIntensity: [1, 1.2, 1]
    },
    neural: {
      baseColor: 'bg-quantum-neural/8',
      glowColor: 'shadow-white/15',
      pulseIntensity: [0.7, 1.1, 0.7]
    }
  };
  
  const config = orbConfigs[type];
  
  // Performance-optimized animation config
  const animationConfig = {
    duration: isMobile ? 4 + (delay * 0.3) : 6 + (delay * 0.5), // Reduced from 12-20s
    rotateDuration: isMobile ? 8 + delay : 12 + delay, // Reduced from 20s+
    scale: prefersReducedMotion ? [1] : config.pulseIntensity,
    opacity: prefersReducedMotion ? [0.3] : [0.2, 0.7, 0.2],
    rotate: prefersReducedMotion ? [0] : [0, 180, 360]
  };
  
  return (
    <motion.div
      className={`absolute ${size} ${config.baseColor} ${position} rounded-full blur-2xl pointer-events-none ${config.glowColor}`}
      animate={{
        scale: animationConfig.scale,
        opacity: animationConfig.opacity,
        rotate: animationConfig.rotate,
      }}
      style={{ 
        willChange: 'transform, opacity',
        // Optimize for mobile devices
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
      transition={{
        duration: animationConfig.duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        rotate: {
          duration: animationConfig.rotateDuration,
          ease: "linear"
        }
      }}
    />
  );
};

export function HeroOptimized() {
  // Performance-aware media queries
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [ref, inView] = useInView();

  // Adaptive orb count based on device capability
  const orbCount = prefersReducedMotion ? 4 : isMobile ? 6 : 8;
  
  const orbs = [
    { size: "w-40 h-40", type: "energy" as const, position: "top-20 left-10", delay: 0 },
    { size: "w-56 h-56", type: "plasma" as const, position: "top-1/3 right-20", delay: 1.5 },
    { size: "w-32 h-32", type: "nature" as const, position: "bottom-20 right-16", delay: 3 },
    { size: "w-48 h-48", type: "neural" as const, position: "top-1/2 right-1/4", delay: 4.5 },
    { size: "w-36 h-36", type: "energy" as const, position: "bottom-1/3 left-1/4", delay: 6 },
    { size: "w-28 h-28", type: "plasma" as const, position: "top-40 left-1/3", delay: 2 },
    { size: "w-44 h-44", type: "nature" as const, position: "bottom-40 left-20", delay: 5 },
    { size: "w-52 h-52", type: "neural" as const, position: "top-60 right-1/3", delay: 7 }
  ].slice(0, orbCount);

  return (
    <section 
      ref={ref as React.RefCallback<HTMLElement>}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Optimized Multi-Layer Background System */}
      <div className="absolute inset-0 z-0">
        {/* Consolidated gradient layers for better performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-neural via-flow-50 to-quantum-neural" />
        <div className="absolute inset-0 bg-gradient-to-t from-flow-100/40 via-quantum-energy/15 to-quantum-plasma/10" />
        
        {/* Simplified Sacred geometry pattern - single shape for performance */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-8">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="quantum-geometry" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  {/* Simplified to single circle for performance */}
                  <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.15" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#quantum-geometry)" className="text-quantum-energy" />
            </svg>
          </div>
        )}
        
        {/* Optimized energy field overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-quantum-plasma/5 via-transparent to-quantum-forest/10" />
        
        {/* Conditional animated energy flow - only when in view */}
        {inView && !prefersReducedMotion && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-quantum-glow/3 to-transparent"
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: isMobile ? 6 : 8, // Reduced duration for mobile
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Performance-optimized Quantum Orb Field */}
      {inView && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {orbs.map((orb, index) => (
            <QuantumOrb
              key={index}
              size={orb.size}
              type={orb.type}
              position={orb.position}
              delay={orb.delay}
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      )}

      {/* Content overlay with quantum glow backdrop */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-8 py-32
                      before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-quantum-neural/5 before:to-transparent before:pointer-events-none">
        
        {/* Business name - Optimized text shadow */}
        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-quantum-gold mb-24 tracking-[0.3em] uppercase opacity-100"
          style={{
            // Simplified shadow for performance
            filter: 'drop-shadow(0 2px 8px rgba(26, 61, 46, 0.2))'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: prefersReducedMotion ? 0 : [0, -3, 0],
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            y: prefersReducedMotion ? {} : {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          The Healing Frequency Space
        </motion.h2>

        {/* Main hook with quantum-nature gradient text */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter font-medium mb-20 max-w-5xl leading-[1.1] tracking-tight relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a3d2e 0%, #4a6741 50%, #6b8e5a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(26, 61, 46, 0.3))'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        >
          Step into a space where frequency becomes transformation.
          
          {/* Conditional shimmer effect - only when not reduced motion */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%", opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </motion.h1>

        {/* Subtitle with optimized shadow */}
        <motion.p
          className="text-2xl md:text-3xl text-quantum-sage mb-24 max-w-3xl leading-relaxed font-semibold"
          style={{
            // Simplified shadow for performance
            filter: 'drop-shadow(0 1px 3px rgba(26, 61, 46, 0.1))'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          Experience tailored frequencies guiding your healing journey to
          optimal well-being.
        </motion.p>

        {/* Performance-optimized CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-8 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          {/* Primary CTA with conditional effects */}
          <motion.div
            whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button
              href="/remote-healing"
              variant="primary"
              size="lg"
              className="text-lg px-12 py-5 bg-gradient-to-r from-quantum-forest via-quantum-sage to-quantum-energy text-white font-semibold shadow-2xl hover:shadow-quantum-glow/30 transition-all duration-500 group relative overflow-hidden border border-quantum-energy/30"
              style={{
                boxShadow: '0 8px 32px rgba(26, 61, 46, 0.3), 0 0 20px rgba(107, 142, 90, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="relative z-10 drop-shadow-sm">Learn About Remote Sessions</span>
              
              {/* Conditional quantum energy pulse effect */}
              {!prefersReducedMotion && !isMobile && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-quantum-glow/20 via-quantum-plasma/30 to-quantum-energy/20 opacity-0 group-hover:opacity-100 rounded-lg"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%", opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </>
              )}
            </Button>
          </motion.div>

          {/* Secondary CTA with conditional effects */}
          <motion.div
            whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="text-lg px-12 py-5 bg-gradient-to-r from-quantum-neural/95 to-flow-50/95 backdrop-blur-lg border-2 border-quantum-gold/40 text-quantum-forest font-bold hover:border-quantum-gold hover:text-quantum-sage shadow-2xl hover:shadow-quantum-gold/25 transition-all duration-500 group relative overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(201, 168, 118, 0.15), 0 0 20px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <span className="relative z-10 drop-shadow-sm">Meet Victoria - Frequency Healing Practitioner</span>
              
              {/* Conditional harmony effects */}
              {!prefersReducedMotion && !isMobile && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-quantum-gold/10 via-flow-200/20 to-quantum-plasma/10 opacity-0 group-hover:opacity-100 rounded-lg"
                    transition={{ duration: 0.4 }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-flow-300/5 to-quantum-energy/5 opacity-0 group-hover:opacity-100 rounded-lg"
                    animate={{
                      scale: [1, 1.02, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}