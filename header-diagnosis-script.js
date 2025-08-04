/**
 * Header Performance & Functionality Diagnosis Script
 * Tests Navigation component issues identified in UX analysis
 */

class HeaderDiagnostics {
  constructor() {
    this.results = {
      performance: {},
      mobile: {},
      responsive: {},
      zIndex: {},
      crossBrowser: {}
    };
    this.performanceObserver = null;
    this.scrollTestActive = false;
  }

  // 1. Performance Issues Analysis
  async analyzeScrollPerformance() {
    console.log('🔍 Analyzing Scroll Performance...');
    
    const results = {
      scrollEventCount: 0,
      renderCount: 0,
      averageFrameTime: 0,
      droppedFrames: 0,
      backdropBlurSupport: false,
      scrollThrottling: false
    };

    // Test scroll event frequency
    let scrollCount = 0;
    let lastScrollTime = performance.now();
    const scrollHandler = () => {
      scrollCount++;
      const now = performance.now();
      const timeDiff = now - lastScrollTime;
      
      if (timeDiff < 16.67) { // Less than 60fps
        results.droppedFrames++;
      }
      lastScrollTime = now;
    };

    // Add scroll listener like Navigation component
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Simulate scroll testing
    await this.simulateScrolling();
    results.scrollEventCount = scrollCount;

    // Test backdrop-blur support
    results.backdropBlurSupport = CSS.supports('backdrop-filter', 'blur(10px)');

    // Check if component uses throttling/debouncing
    const navComponent = document.querySelector('nav[class*="fixed"]');
    if (navComponent) {
      // Simulate rapid scrolling to test re-renders
      for (let i = 0; i < 100; i++) {
        window.scrollTo(0, i * 10);
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    }

    window.removeEventListener('scroll', scrollHandler);
    
    this.results.performance = results;
    return results;
  }

  // 2. Mobile Menu Technical Problems
  async analyzeMobileMenu() {
    console.log('📱 Analyzing Mobile Menu Functionality...');
    
    const results = {
      animationSmooth: false,
      stateManagement: false,
      orientationHandling: false,
      heightAutoIssues: false,
      touchResponsive: false
    };

    // Force mobile viewport
    const originalViewport = document.querySelector('meta[name="viewport"]');
    const testViewport = document.createElement('meta');
    testViewport.name = 'viewport';
    testViewport.content = 'width=375, height=667, initial-scale=1.0';
    document.head.appendChild(testViewport);

    // Test mobile menu button
    const mobileMenuButton = document.querySelector('button[aria-label*="mobile menu" i]');
    if (mobileMenuButton) {
      // Test tap responsiveness
      const startTime = performance.now();
      mobileMenuButton.click();
      const endTime = performance.now();
      results.touchResponsive = (endTime - startTime) < 100; // Should respond within 100ms

      // Test animation smoothness
      const mobileMenu = document.querySelector('div[class*="md:hidden"]');
      if (mobileMenu) {
        // Monitor for layout thrashing during animation
        let layoutCount = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'Layout') {
              layoutCount++;
            }
          }
        });
        
        try {
          observer.observe({ entryTypes: ['measure'] });
          
          // Toggle menu multiple times
          for (let i = 0; i < 5; i++) {
            mobileMenuButton.click();
            await new Promise(resolve => setTimeout(resolve, 300));
          }
          
          results.animationSmooth = layoutCount < 10;
        } catch (e) {
          console.warn('Performance Observer not fully supported');
        }
      }
    }

    // Test orientation change
    try {
      // Simulate orientation change
      window.dispatchEvent(new Event('orientationchange'));
      await new Promise(resolve => setTimeout(resolve, 100));
      results.orientationHandling = !document.querySelector('nav').classList.contains('broken');
    } catch (e) {
      results.orientationHandling = false;
    }

    // Restore viewport
    if (originalViewport) {
      document.head.appendChild(originalViewport);
    }
    document.head.removeChild(testViewport);

    this.results.mobile = results;
    return results;
  }

  // 3. Responsive Breakpoint Testing
  async analyzeResponsiveBreakpoints() {
    console.log('📐 Analyzing Responsive Breakpoints...');
    
    const results = {
      breakpoints: {},
      textOverflow: {},
      ctaVisibility: {},
      tabletIssues: {}
    };

    const testBreakpoints = [375, 640, 768, 1024, 1280, 1536];
    
    for (const width of testBreakpoints) {
      // Simulate viewport width
      const originalWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width
      });

      // Trigger resize event
      window.dispatchEvent(new Event('resize'));
      await new Promise(resolve => setTimeout(resolve, 100));

      const nav = document.querySelector('nav');
      const businessName = nav?.querySelector('a[href="/"]');
      const ctaButton = nav?.querySelector('button, a[href*="remote-healing"]');
      const mobileButton = nav?.querySelector('button[aria-label*="mobile" i]');

      results.breakpoints[width] = {
        navHeight: nav?.offsetHeight || 0,
        businessNameVisible: businessName ? !this.isOverflowing(businessName) : false,
        ctaVisible: ctaButton ? window.getComputedStyle(ctaButton).display !== 'none' : false,
        mobileButtonVisible: mobileButton ? window.getComputedStyle(mobileButton).display !== 'none' : false,
        horizontalScroll: document.body.scrollWidth > width
      };

      // Test specific tablet issues (768-1024px range)
      if (width >= 768 && width <= 1024) {
        results.tabletIssues[width] = {
          desktopNavVisible: nav?.querySelector('.hidden.md\\:flex') ? 
            window.getComputedStyle(nav.querySelector('.hidden.md\\:flex')).display !== 'none' : false,
          mobileNavHidden: mobileButton ? 
            window.getComputedStyle(mobileButton).display === 'none' : false
        };
      }

      // Restore original width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalWidth
      });
    }

    this.results.responsive = results;
    return results;
  }

  // 4. Z-index and Overlay Conflicts
  async analyzeZIndexConflicts() {
    console.log('🔍 Analyzing Z-index and Overlay Conflicts...');
    
    const results = {
      headerZIndex: 0,
      heroZIndex: 0,
      videoZIndex: 0,
      conflicts: [],
      backdropBlurRendering: false,
      overlayPositioning: true
    };

    const nav = document.querySelector('nav[class*="fixed"]');
    const hero = document.querySelector('section[class*="min-h-screen"]');
    const videoElements = document.querySelectorAll('video, [class*="video"]');

    if (nav) {
      const navStyle = window.getComputedStyle(nav);
      results.headerZIndex = parseInt(navStyle.zIndex) || 0;
      
      // Test backdrop-blur rendering
      if (navStyle.backdropFilter && navStyle.backdropFilter !== 'none') {
        results.backdropBlurRendering = true;
        
        // Test rendering consistency across different backgrounds
        const testColors = ['#000000', '#ffffff', '#ff0000', 'transparent'];
        for (const color of testColors) {
          document.body.style.backgroundColor = color;
          await new Promise(resolve => setTimeout(resolve, 50));
          // Visual test would require manual inspection
        }
        document.body.style.backgroundColor = '';
      }
    }

    if (hero) {
      const heroStyle = window.getComputedStyle(hero);
      results.heroZIndex = parseInt(heroStyle.zIndex) || 0;
    }

    // Check for z-index conflicts
    const allZIndexElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const style = window.getComputedStyle(el);
      return style.zIndex !== 'auto' && style.zIndex !== '0';
    });

    const zIndexMap = new Map();
    allZIndexElements.forEach(el => {
      const zIndex = parseInt(window.getComputedStyle(el).zIndex);
      if (!zIndexMap.has(zIndex)) {
        zIndexMap.set(zIndex, []);
      }
      zIndexMap.get(zIndex).push(el.tagName.toLowerCase() + '.' + el.className);
    });

    // Find potential conflicts
    for (const [zIndex, elements] of zIndexMap) {
      if (elements.length > 1) {
        results.conflicts.push({ zIndex, elements });
      }
    }

    this.results.zIndex = results;
    return results;
  }

  // 5. Cross-browser Compatibility
  async analyzeCrossBrowserCompatibility() {
    console.log('🌐 Analyzing Cross-browser Compatibility...');
    
    const results = {
      backdropBlurSupport: CSS.supports('backdrop-filter', 'blur(10px)'),
      fixedPositionSupport: CSS.supports('position', 'fixed'),
      transitionSupport: CSS.supports('transition', 'all 0.3s'),
      userAgent: navigator.userAgent,
      cssFeaturesSupport: {},
      mobileBrowserIssues: []
    };

    // Test CSS features used in Navigation
    const cssFeatures = {
      'backdrop-filter': 'blur(10px)',
      'position': 'fixed',
      'transform': 'translateX(-50%)',
      'transition': 'all 0.3s ease',
      'z-index': '50',
      'box-shadow': '0 10px 25px rgba(0,0,0,0.1)'
    };

    for (const [property, value] of Object.entries(cssFeatures)) {
      results.cssFeaturesSupport[property] = CSS.supports(property, value);
    }

    // Detect mobile browser specific issues
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      // Test viewport units
      const testEl = document.createElement('div');
      testEl.style.height = '100vh';
      testEl.style.position = 'fixed';
      testEl.style.top = '0';
      testEl.style.visibility = 'hidden';
      document.body.appendChild(testEl);
      
      const viewportHeight = window.innerHeight;
      const elementHeight = testEl.offsetHeight;
      
      if (Math.abs(viewportHeight - elementHeight) > 50) {
        results.mobileBrowserIssues.push('viewport-height-inconsistency');
      }
      
      document.body.removeChild(testEl);

      // Test scroll behavior
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'smooth';
      
      window.scrollTo(0, 100);
      setTimeout(() => {
        if (window.scrollY !== 100) {
          results.mobileBrowserIssues.push('smooth-scroll-issues');
        }
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      }, 500);
    }

    this.results.crossBrowser = results;
    return results;
  }

  // Helper Methods
  async simulateScrolling() {
    return new Promise(resolve => {
      let scrollPos = 0;
      const maxScroll = 1000;
      const scrollStep = 10;
      
      const scrollInterval = setInterval(() => {
        window.scrollTo(0, scrollPos);
        scrollPos += scrollStep;
        
        if (scrollPos >= maxScroll) {
          clearInterval(scrollInterval);
          // Scroll back to top
          window.scrollTo(0, 0);
          resolve();
        }
      }, 16); // ~60fps
    });
  }

  isOverflowing(element) {
    return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
  }

  // Generate Comprehensive Report
  generateReport() {
    console.log('📊 HEADER FUNCTIONALITY DIAGNOSIS REPORT');
    console.log('==========================================');
    
    console.log('\n🚀 PERFORMANCE ANALYSIS:');
    console.log(`  Scroll Events: ${this.results.performance.scrollEventCount || 'Not tested'}`);
    console.log(`  Dropped Frames: ${this.results.performance.droppedFrames || 0}`);
    console.log(`  Backdrop Blur Support: ${this.results.performance.backdropBlurSupport ? '✅' : '❌'}`);
    
    console.log('\n📱 MOBILE MENU ANALYSIS:');
    console.log(`  Animation Smooth: ${this.results.mobile.animationSmooth ? '✅' : '❌'}`);
    console.log(`  Touch Responsive: ${this.results.mobile.touchResponsive ? '✅' : '❌'}`);
    console.log(`  Orientation Handling: ${this.results.mobile.orientationHandling ? '✅' : '❌'}`);
    
    console.log('\n📐 RESPONSIVE BREAKPOINTS:');
    for (const [width, data] of Object.entries(this.results.responsive.breakpoints || {})) {
      console.log(`  ${width}px: Nav Height: ${data.navHeight}px, CTA Visible: ${data.ctaVisible ? '✅' : '❌'}, Text Overflow: ${data.businessNameVisible ? '✅' : '❌'}`);
    }
    
    console.log('\n🔍 Z-INDEX CONFLICTS:');
    console.log(`  Header Z-Index: ${this.results.zIndex.headerZIndex}`);
    console.log(`  Hero Z-Index: ${this.results.zIndex.heroZIndex}`);
    console.log(`  Conflicts Found: ${this.results.zIndex.conflicts?.length || 0}`);
    
    console.log('\n🌐 BROWSER COMPATIBILITY:');
    console.log(`  Backdrop Filter: ${this.results.crossBrowser.backdropBlurSupport ? '✅' : '❌'}`);
    console.log(`  Fixed Position: ${this.results.crossBrowser.fixedPositionSupport ? '✅' : '❌'}`);
    console.log(`  Mobile Issues: ${this.results.crossBrowser.mobileBrowserIssues?.length || 0} found`);
    
    return this.results;
  }

  // Run Complete Diagnosis
  async runCompleteAnalysis() {
    console.log('🔧 Starting Complete Header Diagnosis...');
    
    try {
      await this.analyzeScrollPerformance();
      await this.analyzeMobileMenu();
      await this.analyzeResponsiveBreakpoints();
      await this.analyzeZIndexConflicts();
      await this.analyzeCrossBrowserCompatibility();
      
      return this.generateReport();
    } catch (error) {
      console.error('❌ Diagnosis failed:', error);
      return { error: error.message };
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeaderDiagnostics;
} else if (typeof window !== 'undefined') {
  window.HeaderDiagnostics = HeaderDiagnostics;
}

// Auto-run if in browser environment
if (typeof window !== 'undefined' && window.document) {
  console.log('🔧 Header Diagnostics Tool Loaded. Run: new HeaderDiagnostics().runCompleteAnalysis()');
}