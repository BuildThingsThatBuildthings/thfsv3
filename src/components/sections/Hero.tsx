"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Hero() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-[56px] md:pt-[64px]">
      {/* Elegant Serene Background - Luxury Wellness Sanctuary */}
      <div className="absolute inset-0 z-0">
        {/* Primary elegant gradient - natural healing sanctuary */}
        <div className="absolute inset-0 bg-gradient-to-br from-flow-50 via-sage-50/90 to-cream" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-warmGold/3 to-warmGold/8" />
        
        {/* Subtle golden accent - single elegant touch */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-warmGold/6 via-warmGold/2 to-transparent opacity-60" />
      </div>

      {/* Single Minimal Golden Element - Sophisticated Restraint */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {/* Elegant golden frequency line - single beautiful accent */}
        <motion.div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-warmGold/50 to-transparent"
          initial={prefersReducedMotion ? { opacity: 0.4, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          animate={prefersReducedMotion ? {} : {
            opacity: 0.4,
            scaleX: 1,
          }}
          transition={prefersReducedMotion ? {} : {
            opacity: { duration: 2, delay: 1 },
            scaleX: { duration: 2, delay: 1 }
          }}
          style={{
            boxShadow: '0 0 12px rgba(212, 165, 116, 0.2)'
          }}
        />
      </div>

      {/* Elegant Content Container - Clean and Sophisticated */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto py-8 sm:py-12 md:py-16">
        
        {/* Clean, Elegant Main Headline - Typography as Hero */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-inter font-light mb-6 sm:mb-8 md:mb-10 max-w-5xl leading-[1.15] tracking-[-0.02em] text-flow-800"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.3 }}
          style={{
            textShadow: '0 2px 12px rgba(29, 135, 73, 0.08)',
            letterSpacing: '-0.025em',
            lineHeight: '1.15'
          }}
        >
          Step into a space where{' '}
          <span 
            className="text-warmGold font-medium relative"
            style={{
              textShadow: '0 0 16px rgba(212, 165, 116, 0.3)',
            }}
          >
            frequency
            {/* Subtle golden underline - elegant accent */}
            <motion.span
              className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-warmGold/60 via-warmGold/40 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1.5 }}
            />
          </span>{' '}
          becomes{' '}
          <span 
            className="text-warmGold/90 font-medium"
            style={{
              textShadow: '0 0 12px rgba(212, 165, 116, 0.25)',
            }}
          >
            transformation
          </span>
          .
        </motion.h1>

        {/* Clean, Elegant Subtitle - Refined Typography */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-flow-700 mb-10 sm:mb-12 md:mb-14 max-w-3xl leading-[1.5] font-light tracking-wide px-4 sm:px-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.6 }}
          style={{
            textShadow: '0 1px 6px rgba(29, 135, 73, 0.06)',
            letterSpacing: '0.01em',
            lineHeight: '1.5'
          }}
        >
          Experience{' '}
          <span 
            className="text-warmGold/80 font-normal"
            style={{
              textShadow: '0 0 8px rgba(212, 165, 116, 0.2)',
            }}
          >
            tailored frequencies
          </span>{' '}
          guiding your{' '}
          <span
            className="text-flow-600"
            style={{
              textShadow: '0 0 6px rgba(29, 135, 73, 0.12)'
            }}
          >
            healing journey
          </span>
          {' '}to optimal well-being.
        </motion.p>

        {/* Elegant Single CTA - Refined Luxury */}
        <motion.div
          className="flex flex-col gap-6 items-center justify-center w-full max-w-md mx-auto"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.9 }}
        >
          <motion.div
            className="w-full flex justify-center"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Button
              href="/booking"
              variant="primary"
              size="lg"
              className="group relative overflow-hidden shadow-lg hover:shadow-xl !bg-gradient-to-r !from-warmGold !to-warmGold/95 !text-white hover:!from-warmGold/95 hover:!to-warmGold/85 transform transition-all duration-300 w-full max-w-sm px-10 py-6"
              style={{
                boxShadow: '0 8px 32px rgba(212, 165, 116, 0.25), 0 4px 16px rgba(212, 165, 116, 0.15)',
                fontSize: '1.2rem',
                fontWeight: '600',
                letterSpacing: '0.01em'
              }}
              aria-label="Schedule your healing frequency appointment"
            >
              <span className="relative z-10 font-semibold tracking-wide">Schedule an Appointment</span>
              
              {/* Subtle hover enhancement */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-warmGold/20 to-warmGold/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Minimal Golden Connection Symbol - Elegant Restraint */}
        <motion.div
          className="mt-16 sm:mt-20 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-warmGold/30 to-transparent" />
          <div 
            className="w-2 h-2 bg-warmGold/60 rounded-full"
            style={{
              boxShadow: '0 0 12px rgba(212, 165, 116, 0.4)'
            }}
          />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-warmGold/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}