'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(true); // Always show content
  
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Healing frequency video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          poster="/images/placeholder.svg"
        >
          <source src="/videos/healing-frequency-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback background if video fails */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-sage/20 via-slate-600 to-black" />
        )}
        
        {/* Light-to-dark gradient overlay as requested */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-black/30 to-black/70" />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8 py-20">
        {/* Business name - Elegant spacing */}
        <motion.h2 
          className="text-sm md:text-base font-light text-white/90 mb-16 tracking-[0.3em] text-shadow uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          The Healing Frequency Space
        </motion.h2>
        
        {/* Main hook with enhanced typography */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter font-light text-white mb-12 max-w-5xl leading-[1.1] text-shadow tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          Have you ever wished for a{' '}
          <span className="font-medium italic text-warmGold">true sanctuary</span>?
        </motion.h1>
        
        {/* Subtitle with more breathing room */}
        <motion.p
          className="text-xl md:text-2xl text-white/85 mb-16 max-w-3xl leading-relaxed text-shadow font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          A place to reset, recharge, and reconnect with your highest self through the transformative power of frequency healing.
        </motion.p>
        
        {/* Tagline with elegant emphasis */}
        <motion.p
          className="text-lg md:text-xl font-inter font-light text-warmGold/90 mb-20 tracking-wider text-shadow uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          Change Your Frequency, Change Everything
        </motion.p>
        
        {/* CTA Buttons with elegant spacing */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 items-center mb-24"
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
            className="text-lg px-12 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Meet Victoria
          </Button>
        </motion.div>
        
        {/* Trust indicators with elegant design */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-warmGold rounded-full animate-pulse"></div>
            <span className="tracking-wide">30+ Years Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-warmGold rounded-full animate-pulse"></div>
            <span className="tracking-wide">Nashville&apos;s Only Tesla Wellness Table</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-warmGold rounded-full animate-pulse"></div>
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
            <span className="text-white/60 text-xs uppercase tracking-wider font-light">Scroll to Explore</span>
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
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
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
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