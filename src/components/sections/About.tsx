"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Interactive background elements
const FloatingOrb = ({ size = 'w-32 h-32', color = 'bg-sage/5', position = 'top-20 left-10', delay = 0 }) => (
  <motion.div
    className={`absolute ${size} ${color} ${position} rounded-full blur-3xl pointer-events-none`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export function About() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-cream/5 to-white overflow-hidden">
      {/* Enhanced background pattern with floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb size="w-32 h-32" color="bg-sage/5" position="top-20 left-10" delay={0} />
        <FloatingOrb size="w-40 h-40" color="bg-warmGold/5" position="bottom-20 right-10" delay={2} />
        <FloatingOrb size="w-24 h-24" color="bg-terracotta/5" position="top-1/2 right-1/4" delay={4} />
        <FloatingOrb size="w-28 h-28" color="bg-sage/3" position="bottom-1/3 left-1/4" delay={6} />
        
        {/* Subtle gradient that moves */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-sage/5 to-transparent"
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 20%, rgba(134, 147, 122, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(134, 147, 122, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(134, 147, 122, 0.05) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Content Side */}
          <motion.div
            className="space-y-8 md:col-span-3 lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-terracotta-500 font-medium uppercase tracking-wider text-sm">
                Meet Victoria - Frequency Healing Practitioner
              </span>
              <h2 className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight">
                Founder of{" "}
                <span className="italic text-sage font-normal">
                  The Healing Frequency Space
                </span>
              </h2>
            </motion.div>

            <motion.div
              className="space-y-6 text-lg text-slate-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>
                Victoria founded The Healing Frequency Space to share her decades of 
                experience with wellness approaches that focus on frequency and biofield 
                research. She holds a BFA in Fine Arts from The George Washington University 
                and spent her early career in Los Angeles working in the natural health 
                industry while developing her artistic practice. During this time, she 
                gained training in nutritional approaches and natural health education.
              </p>
              <p>
                Victoria&apos;s personal wellness journey began in her family, influenced by 
                her Greek Orthodox grandmother&apos;s wisdom and guidance. In the early 1990s, 
                she began studying meditation and contemplative practices that became 
                foundational to her understanding of mind-body wellness. A pivotal moment 
                in 1994, when she met an internationally recognized spiritual teacher, 
                deepened her commitment to exploring how consciousness and well-being connect.
              </p>
              <p>
                While raising two children, Victoria pursued additional training in energy 
                work, including Reiki certification, and built a successful career in 
                decorative design and real estate. She is currently completing advanced 
                studies in herbalism through the National Health Institute in Maui, Hawaii, 
                expanding her knowledge of plant-based wellness approaches. Her work is 
                grounded in principles of compassion, education, and genuine care for others.
              </p>
              <p>
                Victoria&apos;s interest in emerging wellness technologies led her to open 
                The Healing Frequency Space, where she provides education about frequency-based 
                approaches including Rife and Solfeggio frequencies, Tesla biofield technology, 
                and RoXiva light therapy. Her focus is on helping clients understand these 
                modalities through clear information and supportive guidance, allowing each 
                person to make informed decisions about their wellness journey.
              </p>
            </motion.div>

          </motion.div>

          {/* Image Side with enhanced interactions */}
          <motion.div
            className="relative md:col-span-2 lg:col-span-5 group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl cursor-pointer"
              whileHover={{ 
                boxShadow: '0 25px 50px rgba(134, 147, 122, 0.3)'
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/images/victoria-colorful-chair.jpg"
                alt="Victoria - Healing expert in colorful chair"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Enhanced overlay with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-sage/20 via-transparent to-transparent group-hover:from-sage/10 transition-all duration-500" />
              
              {/* Subtle shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.6 }}
              />
              
              {/* Gentle glow around the edges */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-sage/20"
                transition={{ duration: 0.4 }}
              />
            </motion.div>
            
            {/* Floating accent element */}
            <motion.div
              className="absolute -bottom-4 -left-4 w-8 h-8 bg-sage/20 rounded-full backdrop-blur-sm border border-sage/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
