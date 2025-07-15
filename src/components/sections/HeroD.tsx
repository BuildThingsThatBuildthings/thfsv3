'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function HeroD() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [portalHovered, setPortalHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Particle system for healing energy
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      opacity: number;
      life: number;
    }> = [];

    // Earth-tone healing colors
    const healingColors = [
      '#D4A574', // Warm Caramel
      '#C49B6D', // Sandy Brown
      '#B08968', // Sage Brown
      '#8B7355', // Mushroom
      '#A68B5B', // Antique Brass
      '#D2B48C', // Tan
      '#DEB887'  // Burlywood
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: healingColors[Math.floor(Math.random() * healingColors.length)],
        opacity: Math.random() * 0.3 + 0.1,
        life: Math.random() * 1000 + 500
      };
    };

    // Initialize particles - fewer for cleaner look
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle());
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        // Gentle drift toward center (portal attraction)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distanceToCenter = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
        );
        
        if (distanceToCenter > 100) {
          particle.vx += (centerX - particle.x) * 0.0001;
          particle.vy += (centerY - particle.y) * 0.0001;
        }

        // Breathing effect
        const breathingScale = 1 + Math.sin(time * 0.01) * 0.1;
        
        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * breathingScale, 0, Math.PI * 2);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, particle.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        // Reset particle if it dies or goes off screen
        if (particle.life <= 0 || 
            particle.x < -50 || particle.x > canvas.width + 50 ||
            particle.y < -50 || particle.y > canvas.height + 50) {
          particles[index] = createParticle();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portalScale = Math.max(0.5, 1 - scrollY / 1000);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-warmGold-50">
      
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Central Portal - Luxury Earth Tones */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        
        {/* Portal Container - Clean Layout */}
        <motion.div
          className="relative flex flex-col items-center"
          style={{ scale: portalScale }}
          onHoverStart={() => setPortalHovered(true)}
          onHoverEnd={() => setPortalHovered(false)}
        >
          
          {/* Clean Business Name - Above Portal */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <h1 className="text-4xl lg:text-5xl font-thin text-amber-800 text-center tracking-[0.2em] mb-3"
                style={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200
                }}>
              THE HEALING FREQUENCY SPACE
            </h1>
            <h2 className="text-lg lg:text-xl font-light text-terracotta-600 text-center tracking-[0.15em]"
                style={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300
                }}>
              NASHVILLE
            </h2>
          </motion.div>

          {/* Main Portal Circle - Refined */}
          <motion.div
            className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden mb-12"
            animate={{
              scale: portalHovered ? 1.05 : 1
            }}
            transition={{
              scale: { duration: 0.6, ease: "easeOut" }
            }}
          >
            {/* Portal Background - Earth Energy */}
            <div className="absolute inset-0 bg-gradient-radial from-terracotta-200/30 via-warmGold-100/20 to-transparent" />
            
            {/* Elegant Breathing Ring */}
            <motion.div
              className="absolute inset-6 rounded-full border-3 border-terracotta-300/50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner Portal Glow - Earth Tones */}
            <motion.div
              className="absolute inset-12 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,165,116,0.3) 0%, rgba(196,155,109,0.2) 50%, transparent 100%)',
                backdropFilter: 'blur(15px)'
              }}
              animate={{
                opacity: portalHovered ? 1 : 0.7
              }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Refined Sacred Geometry Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-24 relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {/* Simplified Flower of Life Pattern */}
                {[0, 120, 240].map((rotation) => (
                  <div
                    key={rotation}
                    className="absolute inset-0 border-2 border-terracotta-400/60 rounded-full"
                    style={{
                      transform: `rotate(${rotation}deg) translateY(-12px)`
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Direct Beautiful Messaging */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <p className="text-2xl lg:text-3xl text-amber-800 font-thin max-w-3xl mx-auto leading-relaxed mb-8"
               style={{ 
                 fontFamily: "'Inter', sans-serif",
                 fontWeight: 200,
                 letterSpacing: '0.02em'
               }}>
              Transform your wellbeing through the power of Tesla technology and healing frequencies.
            </p>
            
            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed"
               style={{ 
                 fontFamily: "'Inter', sans-serif",
                 fontWeight: 300
               }}>
              Experience profound healing in Nashville's most advanced wellness sanctuary.
            </p>
          </motion.div>

          {/* Clean Powerful Call to Action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 lg:gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6 }}
          >
            <Button
              href="/booking"
              variant="primary"
              size="lg"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-light text-lg px-16 py-6 rounded-none border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.05em'
              }}
            >
              SCHEDULE NOW
            </Button>
            <Button
              href="/gallery"
              variant="outline"
              size="lg"
              className="border border-amber-400 text-amber-700 hover:text-amber-900 hover:border-amber-600 bg-transparent hover:bg-transparent font-light text-lg px-16 py-6 rounded-none shadow-none hover:shadow-none transition-all duration-300 transform hover:-translate-y-1"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.05em'
              }}
            >
              LEARN MORE
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Clean Trust Indicators */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.0 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 text-gray-500 text-sm">
          <span className="font-light tracking-wide" style={{ 
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300
          }}>30+ YEARS EXPERIENCE</span>
          <span className="font-light tracking-wide" style={{ 
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300
          }}>TESLA WELLNESS TECHNOLOGY</span>
          <span className="font-light tracking-wide" style={{ 
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300
          }}>CERTIFIED PRACTITIONER</span>
        </div>
      </motion.div>

      {/* Clean Scroll Invitation */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ 
          opacity: { duration: 1.5, delay: 2.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="text-gray-400 text-xs text-center">
          <div className="w-4 h-7 border border-gray-300 rounded-full mx-auto mb-1 relative">
            <motion.div
              className="w-0.5 h-1.5 bg-gray-400 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="font-light tracking-[0.1em] uppercase text-xs" style={{ 
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300
          }}>EXPLORE</span>
        </div>
      </motion.div>
    </section>
  );
}