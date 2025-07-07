'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Healing frequency video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 blur-sm"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          poster="/images/placeholder.svg"
        >
          <source src="/videos/healing-frequency-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback background if video fails */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-cream/80 to-sage/20" />
        )}
        
        {/* Subtle white overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/60" />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8 py-32">
        {/* Business name - Elegant spacing */}
        <motion.h2 
          className="text-sm md:text-base font-light text-slate-700 mb-24 tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          The Healing Frequency Space
        </motion.h2>
        
        {/* Main hook with enhanced typography */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter font-light text-slate-900 mb-20 max-w-5xl leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          Have you ever wished for a{' '}
          <span className="font-medium italic text-terracotta-600">true sanctuary</span>?
        </motion.h1>
        
        {/* Subtitle with more breathing room */}
        <motion.p
          className="text-xl md:text-2xl text-slate-700 mb-24 max-w-3xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          A place to reset, recharge, and reconnect with your highest self through the transformative power of frequency healing.
        </motion.p>
        
        {/* Tagline with elegant emphasis */}
        <motion.p
          className="text-lg md:text-xl font-inter font-light text-terracotta-500 mb-32 tracking-wider uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          Change Your Frequency, Change Everything
        </motion.p>
        
        {/* CTA Buttons with elegant spacing */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 items-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          <Button
            href="/booking"
            variant="primary"
            size="lg"
            className="text-lg px-12 py-5 shadow-2xl hover:shadow-terracotta-500/25 transition-all duration-300 hover:scale-105"
          >
            Schedule an Appointment
          </Button>
          
          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="text-lg px-12 py-5 bg-white/50 backdrop-blur-sm border-2 border-slate-300 text-slate-800 hover:bg-white/70 hover:border-slate-400 shadow-xl transition-all duration-300 hover:scale-105"
          >
            Meet Victoria
          </Button>
        </motion.div>
        
        {/* Trust indicators with elegant design */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 text-slate-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-terracotta-500 rounded-full animate-pulse"></div>
            <span className="tracking-wide">30+ Years Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-terracotta-500 rounded-full animate-pulse"></div>
            <span className="tracking-wide">Nashville&apos;s Only Tesla Wellness Table</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-terracotta-500 rounded-full animate-pulse"></div>
            <span className="tracking-wide">Certified Holistic Practitioner</span>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-slate-500 text-xs uppercase tracking-wider font-light">Scroll to Explore</span>
            <motion.div
              className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-1 h-3 bg-slate-500 rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}