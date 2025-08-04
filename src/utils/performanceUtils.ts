// Performance testing and monitoring utilities

// Type definitions for performance monitoring
interface PerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface ExtendedPerformance extends Performance {
  memory?: PerformanceMemory;
}

interface WebGLDebugRendererInfo {
  UNMASKED_VENDOR_WEBGL: number;
  UNMASKED_RENDERER_WEBGL: number;
}

export interface PerformanceBenchmark {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

class PerformanceTracker {
  private benchmarks: Map<string, PerformanceBenchmark> = new Map();
  private animationFrameId: number | null = null;
  private frameCount = 0;
  private lastFpsCheck = 0;
  private currentFps = 60;

  // Start a performance benchmark
  startBenchmark(name: string): void {
    this.benchmarks.set(name, {
      name,
      startTime: performance.now(),
    });
  }

  // End a performance benchmark
  endBenchmark(name: string): PerformanceBenchmark | null {
    const benchmark = this.benchmarks.get(name);
    if (!benchmark) {
      console.warn(`Benchmark "${name}" not found`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - benchmark.startTime;

    const completedBenchmark = {
      ...benchmark,
      endTime,
      duration,
    };

    this.benchmarks.set(name, completedBenchmark);
    return completedBenchmark;
  }

  // Get all benchmarks
  getBenchmarks(): PerformanceBenchmark[] {
    return Array.from(this.benchmarks.values());
  }

  // Clear all benchmarks
  clearBenchmarks(): void {
    this.benchmarks.clear();
  }

  // Start FPS monitoring
  startFpsMonitoring(callback?: (fps: number) => void): void {
    const checkFps = () => {
      this.frameCount++;
      const now = performance.now();

      if (now >= this.lastFpsCheck + 1000) {
        this.currentFps = Math.round((this.frameCount * 1000) / (now - this.lastFpsCheck));
        this.frameCount = 0;
        this.lastFpsCheck = now;

        if (callback) {
          callback(this.currentFps);
        }
      }

      this.animationFrameId = requestAnimationFrame(checkFps);
    };

    this.lastFpsCheck = performance.now();
    this.animationFrameId = requestAnimationFrame(checkFps);
  }

  // Stop FPS monitoring
  stopFpsMonitoring(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // Get current FPS
  getCurrentFps(): number {
    return this.currentFps;
  }
}

// Global performance tracker instance
export const performanceTracker = new PerformanceTracker();

// Utility functions for performance testing
export const performanceUtils = {
  // Test component render performance
  testComponentRender: (componentName: string, renderFn: () => void) => {
    performanceTracker.startBenchmark(`${componentName}-render`);
    renderFn();
    const result = performanceTracker.endBenchmark(`${componentName}-render`);
    
    if (result && result.duration! > 16) { // More than one frame at 60fps
      console.warn(`Slow render detected for ${componentName}: ${result.duration}ms`);
    }
    
    return result;
  },

  // Test animation performance
  testAnimationPerformance: (animationName: string, duration: number = 5000) => {
    return new Promise<{ avgFps: number; minFps: number; maxFps: number }>((resolve) => {
      const fpsReadings: number[] = [];
      const startTime = performance.now();

      const monitor = (fps: number) => {
        fpsReadings.push(fps);
        
        if (performance.now() - startTime >= duration) {
          performanceTracker.stopFpsMonitoring();
          
          const avgFps = fpsReadings.reduce((sum, fps) => sum + fps, 0) / fpsReadings.length;
          const minFps = Math.min(...fpsReadings);
          const maxFps = Math.max(...fpsReadings);
          
          resolve({ avgFps, minFps, maxFps });
        }
      };

      performanceTracker.startFpsMonitoring(monitor);
    });
  },

  // Memory usage monitoring
  getMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as ExtendedPerformance).memory;
      if (memory) {
        return {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
        };
      }
    }
    return null;
  },

  // Check if device is low-end
  isLowEndDevice: () => {
    // Simple heuristics for low-end device detection
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    
    if (!gl) return true; // No WebGL support
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter((debugInfo as WebGLDebugRendererInfo).UNMASKED_RENDERER_WEBGL).toLowerCase();
      // Check for common low-end GPU indicators
      if (renderer.includes('intel hd') || renderer.includes('intel(r) hd') || 
          renderer.includes('mali') || renderer.includes('adreno 3')) {
        return true;
      }
    }

    // Check for low memory
    const memory = performanceUtils.getMemoryUsage();
    if (memory && memory.limit < 1000) { // Less than 1GB heap limit
      return true;
    }

    return false;
  },
};

// Performance testing constants
export const PERFORMANCE_TARGETS = {
  FPS_TARGET: 60,
  FPS_MINIMUM: 30,
  RENDER_TIME_TARGET: 16, // ms (60fps = 16ms per frame)
  MEMORY_WARNING_THRESHOLD: 100, // MB
  ANIMATION_COUNT_LIMIT: 8,
} as const;