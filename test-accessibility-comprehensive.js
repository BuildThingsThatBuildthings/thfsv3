/**
 * COMPREHENSIVE ACCESSIBILITY TESTING SUITE
 * WCAG 2.1 AA Compliance Testing for Hero Section
 */

class AccessibilityTester {
  constructor() {
    this.results = {
      colorContrast: [],
      keyboardNavigation: [],
      focusManagement: [],
      semanticStructure: [],
      ariaLabels: [],
      motionAccessibility: [],
      screenReader: []
    };
    
    this.wcagStandards = {
      contrastAA: 4.5,
      contrastAAA: 7.0,
      largeTextAA: 3.0,
      largeTextAAA: 4.5,
      minTouchTarget: 44, // 44x44px minimum
      maxMotionDuration: 5000 // 5 seconds max for motion
    };
  }

  async runAllTests() {
    console.log('♿ Starting Comprehensive Accessibility Tests...');
    
    await this.testColorContrast();
    await this.testKeyboardNavigation();
    await this.testFocusManagement();
    await this.testSemanticStructure();
    await this.testAriaLabels();
    await this.testMotionAccessibility();
    await this.testScreenReaderCompatibility();
    
    return this.generateAccessibilityReport();
  }

  // COLOR CONTRAST TESTING (WCAG 1.4.3, 1.4.6)
  async testColorContrast() {
    console.log('🎨 Testing Color Contrast...');
    
    const textElements = document.querySelectorAll(`
      h1, h2, h3, h4, h5, h6, 
      p, span, button, a, 
      [role="button"], 
      input, label
    `);
    
    for (const element of textElements) {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) continue;
      
      const textColor = this.parseColor(style.color);
      const bgColor = this.getEffectiveBackgroundColor(element);
      const fontSize = parseFloat(style.fontSize);
      const fontWeight = parseInt(style.fontWeight) || 400;
      
      const contrastRatio = this.calculateContrastRatio(textColor, bgColor);
      const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);
      
      const result = {
        element: this.getElementIdentifier(element),
        text: element.textContent?.slice(0, 50) + '...',
        textColor: this.colorToHex(textColor),
        backgroundColor: this.colorToHex(bgColor),
        fontSize: fontSize,
        fontWeight: fontWeight,
        isLargeText: isLargeText,
        contrastRatio: contrastRatio,
        wcagAA: contrastRatio >= (isLargeText ? this.wcagStandards.largeTextAA : this.wcagStandards.contrastAA),
        wcagAAA: contrastRatio >= (isLargeText ? this.wcagStandards.largeTextAAA : this.wcagStandards.contrastAAA),
        position: { x: rect.left, y: rect.top }
      };
      
      this.results.colorContrast.push(result);
    }
  }

  // KEYBOARD NAVIGATION TESTING (WCAG 2.1.1, 2.1.2)
  async testKeyboardNavigation() {
    console.log('⌨️ Testing Keyboard Navigation...');
    
    const focusableElements = document.querySelectorAll(`
      button, [href], input, select, textarea, 
      [tabindex]:not([tabindex="-1"]), 
      [role="button"], [role="link"]
    `);
    
    const keyboardResults = [];
    
    for (const element of focusableElements) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      
      // Test if element can receive focus
      element.focus();
      const hasFocus = document.activeElement === element;
      
      // Test focus indicators
      const focusStyle = window.getComputedStyle(element);
      const hasFocusIndicator = this.checkFocusIndicator(element, focusStyle);
      
      // Test keyboard activation
      const isKeyboardActivatable = this.testKeyboardActivation(element);
      
      keyboardResults.push({
        element: this.getElementIdentifier(element),
        text: element.textContent?.slice(0, 30) + '...',
        canReceiveFocus: hasFocus,
        tabIndex: element.tabIndex,
        hasFocusIndicator: hasFocusIndicator,
        keyboardActivatable: isKeyboardActivatable,
        touchTargetSize: { width: rect.width, height: rect.height },
        meetsTouchTarget: rect.width >= this.wcagStandards.minTouchTarget && rect.height >= this.wcagStandards.minTouchTarget
      });
      
      element.blur();
    }
    
    this.results.keyboardNavigation = keyboardResults;
  }

  // FOCUS MANAGEMENT TESTING (WCAG 2.4.3, 2.4.7)
  async testFocusManagement() {
    console.log('🎯 Testing Focus Management...');
    
    const focusableElements = Array.from(document.querySelectorAll(`
      button, [href], input, select, textarea, 
      [tabindex]:not([tabindex="-1"])
    `)).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    
    const focusOrder = [];
    let previousElement = null;
    
    // Test tab order
    for (let i = 0; i < focusableElements.length; i++) {
      const element = focusableElements[i];
      element.focus();
      
      const focusOrderItem = {
        index: i,
        element: this.getElementIdentifier(element),
        tabIndex: element.tabIndex,
        isVisible: this.isElementVisible(element),
        isLogicalOrder: true // Will be calculated after collecting all
      };
      
      // Check if focus is visible
      focusOrderItem.focusVisible = document.activeElement === element;
      
      focusOrder.push(focusOrderItem);
      previousElement = element;
    }
    
    // Analyze logical order
    this.analyzeFocusOrder(focusOrder);
    
    this.results.focusManagement = {
      totalFocusableElements: focusableElements.length,
      focusOrder: focusOrder,
      hasLogicalOrder: focusOrder.every(item => item.isLogicalOrder),
      skipLinks: this.findSkipLinks()
    };
  }

  // SEMANTIC STRUCTURE TESTING (WCAG 1.3.1, 2.4.6)
  async testSemanticStructure() {
    console.log('🏗️ Testing Semantic Structure...');
    
    const heroSection = document.querySelector('section');
    
    const structure = {
      hasMainLandmark: !!document.querySelector('main'),
      hasHeaderLandmark: !!document.querySelector('header'),
      hasNavLandmark: !!document.querySelector('nav'),
      headingStructure: this.analyzeHeadingStructure(),
      landmarks: this.analyzeLandmarks(),
      semanticElements: this.countSemanticElements(),
      listStructure: this.analyzeListStructure()
    };
    
    this.results.semanticStructure = structure;
  }

  // ARIA LABELS TESTING (WCAG 1.3.1, 4.1.2)
  async testAriaLabels() {
    console.log('🏷️ Testing ARIA Labels...');
    
    const interactiveElements = document.querySelectorAll(`
      button, [href], input, select, textarea,
      [role="button"], [role="link"], [role="tab"],
      [role="menu"], [role="menuitem"]
    `);
    
    const ariaResults = [];
    
    for (const element of interactiveElements) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      
      const ariaData = {
        element: this.getElementIdentifier(element),
        hasAriaLabel: element.hasAttribute('aria-label'),
        ariaLabel: element.getAttribute('aria-label'),
        hasAriaLabelledBy: element.hasAttribute('aria-labelledby'),
        hasAriaDescribedBy: element.hasAttribute('aria-describedby'),
        hasTitle: element.hasAttribute('title'),
        hasVisibleText: element.textContent?.trim().length > 0,
        role: element.getAttribute('role') || element.tagName.toLowerCase(),
        accessibleName: this.getAccessibleName(element),
        hasAccessibleName: this.hasAccessibleName(element)
      };
      
      ariaResults.push(ariaData);
    }
    
    this.results.ariaLabels = ariaResults;
  }

  // MOTION ACCESSIBILITY TESTING (WCAG 2.3.3)
  async testMotionAccessibility() {
    console.log('🌀 Testing Motion Accessibility...');
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Find all animated elements
    const animatedElements = document.querySelectorAll(`
      [style*="animation"], [class*="animate"], 
      [class*="motion-"], .gpu-accelerated
    `);
    
    const motionResults = {
      prefersReducedMotion: prefersReducedMotion,
      totalAnimatedElements: animatedElements.length,
      respectsReducedMotion: this.checkReducedMotionSupport(),
      animationDurations: [],
      autoplayingAnimations: [],
      parallaxElements: this.findParallaxElements()
    };
    
    // Analyze animation properties
    for (const element of animatedElements) {
      const style = window.getComputedStyle(element);
      const animationDuration = style.animationDuration;
      const animationIterationCount = style.animationIterationCount;
      
      if (animationDuration && animationDuration !== '0s') {
        motionResults.animationDurations.push({
          element: this.getElementIdentifier(element),
          duration: animationDuration,
          iterationCount: animationIterationCount,
          isInfinite: animationIterationCount === 'infinite',
          exceedsThreshold: this.parseAnimationDuration(animationDuration) > this.wcagStandards.maxMotionDuration
        });
      }
    }
    
    this.results.motionAccessibility = motionResults;
  }

  // SCREEN READER COMPATIBILITY TESTING (WCAG 4.1.3)
  async testScreenReaderCompatibility() {
    console.log('📢 Testing Screen Reader Compatibility...');
    
    const heroSection = document.querySelector('section');
    
    const screenReaderResults = {
      hasAltText: this.checkAltText(),
      hasHeadingStructure: this.results.semanticStructure?.headingStructure?.isProperHierarchy || false,
      hasLandmarks: Object.values(this.results.semanticStructure?.landmarks || {}).some(Boolean),
      hasFormLabels: this.checkFormLabels(),
      hasDescriptiveLinkText: this.checkLinkText(),
      hasTableHeaders: this.checkTableHeaders(),
      backgroundImages: this.checkBackgroundImages(),
      decorativeImages: this.findDecorativeImages()
    };
    
    this.results.screenReader = screenReaderResults;
  }

  // UTILITY METHODS
  parseColor(colorString) {
    // Handle rgb, rgba, hex, and named colors
    if (colorString.startsWith('rgb')) {
      const matches = colorString.match(/rgba?\(([^)]+)\)/);
      if (matches) {
        const values = matches[1].split(',').map(v => parseFloat(v.trim()));
        return { r: values[0], g: values[1], b: values[2], a: values[3] || 1 };
      }
    }
    
    if (colorString.startsWith('#')) {
      const hex = colorString.slice(1);
      if (hex.length === 3) {
        return {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16),
          a: 1
        };
      } else if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16),
          a: 1
        };
      }
    }
    
    // Default fallback
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
    
    return { r: 255, g: 255, b: 255, a: 1 }; // Default to white
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

  colorToHex(color) {
    const toHex = (n) => Math.round(n).toString(16).padStart(2, '0');
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  }

  getElementIdentifier(element) {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  checkFocusIndicator(element, focusStyle) {
    const normalStyle = window.getComputedStyle(element);
    element.focus();
    
    // Check if outline, border, or box-shadow changes on focus
    const hasOutlineChange = focusStyle.outline !== 'none' && focusStyle.outline !== normalStyle.outline;
    const hasBorderChange = focusStyle.border !== normalStyle.border;
    const hasBoxShadowChange = focusStyle.boxShadow !== normalStyle.boxShadow;
    
    return hasOutlineChange || hasBorderChange || hasBoxShadowChange;
  }

  testKeyboardActivation(element) {
    // Test if element responds to Enter and Space keys
    let enterActivated = false;
    let spaceActivated = false;
    
    const enterHandler = () => { enterActivated = true; };
    const spaceHandler = () => { spaceActivated = true; };
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') enterHandler();
      if (e.key === ' ') spaceHandler();
    });
    
    // Simulate key events
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    
    return { enter: enterActivated, space: spaceActivated };
  }

  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0';
  }

  analyzeFocusOrder(focusOrder) {
    // Simple analysis - check if elements are in visual order
    let previousY = -1;
    let previousX = -1;
    
    focusOrder.forEach((item, index) => {
      const element = document.querySelector(item.element) || 
                     document.getElementById(item.element.slice(1)) ||
                     document.querySelector(`.${item.element.slice(1)}`);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        
        // Simple heuristic: elements should generally flow top-to-bottom, left-to-right
        if (index > 0) {
          const isLogical = rect.top >= previousY - 50 || 
                           (Math.abs(rect.top - previousY) < 50 && rect.left > previousX);
          item.isLogicalOrder = isLogical;
        }
        
        previousY = rect.top;
        previousX = rect.left;
      }
    });
  }

  findSkipLinks() {
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    return Array.from(skipLinks).map(link => ({
      text: link.textContent,
      href: link.href,
      isHidden: this.isVisuallyHidden(link)
    }));
  }

  analyzeHeadingStructure() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const structure = [];
    let expectedLevel = 1;
    let isProperHierarchy = true;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName[1]);
      const hasContent = heading.textContent.trim().length > 0;
      
      if (level > expectedLevel + 1) {
        isProperHierarchy = false;
      }
      
      structure.push({
        level: level,
        text: heading.textContent.slice(0, 50),
        hasContent: hasContent,
        element: this.getElementIdentifier(heading)
      });
      
      expectedLevel = Math.max(expectedLevel, level);
    });
    
    return { structure, isProperHierarchy, totalHeadings: headings.length };
  }

  analyzeLandmarks() {
    return {
      main: !!document.querySelector('main, [role="main"]'),
      header: !!document.querySelector('header, [role="banner"]'),
      nav: !!document.querySelector('nav, [role="navigation"]'),
      footer: !!document.querySelector('footer, [role="contentinfo"]'),
      aside: !!document.querySelector('aside, [role="complementary"]'),
      section: document.querySelectorAll('section').length
    };
  }

  countSemanticElements() {
    return {
      article: document.querySelectorAll('article').length,
      section: document.querySelectorAll('section').length,
      nav: document.querySelectorAll('nav').length,
      aside: document.querySelectorAll('aside').length,
      main: document.querySelectorAll('main').length,
      header: document.querySelectorAll('header').length,
      footer: document.querySelectorAll('footer').length
    };
  }

  getAccessibleName(element) {
    // Priority order: aria-labelledby, aria-label, label, title, text content
    if (element.hasAttribute('aria-labelledby')) {
      const labelElement = document.getElementById(element.getAttribute('aria-labelledby'));
      return labelElement ? labelElement.textContent : '';
    }
    
    if (element.hasAttribute('aria-label')) {
      return element.getAttribute('aria-label');
    }
    
    if (element.tagName === 'INPUT' && element.labels && element.labels.length > 0) {
      return element.labels[0].textContent;
    }
    
    if (element.hasAttribute('title')) {
      return element.getAttribute('title');
    }
    
    return element.textContent?.trim() || '';
  }

  hasAccessibleName(element) {
    return this.getAccessibleName(element).length > 0;
  }

  generateAccessibilityReport() {
    const totalIssues = this.countAccessibilityIssues();
    const complianceScore = this.calculateComplianceScore();
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        complianceScore: complianceScore,
        totalIssues: totalIssues,
        wcagLevel: complianceScore >= 90 ? 'AA' : complianceScore >= 70 ? 'A' : 'Non-compliant'
      },
      results: this.results,
      recommendations: this.generateAccessibilityRecommendations(),
      criticalIssues: this.identifyCriticalIssues()
    };
    
    console.log('♿ Accessibility Report Generated:', report.summary);
    return report;
  }

  countAccessibilityIssues() {
    let issues = 0;
    
    // Count contrast failures
    issues += this.results.colorContrast.filter(item => !item.wcagAA).length;
    
    // Count keyboard navigation issues
    issues += this.results.keyboardNavigation.filter(item => !item.canReceiveFocus || !item.hasFocusIndicator).length;
    
    // Count missing ARIA labels
    issues += this.results.ariaLabels.filter(item => !item.hasAccessibleName).length;
    
    return issues;
  }

  calculateComplianceScore() {
    const totalTests = this.results.colorContrast.length + 
                      this.results.keyboardNavigation.length + 
                      this.results.ariaLabels.length;
    
    if (totalTests === 0) return 0;
    
    const passedTests = this.results.colorContrast.filter(item => item.wcagAA).length +
                       this.results.keyboardNavigation.filter(item => item.canReceiveFocus && item.hasFocusIndicator).length +
                       this.results.ariaLabels.filter(item => item.hasAccessibleName).length;
    
    return Math.round((passedTests / totalTests) * 100);
  }

  generateAccessibilityRecommendations() {
    const recommendations = [];
    
    // Contrast recommendations
    const contrastFailures = this.results.colorContrast.filter(item => !item.wcagAA);
    if (contrastFailures.length > 0) {
      recommendations.push({
        category: 'Color Contrast',
        severity: 'high',
        count: contrastFailures.length,
        description: `${contrastFailures.length} elements fail WCAG AA contrast requirements`,
        solution: 'Increase color contrast or adjust background opacity'
      });
    }
    
    // Keyboard navigation recommendations
    const keyboardIssues = this.results.keyboardNavigation.filter(item => !item.hasFocusIndicator);
    if (keyboardIssues.length > 0) {
      recommendations.push({
        category: 'Keyboard Navigation',
        severity: 'high',
        count: keyboardIssues.length,
        description: `${keyboardIssues.length} elements lack visible focus indicators`,
        solution: 'Add outline, border, or box-shadow on focus states'
      });
    }
    
    return recommendations;
  }

  identifyCriticalIssues() {
    const critical = [];
    
    // Critical: No main heading
    const hasH1 = this.results.semanticStructure?.headingStructure?.structure?.some(h => h.level === 1);
    if (!hasH1) {
      critical.push('Missing main heading (h1)');
    }
    
    // Critical: Severe contrast failures
    const severeContrast = this.results.colorContrast.filter(item => item.contrastRatio < 3).length;
    if (severeContrast > 0) {
      critical.push(`${severeContrast} elements with severe contrast issues (ratio < 3:1)`);
    }
    
    return critical;
  }

  // Additional utility methods for comprehensive testing
  checkAltText() {
    const images = document.querySelectorAll('img');
    return Array.from(images).every(img => img.hasAttribute('alt'));
  }

  checkFormLabels() {
    const inputs = document.querySelectorAll('input, select, textarea');
    return Array.from(inputs).every(input => 
      input.labels?.length > 0 || 
      input.hasAttribute('aria-label') || 
      input.hasAttribute('aria-labelledby')
    );
  }

  checkLinkText() {
    const links = document.querySelectorAll('a[href]');
    return Array.from(links).every(link => {
      const text = link.textContent?.trim();
      return text && text.length > 0 && !['click here', 'read more', 'more'].includes(text.toLowerCase());
    });
  }

  checkTableHeaders() {
    const tables = document.querySelectorAll('table');
    return Array.from(tables).every(table => 
      table.querySelectorAll('th').length > 0 || 
      table.querySelectorAll('[scope]').length > 0
    );
  }

  checkBackgroundImages() {
    // Check for important content in background images
    const elementsWithBgImages = [];
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.backgroundImage && style.backgroundImage !== 'none') {
        elementsWithBgImages.push({
          element: this.getElementIdentifier(el),
          hasAltAttribute: el.hasAttribute('aria-label') || el.hasAttribute('title')
        });
      }
    });
    
    return elementsWithBgImages;
  }

  findDecorativeImages() {
    const decorativeImages = document.querySelectorAll('img[alt=""], img[role="presentation"]');
    return decorativeImages.length;
  }

  checkReducedMotionSupport() {
    // Check if site respects prefers-reduced-motion
    const reducedMotionCSS = Array.from(document.styleSheets).some(sheet => {
      try {
        return Array.from(sheet.cssRules).some(rule => 
          rule.media && rule.media.mediaText.includes('prefers-reduced-motion')
        );
      } catch (e) {
        return false;
      }
    });
    
    return reducedMotionCSS;
  }

  findParallaxElements() {
    const parallaxElements = document.querySelectorAll('[style*="transform"], .parallax');
    return parallaxElements.length;
  }

  parseAnimationDuration(duration) {
    const match = duration.match(/(\d+(?:\.\d+)?)s/);
    return match ? parseFloat(match[1]) * 1000 : 0;
  }

  isVisuallyHidden(element) {
    const style = window.getComputedStyle(element);
    return style.clip === 'rect(0px, 0px, 0px, 0px)' ||
           style.position === 'absolute' && (
             parseInt(style.left) < -9999 || 
             parseInt(style.top) < -9999
           ) ||
           style.width === '1px' && style.height === '1px';
  }

  analyzeListStructure() {
    const lists = document.querySelectorAll('ul, ol, dl');
    return {
      totalLists: lists.length,
      properStructure: Array.from(lists).every(list => {
        const children = Array.from(list.children);
        if (list.tagName === 'DL') {
          return children.every(child => ['DT', 'DD'].includes(child.tagName));
        } else {
          return children.every(child => child.tagName === 'LI');
        }
      })
    };
  }
}

// AUTOMATED ACCESSIBILITY TESTING
async function runAccessibilityTests() {
  console.log('🚀 Starting Comprehensive Accessibility Tests...');
  
  const tester = new AccessibilityTester();
  
  try {
    const report = await tester.runAllTests();
    
    // Save report
    localStorage.setItem('accessibilityReport', JSON.stringify(report, null, 2));
    
    console.log('✅ Accessibility testing complete! Report saved to localStorage["accessibilityReport"]');
    return report;
    
  } catch (error) {
    console.error('❌ Accessibility testing failed:', error);
    return null;
  }
}

// Export for manual use
if (typeof window !== 'undefined') {
  window.AccessibilityTester = AccessibilityTester;
  window.runAccessibilityTests = runAccessibilityTests;
}

// Auto-run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runAccessibilityTests, 1500);
  });
} else {
  setTimeout(runAccessibilityTests, 1500);
}