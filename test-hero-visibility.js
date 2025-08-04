/**
 * HERO SECTION VISIBILITY & USABILITY TEST SUITE
 * Tests button visibility, animation performance, content readability, and accessibility
 */

class HeroVisibilityTester {
  constructor() {
    this.testResults = {
      buttonVisibility: [],
      animationPerformance: [],
      contentReadability: [],
      accessibility: [],
      usability: [],
      crossDevice: []
    };
    this.performanceMetrics = {
      fps: [],
      memoryUsage: [],
      cpuUsage: []
    };
  }

  // BUTTON VISIBILITY TESTING (HIGH PRIORITY)
  async testButtonVisibility() {
    console.log('🔍 Testing Button Visibility...');
    
    const buttons = document.querySelectorAll('button, a[role="button"]');
    const results = [];
    
    for (const button of buttons) {
      const rect = button.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(button);
      
      // Test contrast ratio
      const bgColor = this.extractRGBFromComputedStyle(computedStyle.backgroundColor);
      const textColor = this.extractRGBFromComputedStyle(computedStyle.color);
      const contrastRatio = this.calculateContrastRatio(bgColor, textColor);
      
      // Test visibility against animated background
      const visibility = {
        element: button.textContent.trim(),
        position: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
        contrastRatio: contrastRatio,
        contrastPass: contrastRatio >= 4.5, // WCAG AA standard
        zIndex: parseInt(computedStyle.zIndex) || 0,
        opacity: parseFloat(computedStyle.opacity),
        backgroundColor: computedStyle.backgroundColor,
        textColor: computedStyle.color,
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        boxShadow: computedStyle.boxShadow,
        isVisible: rect.width > 0 && rect.height > 0,
        isInViewport: this.isInViewport(rect)
      };
      
      // Test hover states
      button.dispatchEvent(new Event('mouseenter'));
      await this.delay(100);
      const hoverStyle = window.getComputedStyle(button);
      visibility.hoverContrast = this.calculateContrastRatio(
        this.extractRGBFromComputedStyle(hoverStyle.backgroundColor),
        this.extractRGBFromComputedStyle(hoverStyle.color)
      );
      button.dispatchEvent(new Event('mouseleave'));
      
      results.push(visibility);
    }
    
    this.testResults.buttonVisibility = results;
    return results;
  }

  // ANIMATION PERFORMANCE TESTING (HIGH PRIORITY)
  async testAnimationPerformance() {
    console.log('⚡ Testing Animation Performance...');
    
    const performanceObserver = this.createPerformanceObserver();
    const fpsCounter = this.createFPSCounter();
    
    // Test for 10 seconds
    const testDuration = 10000;
    const startTime = performance.now();
    
    while (performance.now() - startTime < testDuration) {
      await this.delay(100);
      
      // Check for frame drops
      const currentFPS = fpsCounter.getCurrentFPS();
      this.performanceMetrics.fps.push(currentFPS);
      
      // Check memory usage
      if (performance.memory) {
        this.performanceMetrics.memoryUsage.push({
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        });
      }
    }
    
    const avgFPS = this.performanceMetrics.fps.reduce((a, b) => a + b, 0) / this.performanceMetrics.fps.length;
    const minFPS = Math.min(...this.performanceMetrics.fps);
    
    const animationResults = {
      averageFPS: avgFPS,
      minimumFPS: minFPS,
      frameDrops: this.performanceMetrics.fps.filter(fps => fps < 55).length,
      performanceGrade: avgFPS >= 58 ? 'A' : avgFPS >= 50 ? 'B' : avgFPS >= 40 ? 'C' : 'D',
      memoryGrowth: this.calculateMemoryGrowth(),
      animatedElements: this.countAnimatedElements()
    };
    
    this.testResults.animationPerformance = animationResults;
    return animationResults;
  }

  // CONTENT READABILITY TESTING (HIGH PRIORITY)
  async testContentReadability() {
    console.log('📖 Testing Content Readability...');
    
    const heroSection = document.querySelector('section');
    const headings = heroSection.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = heroSection.querySelectorAll('p');
    
    const readabilityResults = [];
    
    // Test headlines
    for (const heading of headings) {
      const style = window.getComputedStyle(heading);
      const rect = heading.getBoundingClientRect();
      
      readabilityResults.push({
        element: 'heading',
        text: heading.textContent.slice(0, 50) + '...',
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        color: style.color,
        backgroundColor: this.getEffectiveBackgroundColor(heading),
        contrastRatio: this.calculateElementContrast(heading),
        isReadable: this.isTextReadable(heading),
        position: { x: rect.left, y: rect.top },
        visibility: rect.width > 0 && rect.height > 0
      });
    }
    
    // Test paragraphs
    for (const paragraph of paragraphs) {
      const style = window.getComputedStyle(paragraph);
      const rect = paragraph.getBoundingClientRect();
      
      readabilityResults.push({
        element: 'paragraph',
        text: paragraph.textContent.slice(0, 50) + '...',
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        color: style.color,
        backgroundColor: this.getEffectiveBackgroundColor(paragraph),
        contrastRatio: this.calculateElementContrast(paragraph),
        isReadable: this.isTextReadable(paragraph),
        position: { x: rect.left, y: rect.top },
        visibility: rect.width > 0 && rect.height > 0
      });
    }
    
    this.testResults.contentReadability = readabilityResults;
    return readabilityResults;
  }

  // COMPREHENSIVE USABILITY TESTING (HIGH PRIORITY)
  async testUsability() {
    console.log('🎯 Testing Usability...');
    
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    const usabilityResults = [];
    
    for (const element of interactiveElements) {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      
      // Test click target size
      const minTouchTarget = 44; // 44px minimum for accessibility
      const touchTargetPass = rect.width >= minTouchTarget && rect.height >= minTouchTarget;
      
      // Test keyboard navigation
      const keyboardAccessible = element.tabIndex !== -1 && 
                                 (element.tagName === 'BUTTON' || 
                                  element.tagName === 'A' || 
                                  element.hasAttribute('tabindex'));
      
      // Test focus indicators
      element.focus();
      const focusStyle = window.getComputedStyle(element);
      const hasFocusIndicator = focusStyle.outline !== 'none' || 
                               focusStyle.boxShadow.includes('focus') ||
                               focusStyle.border !== style.border;
      
      usabilityResults.push({
        element: element.tagName.toLowerCase(),
        text: element.textContent?.trim() || element.getAttribute('aria-label') || 'No text',
        touchTargetSize: { width: rect.width, height: rect.height },
        touchTargetPass: touchTargetPass,
        keyboardAccessible: keyboardAccessible,
        hasFocusIndicator: hasFocusIndicator,
        position: { x: rect.left, y: rect.top },
        zIndex: parseInt(style.zIndex) || 0,
        isClickable: this.isElementClickable(element),
        isObscured: this.isElementObscured(element)
      });
      
      element.blur();
    }
    
    this.testResults.usability = usabilityResults;
    return usabilityResults;
  }

  // ACCESSIBILITY COMPLIANCE TESTING (WCAG 2.1 AA)
  async testAccessibility() {
    console.log('♿ Testing Accessibility Compliance...');
    
    const accessibilityResults = {
      colorContrast: [],
      keyboardNavigation: true,
      focusManagement: true,
      ariaLabels: [],
      semanticStructure: true,
      motionReduction: true
    };
    
    // Test color contrast ratios
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button, a');
    for (const element of textElements) {
      const contrast = this.calculateElementContrast(element);
      accessibilityResults.colorContrast.push({
        element: element.tagName.toLowerCase(),
        text: element.textContent?.slice(0, 30) + '...',
        contrast: contrast,
        pass: contrast >= 4.5,
        level: contrast >= 7 ? 'AAA' : contrast >= 4.5 ? 'AA' : 'Fail'
      });
    }
    
    // Test ARIA labels
    const interactiveElements = document.querySelectorAll('button, a, input, [role]');
    for (const element of interactiveElements) {
      accessibilityResults.ariaLabels.push({
        element: element.tagName.toLowerCase(),
        hasAriaLabel: element.hasAttribute('aria-label'),
        hasAriaDescribedBy: element.hasAttribute('aria-describedby'),
        hasTitle: element.hasAttribute('title'),
        textContent: element.textContent?.trim() || 'No text'
      });
    }
    
    // Test motion reduction preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    accessibilityResults.motionReduction = prefersReducedMotion;
    
    this.testResults.accessibility = accessibilityResults;
    return accessibilityResults;
  }

  // UTILITY METHODS
  calculateContrastRatio(color1, color2) {
    const luminance1 = this.getLuminance(color1);
    const luminance2 = this.getLuminance(color2);
    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  getLuminance(rgb) {
    const [r, g, b] = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  extractRGBFromComputedStyle(colorString) {
    const match = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [255, 255, 255];
  }

  calculateElementContrast(element) {
    const style = window.getComputedStyle(element);
    const textColor = this.extractRGBFromComputedStyle(style.color);
    const bgColor = this.getEffectiveBackgroundColor(element);
    return this.calculateContrastRatio(textColor, bgColor);
  }

  getEffectiveBackgroundColor(element) {
    let currentElement = element;
    while (currentElement && currentElement !== document.body) {
      const style = window.getComputedStyle(currentElement);
      const bgColor = style.backgroundColor;
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return this.extractRGBFromComputedStyle(bgColor);
      }
      currentElement = currentElement.parentElement;
    }
    return [255, 255, 255]; // Default to white
  }

  isTextReadable(element) {
    const contrast = this.calculateElementContrast(element);
    const style = window.getComputedStyle(element);
    const fontSize = parseFloat(style.fontSize);
    
    // Large text (18pt+) needs 3:1, normal text needs 4.5:1
    const minContrast = fontSize >= 18 ? 3 : 4.5;
    return contrast >= minContrast;
  }

  createFPSCounter() {
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 60;
    
    const updateFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(updateFPS);
    };
    
    updateFPS();
    
    return {
      getCurrentFPS: () => fps
    };
  }

  createPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure') {
            console.log(`Performance measure: ${entry.name} took ${entry.duration}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      return observer;
    }
    return null;
  }

  countAnimatedElements() {
    return document.querySelectorAll('[style*="animation"], [class*="animate"]').length;
  }

  calculateMemoryGrowth() {
    if (!performance.memory || this.performanceMetrics.memoryUsage.length < 2) return 0;
    const initial = this.performanceMetrics.memoryUsage[0].used;
    const final = this.performanceMetrics.memoryUsage[this.performanceMetrics.memoryUsage.length - 1].used;
    return ((final - initial) / initial) * 100;
  }

  isInViewport(rect) {
    return rect.top >= 0 && rect.left >= 0 && 
           rect.bottom <= window.innerHeight && 
           rect.right <= window.innerWidth;
  }

  isElementClickable(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const topElement = document.elementFromPoint(centerX, centerY);
    return topElement === element || element.contains(topElement);
  }

  isElementObscured(element) {
    return !this.isElementClickable(element);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // GENERATE COMPREHENSIVE REPORT
  generateReport() {
    console.log('📊 Generating Comprehensive Test Report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      testSummary: {
        buttonVisibilityPass: this.testResults.buttonVisibility.every(b => b.contrastPass),
        averageFPS: this.testResults.animationPerformance.averageFPS,
        accessibilityCompliant: this.testResults.accessibility.colorContrast.every(c => c.pass),
        usabilityScore: this.calculateUsabilityScore()
      },
      detailedResults: this.testResults,
      performanceMetrics: this.performanceMetrics,
      recommendations: this.generateRecommendations()
    };
    
    console.table(report.testSummary);
    return report;
  }

  calculateUsabilityScore() {
    const usabilityResults = this.testResults.usability;
    if (!usabilityResults.length) return 0;
    
    const scores = usabilityResults.map(result => {
      let score = 0;
      if (result.touchTargetPass) score += 25;
      if (result.keyboardAccessible) score += 25;
      if (result.hasFocusIndicator) score += 25;
      if (result.isClickable && !result.isObscured) score += 25;
      return score;
    });
    
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Button visibility recommendations
    const lowContrastButtons = this.testResults.buttonVisibility.filter(b => !b.contrastPass);
    if (lowContrastButtons.length > 0) {
      recommendations.push({
        category: 'Button Visibility',
        severity: 'High',
        issue: `${lowContrastButtons.length} buttons have insufficient contrast`,
        solution: 'Increase button background opacity or add stronger shadows/borders'
      });
    }
    
    // Performance recommendations
    if (this.testResults.animationPerformance.averageFPS < 55) {
      recommendations.push({
        category: 'Animation Performance',
        severity: 'High',
        issue: `Low FPS detected (${this.testResults.animationPerformance.averageFPS.toFixed(1)})`,
        solution: 'Reduce particle count, optimize animations, or add performance toggle'
      });
    }
    
    // Accessibility recommendations
    const failedContrast = this.testResults.accessibility.colorContrast.filter(c => !c.pass);
    if (failedContrast.length > 0) {
      recommendations.push({
        category: 'Accessibility',
        severity: 'High',
        issue: `${failedContrast.length} elements fail WCAG contrast requirements`,
        solution: 'Adjust text colors or background opacity for better contrast'
      });
    }
    
    return recommendations;
  }
}

// AUTO-RUN TESTS
async function runHeroVisibilityTests() {
  console.log('🚀 Starting Hero Section Visibility & Usability Tests...');
  
  const tester = new HeroVisibilityTester();
  
  try {
    await tester.testButtonVisibility();
    await tester.testAnimationPerformance();
    await tester.testContentReadability();
    await tester.testUsability();
    await tester.testAccessibility();
    
    const report = tester.generateReport();
    
    // Save report to localStorage for analysis
    localStorage.setItem('heroTestReport', JSON.stringify(report, null, 2));
    
    console.log('✅ Testing Complete! Report saved to localStorage["heroTestReport"]');
    return report;
    
  } catch (error) {
    console.error('❌ Testing failed:', error);
    return null;
  }
}

// Export for manual testing
if (typeof window !== 'undefined') {
  window.HeroVisibilityTester = HeroVisibilityTester;
  window.runHeroVisibilityTests = runHeroVisibilityTests;
}

// Auto-run if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runHeroVisibilityTests);
} else {
  setTimeout(runHeroVisibilityTests, 1000); // Wait for animations to start
}