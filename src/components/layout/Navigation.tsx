'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' }
  ];
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-cream/95 backdrop-blur-sm border-b border-flow-200/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Brand name - luxury minimalist */}
          <Link 
            href="/" 
            className="text-base md:text-lg font-light text-terracotta-800 tracking-[0.25em] hover:text-warmGold transition-colors duration-300"
          >
            <span className="hidden sm:inline">
              HEALING FREQUENCY SPACE
            </span>
            <span className="sm:hidden flex flex-col leading-tight">
              <span>HEALING FREQUENCY</span>
              <span className="text-xs tracking-[0.3em] opacity-80">SPACE</span>
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-sm font-normal tracking-wide transition-all duration-200 py-2 relative
                    ${isActive
                      ? 'text-warmGold'
                      : 'text-flow-600 hover:text-warmGold'
                    }
                  `}
                >
                  {item.label}
                  
                  {/* Clean underline for active/hover states */}
                  <span className={`
                    absolute bottom-0 left-0 h-px bg-warmGold transition-all duration-200
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                  `} />
                </Link>
              );
            })}
          </div>
          
          {/* CTA Button - refined */}
          <div className="hidden lg:block">
            <Button 
              href="/remote-healing"
              variant="primary"
              size="sm"
              className="text-sm px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Learn More
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-flow-600 hover:text-warmGold transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-flow-200/30 bg-cream/98"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1,
                height: "auto"
              }}
              exit={{ 
                opacity: 0, 
                height: 0 
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut"
              }}
            >
              <div className="py-6 px-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        block text-base font-normal py-3 px-4 transition-colors duration-200 relative
                        ${isActive
                          ? 'text-warmGold'
                          : 'text-flow-600 hover:text-warmGold'
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                      
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 w-1 h-4 bg-warmGold rounded-r transform -translate-y-1/2" />
                      )}
                    </Link>
                  );
                })}
                
                <div className="pt-4 px-4">
                  <Button 
                    href="/remote-healing"
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}