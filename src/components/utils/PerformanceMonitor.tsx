"use client";

import { useEffect, useState } from "react";

// Type definitions for performance monitoring
interface PerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface ExtendedPerformance extends Performance {
  memory?: PerformanceMemory;
}

interface PerformanceMetrics {
  fps: number;
  animationCount: number;
  memoryUsage?: number;
}

// Performance thresholds
const PERFORMANCE_THRESHOLDS = {
  MIN_FPS: 50,
  MAX_ANIMATIONS: 8,
  MEMORY_WARNING: 50, // MB
};

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    animationCount: 0,
  });

  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check for user's reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage: (performance as ExtendedPerformance).memory?.usedJSHeapSize ? 
            (performance as ExtendedPerformance).memory!.usedJSHeapSize / 1024 / 1024 : 
            undefined,
        }));

        // Auto-reduce animations if performance is poor
        if (fps < PERFORMANCE_THRESHOLDS.MIN_FPS) {
          setShouldReduceMotion(true);
        }

        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Only monitor in development
    if (process.env.NODE_ENV === 'development') {
      animationId = requestAnimationFrame(measureFPS);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const updateAnimationCount = (count: number) => {
    setMetrics(prev => ({ ...prev, animationCount: count }));
  };

  return {
    metrics,
    shouldReduceMotion: shouldReduceMotion || metrics.animationCount > PERFORMANCE_THRESHOLDS.MAX_ANIMATIONS,
    updateAnimationCount,
  };
}

// Performance optimization hook for components
export function useOptimizedAnimation(isVisible: boolean, shouldAnimate: boolean = true) {
  const { shouldReduceMotion } = usePerformanceMonitor();
  
  return {
    shouldAnimate: isVisible && shouldAnimate && !shouldReduceMotion,
    reducedMotion: shouldReduceMotion,
  };
}