"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Healing frequency video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-100"
          style={{ objectPosition: "top" }}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          poster="/images/placeholder.svg"
        >
          <source src="/videos/thfs_hero2.mp4" type="video/mp4" />
        </video>

        {/* Fallback background if video fails */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-terracotta-400/60 via-warmGold/50 to-sage-500/40" />
        )}

        {/* Minimal overlay for text readability only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

      {/* Content overlay with enhanced background */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-8 py-32">
        {/* Business name - Elegant spacing */}
        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-cream mb-24 tracking-[0.3em] uppercase opacity-100"
          style={{
            textShadow:
              "3px 3px 6px rgba(139, 69, 19, 0.8), 0 0 12px rgba(217, 119, 6, 0.6), 1px 1px 2px rgba(101, 63, 13, 0.9)",
          }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          The Healing Frequency Space
        </motion.h2>

        {/* Main hook with enhanced typography */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter font-medium text-amber-50 mb-20 max-w-5xl leading-[1.1] tracking-tight"
          style={{
            textShadow:
              "4px 4px 8px rgba(139, 69, 19, 0.9), 0 0 16px rgba(217, 119, 6, 0.7), 2px 2px 4px rgba(101, 63, 13, 1), 0 0 24px rgba(139, 69, 19, 0.5)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          Step into a space where frequency becomes transformation.
        </motion.h1>

        {/* Subtitle with more breathing room */}
        <motion.p
          className="text-2xl md:text-3xl text-white mb-24 max-w-3xl leading-relaxed font-semibold"
          style={{
            textShadow:
              "4px 4px 8px rgba(139, 69, 19, 1), 0 0 16px rgba(217, 119, 6, 0.8), 2px 2px 4px rgba(101, 63, 13, 1), 0 0 24px rgba(139, 69, 19, 0.6)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          Experience tailored frequencies guiding your healing journey to
          optimal well-being - now available remotely worldwide.
        </motion.p>


        {/* CTA Buttons with elegant spacing */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          <Button
            href="/remote-healing"
            variant="primary"
            size="lg"
            className="text-lg px-12 py-5 shadow-2xl hover:shadow-terracotta-500/25 transition-all duration-300 hover:scale-105"
          >
            Learn About Remote Sessions
          </Button>

          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="text-lg px-12 py-5 bg-white/90 backdrop-blur-md border-4 border-white text-amber-900 font-bold hover:bg-white hover:border-amber-200 hover:text-amber-800 shadow-2xl hover:shadow-white/60 transition-all duration-300 hover:scale-105 drop-shadow-lg"
          >
            Meet Victoria - Frequency Healing Practitioner
          </Button>
        </motion.div>


      </div>
    </section>
  );
}