"use client";

import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Button } from "@/components/ui";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { memo, useCallback } from "react";

const Hero = memo(function Hero() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Optimized animation variants for performance
  const staggeredFadeIn = useCallback((delay: number) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 25 },
    animate: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    transition: prefersReducedMotion ? {} : { 
      duration: 1, 
      delay, 
      ease: [0.25, 0.25, 0, 1] as [number, number, number, number]
    }
  }), [prefersReducedMotion]);

  return (
    <LazyMotion features={domAnimation}>
      <section 
        className="relative min-h-screen w-full overflow-hidden pt-[56px] md:pt-[64px]"
        role="banner"
        aria-label="Hero section - The Healing Frequency Space"
      >
        {/* Serene Luxury Wellness Sanctuary Background - Optimized for performance */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* Primary serene healing gradient - sophisticated simplicity */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cream via-sage-50/95 to-flow-50/90"
            style={{ willChange: 'auto' }}
          />
          
          {/* Refined golden whisper - elegant restraint */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-transparent via-warmGold/2 to-warmGold/4 opacity-70"
            style={{ willChange: 'auto' }}
          />
          
          {/* Sophisticated golden accent - single touch of luxury */}
          <div 
            className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-warmGold/4 via-warmGold/1 to-transparent opacity-50 blur-3xl"
            style={{ willChange: 'auto' }}
          />
        </div>

        {/* Refined Golden Frequency Element - Ultimate Sophistication */}
        <div className="absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
          {/* Sophisticated golden frequency line - whisper of luxury */}
          <motion.div
            className="absolute top-20 left-1/2 w-32 h-px bg-gradient-to-r from-transparent via-warmGold/50 to-transparent"
            initial={prefersReducedMotion ? { opacity: 0.4, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            animate={prefersReducedMotion ? {} : {
              opacity: 0.4,
              scaleX: 1,
            }}
            transition={prefersReducedMotion ? {} : {
              opacity: { duration: 3, delay: 1.2 },
              scaleX: { duration: 3, delay: 1.2 }
            }}
            style={{
              boxShadow: '0 0 12px rgba(212, 165, 116, 0.2)',
              transform: 'translateX(-50%)',
              willChange: prefersReducedMotion ? 'auto' : 'opacity, transform'
            }}
          />
        </div>

        {/* Elegant Content Container - Serene Luxury Composition */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-6xl mx-auto py-16 sm:py-20 md:py-24">
        
          {/* Sophisticated Main Headline - Typography as Luxury Art */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-inter font-extralight mb-6 sm:mb-8 md:mb-10 max-w-4xl leading-[1.15] tracking-[-0.025em] text-flow-800"
            {...staggeredFadeIn(0.4)}
            style={{
              textShadow: '0 2px 20px rgba(29, 135, 73, 0.06)',
              letterSpacing: '-0.025em',
              lineHeight: '1.15',
              willChange: prefersReducedMotion ? 'auto' : 'opacity, transform'
            }}
          >
            Step into a space where{' '}
            <span 
              className="text-warmGold font-light relative"
              style={{
                textShadow: '0 0 20px rgba(212, 165, 116, 0.3)',
              }}
            >
              frequency
              {/* Refined golden underline - whisper of elegance */}
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-warmGold/60 via-warmGold/40 to-transparent rounded-full"
                initial={prefersReducedMotion ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
                animate={prefersReducedMotion ? {} : { width: '100%', opacity: 1 }}
                transition={prefersReducedMotion ? {} : { 
                  duration: 1.5, 
                  delay: 2, 
                  ease: [0.25, 0.25, 0, 1] as [number, number, number, number]
                }}
                style={{
                  willChange: prefersReducedMotion ? 'auto' : 'width, opacity'
                }}
              />
            </span>{' '}
            becomes{' '}
            <span 
              className="text-warmGold/90 font-light"
              style={{
                textShadow: '0 0 16px rgba(212, 165, 116, 0.25)',
              }}
            >
              transformation
            </span>
            .
        </motion.h1>

          {/* Refined Subtitle - Serene Luxury Typography */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-flow-600 mb-10 sm:mb-12 md:mb-14 max-w-3xl leading-[1.65] font-light tracking-[0.015em] px-2 sm:px-4"
            {...staggeredFadeIn(0.8)}
            style={{
              textShadow: '0 1px 12px rgba(29, 135, 73, 0.04)',
              letterSpacing: '0.015em',
              lineHeight: '1.65',
              willChange: prefersReducedMotion ? 'auto' : 'opacity, transform'
            }}
          >
            Experience{' '}
            <span 
              className="text-warmGold/85 font-light"
              style={{
                textShadow: '0 0 12px rgba(212, 165, 116, 0.22)',
              }}
            >
              tailored frequencies
            </span>{' '}
            guiding your{' '}
            <span
              className="text-flow-600 font-light"
              style={{
                textShadow: '0 0 8px rgba(29, 135, 73, 0.15)'
              }}
            >
              healing journey
            </span>
            {' '}to optimal well-being.
          </motion.p>

          {/* Sophisticated Single CTA - Luxury Wellness Conversion */}
          <motion.div
            className="flex flex-col gap-8 items-center justify-center w-full max-w-md mx-auto"
            {...staggeredFadeIn(1.2)}
            style={{
              willChange: prefersReducedMotion ? 'auto' : 'opacity, transform'
            }}
          >
            <motion.div
              className="w-full flex justify-center"
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.015 }}
              transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 500, damping: 35 }}
              style={{
                willChange: prefersReducedMotion ? 'auto' : 'transform'
              }}
            >
              <Button
                href="/booking"
                variant="primary"
                size="lg"
                className="group relative overflow-hidden shadow-2xl hover:shadow-3xl !bg-gradient-to-r !from-warmGold !to-warmGold/90 !text-white hover:!from-warmGold/90 hover:!to-warmGold/80 transform transition-all duration-400 w-full px-14 py-6 rounded-2xl border border-warmGold/20"
                style={{
                  boxShadow: '0 16px 48px rgba(212, 165, 116, 0.35), 0 8px 24px rgba(212, 165, 116, 0.25), 0 4px 12px rgba(212, 165, 116, 0.15)',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  letterSpacing: '0.025em',
                  minHeight: '64px',
                  willChange: 'transform'
                }}
                aria-label="Schedule your personalized healing frequency appointment"
              >
                <span className="relative z-10 font-medium tracking-wide text-white">Schedule an Appointment</span>
                
                {/* Refined hover enhancement - Elegant luminosity */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-warmGold/20 to-warmGold/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
                  style={{
                    willChange: 'opacity'
                  }}
                />
                
                {/* Subtle inner glow for luxury depth */}
                <div 
                  className="absolute inset-0 rounded-2xl" 
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                    willChange: 'auto'
                  }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Refined Golden Symbol - Sophisticated Restraint */}
          <motion.div
            className="mt-16 sm:mt-20 md:mt-24 flex items-center justify-center gap-6"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { 
              duration: 1.2, 
              delay: 2, 
              ease: [0.25, 0.25, 0, 1] as [number, number, number, number]
            }}
            style={{
              willChange: prefersReducedMotion ? 'auto' : 'opacity, transform'
            }}
            aria-hidden="true"
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-warmGold/30 to-transparent" />
            <div 
              className="w-2 h-2 bg-warmGold/60 rounded-full"
              style={{
                boxShadow: '0 0 12px rgba(212, 165, 116, 0.4), 0 0 6px rgba(212, 165, 116, 0.2)',
                willChange: 'auto'
              }}
            />
            <div className="w-20 h-px bg-gradient-to-l from-transparent via-warmGold/30 to-transparent" />
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
});

export { Hero };