'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect - Hide header initially, show after scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100); // Show header after scrolling 100px
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' }
  ];
  
  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-terracotta-500/10' : ''
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isScrolled ? 0 : -100, 
        opacity: isScrolled ? 1 : 0 
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for elegant motion
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Business name - Haum Nashville inspired */}
          <Link 
            href="/" 
            className="text-xl md:text-2xl font-light text-black tracking-wider hover:text-terracotta-500 transition-colors duration-200"
          >
            THE HEALING FREQUENCY SPACE
          </Link>
          
          {/* Desktop navigation tabs */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium tracking-wide transition-all duration-200 py-2 px-1
                  ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'text-terracotta-500 border-b-2 border-terracotta-500'
                    : 'text-slate-600 hover:text-terracotta-500 border-b-2 border-transparent hover:border-terracotta-500'
                  }
                `}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </div>
          
          {/* Schedule CTA - Always visible on desktop */}
          <div className="hidden md:block">
            <Button 
              href="/booking"
              variant="primary"
              size="sm"
              className="shadow-md"
            >
              Schedule an Appointment
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-terracotta-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="border-t border-slate-200 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  block text-base font-medium tracking-wide py-2 transition-colors duration-200
                  ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'text-terracotta-500'
                    : 'text-slate-600 hover:text-terracotta-500'
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            <div className="pt-4">
              <Button 
                href="/booking"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schedule an Appointment
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}