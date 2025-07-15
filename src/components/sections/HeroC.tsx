'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function HeroC() {
  const [selectedFrequency, setSelectedFrequency] = useState('foundation');
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Healing frequency palette with detailed benefits
  const frequencies = {
    foundation: { 
      hz: 174, 
      color: '#8B7355', 
      name: 'Foundation', 
      gradient: 'from-stone-500 to-stone-600',
      description: 'Reduces pain and promotes safety, security, and physical healing',
      benefits: ['Pain reduction', 'Safety & security', 'Physical healing', 'Emotional stability']
    },
    liberating: { 
      hz: 396, 
      color: '#B08968', 
      name: 'Liberating', 
      gradient: 'from-amber-600 to-orange-700',
      description: 'Releases negative thoughts, transforms fear into love and guilt into forgiveness',
      benefits: ['Release negativity', 'Transform fear', 'Overcome guilt', 'Emotional freedom']
    },
    connecting: { 
      hz: 639, 
      color: '#C49B6D', 
      name: 'Connecting', 
      gradient: 'from-terracotta-400 to-terracotta-500',
      description: 'Promotes harmonious relationships and enhances communication',
      benefits: ['Better relationships', 'Clear communication', 'Emotional healing', 'Heart balance']
    },
    awakening: { 
      hz: 741, 
      color: '#D4A574', 
      name: 'Awakening', 
      gradient: 'from-yellow-500 to-amber-600',
      description: 'Cleanses toxins, awakens intuition and promotes spiritual awareness',
      benefits: ['Detoxification', 'Enhanced intuition', 'Spiritual growth', 'Higher awareness']
    }
  };


  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Healing frequency video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          poster="/images/placeholder.svg"
        >
          <source src="/videos/healing-frequency-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback background if video fails */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-amber-50/30 to-slate-100" />
        )}
        
        {/* Warm vibrant overlay for luxurious feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-terracotta-100/40" />
      </div>


      {/* Split Layout Container - Fixed Overlapping */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row pb-24">
        
        {/* Left Side - Business Name (Prominent & Readable) */}
        <motion.div 
          className="w-full lg:w-1/3 flex flex-col justify-center items-start px-6 lg:px-12 py-8 lg:py-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Luxury Background Card for Text Visibility - Non-overlapping */}
          <div className="bg-gradient-to-br from-white/95 to-amber-50/95 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-amber-200/50 mb-6">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-amber-800 leading-[0.9] tracking-tight mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              THE
              <br />
              HEALING
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">FREQUENCY</span>
              <br />
              <span className="text-amber-700">SPACE</span>
            </motion.h1>
          </div>
          
          <motion.div 
            className="bg-gradient-to-br from-warmGold/20 to-terracotta-100/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-terracotta-200/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <p className="text-amber-800 text-lg lg:text-xl mb-6 max-w-md leading-relaxed font-light"
               style={{ fontFamily: "'Inter', sans-serif" }}>
              Step into a space where frequency becomes transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Button
                href="/booking"
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                Experience Healing
              </Button>
              <Button
                href="/gallery"
                variant="outline"
                size="lg"
                className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View Gallery
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Interactive Content - Non-overlapping */}
        <motion.div 
          className="w-full lg:w-2/3 flex flex-col justify-center items-center px-6 lg:px-12 py-8 lg:py-16 space-y-16"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          
          {/* Luxury Frequency Selector - Fixed Spacing */}
          <motion.div 
            className="w-full max-w-4xl bg-gradient-to-br from-white/95 to-amber-50/90 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl border border-amber-200/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0 }}
          >
            <h2 className="text-2xl lg:text-3xl font-light text-amber-800 mb-6 lg:mb-8 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}>
              Choose Your Healing Frequency
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {Object.entries(frequencies).map(([key, freq]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedFrequency(key)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center shadow-lg ${
                    selectedFrequency === key
                      ? `border-terracotta-400 bg-gradient-to-br ${freq.gradient} text-white shadow-xl`
                      : 'border-stone-200 bg-white hover:border-terracotta-300 hover:shadow-xl'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`text-base font-semibold mb-2 ${
                    selectedFrequency === key ? 'text-white' : 'text-amber-800'
                  }`}>
                    {freq.name}
                  </div>
                  <div className={`text-sm mb-3 ${
                    selectedFrequency === key ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {freq.hz} Hz
                  </div>
                  <div 
                    className="w-full h-3 rounded-full"
                    style={{ 
                      backgroundColor: selectedFrequency === key ? 'rgba(255,255,255,0.3)' : freq.color + '40'
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Current Frequency Display */}
          <motion.div 
            className="text-center w-full max-w-lg mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          >
            <div className="p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/95 to-terracotta-50/90 backdrop-blur-xl shadow-2xl border border-terracotta-200/50">
              <div className="text-5xl lg:text-6xl font-light text-amber-800 mb-2"
                   style={{ fontFamily: "'Playfair Display', serif" }}>
                {frequencies[selectedFrequency as keyof typeof frequencies].hz}
              </div>
              <div className="text-lg lg:text-xl text-gray-500 mb-4 font-light">Hz</div>
              
              <div className="text-2xl font-medium mb-4"
                   style={{ 
                     color: frequencies[selectedFrequency as keyof typeof frequencies].color
                   }}>
                {frequencies[selectedFrequency as keyof typeof frequencies].name} Frequency
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed max-w-sm mx-auto">
                {frequencies[selectedFrequency as keyof typeof frequencies].description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {frequencies[selectedFrequency as keyof typeof frequencies].benefits.map((benefit, index) => (
                  <span 
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-stone-100 text-gray-600 font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>


        </motion.div>
      </div>

      {/* Luxury Trust Indicators - Non-overlapping */}
      <div className="relative z-10 pb-8">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 text-amber-800 text-base bg-gradient-to-r from-amber-50/95 to-terracotta-50/95 backdrop-blur-xl px-10 py-6 rounded-2xl shadow-2xl border border-terracotta-200/50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-medium">30+ Years Experience</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-medium">Tesla Wellness Technology</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-medium">Certified Practitioner</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}