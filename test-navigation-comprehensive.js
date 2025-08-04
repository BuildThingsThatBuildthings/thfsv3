/**
 * Comprehensive Navigation & Header Test Script
 * Tests all the recent changes to Navigation.tsx including:
 * - Fixed scroll behavior (no more opacity changes)
 * - Micro-interactions and animations
 * - Mobile menu functionality
 * - Responsive design
 */

console.log('🧪 NAVIGATION & HEADER COMPREHENSIVE TEST STARTING...\n');

// Test configuration
const TEST_CONFIG = {
  testDuration: 5000, // 5 seconds per test
  scrollTestPoints: [0, 50, 100, 200, 500, 1000], // Scroll positions to test
  animationDelay: 100, // Wait for animations
  mobileBreakpoint: 768 // px
};

let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

// Utility functions
function logTest(testName, status, details = '') {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} ${testName}: ${status}`);
  if (details) console.log(`   ${details}`);
  
  testResults.details.push({ testName, status, details });
  if (status === 'PASS') testResults.passed++;
  else if (status === 'FAIL') testResults.failed++;
  else testResults.warnings++;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Test 1: Header Visibility & Consistency
async function testHeaderVisibility() {
  console.log('\n--- Testing Header Visibility & Consistency ---');
  
  const nav = document.querySelector('nav[class*="fixed"]');
  if (!nav) {
    logTest('Header Element Exists', 'FAIL', 'Navigation element not found');
    return;
  }
  
  logTest('Header Element Exists', 'PASS', 'Navigation element found');
  
  // Test initial visibility
  const initialOpacity = window.getComputedStyle(nav).opacity;
  logTest('Initial Header Visibility', 
    initialOpacity >= 0.9 ? 'PASS' : 'FAIL', 
    `Opacity: ${initialOpacity}`);
  
  // Test scroll consistency - header should stay visible
  for (const scrollY of TEST_CONFIG.scrollTestPoints) {
    window.scrollTo(0, scrollY);
    await wait(TEST_CONFIG.animationDelay);
    
    const opacity = window.getComputedStyle(nav).opacity;
    const isVisible = opacity >= 0.9;
    
    logTest(`Header Visibility at ${scrollY}px scroll`, 
      isVisible ? 'PASS' : 'FAIL', 
      `Opacity: ${opacity}`);
  }
  
  // Reset scroll
  window.scrollTo(0, 0);
  await wait(TEST_CONFIG.animationDelay);
}

// Test 2: Header Animations & Micro-interactions
async function testHeaderAnimations() {
  console.log('\n--- Testing Header Animations & Micro-interactions ---');
  
  const nav = document.querySelector('nav[class*="fixed"]');
  const logo = nav?.querySelector('a[class*="text-xl"]');
  const navItems = nav?.querySelectorAll('a[class*="text-sm"]');
  
  if (!logo) {
    logTest('Logo Element Found', 'FAIL', 'Logo element not found');
    return;
  }
  
  logTest('Logo Element Found', 'PASS');
  
  // Test logo hover animation
  const logoInitialTransform = window.getComputedStyle(logo).transform;
  
  // Simulate hover
  logo.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  await wait(TEST_CONFIG.animationDelay);
  
  const logoHoverTransform = window.getComputedStyle(logo).transform;
  const hasHoverEffect = logoInitialTransform !== logoHoverTransform;
  
  logTest('Logo Hover Animation', 
    hasHoverEffect ? 'PASS' : 'WARN', 
    `Transform changed: ${hasHoverEffect}`);
    
  // Reset hover
  logo.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
  await wait(TEST_CONFIG.animationDelay);
  
  // Test nav item animations
  if (navItems.length > 0) {
    logTest('Navigation Items Found', 'PASS', `Found ${navItems.length} items`);
    
    // Test first nav item hover
    const firstNavItem = navItems[0];
    const navInitialTransform = window.getComputedStyle(firstNavItem).transform;
    
    firstNavItem.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await wait(TEST_CONFIG.animationDelay);
    
    const navHoverTransform = window.getComputedStyle(firstNavItem).transform;
    const hasNavHoverEffect = navInitialTransform !== navHoverTransform;
    
    logTest('Nav Item Hover Animation', 
      hasNavHoverEffect ? 'PASS' : 'WARN', 
      `Transform changed: ${hasNavHoverEffect}`);
      
    firstNavItem.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
  } else {
    logTest('Navigation Items Found', 'FAIL', 'No navigation items found');
  }
}

// Test 3: Mobile Menu Functionality
async function testMobileMenu() {
  console.log('\n--- Testing Mobile Menu Functionality ---');
  
  // Force mobile view
  const originalWidth = window.innerWidth;
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 600
  });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
  await wait(TEST_CONFIG.animationDelay);
  
  const mobileMenuButton = document.querySelector('button[class*="md:hidden"]');
  const mobileMenu = document.querySelector('[class*="md:hidden"] [class*="border-t"]');
  
  if (!mobileMenuButton) {
    logTest('Mobile Menu Button Found', 'FAIL', 'Mobile menu button not found');
    return;
  }
  
  logTest('Mobile Menu Button Found', 'PASS');
  
  // Test mobile menu toggle
  const initialMenuVisible = mobileMenu && window.getComputedStyle(mobileMenu).display !== 'none';
  
  // Click to open menu
  mobileMenuButton.click();
  await wait(TEST_CONFIG.animationDelay * 2);
  
  const menuOpenVisible = mobileMenu && window.getComputedStyle(mobileMenu).display !== 'none';
  
  logTest('Mobile Menu Opens', 
    menuOpenVisible && !initialMenuVisible ? 'PASS' : 'FAIL', 
    `Initial: ${initialMenuVisible}, After click: ${menuOpenVisible}`);
  
  // Click to close menu
  mobileMenuButton.click();
  await wait(TEST_CONFIG.animationDelay * 2);
  
  const menuClosedVisible = mobileMenu && window.getComputedStyle(mobileMenu).display !== 'none';
  
  logTest('Mobile Menu Closes', 
    !menuClosedVisible ? 'PASS' : 'FAIL', 
    `Menu visible after second click: ${menuClosedVisible}`);
  
  // Restore original width
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: originalWidth
  });
  window.dispatchEvent(new Event('resize'));
}

// Test 4: Responsive Design
async function testResponsiveDesign() {
  console.log('\n--- Testing Responsive Design ---');
  
  const nav = document.querySelector('nav[class*="fixed"]');
  const desktopNav = nav?.querySelector('[class*="hidden md:flex"]');
  const mobileButton = nav?.querySelector('button[class*="md:hidden"]');
  
  // Test desktop view
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024
  });
  window.dispatchEvent(new Event('resize'));
  await wait(TEST_CONFIG.animationDelay);
  
  const desktopNavVisible = desktopNav && window.getComputedStyle(desktopNav).display !== 'none';
  const mobileButtonHidden = mobileButton && window.getComputedStyle(mobileButton).display === 'none';
  
  logTest('Desktop Navigation Visible', 
    desktopNavVisible ? 'PASS' : 'FAIL', 
    `Desktop nav visible: ${desktopNavVisible}`);
    
  logTest('Mobile Button Hidden on Desktop', 
    mobileButtonHidden ? 'PASS' : 'FAIL', 
    `Mobile button hidden: ${mobileButtonHidden}`);
  
  // Test mobile view
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 600
  });
  window.dispatchEvent(new Event('resize'));
  await wait(TEST_CONFIG.animationDelay);
  
  const desktopNavHidden = desktopNav && window.getComputedStyle(desktopNav).display === 'none';
  const mobileButtonVisible = mobileButton && window.getComputedStyle(mobileButton).display !== 'none';
  
  logTest('Desktop Navigation Hidden on Mobile', 
    desktopNavHidden ? 'PASS' : 'FAIL', 
    `Desktop nav hidden: ${desktopNavHidden}`);
    
  logTest('Mobile Button Visible on Mobile', 
    mobileButtonVisible ? 'PASS' : 'FAIL', 
    `Mobile button visible: ${mobileButtonVisible}`);
}

// Test 5: Performance & Accessibility
async function testPerformanceAndA11y() {
  console.log('\n--- Testing Performance & Accessibility ---');
  
  const nav = document.querySelector('nav[class*="fixed"]');
  const links = nav?.querySelectorAll('a');
  const button = nav?.querySelector('button');
  
  // Test link accessibility
  let accessibleLinks = 0;
  if (links) {
    links.forEach(link => {
      const hasText = link.textContent?.trim().length > 0;
      const hasAriaLabel = link.getAttribute('aria-label');
      if (hasText || hasAriaLabel) accessibleLinks++;
    });
  }
  
  logTest('Link Accessibility', 
    accessibleLinks === links?.length ? 'PASS' : 'WARN', 
    `${accessibleLinks}/${links?.length} links have accessible text`);
  
  // Test button accessibility
  if (button) {
    const hasAriaLabel = button.getAttribute('aria-label');
    const hasAriaExpanded = button.getAttribute('aria-expanded');
    
    logTest('Mobile Button Accessibility', 
      hasAriaLabel || hasAriaExpanded ? 'PASS' : 'WARN', 
      `Has aria-label: ${!!hasAriaLabel}, Has aria-expanded: ${!!hasAriaExpanded}`);
  }
  
  // Test focus states
  const focusableElements = nav?.querySelectorAll('a, button');
  let focusableCount = 0;
  
  if (focusableElements) {
    focusableElements.forEach(el => {
      el.focus();
      const hasFocusStyle = window.getComputedStyle(el, ':focus').outline !== 'none' ||
                           window.getComputedStyle(el, ':focus').outlineWidth !== '0px';
      if (hasFocusStyle) focusableCount++;
    });
  }
  
  logTest('Focus States', 
    focusableCount > 0 ? 'PASS' : 'WARN', 
    `${focusableCount}/${focusableElements?.length} elements have focus styles`);
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Navigation Comprehensive Test Suite\n');
  console.log('This will test the recent changes to Navigation.tsx including:');
  console.log('- Fixed scroll behavior (consistent visibility)');
  console.log('- Micro-interactions and animations');
  console.log('- Mobile menu functionality');
  console.log('- Responsive design behavior');
  console.log('- Performance and accessibility\n');
  
  try {
    await testHeaderVisibility();
    await testHeaderAnimations();
    await testMobileMenu();
    await testResponsiveDesign();
    await testPerformanceAndA11y();
    
    // Final report
    console.log('\n' + '='.repeat(50));
    console.log('📊 NAVIGATION TEST RESULTS SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`⚠️  Warnings: ${testResults.warnings}`);
    console.log(`📝 Total Tests: ${testResults.details.length}`);
    
    const successRate = Math.round((testResults.passed / testResults.details.length) * 100);
    console.log(`📈 Success Rate: ${successRate}%`);
    
    if (testResults.failed === 0) {
      console.log('\n🎉 All critical tests passed! Navigation changes are working correctly.');
    } else {
      console.log('\n⚠️  Some tests failed. Please review the detailed results above.');
    }
    
    console.log('\n📋 Detailed Results:');
    testResults.details.forEach(result => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      console.log(`${icon} ${result.testName}`);
      if (result.details) console.log(`   → ${result.details}`);
    });
    
  } catch (error) {
    console.error('❌ Test suite encountered an error:', error);
  }
}

// Auto-run if script is executed directly
if (typeof window !== 'undefined') {
  runAllTests();
} else {
  module.exports = { runAllTests, testResults };
}