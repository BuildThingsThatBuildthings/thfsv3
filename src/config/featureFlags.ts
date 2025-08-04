// Feature flags for quantum-nature implementation
export interface FeatureFlags {
  quantumOrbs: boolean;
  flowingParticles: boolean;
  quantumButtons: boolean;
  enhancedAnimations: boolean;
  performanceMonitoring: boolean;
}

// Default feature flags - can be overridden by environment variables
export const defaultFeatureFlags: FeatureFlags = {
  quantumOrbs: process.env.NEXT_PUBLIC_ENABLE_QUANTUM_ORBS === 'true',
  flowingParticles: process.env.NEXT_PUBLIC_ENABLE_FLOWING_PARTICLES === 'true',
  quantumButtons: process.env.NEXT_PUBLIC_ENABLE_QUANTUM_BUTTONS === 'true',
  enhancedAnimations: process.env.NEXT_PUBLIC_ENABLE_ENHANCED_ANIMATIONS === 'true',
  performanceMonitoring: process.env.NODE_ENV === 'development',
};

// Feature flag context for React components
export function useFeatureFlags(): FeatureFlags {
  // In production, you might fetch these from a service
  // For now, using environment variables and defaults
  return {
    quantumOrbs: process.env.NEXT_PUBLIC_ENABLE_QUANTUM_ORBS === 'true' || true, // Default enabled
    flowingParticles: process.env.NEXT_PUBLIC_ENABLE_FLOWING_PARTICLES === 'true' || true,
    quantumButtons: process.env.NEXT_PUBLIC_ENABLE_QUANTUM_BUTTONS === 'true' || true,
    enhancedAnimations: process.env.NEXT_PUBLIC_ENABLE_ENHANCED_ANIMATIONS === 'true' || true,
    performanceMonitoring: process.env.NODE_ENV === 'development',
  };
}

// Performance-based feature disabling
export function getPerformanceAdjustedFlags(fps: number, animationCount: number): Partial<FeatureFlags> {
  const adjustments: Partial<FeatureFlags> = {};

  // Disable heavy features if performance is poor
  if (fps < 30) {
    adjustments.flowingParticles = false;
    adjustments.enhancedAnimations = false;
  }

  if (fps < 45) {
    adjustments.quantumOrbs = false;
  }

  if (animationCount > 8) {
    adjustments.flowingParticles = false;
  }

  return adjustments;
}