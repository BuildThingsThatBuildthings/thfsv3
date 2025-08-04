/**
 * HERO ANIMATION PERFORMANCE MONITOR
 * Real-time performance tracking for particles, waves, and gradients
 */

class HeroPerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: [],
      frameTime: [],
      memory: [],
      cpuTime: [],
      animationElements: 0,
      renderTime: []
    };
    
    this.thresholds = {
      minFPS: 55,
      maxFrameTime: 18, // ~60fps = 16.67ms per frame
      maxMemoryGrowth: 10, // 10% growth threshold
      maxCPUTime: 50 // 50% CPU usage threshold
    };
    
    this.isMonitoring = false;
    this.startTime = null;
    this.frameCount = 0;
    this.lastFrameTime = 0;
  }

  startMonitoring() {
    console.log('🔍 Starting Hero Animation Performance Monitor...');
    this.isMonitoring = true;
    this.startTime = performance.now();
    this.monitorLoop();
    this.setupPerformanceObserver();
    this.countAnimationElements();
  }

  stopMonitoring() {
    this.isMonitoring = false;
    console.log('⏹️ Performance monitoring stopped');
    return this.generatePerformanceReport();
  }

  monitorLoop() {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    const frameTime = currentTime - this.lastFrameTime;
    
    // Calculate FPS
    this.frameCount++;
    const elapsed = currentTime - this.startTime;
    const currentFPS = (this.frameCount / elapsed) * 1000;
    
    // Store metrics
    this.metrics.fps.push(currentFPS);
    this.metrics.frameTime.push(frameTime);
    
    // Monitor memory if available
    if (performance.memory) {
      this.metrics.memory.push({
        used: performance.memory.usedJSHeapSize / 1048576, // Convert to MB
        total: performance.memory.totalJSHeapSize / 1048576,
        timestamp: currentTime
      });
    }
    
    // Monitor render performance
    this.measureRenderTime();
    
    this.lastFrameTime = currentTime;
    requestAnimationFrame(() => this.monitorLoop());
  }

  measureRenderTime() {
    const startRender = performance.now();
    
    // Measure time to query animated elements
    const animatedElements = document.querySelectorAll(`
      .gpu-accelerated,
      [style*="transform"],
      [style*="opacity"],
      [class*="animate"],
      motion-div
    `);
    
    const endRender = performance.now();
    this.metrics.renderTime.push(endRender - startRender);
  }

  countAnimationElements() {
    // Count all animation elements in hero section
    const heroSection = document.querySelector('section');
    if (!heroSection) return;

    const quantumOrbs = heroSection.querySelectorAll('[class*="QuantumOrb"], [class*="quantum-orb"]');
    const flowingParticles = heroSection.querySelectorAll('[class*="FlowingParticle"], [class*="flowing-particle"]');
    const energyWaves = heroSection.querySelectorAll('svg path');
    const gradientAnimations = heroSection.querySelectorAll('[class*="motion-"], [style*="animation"]');
    
    this.metrics.animationElements = {
      quantumOrbs: quantumOrbs.length,
      flowingParticles: flowingParticles.length,
      energyWaves: energyWaves.length,
      gradientAnimations: gradientAnimations.length,
      total: quantumOrbs.length + flowingParticles.length + energyWaves.length + gradientAnimations.length
    };
    
    console.log('📊 Animation Elements Count:', this.metrics.animationElements);
  }

  setupPerformanceObserver() {
    if (!('PerformanceObserver' in window)) return;

    // Monitor layout thrashing
    const layoutObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'layout' && entry.duration > 5) {
          console.warn('⚠️ Layout thrashing detected:', entry.duration + 'ms');
        }
      }
    });

    // Monitor paint timing
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint') {
          console.log(`🎨 ${entry.name}: ${entry.startTime}ms`);
        }
      }
    });

    try {
      layoutObserver.observe({ entryTypes: ['measure'] });
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('Performance observers not fully supported');
    }
  }

  // TEST SPECIFIC PERFORMANCE SCENARIOS
  async testHeavyAnimationLoad() {
    console.log('🧪 Testing Heavy Animation Load...');
    
    const testResults = {
      baselinePerformance: null,
      stressTestPerformance: null,
      memoryLeakDetection: null
    };

    // Baseline measurement (5 seconds)
    this.resetMetrics();
    await this.delay(5000);
    testResults.baselinePerformance = this.getCurrentPerformanceSnapshot();

    // Stress test - add extra animations temporarily
    const tempParticles = this.createTemporaryParticles(20);
    await this.delay(5000);
    testResults.stressTestPerformance = this.getCurrentPerformanceSnapshot();

    // Clean up temporary elements
    tempParticles.forEach(el => el.remove());

    // Memory leak detection (monitor for additional 5 seconds)
    await this.delay(5000);
    testResults.memoryLeakDetection = this.detectMemoryLeaks();

    return testResults;
  }

  createTemporaryParticles(count) {
    const heroSection = document.querySelector('section');
    const particles = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-sage-300 rounded-full opacity-30 gpu-accelerated test-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `test-float ${3 + Math.random() * 2}s ease-in-out infinite`;
      
      heroSection.appendChild(particle);
      particles.push(particle);
    }

    return particles;
  }

  detectMemoryLeaks() {
    if (!performance.memory) return null;

    const memoryHistory = this.metrics.memory.slice(-30); // Last 30 measurements
    if (memoryHistory.length < 10) return null;

    const firstMemory = memoryHistory[0].used;
    const lastMemory = memoryHistory[memoryHistory.length - 1].used;
    const memoryGrowth = ((lastMemory - firstMemory) / firstMemory) * 100;

    return {
      initialMemory: firstMemory,
      finalMemory: lastMemory,
      growthPercentage: memoryGrowth,
      isLeaking: memoryGrowth > this.thresholds.maxMemoryGrowth,
      trend: this.calculateMemoryTrend(memoryHistory)
    };
  }

  calculateMemoryTrend(memoryData) {
    if (memoryData.length < 5) return 'insufficient_data';
    
    const recent = memoryData.slice(-5);
    const older = memoryData.slice(0, 5);
    
    const recentAvg = recent.reduce((sum, m) => sum + m.used, 0) / recent.length;
    const olderAvg = older.reduce((sum, m) => sum + m.used, 0) / older.length;
    
    if (recentAvg > olderAvg * 1.05) return 'increasing';
    if (recentAvg < olderAvg * 0.95) return 'decreasing';
    return 'stable';
  }

  getCurrentPerformanceSnapshot() {
    const recentMetrics = {
      fps: this.metrics.fps.slice(-30),
      frameTime: this.metrics.frameTime.slice(-30),
      renderTime: this.metrics.renderTime.slice(-30)
    };

    return {
      averageFPS: this.average(recentMetrics.fps),
      minFPS: Math.min(...recentMetrics.fps),
      maxFrameTime: Math.max(...recentMetrics.frameTime),
      averageRenderTime: this.average(recentMetrics.renderTime),
      performanceGrade: this.calculatePerformanceGrade(recentMetrics.fps)
    };
  }

  calculatePerformanceGrade(fpsArray) {
    const avgFPS = this.average(fpsArray);
    const consistency = this.calculateConsistency(fpsArray);
    
    if (avgFPS >= 58 && consistency > 0.9) return 'A+';
    if (avgFPS >= 55 && consistency > 0.8) return 'A';
    if (avgFPS >= 50 && consistency > 0.7) return 'B';
    if (avgFPS >= 40 && consistency > 0.6) return 'C';
    if (avgFPS >= 30) return 'D';
    return 'F';
  }

  calculateConsistency(values) {
    if (values.length === 0) return 0;
    const avg = this.average(values);
    const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    return Math.max(0, 1 - (stdDev / avg));
  }

  // DEVICE-SPECIFIC TESTING
  async testCrossDevicePerformance() {
    console.log('📱 Testing Cross-Device Performance...');
    
    const deviceInfo = this.getDeviceInfo();
    const performanceTests = [];

    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667, name: 'Mobile Portrait' },
      { width: 768, height: 1024, name: 'Tablet Portrait' },
      { width: 1024, height: 768, name: 'Tablet Landscape' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];

    for (const viewport of viewports) {
      // Simulate viewport (limited simulation in browser)
      document.documentElement.style.width = viewport.width + 'px';
      document.documentElement.style.height = viewport.height + 'px';
      
      await this.delay(2000); // Let animations settle
      
      const performanceSnapshot = this.getCurrentPerformanceSnapshot();
      performanceTests.push({
        viewport: viewport.name,
        dimensions: `${viewport.width}x${viewport.height}`,
        performance: performanceSnapshot
      });
    }

    // Reset viewport
    document.documentElement.style.width = '';
    document.documentElement.style.height = '';

    return {
      deviceInfo,
      viewportTests: performanceTests,
      recommendations: this.generateDeviceRecommendations(performanceTests)
    };
  }

  getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      memory: navigator.deviceMemory || 'unknown',
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink
      } : 'unknown',
      pixelRatio: window.devicePixelRatio,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`
    };
  }

  generateDeviceRecommendations(tests) {
    const recommendations = [];
    
    tests.forEach(test => {
      if (test.performance.averageFPS < 45) {
        recommendations.push({
          device: test.viewport,
          issue: `Low FPS (${test.performance.averageFPS.toFixed(1)})`,
          recommendation: 'Consider reducing particle count or animation complexity for this viewport'
        });
      }
      
      if (test.performance.maxFrameTime > 25) {
        recommendations.push({
          device: test.viewport,
          issue: `High frame time (${test.performance.maxFrameTime.toFixed(1)}ms)`,
          recommendation: 'Optimize animations or add performance mode toggle'
        });
      }
    });
    
    return recommendations;
  }

  resetMetrics() {
    this.metrics = {
      fps: [],
      frameTime: [],
      memory: [],
      cpuTime: [],
      animationElements: 0,
      renderTime: []
    };
    this.frameCount = 0;
    this.startTime = performance.now();
  }

  generatePerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      duration: (performance.now() - this.startTime) / 1000,
      summary: {
        averageFPS: this.average(this.metrics.fps),
        minFPS: Math.min(...this.metrics.fps),
        maxFPS: Math.max(...this.metrics.fps),
        averageFrameTime: this.average(this.metrics.frameTime),
        maxFrameTime: Math.max(...this.metrics.frameTime),
        performanceGrade: this.calculatePerformanceGrade(this.metrics.fps),
        consistency: this.calculateConsistency(this.metrics.fps)
      },
      animationElements: this.metrics.animationElements,
      memoryUsage: this.analyzeMemoryUsage(),
      recommendations: this.generatePerformanceRecommendations(),
      rawMetrics: {
        fps: this.metrics.fps,
        frameTime: this.metrics.frameTime,
        memory: this.metrics.memory
      }
    };

    console.log('📊 Performance Report Generated:', report.summary);
    return report;
  }

  analyzeMemoryUsage() {
    if (!this.metrics.memory.length) return null;

    const initial = this.metrics.memory[0];
    const final = this.metrics.memory[this.metrics.memory.length - 1];
    const peak = Math.max(...this.metrics.memory.map(m => m.used));

    return {
      initial: initial.used,
      final: final.used,
      peak: peak,
      growth: ((final.used - initial.used) / initial.used) * 100,
      trend: this.calculateMemoryTrend(this.metrics.memory)
    };
  }

  generatePerformanceRecommendations() {
    const recommendations = [];
    const summary = {
      averageFPS: this.average(this.metrics.fps),
      maxFrameTime: Math.max(...this.metrics.frameTime),
      consistency: this.calculateConsistency(this.metrics.fps)
    };

    if (summary.averageFPS < this.thresholds.minFPS) {
      recommendations.push({
        category: 'FPS',
        severity: 'high',
        issue: `Average FPS (${summary.averageFPS.toFixed(1)}) below threshold (${this.thresholds.minFPS})`,
        solutions: [
          'Reduce particle count in FlowingParticle components',
          'Decrease QuantumOrb animation frequency',
          'Simplify EnergyWave path calculations',
          'Add performance mode toggle for low-end devices'
        ]
      });
    }

    if (summary.maxFrameTime > this.thresholds.maxFrameTime) {
      recommendations.push({
        category: 'Frame Time',
        severity: 'medium',
        issue: `Max frame time (${summary.maxFrameTime.toFixed(1)}ms) exceeds threshold (${this.thresholds.maxFrameTime}ms)`,
        solutions: [
          'Optimize CSS transforms to use GPU acceleration',
          'Reduce simultaneous animations',
          'Use will-change property sparingly'
        ]
      });
    }

    if (summary.consistency < 0.8) {
      recommendations.push({
        category: 'Consistency',
        severity: 'medium',
        issue: `Animation consistency (${(summary.consistency * 100).toFixed(1)}%) needs improvement`,
        solutions: [
          'Add requestAnimationFrame throttling',
          'Implement adaptive quality based on performance',
          'Stagger animation start times'
        ]
      });
    }

    return recommendations;
  }

  // UTILITY METHODS
  average(array) {
    return array.length ? array.reduce((a, b) => a + b, 0) / array.length : 0;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// PERFORMANCE TESTING AUTOMATION
async function runHeroPerformanceTests() {
  console.log('🚀 Starting Hero Animation Performance Tests...');
  
  const monitor = new HeroPerformanceMonitor();
  
  try {
    // Start basic monitoring
    monitor.startMonitoring();
    
    // Run for 10 seconds to get baseline
    await monitor.delay(10000);
    
    // Test heavy load scenarios
    const stressTest = await monitor.testHeavyAnimationLoad();
    
    // Test cross-device performance
    const deviceTest = await monitor.testCrossDevicePerformance();
    
    // Stop monitoring and generate report
    const finalReport = monitor.stopMonitoring();
    
    // Combine all results
    const comprehensiveReport = {
      ...finalReport,
      stressTest,
      deviceTest,
      testComplete: true
    };
    
    // Save to localStorage
    localStorage.setItem('heroPerformanceReport', JSON.stringify(comprehensiveReport, null, 2));
    
    console.log('✅ Performance testing complete! Report saved to localStorage["heroPerformanceReport"]');
    return comprehensiveReport;
    
  } catch (error) {
    console.error('❌ Performance testing failed:', error);
    return null;
  }
}

// Export for manual use
if (typeof window !== 'undefined') {
  window.HeroPerformanceMonitor = HeroPerformanceMonitor;
  window.runHeroPerformanceTests = runHeroPerformanceTests;
}

// Auto-run after page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runHeroPerformanceTests, 2000);
  });
} else {
  setTimeout(runHeroPerformanceTests, 2000);
}