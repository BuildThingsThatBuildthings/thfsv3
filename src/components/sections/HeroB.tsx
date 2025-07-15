'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

export function HeroB() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Healing frequency video background - more visible */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50" // Increased opacity to see more video
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          poster="/images/placeholder.svg"
        >
          <source src="/videos/healing-frequency-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback background if video fails */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-cream/40 to-sage/10" />
        )}
        
        {/* Very subtle overlay for contrast - no square! */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>
      
      {/* Content overlay - no square background, content "pops" */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8 py-32">
        {/* Logo - floating above content */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
            <Image
              src="/images/hf-logo.svg"
              alt="The Healing Frequency Space"
              width={160}
              height={160}
              className="w-full h-full drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.5)) drop-shadow(0 0 60px rgba(217,120,83,0.3))'
              }}
            />
          </div>
        </motion.div>
        
        {/* Business name - prominent and visible */}
        <motion.h2 
          className="text-lg md:text-xl lg:text-2xl font-medium text-white mb-20 tracking-[0.2em] uppercase"
          style={{
            textShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.7), 0 2px 10px rgba(0,0,0,0.3)'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          The Healing Frequency Space
        </motion.h2>
        
        {/* Main hook - clean without background box */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter font-light text-white max-w-5xl leading-[1.1] tracking-tight"
              style={{
                textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.3)'
              }}>
            Have you ever wished for a{' '}
            <span className="font-medium italic text-terracotta-400" 
                  style={{ textShadow: '0 0 30px rgba(234, 88, 12, 0.5)' }}>
              true sanctuary
            </span>?
          </h1>
        </motion.div>
        
        {/* Subtitle - floating with subtle background */}
        <motion.p
          className="text-xl md:text-2xl text-white mb-20 max-w-3xl leading-relaxed font-light px-6 py-3 rounded-lg"
          style={{
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            textShadow: '0 1px 10px rgba(0,0,0,0.4)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          A place to reset, recharge, and reconnect with your highest self through the transformative power of quantum.
        </motion.p>
        
        {/* Tagline - glowing effect */}
        <motion.p
          className="text-lg md:text-xl font-inter font-light text-terracotta-400 mb-24 tracking-wider uppercase"
          style={{
            textShadow: '0 0 20px rgba(234, 88, 12, 0.6), 0 0 40px rgba(234, 88, 12, 0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          Change Your Frequency, Change Everything
        </motion.p>
        
        {/* CTA Buttons - with enhanced visibility */}
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
            className="text-lg px-12 py-5 shadow-2xl hover:shadow-terracotta-500/40 transition-all duration-300 hover:scale-105 bg-terracotta-600 hover:bg-terracotta-700"
            style={{
              boxShadow: '0 10px 30px rgba(234, 88, 12, 0.3), 0 0 60px rgba(234, 88, 12, 0.2)'
            }}
          >
            Schedule an Appointment
          </Button>
          
          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="text-lg px-12 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-xl transition-all duration-300 hover:scale-105"
          >
            Meet Victoria
          </Button>
        </motion.div>
        
        {/* Trust indicators - floating badges */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 text-white text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full"
               style={{
                 backdropFilter: 'blur(10px)',
                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
                 border: '1px solid rgba(255, 255, 255, 0.2)'
               }}>
            <div className="w-2 h-2 bg-terracotta-400 rounded-full animate-pulse"
                 style={{ boxShadow: '0 0 10px rgba(234, 88, 12, 0.8)' }}></div>
            <span className="tracking-wide">30+ Years Experience</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full"
               style={{
                 backdropFilter: 'blur(10px)',
                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
                 border: '1px solid rgba(255, 255, 255, 0.2)'
               }}>
            <div className="w-2 h-2 bg-terracotta-400 rounded-full animate-pulse"
                 style={{ boxShadow: '0 0 10px rgba(234, 88, 12, 0.8)' }}></div>
            <span className="tracking-wide">Tesla Wellness Table Sessions</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full"
               style={{
                 backdropFilter: 'blur(10px)',
                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
                 border: '1px solid rgba(255, 255, 255, 0.2)'
               }}>
            <div className="w-2 h-2 bg-terracotta-400 rounded-full animate-pulse"
                 style={{ boxShadow: '0 0 10px rgba(234, 88, 12, 0.8)' }}></div>
            <span className="tracking-wide">Certified Holistic Practitioner</span>
          </div>
        </motion.div>
        
        {/* Scroll indicator - glowing */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/80 text-xs uppercase tracking-wider font-light"
                  style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
              Scroll to Explore
            </span>
            <motion.div
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
              style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.3)'
              }}
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
                className="w-1 h-3 bg-white rounded-full mt-2"
                style={{
                  boxShadow: '0 0 10px rgba(255,255,255,0.8)'
                }}
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