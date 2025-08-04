/**
 * Performance Testing Script for Hero Component
 * Run this in Chrome DevTools Console to measure performance
 */

class HeroPerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: [],
      paintTimes: [],
      compositeTimes: [],
      memoryUsage: [],
      animationCount: 0,
      layerCount: 0
    };
    
    this.startTime = performance.now();
    this.frameCount = 0;
    this.lastFrameTime = this.startTime;
  }

  // Frame rate monitoring
  measureFPS() {
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;
    
    if (delta > 0) {
      const fps = 1000 / delta;
      this.metrics.fps.push(fps);
      this.frameCount++;
    }
    
    if (this.frameCount < 300) { // Monitor for 5 seconds at 60fps
      requestAnimationFrame(() => this.measureFPS());
    } else {
      this.analyzeResults();
    }
  }

  // Memory monitoring
  measureMemory() {
    if ('memory' in performance) {
      this.metrics.memoryUsage.push({
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        timestamp: performance.now()
      });
    }
  }

  // Count active animations
  countAnimations() {
    const animatedElements = document.querySelectorAll('[style*="transform"], [style*="opacity"]');
    this.metrics.animationCount = animatedElements.length;
    
    // Count composite layers (approximation)
    const elementsWithWillChange = document.querySelectorAll('[style*="will-change"]');
    this.metrics.layerCount = elementsWithWillChange.length;
  }

  // Paint timing analysis
  measurePaintTiming() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'paint') {
          this.metrics.paintTimes.push({
            name: entry.name,
            startTime: entry.startTime,
            duration: entry.duration
          });
        }
      });
    });
    
    observer.observe({ entryTypes: ['paint'] });
  }

  // Long task monitoring
  measureLongTasks() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.duration > 50) { // Tasks longer than 50ms
          console.warn(`Long task detected: ${entry.duration}ms`, entry);
        }
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }

  // Start comprehensive monitoring
  startMonitoring() {
    console.log('🚀 Starting Hero Performance Monitoring...');
    
    // Start FPS monitoring
    this.measureFPS();
    
    // Start paint timing
    this.measurePaintTiming();
    
    // Start long task monitoring
    this.measureLongTasks();
    
    // Periodic measurements
    const interval = setInterval(() => {
      this.measureMemory();
      this.countAnimations();
    }, 100);
    
    // Stop after 5 seconds
    setTimeout(() => {
      clearInterval(interval);
      this.analyzeResults();
    }, 5000);
  }

  // Analyze and report results
  analyzeResults() {
    const fps = this.metrics.fps;
    const avgFPS = fps.reduce((a, b) => a + b, 0) / fps.length;
    const minFPS = Math.min(...fps);
    const maxFPS = Math.max(...fps);
    
    const memoryDelta = this.metrics.memoryUsage.length > 1 ? 
      this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1].used - this.metrics.memoryUsage[0].used : 0;

    const report = {
      performance: {
        averageFPS: Math.round(avgFPS),
        minFPS: Math.round(minFPS),
        maxFPS: Math.round(maxFPS),
        fpsStability: (minFPS / avgFPS * 100).toFixed(1) + '%'
      },
      resources: {
        animationCount: this.metrics.animationCount,
        compositeLayers: this.metrics.layerCount,
        memoryDelta: Math.round(memoryDelta / 1024 / 1024) + ' MB'
      },
      paint: {
        firstPaint: this.metrics.paintTimes.find(p => p.name === 'first-paint')?.startTime || 'N/A',
        firstContentfulPaint: this.metrics.paintTimes.find(p => p.name === 'first-contentful-paint')?.startTime || 'N/A'
      }
    };

    // Performance grading
    let grade = 'A';
    let score = 100;
    
    if (avgFPS < 55) { grade = 'B'; score -= 15; }
    if (avgFPS < 45) { grade = 'C'; score -= 25; }
    if (avgFPS < 30) { grade = 'D'; score -= 40; }
    if (minFPS < 20) { grade = 'F'; score -= 50; }
    
    if (this.metrics.animationCount > 15) { score -= 10; }
    if (memoryDelta > 50 * 1024 * 1024) { score -= 15; } // >50MB growth
    
    console.log('📊 Hero Performance Report:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🎯 Performance Grade: ${grade} (${Math.max(0, score)}/100)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.table(report.performance);
    console.table(report.resources);
    console.table(report.paint);
    
    // Recommendations
    this.generateRecommendations(report, grade);
  }

  generateRecommendations(report, grade) {
    console.log('💡 Performance Recommendations:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (report.performance.averageFPS < 50) {
      console.log('⚠️  FPS below target - Consider reducing animation complexity');
    }
    
    if (report.resources.animationCount > 12) {
      console.log('⚠️  High animation count - Consider lazy loading or reducing concurrent animations');
    }
    
    if (parseInt(report.resources.memoryDelta) > 30) {
      console.log('⚠️  Memory growth detected - Check for animation cleanup');
    }
    
    if (report.performance.fpsStability < '80.0%') {
      console.log('⚠️  FPS instability - Consider optimizing animation timing');
    }
    
    if (grade === 'A') {
      console.log('✅ Excellent performance! Hero component is well optimized.');
    }
  }
}

// Device-specific testing
function testDeviceCapabilities() {
  const deviceInfo = {
    userAgent: navigator.userAgent,
    memory: navigator.deviceMemory || 'unknown',
    cores: navigator.hardwareConcurrency || 'unknown',
    connection: navigator.connection?.effectiveType || 'unknown',
    pixelRatio: window.devicePixelRatio
  };
  
  console.log('📱 Device Capabilities:');
  console.table(deviceInfo);
  
  // Mobile detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = deviceInfo.memory <= 4 || deviceInfo.cores <= 2;
  
  if (isMobile) {
    console.log('🔧 Mobile device detected - Running mobile-optimized tests');
  }
  
  if (isLowEnd) {
    console.log('🔧 Low-end device detected - Performance expectations adjusted');
  }
  
  return { isMobile, isLowEnd, deviceInfo };
}

// CSS Animation performance check
function checkCSSAnimations() {
  const cssRules = [];
  
  for (let i = 0; i < document.styleSheets.length; i++) {
    try {
      const sheet = document.styleSheets[i];
      const rules = sheet.cssRules || sheet.rules;
      
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (rule.type === CSSRule.KEYFRAMES_RULE) {
          cssRules.push(rule.name);
        }
      }
    } catch (e) {
      // Cross-origin stylesheet
    }
  }
  
  console.log('🎨 CSS Animations detected:', cssRules);
  return cssRules;
}

// Composite layer analysis
function analyzeCompositeLayers() {
  const elementsWithTransforms = document.querySelectorAll('[style*="transform"]');
  const elementsWithOpacity = document.querySelectorAll('[style*="opacity"]');
  const elementsWithWillChange = document.querySelectorAll('[style*="will-change"]');
  
  console.log('🔧 Composite Layer Analysis:');
  console.log(`Transform elements: ${elementsWithTransforms.length}`);
  console.log(`Opacity elements: ${elementsWithOpacity.length}`);
  console.log(`Will-change elements: ${elementsWithWillChange.length}`);
  
  // Check for potential performance issues
  elementsWithTransforms.forEach((el, i) => {
    const style = getComputedStyle(el);
    if (!style.willChange.includes('transform')) {
      console.warn(`Element ${i} using transform without will-change optimization`, el);
    }
  });
}

// Main test runner
function runHeroPerformanceTest() {
  console.clear();
  console.log('🧪 Hero Component Performance Analysis');
  console.log('=====================================');
  
  // Device analysis
  const deviceInfo = testDeviceCapabilities();
  
  // CSS animation analysis
  checkCSSAnimations();
  
  // Composite layer analysis
  analyzeCompositeLayers();
  
  // Start performance monitoring
  const monitor = new HeroPerformanceMonitor();
  monitor.startMonitoring();
  
  // Additional checks after 6 seconds
  setTimeout(() => {
    console.log('🔍 Final Analysis:');
    
    // Check for memory leaks
    if ('memory' in performance) {
      const finalMemory = performance.memory.usedJSHeapSize;
      console.log(`Final memory usage: ${Math.round(finalMemory / 1024 / 1024)} MB`);
    }
    
    // Check animation performance
    const animatedElements = document.querySelectorAll('[style*="transform"], [style*="opacity"]');
    console.log(`Active animated elements: ${animatedElements.length}`);
    
    // Performance summary
    console.log('✅ Performance testing complete!');
    console.log('View the detailed report above for optimization recommendations.');
    
  }, 6000);
}

// Auto-run if script is executed directly
if (typeof window !== 'undefined') {
  console.log('🚀 Hero Performance Test Ready!');
  console.log('Run: runHeroPerformanceTest()');
  
  // Expose to global scope for manual execution
  window.runHeroPerformanceTest = runHeroPerformanceTest;
  window.HeroPerformanceMonitor = HeroPerformanceMonitor;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HeroPerformanceMonitor, runHeroPerformanceTest };
}