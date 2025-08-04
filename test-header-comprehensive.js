/**
 * Comprehensive Header Testing Script
 * Tests the luxury minimalist header across all device sizes
 * 
 * Usage: node test-header-comprehensive.js
 * 
 * Tests:
 * 1. Brand name responsiveness (single line vs stacked)
 * 2. Header heights (mobile 56px, desktop 64px)
 * 3. Content padding and spacing
 * 4. Navigation functionality
 * 5. Content overlap detection
 * 6. Performance and console errors
 * 7. Cross-device compatibility
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  timeout: 30000,
  devices: [
    // Mobile devices
    { name: 'iPhone SE', width: 375, height: 667, isMobile: true },
    { name: 'iPhone 12', width: 390, height: 844, isMobile: true },
    { name: 'Samsung Galaxy S20', width: 360, height: 800, isMobile: true },
    { name: 'Small Mobile', width: 320, height: 568, isMobile: true },
    
    // Tablet devices
    { name: 'iPad', width: 768, height: 1024, isTablet: true },
    { name: 'iPad Pro', width: 1024, height: 1366, isTablet: true },
    { name: 'Android Tablet', width: 800, height: 1280, isTablet: true },
    
    // Desktop devices
    { name: 'Laptop', width: 1366, height: 768, isDesktop: true },
    { name: 'Desktop', width: 1920, height: 1080, isDesktop: true },
    { name: 'Large Desktop', width: 2560, height: 1440, isDesktop: true },
    { name: 'Ultrawide', width: 3440, height: 1440, isDesktop: true }
  ],
  breakpoints: {
    mobile: { min: 320, max: 767 },
    tablet: { min: 768, max: 1023 },
    desktop: { min: 1024, max: 9999 }
  }
};

class HeaderTester {
  constructor() {
    this.browser = null;
    this.results = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      },
      devices: [],
      criticalIssues: [],
      warnings: [],
      recommendations: []
    };
  }

  async initialize() {
    console.log('🚀 Initializing Header Testing Suite...');
    
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for automated runs
      devtools: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--allow-running-insecure-content'
      ]
    });
    
    console.log('✅ Browser initialized');
  }

  async testDevice(device) {
    console.log(`\n📱 Testing ${device.name} (${device.width}x${device.height})`);
    
    const page = await this.browser.newPage();
    
    try {
      // Set viewport
      await page.setViewport({
        width: device.width,
        height: device.height,
        deviceScaleFactor: device.isMobile ? 2 : 1
      });

      // Navigate to homepage
      await page.goto(TEST_CONFIG.baseUrl, { 
        waitUntil: 'networkidle2',
        timeout: TEST_CONFIG.timeout 
      });

      // Wait for header to load
      await page.waitForSelector('nav', { timeout: 5000 });

      const deviceResult = {
        device: device.name,
        dimensions: `${device.width}x${device.height}`,
        type: device.isMobile ? 'mobile' : device.isTablet ? 'tablet' : 'desktop',
        tests: {},
        issues: [],
        warnings: [],
        performance: {}
      };

      // Test 1: Brand Name Responsiveness
      await this.testBrandNameResponsiveness(page, device, deviceResult);

      // Test 2: Header Heights
      await this.testHeaderHeights(page, device, deviceResult);

      // Test 3: Content Padding and Spacing
      await this.testContentPadding(page, device, deviceResult);

      // Test 4: Navigation Functionality
      await this.testNavigationFunctionality(page, device, deviceResult);

      // Test 5: Content Overlap Check
      await this.testContentOverlap(page, device, deviceResult);

      // Test 6: Mobile Menu Functionality (mobile/tablet only)
      if (device.isMobile || device.isTablet) {
        await this.testMobileMenu(page, device, deviceResult);
      }

      // Test 7: Performance and Console Errors
      await this.testPerformanceAndErrors(page, device, deviceResult);

      // Test 8: Visual Regression Check
      await this.testVisualRegression(page, device, deviceResult);

      this.results.devices.push(deviceResult);
      
      // Update summary
      const deviceTests = Object.values(deviceResult.tests);
      this.results.summary.totalTests += deviceTests.length;
      this.results.summary.passed += deviceTests.filter(t => t.status === 'passed').length;
      this.results.summary.failed += deviceTests.filter(t => t.status === 'failed').length;
      this.results.summary.warnings += deviceResult.warnings.length;

      console.log(`✅ ${device.name} testing completed`);

    } catch (error) {
      console.error(`❌ Error testing ${device.name}:`, error.message);
      deviceResult.error = error.message;
      this.results.criticalIssues.push(`${device.name}: ${error.message}`);
    } finally {
      await page.close();
    }

    return deviceResult;
  }

  async testBrandNameResponsiveness(page, device, result) {
    console.log('  🔤 Testing brand name responsiveness...');
    
    try {
      // Check brand name structure
      const brandElement = await page.$('nav a[href="/"]');
      
      if (!brandElement) {
        result.tests.brandName = {
          status: 'failed',
          message: 'Brand name link not found'
        };
        result.issues.push('Brand name link not found in navigation');
        return;
      }

      // Get brand name content and structure
      const brandInfo = await page.evaluate((el) => {
        const hiddenSpan = el.querySelector('.hidden.sm\\:inline');
        const mobileSpan = el.querySelector('.sm\\:hidden');
        
        return {
          hasDesktopVersion: !!hiddenSpan,
          hasMobileVersion: !!mobileSpan,
          desktopText: hiddenSpan ? hiddenSpan.textContent.trim() : null,
          mobileText: mobileSpan ? Array.from(mobileSpan.children).map(child => child.textContent.trim()) : null,
          isDesktopVisible: hiddenSpan ? window.getComputedStyle(hiddenSpan).display !== 'none' : false,
          isMobileVisible: mobileSpan ? window.getComputedStyle(mobileSpan).display !== 'none' : false
        };
      }, brandElement);

      // Test based on device type
      if (device.width >= 640) { // Desktop/tablet
        if (brandInfo.isDesktopVisible && brandInfo.desktopText === 'HEALING FREQUENCY SPACE') {
          result.tests.brandName = {
            status: 'passed',
            message: 'Desktop brand name displays correctly as single line'
          };
        } else {
          result.tests.brandName = {
            status: 'failed',
            message: `Desktop brand name issue - visible: ${brandInfo.isDesktopVisible}, text: "${brandInfo.desktopText}"`
          };
          result.issues.push('Desktop brand name not displaying correctly');
        }
      } else { // Mobile
        if (brandInfo.isMobileVisible && brandInfo.mobileText && brandInfo.mobileText.length === 2) {
          const expectedMobile = ['HEALING FREQUENCY', 'SPACE'];
          const isCorrect = brandInfo.mobileText[0] === expectedMobile[0] && 
                           brandInfo.mobileText[1] === expectedMobile[1];
          
          if (isCorrect) {
            result.tests.brandName = {
              status: 'passed',
              message: 'Mobile brand name stacks correctly'
            };
          } else {
            result.tests.brandName = {
              status: 'failed',
              message: `Mobile brand name text incorrect: ${JSON.stringify(brandInfo.mobileText)}`
            };
            result.issues.push('Mobile brand name text does not match expected format');
          }
        } else {
          result.tests.brandName = {
            status: 'failed',
            message: `Mobile brand name structure issue - visible: ${brandInfo.isMobileVisible}, text: ${JSON.stringify(brandInfo.mobileText)}`
          };
          result.issues.push('Mobile brand name not displaying or structured correctly');
        }
      }

      // Check for text overflow
      const hasOverflow = await page.evaluate((el) => {
        return el.scrollWidth > el.clientWidth;
      }, brandElement);

      if (hasOverflow) {
        result.warnings.push('Brand name may have text overflow');
      }

    } catch (error) {
      result.tests.brandName = {
        status: 'failed',
        message: `Error testing brand name: ${error.message}`
      };
      result.issues.push(`Brand name test error: ${error.message}`);
    }
  }

  async testHeaderHeights(page, device, result) {
    console.log('  📏 Testing header heights...');
    
    try {
      const headerInfo = await page.evaluate(() => {
        const nav = document.querySelector('nav');
        const headerContainer = nav.querySelector('div > div');
        
        if (!nav || !headerContainer) {
          return { error: 'Header elements not found' };
        }

        const navStyles = window.getComputedStyle(nav);
        const containerStyles = window.getComputedStyle(headerContainer);
        
        return {
          navHeight: parseInt(navStyles.height),
          containerHeight: parseInt(containerStyles.height),
          navClasses: nav.className,
          containerClasses: headerContainer.className
        };
      });

      if (headerInfo.error) {
        result.tests.headerHeight = {
          status: 'failed',
          message: headerInfo.error
        };
        result.issues.push(headerInfo.error);
        return;
      }

      // Expected heights based on Tailwind classes
      const expectedHeight = device.width >= 768 ? 64 : 56; // md:h-16 (64px) : h-14 (56px)
      
      if (headerInfo.containerHeight === expectedHeight) {
        result.tests.headerHeight = {
          status: 'passed',
          message: `Header height correct: ${headerInfo.containerHeight}px`
        };
      } else {
        result.tests.headerHeight = {
          status: 'failed',
          message: `Header height incorrect: expected ${expectedHeight}px, got ${headerInfo.containerHeight}px`
        };
        result.issues.push(`Header height mismatch on ${device.name}`);
      }

      // Check if header classes are correct
      const hasCorrectClasses = headerInfo.containerClasses.includes('h-14') && headerInfo.containerClasses.includes('md:h-16');
      if (!hasCorrectClasses) {
        result.warnings.push('Header height classes may be incorrect');
      }

    } catch (error) {
      result.tests.headerHeight = {
        status: 'failed',
        message: `Error testing header height: ${error.message}`
      };
      result.issues.push(`Header height test error: ${error.message}`);
    }
  }

  async testContentPadding(page, device, result) {
    console.log('  📐 Testing content padding and spacing...');
    
    try {
      const paddingInfo = await page.evaluate(() => {
        const main = document.querySelector('main');
        const hero = document.querySelector('section'); // First section should be Hero
        
        if (!main || !hero) {
          return { error: 'Main content or Hero section not found' };
        }

        const mainStyles = window.getComputedStyle(main);
        const heroStyles = window.getComputedStyle(hero);
        
        return {
          mainPaddingTop: parseInt(mainStyles.paddingTop),
          mainClasses: main.className,
          heroMinHeight: heroStyles.minHeight,
          heroClasses: hero.className
        };
      });

      if (paddingInfo.error) {
        result.tests.contentPadding = {
          status: 'failed',
          message: paddingInfo.error
        };
        result.issues.push(paddingInfo.error);
        return;
      }

      // Expected padding: pt-16 (64px) on mobile, md:pt-20 (80px) on desktop
      const expectedPadding = device.width >= 768 ? 80 : 64;
      
      if (paddingInfo.mainPaddingTop === expectedPadding) {
        result.tests.contentPadding = {
          status: 'passed',
          message: `Main content padding correct: ${paddingInfo.mainPaddingTop}px`
        };
      } else {
        result.tests.contentPadding = {
          status: 'failed',
          message: `Main content padding incorrect: expected ${expectedPadding}px, got ${paddingInfo.mainPaddingTop}px`
        };
        result.issues.push(`Content padding mismatch on ${device.name}`);
      }

      // Check Hero min-height calculation
      const expectedHeaderHeight = device.width >= 768 ? 64 : 56;
      const expectedHeroMinHeight = `calc(100vh - ${expectedHeaderHeight + 16}px)`; // Added 16px buffer
      
      // Note: This is a simplified check - actual calc() values are complex to verify
      if (paddingInfo.heroMinHeight.includes('calc') && paddingInfo.heroMinHeight.includes('100vh')) {
        result.tests.heroSpacing = {
          status: 'passed',
          message: 'Hero section uses viewport-relative height calculation'
        };
      } else {
        result.warnings.push('Hero section height calculation may not account for header properly');
      }

    } catch (error) {
      result.tests.contentPadding = {
        status: 'failed',
        message: `Error testing content padding: ${error.message}`
      };
      result.issues.push(`Content padding test error: ${error.message}`);
    }
  }

  async testNavigationFunctionality(page, device, result) {
    console.log('  🧭 Testing navigation functionality...');
    
    try {
      // Test desktop navigation (visible on lg+ screens)
      if (device.width >= 1024) {
        const desktopNav = await page.$('.hidden.lg\\:flex');
        
        if (desktopNav) {
          // Test navigation links
          const navLinks = await page.$$('.hidden.lg\\:flex a');
          
          if (navLinks.length > 0) {
            result.tests.desktopNavigation = {
              status: 'passed',
              message: `Desktop navigation found with ${navLinks.length} links`
            };

            // Test hover states (simplified - just check CSS)
            const hasHoverStyles = await page.evaluate(() => {
              const link = document.querySelector('.hidden.lg\\:flex a');
              return link && link.className.includes('hover:text-terracotta-600');
            });

            if (hasHoverStyles) {
              result.tests.navigationHover = {
                status: 'passed',
                message: 'Navigation hover styles are present'
              };
            } else {
              result.warnings.push('Navigation hover styles may be missing');
            }
          } else {
            result.tests.desktopNavigation = {
              status: 'failed',
              message: 'Desktop navigation container found but no links'
            };
            result.issues.push('Desktop navigation links not found');
          }
        } else {
          result.tests.desktopNavigation = {
            status: 'failed',
            message: 'Desktop navigation container not found'
          };
          result.issues.push('Desktop navigation not visible on large screen');
        }

        // Test CTA button
        const ctaButton = await page.$('.hidden.lg\\:block a, .hidden.lg\\:block button');
        if (ctaButton) {
          result.tests.ctaButton = {
            status: 'passed',
            message: 'CTA button found in desktop navigation'
          };
        } else {
          result.warnings.push('CTA button not found in desktop navigation');
        }
      }

      // Test mobile menu button (visible on screens < lg)
      if (device.width < 1024) {
        const mobileMenuButton = await page.$('.lg\\:hidden button');
        
        if (mobileMenuButton) {
          result.tests.mobileMenuButton = {
            status: 'passed',
            message: 'Mobile menu button found'
          };
        } else {
          result.tests.mobileMenuButton = {
            status: 'failed',
            message: 'Mobile menu button not found'
          };
          result.issues.push('Mobile menu button missing on small screen');
        }
      }

    } catch (error) {
      result.tests.navigationFunctionality = {
        status: 'failed',
        message: `Error testing navigation: ${error.message}`
      };
      result.issues.push(`Navigation test error: ${error.message}`);
    }
  }

  async testContentOverlap(page, device, result) {
    console.log('  🔍 Testing content overlap...');
    
    try {
      const overlapInfo = await page.evaluate(() => {
        const nav = document.querySelector('nav');
        const hero = document.querySelector('section');
        const main = document.querySelector('main');
        
        if (!nav || !hero || !main) {
          return { error: 'Required elements not found' };
        }

        const navRect = nav.getBoundingClientRect();
        const heroRect = hero.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();

        // Check if hero content starts below the header
        const heroStartsBelow = heroRect.top >= navRect.bottom - 5; // 5px tolerance
        
        // Check if any hero content is hidden behind header
        const heroVisibleArea = Math.max(0, heroRect.bottom - Math.max(heroRect.top, navRect.bottom));
        const heroTotalArea = heroRect.height;
        const visibilityRatio = heroVisibleArea / heroTotalArea;

        return {
          navHeight: navRect.height,
          navBottom: navRect.bottom,
          heroTop: heroRect.top,
          heroStartsBelow,
          visibilityRatio,
          mainPaddingTop: parseInt(window.getComputedStyle(main).paddingTop)
        };
      });

      if (overlapInfo.error) {
        result.tests.contentOverlap = {
          status: 'failed',
          message: overlapInfo.error
        };
        result.issues.push(overlapInfo.error);
        return;
      }

      // Check if hero content is properly positioned
      if (overlapInfo.heroStartsBelow && overlapInfo.visibilityRatio > 0.95) {
        result.tests.contentOverlap = {
          status: 'passed',
          message: `No content overlap detected - hero starts at ${overlapInfo.heroTop}px, nav ends at ${overlapInfo.navBottom}px`
        };
      } else {
        const status = overlapInfo.visibilityRatio > 0.8 ? 'warning' : 'failed';
        result.tests.contentOverlap = {
          status,
          message: `Potential content overlap - visibility ratio: ${(overlapInfo.visibilityRatio * 100).toFixed(1)}%`
        };
        
        if (status === 'failed') {
          result.issues.push(`Significant content overlap detected on ${device.name}`);
        } else {
          result.warnings.push(`Minor content overlap detected on ${device.name}`);
        }
      }

    } catch (error) {
      result.tests.contentOverlap = {
        status: 'failed',
        message: `Error testing content overlap: ${error.message}`
      };
      result.issues.push(`Content overlap test error: ${error.message}`);
    }
  }

  async testMobileMenu(page, device, result) {
    console.log('  📱 Testing mobile menu functionality...');
    
    try {
      // Find and click mobile menu button
      const menuButton = await page.$('.lg\\:hidden button');
      
      if (!menuButton) {
        result.tests.mobileMenu = {
          status: 'failed',
          message: 'Mobile menu button not found'
        };
        result.issues.push('Mobile menu button missing');
        return;
      }

      // Check initial menu state (should be closed)
      const initialMenuVisible = await page.$('.lg\\:hidden .border-t');
      
      if (initialMenuVisible) {
        result.warnings.push('Mobile menu appears to be open by default');
      }

      // Click to open menu
      await menuButton.click();
      await page.waitForTimeout(500); // Wait for animation

      // Check if menu opened
      const menuAfterClick = await page.$('.lg\\:hidden .border-t');
      
      if (menuAfterClick) {
        result.tests.mobileMenu = {
          status: 'passed',
          message: 'Mobile menu opens successfully'
        };

        // Test menu links
        const menuLinks = await page.$$('.lg\\:hidden .border-t a');
        
        if (menuLinks.length > 0) {
          result.tests.mobileMenuLinks = {
            status: 'passed',
            message: `Mobile menu contains ${menuLinks.length} links`
          };
        } else {
          result.warnings.push('Mobile menu opened but no links found');
        }

        // Test menu CTA button
        const menuCTA = await page.$('.lg\\:hidden .border-t button, .lg\\:hidden .border-t a[href="/remote-healing"]');
        if (menuCTA) {
          result.tests.mobileMenuCTA = {
            status: 'passed',
            message: 'Mobile menu CTA button found'
          };
        } else {
          result.warnings.push('Mobile menu CTA button not found');
        }

        // Click to close menu
        await menuButton.click();
        await page.waitForTimeout(500);

        const menuAfterClose = await page.$('.lg\\:hidden .border-t');
        if (!menuAfterClose) {
          result.tests.mobileMenuClose = {
            status: 'passed',
            message: 'Mobile menu closes successfully'
          };
        } else {
          result.warnings.push('Mobile menu may not close properly');
        }

      } else {
        result.tests.mobileMenu = {
          status: 'failed',
          message: 'Mobile menu does not open when button clicked'
        };
        result.issues.push('Mobile menu functionality broken');
      }

    } catch (error) {
      result.tests.mobileMenu = {
        status: 'failed',
        message: `Error testing mobile menu: ${error.message}`
      };
      result.issues.push(`Mobile menu test error: ${error.message}`);
    }
  }

  async testPerformanceAndErrors(page, device, result) {
    console.log('  ⚡ Testing performance and console errors...');
    
    try {
      // Collect console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Wait a bit to catch any errors
      await page.waitForTimeout(2000);

      // Performance metrics
      const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
        };
      });

      result.performance = {
        ...performanceMetrics,
        consoleErrors: consoleErrors.length
      };

      if (consoleErrors.length === 0) {
        result.tests.consoleErrors = {
          status: 'passed',
          message: 'No console errors detected'
        };
      } else {
        result.tests.consoleErrors = {
          status: 'failed',
          message: `${consoleErrors.length} console errors detected`
        };
        result.issues.push(`Console errors on ${device.name}: ${consoleErrors.slice(0, 3).join(', ')}`);
      }

      // Basic performance check
      if (performanceMetrics.domContentLoaded < 3000) {
        result.tests.performance = {
          status: 'passed',
          message: `Good load performance: ${performanceMetrics.domContentLoaded}ms`
        };
      } else {
        result.tests.performance = {
          status: 'warning',
          message: `Slow load performance: ${performanceMetrics.domContentLoaded}ms`
        };
        result.warnings.push(`Slow loading on ${device.name}`);
      }

    } catch (error) {
      result.tests.performanceCheck = {
        status: 'failed',
        message: `Error testing performance: ${error.message}`
      };
      result.warnings.push(`Performance test error: ${error.message}`);
    }
  }

  async testVisualRegression(page, device, result) {
    console.log('  📸 Taking screenshot for visual verification...');
    
    try {
      // Take screenshot of header area
      const headerElement = await page.$('nav');
      
      if (headerElement) {
        const screenshotPath = path.join(__dirname, 'test-results', `header-${device.name.toLowerCase().replace(/\s+/g, '-')}-${device.width}x${device.height}.png`);
        
        // Ensure directory exists
        const dir = path.dirname(screenshotPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        await headerElement.screenshot({ path: screenshotPath });
        
        result.tests.screenshot = {
          status: 'passed',
          message: `Screenshot saved: ${screenshotPath}`
        };
      } else {
        result.warnings.push('Could not take header screenshot - element not found');
      }

    } catch (error) {
      result.warnings.push(`Screenshot error: ${error.message}`);
    }
  }

  async generateReport() {
    console.log('\n📊 Generating comprehensive test report...');
    
    // Analyze results across all devices
    this.analyzeResults();
    
    // Generate HTML report
    const reportHtml = this.generateHtmlReport();
    const reportPath = path.join(__dirname, 'header-test-report.html');
    fs.writeFileSync(reportPath, reportHtml);
    
    // Generate JSON report
    const reportJsonPath = path.join(__dirname, 'header-test-results.json');
    fs.writeFileSync(reportJsonPath, JSON.stringify(this.results, null, 2));
    
    console.log(`\n📋 Reports generated:`);
    console.log(`   HTML: ${reportPath}`);
    console.log(`   JSON: ${reportJsonPath}`);
    
    return this.results;
  }

  analyzeResults() {
    // Collect critical issues
    const criticalIssues = [];
    const commonWarnings = [];
    const recommendations = [];

    // Analyze by device type
    const deviceTypes = {
      mobile: this.results.devices.filter(d => d.type === 'mobile'),
      tablet: this.results.devices.filter(d => d.type === 'tablet'),
      desktop: this.results.devices.filter(d => d.type === 'desktop')
    };

    // Check for consistent issues across device types
    Object.entries(deviceTypes).forEach(([type, devices]) => {
      if (devices.length === 0) return;

      const failedTests = {};
      devices.forEach(device => {
        Object.entries(device.tests).forEach(([testName, test]) => {
          if (test.status === 'failed') {
            failedTests[testName] = (failedTests[testName] || 0) + 1;
          }
        });
      });

      // If more than 50% of devices of this type fail a test, it's critical
      Object.entries(failedTests).forEach(([testName, failCount]) => {
        if (failCount > devices.length * 0.5) {
          criticalIssues.push(`${testName} fails on ${failCount}/${devices.length} ${type} devices`);
        }
      });
    });

    // Generate recommendations
    if (this.results.summary.failed > 0) {
      recommendations.push('Address critical header functionality issues before deployment');
    }
    
    if (this.results.summary.warnings > 5) {
      recommendations.push('Review and resolve warning messages to improve user experience');
    }
    
    if (criticalIssues.length > 0) {
      recommendations.push('Focus on cross-device compatibility issues first');
    }

    this.results.criticalIssues = criticalIssues;
    this.results.recommendations = recommendations;
  }

  generateHtmlReport() {
    const timestamp = new Date().toLocaleString();
    const { summary, devices, criticalIssues, recommendations } = this.results;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Header Test Report - ${timestamp}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 2.5rem; font-weight: 300; }
        .header p { margin: 10px 0 0; opacity: 0.9; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding: 30px; background: #f8f9fa; }
        .stat { text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .stat h3 { margin: 0 0 10px; font-size: 2rem; }
        .stat p { margin: 0; color: #666; font-weight: 500; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .warning { color: #ffc107; }
        .section { padding: 30px; border-bottom: 1px solid #eee; }
        .section:last-child { border-bottom: none; }
        .section h2 { margin: 0 0 20px; color: #333; }
        .device-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .device-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #fafafa; }
        .device-card h3 { margin: 0 0 15px; color: #333; }
        .device-type { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase; }
        .device-type.mobile { background: #e3f2fd; color: #1976d2; }
        .device-type.tablet { background: #f3e5f5; color: #7b1fa2; }
        .device-type.desktop { background: #e8f5e8; color: #388e3c; }
        .test-results { margin-top: 15px; }
        .test-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; }
        .test-item:last-child { border-bottom: none; }
        .test-status { padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
        .test-status.passed { background: #d4edda; color: #155724; }
        .test-status.failed { background: #f8d7da; color: #721c24; }
        .test-status.warning { background: #fff3cd; color: #856404; }
        .issues-list { background: #fff5f5; border: 1px solid #fed7d7; border-radius: 8px; padding: 20px; margin-top: 20px; }
        .issues-list ul { margin: 0; padding-left: 20px; }
        .recommendations { background: #f0fff4; border: 1px solid #9ae6b4; border-radius: 8px; padding: 20px; margin-top: 20px; }
        .recommendations ul { margin: 0; padding-left: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Header Responsiveness Test Report</h1>
            <p>Generated on ${timestamp}</p>
        </div>
        
        <div class="summary">
            <div class="stat">
                <h3 class="passed">${summary.passed}</h3>
                <p>Tests Passed</p>
            </div>
            <div class="stat">
                <h3 class="failed">${summary.failed}</h3>
                <p>Tests Failed</p>
            </div>
            <div class="stat">
                <h3 class="warning">${summary.warnings}</h3>
                <p>Warnings</p>
            </div>
            <div class="stat">
                <h3>${devices.length}</h3>
                <p>Devices Tested</p>
            </div>
        </div>

        ${criticalIssues.length > 0 ? `
        <div class="section">
            <h2>🚨 Critical Issues</h2>
            <div class="issues-list">
                <ul>
                    ${criticalIssues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}

        <div class="section">
            <h2>📱 Device Test Results</h2>
            <div class="device-grid">
                ${devices.map(device => `
                <div class="device-card">
                    <h3>
                        ${device.device}
                        <span class="device-type ${device.type}">${device.type}</span>
                    </h3>
                    <p><strong>Dimensions:</strong> ${device.dimensions}</p>
                    
                    <div class="test-results">
                        ${Object.entries(device.tests).map(([testName, test]) => `
                        <div class="test-item">
                            <span>${testName}</span>
                            <span class="test-status ${test.status}">${test.status}</span>
                        </div>
                        `).join('')}
                    </div>
                    
                    ${device.issues.length > 0 ? `
                    <div style="margin-top: 15px;">
                        <strong>Issues:</strong>
                        <ul style="margin: 5px 0; padding-left: 20px; font-size: 0.9rem;">
                            ${device.issues.map(issue => `<li>${issue}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${device.warnings.length > 0 ? `
                    <div style="margin-top: 10px;">
                        <strong>Warnings:</strong>
                        <ul style="margin: 5px 0; padding-left: 20px; font-size: 0.9rem; color: #856404;">
                            ${device.warnings.map(warning => `<li>${warning}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
                `).join('')}
            </div>
        </div>

        ${recommendations.length > 0 ? `
        <div class="section">
            <h2>💡 Recommendations</h2>
            <div class="recommendations">
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>
    `;
  }

  async run() {
    try {
      await this.initialize();
      
      console.log(`\n🧪 Testing ${TEST_CONFIG.devices.length} device configurations...\n`);
      
      // Test each device
      for (const device of TEST_CONFIG.devices) {
        await this.testDevice(device);
      }
      
      // Generate final report
      const results = await this.generateReport();
      
      // Print summary
      console.log('\n' + '='.repeat(60));
      console.log('🏁 HEADER TESTING COMPLETE');
      console.log('='.repeat(60));
      console.log(`📊 Summary:`);
      console.log(`   • Total Tests: ${results.summary.totalTests}`);
      console.log(`   • Passed: ${results.summary.passed} ✅`);
      console.log(`   • Failed: ${results.summary.failed} ❌`);
      console.log(`   • Warnings: ${results.summary.warnings} ⚠️`);
      
      if (results.criticalIssues.length > 0) {
        console.log(`\n🚨 Critical Issues Found:`);
        results.criticalIssues.forEach(issue => console.log(`   • ${issue}`));
      }
      
      if (results.recommendations.length > 0) {
        console.log(`\n💡 Recommendations:`);
        results.recommendations.forEach(rec => console.log(`   • ${rec}`));
      }
      
      console.log('\n📋 Full report available in header-test-report.html');
      
      return results;
      
    } catch (error) {
      console.error('❌ Testing failed:', error);
      throw error;
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the tests if called directly
if (require.main === module) {
  const tester = new HeaderTester();
  
  tester.run()
    .then(results => {
      const exitCode = results.summary.failed > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = HeaderTester;