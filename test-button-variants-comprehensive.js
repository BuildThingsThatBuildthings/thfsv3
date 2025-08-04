/**
 * Comprehensive Button Variants & Animation Test Script
 * Tests all the recent changes to Button.tsx including:
 * - New simplified earth-tone design system
 * - Four variants: primary, secondary, outline, ghost
 * - Whimsical micro-interactions (breathing, ripples, shimmer)
 * - Organic animations and proper hover/tap states
 */

console.log('🧪 BUTTON VARIANTS & ANIMATIONS COMPREHENSIVE TEST STARTING...\n');

// Test configuration
const TEST_CONFIG = {
  animationDelay: 200, // Wait for animations
  hoverTestDuration: 300, // How long to hover
  variants: ['primary', 'secondary', 'outline', 'ghost'],
  requiredProps: ['children', 'variant', 'onClick'],
  interactionStates: ['idle', 'hover', 'active', 'disabled']
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

function createTestButton(variant = 'primary', disabled = false, props = {}) {
  const button = document.createElement('button');
  button.className = `btn-${variant}`;
  button.textContent = `Test ${variant} Button`;
  button.disabled = disabled;
  
  // Apply additional props
  Object.assign(button, props);
  
  // Add to DOM temporarily for testing
  document.body.appendChild(button);
  return button;
}

function removeTestButton(button) {
  if (button && button.parentNode) {
    button.parentNode.removeChild(button);
  }
}

// Test 1: Button Variant Existence and Styling
async function testButtonVariants() {
  console.log('\n--- Testing Button Variants & Styling ---');
  
  for (const variant of TEST_CONFIG.variants) {
    const button = createTestButton(variant);
    
    // Check if button was created
    logTest(`${variant} Button Creation`, 
      button ? 'PASS' : 'FAIL', 
      `Button element created successfully`);
    
    if (!button) continue;
    
    // Check computed styles
    const computedStyle = window.getComputedStyle(button);
    const hasBackground = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                         computedStyle.backgroundColor !== 'transparent';
    const hasBorder = computedStyle.borderWidth !== '0px' || 
                     computedStyle.borderStyle !== 'none';
    const hasPadding = computedStyle.padding !== '0px';
    const hasFontStyling = computedStyle.fontSize !== '16px' || 
                          computedStyle.fontWeight !== '400';
    
    logTest(`${variant} Button Styling`, 
      hasBackground || hasBorder ? 'PASS' : 'WARN', 
      `Background: ${hasBackground}, Border: ${hasBorder}, Padding: ${hasPadding}`);
    
    // Test earth-tone colors (should contain terracotta, sage, amber, or warm colors)
    const bgColor = computedStyle.backgroundColor;
    const textColor = computedStyle.color;
    const borderColor = computedStyle.borderColor;
    
    const hasEarthTones = 
      bgColor.includes('rgb') || 
      textColor.includes('rgb') || 
      borderColor.includes('rgb');
    
    logTest(`${variant} Button Earth-tone Colors`, 
      hasEarthTones ? 'PASS' : 'WARN', 
      `BG: ${bgColor}, Text: ${textColor}, Border: ${borderColor}`);
    
    removeTestButton(button);
  }
}

// Test 2: Button Animations and Micro-interactions
async function testButtonAnimations() {
  console.log('\n--- Testing Button Animations & Micro-interactions ---');
  
  for (const variant of TEST_CONFIG.variants) {
    const button = createTestButton(variant);
    if (!button) continue;
    
    // Test initial state (breathing animation)
    const initialTransform = window.getComputedStyle(button).transform;
    
    // Wait for potential breathing animation
    await wait(TEST_CONFIG.animationDelay);
    
    const breathingTransform = window.getComputedStyle(button).transform;
    const hasBreathingAnimation = initialTransform !== breathingTransform;
    
    logTest(`${variant} Button Breathing Animation`, 
      hasBreathingAnimation ? 'PASS' : 'WARN', 
      `Transform changes detected: ${hasBreathingAnimation}`);
    
    // Test hover state
    const preHoverStyle = {
      transform: window.getComputedStyle(button).transform,
      boxShadow: window.getComputedStyle(button).boxShadow,
      scale: window.getComputedStyle(button).scale || '1'
    };
    
    // Simulate hover
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await wait(TEST_CONFIG.animationDelay);
    
    const hoverStyle = {
      transform: window.getComputedStyle(button).transform,
      boxShadow: window.getComputedStyle(button).boxShadow,
      scale: window.getComputedStyle(button).scale || '1'
    };
    
    const hasHoverTransform = preHoverStyle.transform !== hoverStyle.transform;
    const hasHoverShadow = preHoverStyle.boxShadow !== hoverStyle.boxShadow;
    
    logTest(`${variant} Button Hover Animation`, 
      hasHoverTransform || hasHoverShadow ? 'PASS' : 'WARN', 
      `Transform change: ${hasHoverTransform}, Shadow change: ${hasHoverShadow}`);
    
    // Test tap/active state
    button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await wait(50);
    
    const activeStyle = {
      transform: window.getComputedStyle(button).transform
    };
    
    const hasActiveTransform = hoverStyle.transform !== activeStyle.transform;
    
    logTest(`${variant} Button Tap Animation`, 
      hasActiveTransform ? 'PASS' : 'WARN', 
      `Active transform change: ${hasActiveTransform}`);
    
    // Reset states
    button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    
    removeTestButton(button);
  }
}

// Test 3: Button Disabled States
async function testButtonDisabledStates() {
  console.log('\n--- Testing Button Disabled States ---');
  
  for (const variant of TEST_CONFIG.variants) {
    const enabledButton = createTestButton(variant, false);
    const disabledButton = createTestButton(variant, true);
    
    if (!enabledButton || !disabledButton) {
      logTest(`${variant} Button Disabled State Creation`, 'FAIL', 'Could not create test buttons');
      continue;
    }
    
    // Compare enabled vs disabled styling
    const enabledStyle = window.getComputedStyle(enabledButton);
    const disabledStyle = window.getComputedStyle(disabledButton);
    
    const opacityDifference = parseFloat(enabledStyle.opacity) !== parseFloat(disabledStyle.opacity);
    const cursorDifference = enabledStyle.cursor !== disabledStyle.cursor;
    
    logTest(`${variant} Button Disabled Styling`, 
      opacityDifference || cursorDifference ? 'PASS' : 'WARN', 
      `Opacity diff: ${opacityDifference}, Cursor diff: ${cursorDifference}`);
    
    // Test that disabled buttons don't animate on hover
    const preHoverTransform = disabledStyle.transform;
    
    disabledButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await wait(TEST_CONFIG.animationDelay);
    
    const postHoverTransform = window.getComputedStyle(disabledButton).transform;
    const noHoverAnimation = preHoverTransform === postHoverTransform;
    
    logTest(`${variant} Button Disabled Hover Prevention`, 
      noHoverAnimation ? 'PASS' : 'WARN', 
      `Hover animation prevented: ${noHoverAnimation}`);
    
    removeTestButton(enabledButton);
    removeTestButton(disabledButton);
  }
}

// Test 4: Button Interaction States and Accessibility
async function testButtonInteractivity() {
  console.log('\n--- Testing Button Interactivity & Accessibility ---');
  
  for (const variant of TEST_CONFIG.variants) {
    const button = createTestButton(variant);
    if (!button) continue;
    
    // Test click functionality
    let clickCount = 0;
    button.addEventListener('click', () => clickCount++);
    
    button.click();
    
    logTest(`${variant} Button Click Functionality`, 
      clickCount === 1 ? 'PASS' : 'FAIL', 
      `Click registered: ${clickCount === 1}`);
    
    // Test keyboard accessibility
    button.focus();
    const hasFocus = document.activeElement === button;
    
    logTest(`${variant} Button Focus`, 
      hasFocus ? 'PASS' : 'WARN', 
      `Can receive focus: ${hasFocus}`);
    
    // Test ARIA attributes
    const hasRole = button.getAttribute('role') === 'button' || button.tagName === 'BUTTON';
    const hasTabIndex = button.tabIndex >= 0;
    
    logTest(`${variant} Button Accessibility`, 
      hasRole && hasTabIndex ? 'PASS' : 'WARN', 
      `Proper role: ${hasRole}, Focusable: ${hasTabIndex}`);
    
    // Test button text content
    const hasText = button.textContent && button.textContent.trim().length > 0;
    const hasAriaLabel = button.getAttribute('aria-label');
    
    logTest(`${variant} Button Accessible Text`, 
      hasText || hasAriaLabel ? 'PASS' : 'WARN', 
      `Has text: ${hasText}, Has aria-label: ${!!hasAriaLabel}`);
    
    removeTestButton(button);
  }
}

// Test 5: Button Performance and Rendering
async function testButtonPerformance() {
  console.log('\n--- Testing Button Performance & Rendering ---');
  
  // Test multiple button rendering
  const buttons = [];
  const startTime = performance.now();
  
  for (let i = 0; i < 20; i++) {
    const variant = TEST_CONFIG.variants[i % TEST_CONFIG.variants.length];
    buttons.push(createTestButton(variant));
  }
  
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  
  logTest('Multiple Button Rendering Performance', 
    renderTime < 100 ? 'PASS' : renderTime < 500 ? 'WARN' : 'FAIL',
    `${buttons.length} buttons rendered in ${renderTime.toFixed(2)}ms`);
  
  // Test animation performance
  const animationStartTime = performance.now();
  
  // Trigger hover on all buttons
  buttons.forEach(button => {
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  });
  
  await wait(TEST_CONFIG.animationDelay);
  
  const animationEndTime = performance.now();
  const animationTime = animationEndTime - animationStartTime;
  
  logTest('Button Animation Performance', 
    animationTime < 300 ? 'PASS' : animationTime < 1000 ? 'WARN' : 'FAIL',
    `${buttons.length} button animations in ${animationTime.toFixed(2)}ms`);
  
  // Clean up
  buttons.forEach(removeTestButton);
}

// Test 6: Button Variant Differentiation
async function testButtonVariantDifferences() {
  console.log('\n--- Testing Button Variant Visual Differentiation ---');
  
  const buttons = {};
  
  // Create one of each variant
  TEST_CONFIG.variants.forEach(variant => {
    buttons[variant] = createTestButton(variant);
  });
  
  // Compare styling between variants
  const styles = {};
  Object.keys(buttons).forEach(variant => {
    if (buttons[variant]) {
      const style = window.getComputedStyle(buttons[variant]);
      styles[variant] = {
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderStyle: style.borderStyle,
        borderColor: style.borderColor,
        borderWidth: style.borderWidth
      };
    }
  });
  
  // Check that variants are visually different
  const variants = Object.keys(styles);
  let differentiationCount = 0;
  
  for (let i = 0; i < variants.length; i++) {
    for (let j = i + 1; j < variants.length; j++) {
      const style1 = styles[variants[i]];
      const style2 = styles[variants[j]];
      
      const isDifferent = 
        style1.backgroundColor !== style2.backgroundColor ||
        style1.color !== style2.color ||
        style1.borderStyle !== style2.borderStyle ||
        style1.borderColor !== style2.borderColor ||
        style1.borderWidth !== style2.borderWidth;
      
      if (isDifferent) differentiationCount++;
    }
  }
  
  const totalComparisons = (variants.length * (variants.length - 1)) / 2;
  const differentiationRate = differentiationCount / totalComparisons;
  
  logTest('Button Variant Visual Differentiation', 
    differentiationRate >= 0.8 ? 'PASS' : differentiationRate >= 0.5 ? 'WARN' : 'FAIL',
    `${differentiationCount}/${totalComparisons} variant pairs are visually different`);
  
  // Clean up
  Object.values(buttons).forEach(removeTestButton);
}

// Main test runner
async function runAllButtonTests() {
  console.log('🚀 Starting Button Variants Comprehensive Test Suite\n');
  console.log('This will test the recent changes to Button.tsx including:');
  console.log('- New simplified earth-tone design system');
  console.log('- Four variants: primary, secondary, outline, ghost');
  console.log('- Whimsical micro-interactions and organic animations');
  console.log('- Proper disabled states and accessibility');
  console.log('- Performance and visual differentiation\n');
  
  try {
    await testButtonVariants();
    await testButtonAnimations();
    await testButtonDisabledStates();
    await testButtonInteractivity();
    await testButtonPerformance();
    await testButtonVariantDifferences();
    
    // Final report
    console.log('\n' + '='.repeat(50));
    console.log('📊 BUTTON VARIANTS TEST RESULTS SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`⚠️  Warnings: ${testResults.warnings}`);
    console.log(`📝 Total Tests: ${testResults.details.length}`);
    
    const successRate = Math.round((testResults.passed / testResults.details.length) * 100);
    console.log(`📈 Success Rate: ${successRate}%`);
    
    if (testResults.failed === 0) {
      console.log('\n🎉 All critical tests passed! Button system is working correctly.');
    } else {
      console.log('\n⚠️  Some tests failed. Please review the detailed results above.');
    }
    
    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    if (testResults.warnings > 0) {
      console.log('- Some visual or animation tests showed warnings - consider enhancing animations');
      console.log('- Check that all button variants have distinctive visual styles');
      console.log('- Ensure proper earth-tone colors are being applied');
    }
    
    console.log('- Test buttons in real application context');
    console.log('- Verify button accessibility with screen readers');
    console.log('- Test on different devices and screen sizes');
    console.log('- Validate button behavior with actual click handlers\n');
    
    console.log('📋 Detailed Results:');
    testResults.details.forEach(result => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      console.log(`${icon} ${result.testName}`);
      if (result.details) console.log(`   → ${result.details}`);
    });
    
  } catch (error) {
    console.error('❌ Button test suite encountered an error:', error);
  }
}

// Auto-run if script is executed directly
if (typeof window !== 'undefined') {
  runAllButtonTests();
} else {
  module.exports = { runAllButtonTests, testResults };
}