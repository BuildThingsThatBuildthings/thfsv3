/**
 * Visual Header Testing Script
 * Tests header in actual browser rendering to catch visual issues
 * Uses simple DOM manipulation and window resizing
 */

// Test configuration for different screen sizes
const TEST_SIZES = [
  { name: 'iPhone 5/SE', width: 320, height: 568, type: 'mobile' },
  { name: 'iPhone 12', width: 390, height: 844, type: 'mobile' },
  { name: 'iPad', width: 768, height: 1024, type: 'tablet' },
  { name: 'iPad Pro', width: 1024, height: 1366, type: 'tablet' },
  { name: 'Laptop', width: 1366, height: 768, type: 'desktop' },
  { name: 'Desktop', width: 1920, height: 1080, type: 'desktop' }
];

class VisualHeaderTester {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      tests: [],
      issues: [],
      warnings: [],
      summary: { passed: 0, failed: 0, warnings: 0 }
    };
    this.originalSize = { width: window.innerWidth, height: window.innerHeight };
  }

  async runTests() {
    console.log('🔍 Starting Visual Header Tests...');
    
    // Create test UI
    this.createTestUI();
    
    for (const size of TEST_SIZES) {
      await this.testScreenSize(size);
      await this.sleep(1000); // Allow time for transitions
    }
    
    // Restore original window size
    this.resizeWindow(this.originalSize.width, this.originalSize.height);
    
    this.displayResults();
    return this.results;
  }

  createTestUI() {
    // Create test results container
    const testContainer = document.createElement('div');
    testContainer.id = 'header-test-results';
    testContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      max-height: 80vh;
      overflow-y: auto;
      background: white;
      border: 2px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
    `;
    
    testContainer.innerHTML = `
      <div style="padding: 15px; border-bottom: 1px solid #eee; background: #f8f9fa;">
        <h3 style="margin: 0; color: #333;">Header Test Results</h3>
        <button onclick="document.getElementById('header-test-results').remove()" 
                style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
      </div>
      <div id="test-log" style="padding: 15px; max-height: 400px; overflow-y: auto;"></div>
    `;
    
    document.body.appendChild(testContainer);
  }

  logTest(message, status = 'info') {
    const log = document.getElementById('test-log');
    if (!log) return;
    
    const colors = {
      pass: '#28a745',
      fail: '#dc3545', 
      warn: '#ffc107',
      info: '#17a2b8'
    };
    
    const entry = document.createElement('div');
    entry.style.cssText = `
      padding: 8px;
      margin-bottom: 5px;
      border-left: 3px solid ${colors[status] || colors.info};
      background: ${status === 'fail' ? '#f8d7da' : status === 'warn' ? '#fff3cd' : status === 'pass' ? '#d4edda' : '#d1ecf1'};
      font-size: 12px;
      line-height: 1.4;
    `;
    entry.textContent = message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  }

  async testScreenSize(size) {
    this.logTest(`🔍 Testing ${size.name} (${size.width}x${size.height})`, 'info');
    
    // Resize window
    this.resizeWindow(size.width, size.height);
    await this.sleep(500); // Wait for responsive changes
    
    const testResult = {
      device: size.name,
      dimensions: `${size.width}x${size.height}`,
      type: size.type,
      tests: {}
    };

    // Test 1: Brand Name Display
    await this.testBrandNameDisplay(size, testResult);
    
    // Test 2: Header Height
    await this.testHeaderHeight(size, testResult);
    
    // Test 3: Navigation Visibility
    await this.testNavigationVisibility(size, testResult);
    
    // Test 4: Content Overlap
    await this.testContentOverlap(size, testResult);
    
    // Test 5: Mobile Menu (if applicable)
    if (size.width < 1024) {
      await this.testMobileMenu(size, testResult);
    }
    
    this.results.tests.push(testResult);
  }

  async testBrandNameDisplay(size, result) {
    const nav = document.querySelector('nav');
    const brandLink = nav?.querySelector('a[href="/"]');
    
    if (!brandLink) {
      this.logTest('❌ Brand link not found', 'fail');
      result.tests.brandName = { status: 'failed', message: 'Brand link not found' };
      this.results.issues.push(`${size.name}: Brand link not found`);
      this.results.summary.failed++;
      return;
    }

    const desktopSpan = brandLink.querySelector('.hidden.sm\\:inline');
    const mobileSpan = brandLink.querySelector('.sm\\:hidden');
    
    if (size.width >= 640) {
      // Desktop/tablet - should show single line
      const isDesktopVisible = desktopSpan && window.getComputedStyle(desktopSpan).display !== 'none';
      const isMobileHidden = !mobileSpan || window.getComputedStyle(mobileSpan).display === 'none';
      
      if (isDesktopVisible && isMobileHidden) {
        this.logTest('✅ Desktop brand name displays correctly', 'pass');
        result.tests.brandName = { status: 'passed', message: 'Desktop brand name correct' };
        this.results.summary.passed++;
      } else {
        this.logTest('❌ Desktop brand name display issue', 'fail');
        result.tests.brandName = { status: 'failed', message: 'Desktop brand name not displaying properly' };
        this.results.issues.push(`${size.name}: Desktop brand name display issue`);
        this.results.summary.failed++;
      }
    } else {
      // Mobile - should show stacked
      const isMobileVisible = mobileSpan && window.getComputedStyle(mobileSpan).display !== 'none';
      const isDesktopHidden = !desktopSpan || window.getComputedStyle(desktopSpan).display === 'none';
      
      if (isMobileVisible && isDesktopHidden) {
        this.logTest('✅ Mobile brand name stacks correctly', 'pass');
        result.tests.brandName = { status: 'passed', message: 'Mobile brand name correct' };
        this.results.summary.passed++;
      } else {
        this.logTest('❌ Mobile brand name display issue', 'fail');
        result.tests.brandName = { status: 'failed', message: 'Mobile brand name not displaying properly' };
        this.results.issues.push(`${size.name}: Mobile brand name display issue`);
        this.results.summary.failed++;
      }
    }
  }

  async testHeaderHeight(size, result) {
    const nav = document.querySelector('nav');
    const headerContainer = nav?.querySelector('div > div');
    
    if (!headerContainer) {
      this.logTest('❌ Header container not found', 'fail');
      result.tests.headerHeight = { status: 'failed', message: 'Header container not found' };
      this.results.issues.push(`${size.name}: Header container not found`);
      this.results.summary.failed++;
      return;
    }

    const actualHeight = headerContainer.getBoundingClientRect().height;
    const expectedHeight = size.width >= 768 ? 64 : 56;
    
    if (Math.abs(actualHeight - expectedHeight) <= 2) { // 2px tolerance
      this.logTest(`✅ Header height correct: ${actualHeight}px`, 'pass');
      result.tests.headerHeight = { status: 'passed', message: `Header height: ${actualHeight}px` };
      this.results.summary.passed++;
    } else {
      this.logTest(`❌ Header height incorrect: ${actualHeight}px (expected ${expectedHeight}px)`, 'fail');
      result.tests.headerHeight = { status: 'failed', message: `Height: ${actualHeight}px, expected: ${expectedHeight}px` };
      this.results.issues.push(`${size.name}: Header height incorrect`);
      this.results.summary.failed++;
    }
  }

  async testNavigationVisibility(size, result) {
    const desktopNav = document.querySelector('.hidden.lg\\:flex');
    const mobileButton = document.querySelector('.lg\\:hidden button');
    
    if (size.width >= 1024) {
      // Desktop - should show navigation, hide mobile button
      const isDesktopNavVisible = desktopNav && window.getComputedStyle(desktopNav).display !== 'none';
      const isMobileButtonHidden = !mobileButton || window.getComputedStyle(mobileButton).display === 'none';
      
      if (isDesktopNavVisible && isMobileButtonHidden) {
        this.logTest('✅ Desktop navigation displays correctly', 'pass');
        result.tests.navigation = { status: 'passed', message: 'Desktop navigation visible' };
        this.results.summary.passed++;
      } else {
        this.logTest('❌ Desktop navigation display issue', 'fail');
        result.tests.navigation = { status: 'failed', message: 'Desktop navigation not properly displayed' };
        this.results.issues.push(`${size.name}: Desktop navigation display issue`);
        this.results.summary.failed++;
      }
    } else {
      // Mobile/tablet - should hide navigation, show mobile button
      const isDesktopNavHidden = !desktopNav || window.getComputedStyle(desktopNav).display === 'none';
      const isMobileButtonVisible = mobileButton && window.getComputedStyle(mobileButton).display !== 'none';
      
      if (isDesktopNavHidden && isMobileButtonVisible) {
        this.logTest('✅ Mobile navigation displays correctly', 'pass');
        result.tests.navigation = { status: 'passed', message: 'Mobile button visible, desktop nav hidden' };
        this.results.summary.passed++;
      } else {
        this.logTest('❌ Mobile navigation display issue', 'fail');
        result.tests.navigation = { status: 'failed', message: 'Mobile navigation not properly displayed' };
        this.results.issues.push(`${size.name}: Mobile navigation display issue`);
        this.results.summary.failed++;
      }
    }
  }

  async testContentOverlap(size, result) {
    const nav = document.querySelector('nav');
    const hero = document.querySelector('section'); // First section should be Hero
    
    if (!nav || !hero) {
      this.logTest('❌ Nav or Hero section not found', 'fail');
      result.tests.contentOverlap = { status: 'failed', message: 'Required elements not found' };
      this.results.issues.push(`${size.name}: Nav or Hero section not found`);
      this.results.summary.failed++;
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    
    // Check if hero starts below nav (with small tolerance)
    const overlap = navRect.bottom - heroRect.top;
    
    if (overlap <= 5) { // 5px tolerance
      this.logTest('✅ No content overlap detected', 'pass');
      result.tests.contentOverlap = { status: 'passed', message: 'Content properly spaced' };
      this.results.summary.passed++;
    } else {
      this.logTest(`⚠️ Potential content overlap: ${overlap}px`, 'warn');
      result.tests.contentOverlap = { status: 'warning', message: `${overlap}px overlap detected` };
      this.results.warnings.push(`${size.name}: ${overlap}px content overlap`);
      this.results.summary.warnings++;
    }
  }

  async testMobileMenu(size, result) {
    const mobileButton = document.querySelector('.lg\\:hidden button');
    const mobileMenu = document.querySelector('.lg\\:hidden .border-t');
    
    if (!mobileButton) {
      this.logTest('❌ Mobile menu button not found', 'fail');
      result.tests.mobileMenu = { status: 'failed', message: 'Mobile menu button not found' };
      this.results.issues.push(`${size.name}: Mobile menu button not found`);
      this.results.summary.failed++;
      return;
    }

    // Check initial state (menu should be closed)
    const initiallyVisible = mobileMenu && window.getComputedStyle(mobileMenu).display !== 'none';
    
    if (initiallyVisible) {
      this.logTest('⚠️ Mobile menu appears open by default', 'warn');
      this.results.warnings.push(`${size.name}: Mobile menu open by default`);
      this.results.summary.warnings++;
    }

    // Test menu opening
    mobileButton.click();
    await this.sleep(300); // Wait for animation
    
    const menuAfterClick = document.querySelector('.lg\\:hidden .border-t');
    const isMenuVisible = menuAfterClick && window.getComputedStyle(menuAfterClick).display !== 'none';
    
    if (isMenuVisible) {
      this.logTest('✅ Mobile menu opens successfully', 'pass');
      result.tests.mobileMenu = { status: 'passed', message: 'Mobile menu functional' };
      this.results.summary.passed++;
      
      // Close menu
      mobileButton.click();
      await this.sleep(300);
    } else {
      this.logTest('❌ Mobile menu does not open', 'fail');
      result.tests.mobileMenu = { status: 'failed', message: 'Mobile menu does not open' };
      this.results.issues.push(`${size.name}: Mobile menu does not open`);
      this.results.summary.failed++;
    }
  }

  resizeWindow(width, height) {
    // Note: This only works in certain browsers and contexts
    // In production, this would need to use viewport meta tag manipulation
    // or CSS media query testing
    try {
      window.resizeTo(width, height);
    } catch (e) {
      // Fallback: simulate viewport size for testing
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', `width=${width}, initial-scale=1`);
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  displayResults() {
    const { summary, issues, warnings } = this.results;
    
    console.log('\n' + '='.repeat(60));
    console.log('🏁 VISUAL HEADER TESTING COMPLETE');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   • Passed: ${summary.passed} ✅`);
    console.log(`   • Failed: ${summary.failed} ❌`);
    console.log(`   • Warnings: ${summary.warnings} ⚠️`);
    
    if (issues.length > 0) {
      console.log(`\n🚨 Issues Found:`);
      issues.forEach(issue => console.log(`   • ${issue}`));
    }
    
    if (warnings.length > 0) {
      console.log(`\n⚠️ Warnings:`);
      warnings.forEach(warning => console.log(`   • ${warning}`));
    }

    // Update test UI with final results
    this.logTest(`\n📊 Final Results:`, 'info');
    this.logTest(`✅ Passed: ${summary.passed}`, 'pass');
    this.logTest(`❌ Failed: ${summary.failed}`, 'fail');
    this.logTest(`⚠️ Warnings: ${summary.warnings}`, 'warn');
  }
}

// Auto-run if loaded in browser
if (typeof window !== 'undefined') {
  window.HeaderTester = VisualHeaderTester;
  
  // Create run button
  const runButton = document.createElement('button');
  runButton.textContent = '🧪 Run Header Tests';
  runButton.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    padding: 12px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    z-index: 10001;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;
  
  runButton.onclick = async () => {
    runButton.disabled = true;
    runButton.textContent = '🔄 Testing...';
    
    const tester = new VisualHeaderTester();
    await tester.runTests();
    
    runButton.textContent = '✅ Tests Complete';
    setTimeout(() => {
      runButton.remove();
    }, 3000);
  };
  
  // Add button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(runButton);
    });
  } else {
    document.body.appendChild(runButton);
  }
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VisualHeaderTester;
}