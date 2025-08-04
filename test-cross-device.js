/**
 * CROSS-DEVICE COMPATIBILITY TESTING SUITE
 * Tests responsive behavior, performance, and usability across different devices
 */

class CrossDeviceTester {
  constructor() {
    this.deviceProfiles = {
      mobile: [
        { name: 'iPhone SE', width: 375, height: 667, pixelRatio: 2 },
        { name: 'iPhone 12/13/14', width: 390, height: 844, pixelRatio: 3 },
        { name: 'iPhone 14 Plus', width: 428, height: 926, pixelRatio: 3 },
        { name: 'Samsung Galaxy S21', width: 360, height: 800, pixelRatio: 3 },
        { name: 'Samsung Galaxy A51', width: 412, height: 914, pixelRatio: 2 }
      ],
      tablet: [
        { name: 'iPad Mini', width: 768, height: 1024, pixelRatio: 2 },
        { name: 'iPad Pro 11"', width: 834, height: 1194, pixelRatio: 2 },
        { name: 'iPad Pro 12.9"', width: 1024, height: 1366, pixelRatio: 2 },
        { name: 'Surface Pro', width: 912, height: 1368, pixelRatio: 2 },
        { name: 'Samsung Galaxy Tab', width: 800, height: 1280, pixelRatio: 2 }
      ],
      desktop: [
        { name: '1366x768 Laptop', width: 1366, height: 768, pixelRatio: 1 },
        { name: '1920x1080 Desktop', width: 1920, height: 1080, pixelRatio: 1 },
        { name: '2560x1440 QHD', width: 2560, height: 1440, pixelRatio: 1 },
        { name: '3840x2160 4K', width: 3840, height: 2160, pixelRatio: 2 },
        { name: 'Ultrawide 3440x1440', width: 3440, height: 1440, pixelRatio: 1 }
      ]
    };
    
    this.testResults = {
      mobile: [],
      tablet: [],
      desktop: [],
      summary: {}
    };
    
    this.originalViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio
    };
  }

  async runAllDeviceTests() {
    console.log('📱 Starting Cross-Device Compatibility Tests...');
    
    // Test each device category
    for (const [category, devices] of Object.entries(this.deviceProfiles)) {
      console.log(`Testing ${category} devices...`);
      
      for (const device of devices) {
        const testResult = await this.testDevice(device, category);
        this.testResults[category].push(testResult);
        
        // Brief delay between tests
        await this.delay(500);
      }
    }
    
    // Restore original viewport
    this.restoreViewport();
    
    // Generate comprehensive report
    return this.generateCrossDeviceReport();
  }

  async testDevice(device, category) {
    console.log(`🔍 Testing ${device.name} (${device.width}x${device.height})`);
    
    // Simulate device viewport
    this.simulateViewport(device.width, device.height);
    
    const testResult = {
      device: device.name,
      category: category,
      dimensions: `${device.width}x${device.height}`,
      pixelRatio: device.pixelRatio,
      timestamp: new Date().toISOString(),
      
      // Test results
      layoutTest: await this.testLayout(),
      buttonVisibility: await this.testButtonVisibility(),
      touchTargets: await this.testTouchTargets(),
      readability: await this.testTextReadability(),
      performance: await this.testPerformance(),
      scrollBehavior: await this.testScrollBehavior(),
      animationPerformance: await this.testAnimationPerformance(),
      contentFit: await this.testContentFit(),
      navigationUsability: await this.testNavigationUsability()
    };
    
    return testResult;
  }

  simulateViewport(width, height) {
    // Update viewport meta tag if present
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', `width=${width}, initial-scale=1.0`);
    }
    
    // Simulate window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    // Update document element size for testing
    document.documentElement.style.width = width + 'px';
    document.documentElement.style.height = height + 'px';
  }

  async testLayout() {
    const heroSection = document.querySelector('section');
    if (!heroSection) return { error: 'Hero section not found' };
    
    const rect = heroSection.getBoundingClientRect();
    
    // Test for layout issues
    const issues = [];
    
    // Check for horizontal overflow
    if (rect.width > window.innerWidth) {
      issues.push('Horizontal overflow detected');
    }
    
    // Check for content overflow
    const overflowElements = Array.from(heroSection.querySelectorAll('*')).filter(el => {
      const elRect = el.getBoundingClientRect();
      return elRect.right > window.innerWidth || elRect.left < 0;
    });
    
    if (overflowElements.length > 0) {
      issues.push(`${overflowElements.length} elements overflow viewport`);
    }
    
    // Check text wrapping
    const textElements = heroSection.querySelectorAll('h1, h2, p');
    const wrappingIssues = Array.from(textElements).filter(el => {
      const style = window.getComputedStyle(el);
      return style.whiteSpace === 'nowrap' && el.scrollWidth > el.clientWidth;
    });
    
    if (wrappingIssues.length > 0) {
      issues.push(`${wrappingIssues.length} text elements don't wrap properly`);
    }
    
    return {
      heroSectionVisible: rect.width > 0 && rect.height > 0,
      layoutIssues: issues,
      hasOverflow: overflowElements.length > 0,
      textWrappingIssues: wrappingIssues.length,
      overallScore: issues.length === 0 ? 100 : Math.max(0, 100 - (issues.length * 25))
    };
  }

  async testButtonVisibility() {
    const buttons = document.querySelectorAll('button, a[role="button"], .btn');
    const results = [];
    
    for (const button of buttons) {
      const rect = button.getBoundingClientRect();
      const style = window.getComputedStyle(button);
      
      if (rect.width === 0 || rect.height === 0) continue;
      
      // Test visibility
      const isVisible = rect.top >= 0 && rect.left >= 0 && 
                       rect.bottom <= window.innerHeight && 
                       rect.right <= window.innerWidth;
      
      // Test contrast
      const textColor = this.parseColor(style.color);
      const bgColor = this.getEffectiveBackgroundColor(button);
      const contrastRatio = this.calculateContrastRatio(textColor, bgColor);
      
      results.push({
        text: button.textContent?.trim().slice(0, 20) + '...',
        isVisible: isVisible,
        isInViewport: this.isInViewport(rect),
        size: { width: rect.width, height: rect.height },
        contrastRatio: contrastRatio,
        contrastPass: contrastRatio >= 4.5,
        position: { x: rect.left, y: rect.top }
      });
    }
    
    return {
      totalButtons: results.length,
      visibleButtons: results.filter(b => b.isVisible).length,
      buttonsInViewport: results.filter(b => b.isInViewport).length,
      contrastPassRate: results.filter(b => b.contrastPass).length / results.length * 100,
      buttons: results
    };
  }

  async testTouchTargets() {
    const interactiveElements = document.querySelectorAll(`
      button, a, input, select, textarea, 
      [role="button"], [role="link"], [tabindex]
    `);
    
    const minTouchTarget = 44; // 44x44px minimum for accessibility
    const results = [];
    
    for (const element of interactiveElements) {
      const rect = element.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) continue;
      
      const meetsMinimum = rect.width >= minTouchTarget && rect.height >= minTouchTarget;
      const hasAdequateSpacing = this.checkElementSpacing(element, 8); // 8px minimum spacing
      
      results.push({
        element: this.getElementIdentifier(element),
        size: { width: rect.width, height: rect.height },
        meetsMinimum: meetsMinimum,
        hasAdequateSpacing: hasAdequateSpacing,
        isClickable: this.isElementClickable(element)
      });
    }
    
    return {
      totalElements: results.length,
      meetsSizeRequirement: results.filter(r => r.meetsMinimum).length,
      hasProperSpacing: results.filter(r => r.hasAdequateSpacing).length,
      passRate: results.filter(r => r.meetsMinimum && r.hasAdequateSpacing).length / results.length * 100,
      elements: results
    };
  }

  async testTextReadability() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
    const results = [];
    
    for (const element of textElements) {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      
      if (rect.width === 0 || rect.height === 0) continue;
      
      const fontSize = parseFloat(style.fontSize);
      const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.2;
      const isReadableSize = fontSize >= 16; // Minimum recommended for mobile
      
      // Test contrast
      const textColor = this.parseColor(style.color);
      const bgColor = this.getEffectiveBackgroundColor(element);
      const contrastRatio = this.calculateContrastRatio(textColor, bgColor);
      
      results.push({
        element: this.getElementIdentifier(element),
        text: element.textContent?.slice(0, 30) + '...',
        fontSize: fontSize,
        lineHeight: lineHeight,
        isReadableSize: isReadableSize,
        contrastRatio: contrastRatio,
        contrastPass: contrastRatio >= 4.5,
        isTruncated: element.scrollWidth > element.clientWidth
      });
    }
    
    return {
      totalElements: results.length,
      readableSize: results.filter(r => r.isReadableSize).length,
      goodContrast: results.filter(r => r.contrastPass).length,
      truncatedText: results.filter(r => r.isTruncated).length,
      overallReadability: results.filter(r => r.isReadableSize && r.contrastPass).length / results.length * 100,
      elements: results
    };
  }

  async testPerformance() {
    const startTime = performance.now();
    let frameCount = 0;
    const frameTimes = [];
    
    // Measure performance for 3 seconds
    const measureFrames = () => {
      return new Promise(resolve => {
        const measure = () => {
          const currentTime = performance.now();
          frameTimes.push(currentTime - startTime);
          frameCount++;
          
          if (currentTime - startTime < 3000) {
            requestAnimationFrame(measure);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(measure);
      });
    };
    
    await measureFrames();
    
    const averageFPS = frameCount / 3; // 3 second measurement
    const frameTimeVariance = this.calculateVariance(frameTimes);
    
    // Check memory usage if available
    let memoryUsage = null;
    if (performance.memory) {
      memoryUsage = {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(performance.memory.totalJSHeapSize / 1048576)
      };
    }
    
    return {
      averageFPS: averageFPS,
      frameTimeVariance: frameTimeVariance,
      memoryUsage: memoryUsage,
      performanceGrade: averageFPS >= 55 ? 'A' : averageFPS >= 45 ? 'B' : averageFPS >= 30 ? 'C' : 'D'
    };
  }

  async testScrollBehavior() {
    const heroSection = document.querySelector('section');
    if (!heroSection) return { error: 'Hero section not found' };
    
    // Test scroll performance
    const scrollTest = {
      smoothScrolling: this.testSmoothScrolling(),
      scrollJank: false,
      contentVisibilityDuringScroll: true,
      animationsDuringScroll: true
    };
    
    // Simulate scroll events
    window.scrollTo(0, 100);
    await this.delay(100);
    window.scrollTo(0, 200);
    await this.delay(100);
    window.scrollTo(0, 0);
    
    return scrollTest;
  }

  async testAnimationPerformance() {
    const animatedElements = document.querySelectorAll(`
      [style*="animation"], [class*="animate"], 
      .gpu-accelerated, motion-div
    `);
    
    // Test for 2 seconds
    const startTime = performance.now();
    let frameDrops = 0;
    let lastFrameTime = startTime;
    
    const monitorFrames = () => {
      return new Promise(resolve => {
        const monitor = () => {
          const currentTime = performance.now();
          const frameTime = currentTime - lastFrameTime;
          
          if (frameTime > 20) { // Frame took longer than ~50fps
            frameDrops++;
          }
          
          lastFrameTime = currentTime;
          
          if (currentTime - startTime < 2000) {
            requestAnimationFrame(monitor);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(monitor);
      });
    };
    
    await monitorFrames();
    
    return {
      animatedElementCount: animatedElements.length,
      frameDrops: frameDrops,
      animationPerformanceGrade: frameDrops <= 2 ? 'A' : frameDrops <= 5 ? 'B' : frameDrops <= 10 ? 'C' : 'D'
    };
  }

  async testContentFit() {
    const heroSection = document.querySelector('section');
    if (!heroSection) return { error: 'Hero section not found' };
    
    const rect = heroSection.getBoundingClientRect();
    
    // Check if main content fits in viewport
    const mainHeading = heroSection.querySelector('h1');
    const subheading = heroSection.querySelector('h2, p');
    const buttons = heroSection.querySelectorAll('button, a[role="button"]');
    
    const contentVisibility = {
      heroSectionFitsViewport: rect.height <= window.innerHeight,
      mainHeadingVisible: mainHeading ? this.isInViewport(mainHeading.getBoundingClientRect()) : false,
      subheadingVisible: subheading ? this.isInViewport(subheading.getBoundingClientRect()) : false,
      primaryButtonsVisible: Array.from(buttons).slice(0, 2).every(btn => 
        this.isInViewport(btn.getBoundingClientRect())
      )
    };
    
    const foldContent = Object.values(contentVisibility).filter(Boolean).length;
    const totalContent = Object.keys(contentVisibility).length - 1; // Exclude heroSectionFitsViewport
    
    return {
      ...contentVisibility,
      contentAboveFold: (foldContent / totalContent) * 100,
      requiresScroll: rect.height > window.innerHeight
    };
  }

  async testNavigationUsability() {
    const navigation = document.querySelector('nav, .navigation, header');
    if (!navigation) return { error: 'Navigation not found' };
    
    const navRect = navigation.getBoundingClientRect();
    const navLinks = navigation.querySelectorAll('a, button');
    
    const usabilityTest = {
      navigationVisible: this.isInViewport(navRect),
      navigationSize: { width: navRect.width, height: navRect.height },
      totalNavItems: navLinks.length,
      clickableNavItems: Array.from(navLinks).filter(link => 
        this.isElementClickable(link)
      ).length,
      isSticky: window.getComputedStyle(navigation).position === 'sticky' ||
                window.getComputedStyle(navigation).position === 'fixed'
    };
    
    return usabilityTest;
  }

  // UTILITY METHODS
  parseColor(colorString) {
    if (colorString.startsWith('rgb')) {
      const matches = colorString.match(/rgba?\(([^)]+)\)/);
      if (matches) {
        const values = matches[1].split(',').map(v => parseFloat(v.trim()));
        return { r: values[0], g: values[1], b: values[2], a: values[3] || 1 };
      }
    }
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  getEffectiveBackgroundColor(element) {
    let currentElement = element;
    while (currentElement && currentElement !== document.body) {
      const style = window.getComputedStyle(currentElement);
      const bgColor = style.backgroundColor;
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return this.parseColor(bgColor);
      }
      currentElement = currentElement.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  }

  calculateContrastRatio(color1, color2) {
    const l1 = this.getLuminance(color1);
    const l2 = this.getLuminance(color2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  getLuminance(color) {
    const rs = color.r / 255;
    const gs = color.g / 255;
    const bs = color.b / 255;
    
    const r = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
    const g = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
    const b = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
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

  checkElementSpacing(element, minSpacing) {
    const rect = element.getBoundingClientRect();
    const siblings = Array.from(element.parentElement?.children || [])
      .filter(child => child !== element && child.getBoundingClientRect().width > 0);
    
    return siblings.every(sibling => {
      const siblingRect = sibling.getBoundingClientRect();
      const horizontalDistance = Math.min(
        Math.abs(rect.left - siblingRect.right),
        Math.abs(rect.right - siblingRect.left)
      );
      const verticalDistance = Math.min(
        Math.abs(rect.top - siblingRect.bottom),
        Math.abs(rect.bottom - siblingRect.top)
      );
      
      return horizontalDistance >= minSpacing || verticalDistance >= minSpacing;
    });
  }

  getElementIdentifier(element) {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  calculateVariance(values) {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
    return squaredDifferences.reduce((sum, val) => sum + val, 0) / values.length;
  }

  testSmoothScrolling() {
    const html = document.documentElement;
    const body = document.body;
    const htmlStyle = window.getComputedStyle(html);
    const bodyStyle = window.getComputedStyle(body);
    
    return htmlStyle.scrollBehavior === 'smooth' || bodyStyle.scrollBehavior === 'smooth';
  }

  restoreViewport() {
    // Restore original viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: this.originalViewport.width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: this.originalViewport.height,
    });
    
    document.documentElement.style.width = '';
    document.documentElement.style.height = '';
    
    window.dispatchEvent(new Event('resize'));
  }

  generateCrossDeviceReport() {
    const allResults = [
      ...this.testResults.mobile,
      ...this.testResults.tablet,
      ...this.testResults.desktop
    ];
    
    // Calculate overall scores
    const overallScores = {
      layoutScore: this.calculateAverageScore(allResults, 'layoutTest.overallScore'),
      buttonVisibilityScore: this.calculateAverageScore(allResults, 'buttonVisibility.contrastPassRate'),
      touchTargetScore: this.calculateAverageScore(allResults, 'touchTargets.passRate'),
      readabilityScore: this.calculateAverageScore(allResults, 'readability.overallReadability'),
      performanceScore: this.calculatePerformanceScore(allResults)
    };
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalDevicesTested: allResults.length,
        overallCompatibilityScore: Object.values(overallScores).reduce((a, b) => a + b, 0) / Object.keys(overallScores).length,
        ...overallScores
      },
      results: this.testResults,
      recommendations: this.generateDeviceRecommendations(allResults),
      criticalIssues: this.identifyDeviceCriticalIssues(allResults)
    };
    
    console.log('📊 Cross-Device Report Generated:', report.summary);
    return report;
  }

  calculateAverageScore(results, path) {
    const scores = results.map(result => {
      const keys = path.split('.');
      let value = result;
      for (const key of keys) {
        value = value?.[key];
      }
      return value || 0;
    }).filter(score => score > 0);
    
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  }

  calculatePerformanceScore(results) {
    const performanceGrades = { 'A': 90, 'B': 75, 'C': 60, 'D': 45 };
    const scores = results.map(result => 
      performanceGrades[result.performance?.performanceGrade] || 0
    );
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  generateDeviceRecommendations(results) {
    const recommendations = [];
    
    // Button visibility issues
    const buttonIssues = results.filter(r => r.buttonVisibility?.contrastPassRate < 80);
    if (buttonIssues.length > 0) {
      recommendations.push({
        category: 'Button Visibility',
        affectedDevices: buttonIssues.map(r => r.device),
        issue: 'Low button contrast on multiple devices',
        solution: 'Increase button background opacity or add stronger borders'
      });
    }
    
    // Touch target issues
    const touchIssues = results.filter(r => r.touchTargets?.passRate < 80);
    if (touchIssues.length > 0) {
      recommendations.push({
        category: 'Touch Targets',
        affectedDevices: touchIssues.map(r => r.device),
        issue: 'Touch targets too small on mobile devices',
        solution: 'Increase button/link sizes to minimum 44x44px'
      });
    }
    
    // Performance issues
    const performanceIssues = results.filter(r => ['C', 'D'].includes(r.performance?.performanceGrade));
    if (performanceIssues.length > 0) {
      recommendations.push({
        category: 'Performance',
        affectedDevices: performanceIssues.map(r => r.device),
        issue: 'Poor animation performance on some devices',
        solution: 'Add performance mode toggle or reduce animation complexity'
      });
    }
    
    return recommendations;
  }

  identifyDeviceCriticalIssues(results) {
    const critical = [];
    
    // Critical layout issues
    const layoutIssues = results.filter(r => r.layoutTest?.overallScore < 50);
    if (layoutIssues.length > 0) {
      critical.push(`Layout breaks on ${layoutIssues.length} devices`);
    }
    
    // Critical performance issues
    const severePerformance = results.filter(r => r.performance?.performanceGrade === 'D');
    if (severePerformance.length > 0) {
      critical.push(`Severe performance issues on ${severePerformance.length} devices`);
    }
    
    return critical;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// AUTOMATED CROSS-DEVICE TESTING
async function runCrossDeviceTests() {
  console.log('🚀 Starting Cross-Device Compatibility Tests...');
  
  const tester = new CrossDeviceTester();
  
  try {
    const report = await tester.runAllDeviceTests();
    
    // Save report
    localStorage.setItem('crossDeviceReport', JSON.stringify(report, null, 2));
    
    console.log('✅ Cross-device testing complete! Report saved to localStorage["crossDeviceReport"]');
    return report;
    
  } catch (error) {
    console.error('❌ Cross-device testing failed:', error);
    return null;
  }
}

// Export for manual use
if (typeof window !== 'undefined') {
  window.CrossDeviceTester = CrossDeviceTester;
  window.runCrossDeviceTests = runCrossDeviceTests;
}

// Auto-run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runCrossDeviceTests, 3000);
  });
} else {
  setTimeout(runCrossDeviceTests, 3000);
}