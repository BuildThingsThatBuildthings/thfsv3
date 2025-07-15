'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

export function About() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-cream/5 to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            className="space-y-8"
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
                Meet Victoria
              </span>
              <h2 className="text-4xl md:text-5xl font-inter font-light text-amber-800 mt-4 mb-6 tracking-tight">
                Nashville&apos;s Premier{' '}
                <span className="italic text-sage font-normal">Frequency Healing</span>{' '}
                Expert
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
                With over 30 years of experience in holistic healing, Victoria has dedicated her life 
                to helping others find their path to wellness through the transformative power of 
                frequency healing.
              </p>
              <p>
                As Nashville&apos;s only certified practitioner offering Tesla Wellness Table and RoXiva 
                light therapy sessions, Victoria combines cutting-edge technology with time-tested 
                healing wisdom to create truly personalized healing experiences.
              </p>
              <p>
                Her approach integrates kinesiology, energy healing, and advanced frequency technologies 
                to address not just symptoms, but the root causes of imbalance in your life.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                href="/about"
                variant="primary"
                size="lg"
                className="hover:scale-105 transition-transform duration-300"
              >
                Learn About Victoria&apos;s Journey
              </Button>
              <Button
                href="/booking"
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-transform duration-300"
              >
                Book a Consultation
              </Button>
            </motion.div>
            
            {/* Credentials */}
            <motion.div
              className="pt-8 border-t border-sage/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-medium text-amber-700 mb-4 uppercase tracking-wider">
                Certifications & Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span>Certified Holistic Practitioner</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span>Kinesiology Specialist</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span>Tesla Wellness Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span>RoXiva Light Therapy</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/victoria-healing-expert.jpeg"
                alt="Victoria - The Healing Frequency Space founder and practitioner"
                fill
                className="object-cover"
              />
              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sage/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating stats */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-sage/10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-3xl font-inter font-light text-terracotta-500 mb-1">30+</div>
                <div className="text-sm text-slate-600 font-medium">Years Experience</div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-sage/10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-3xl font-inter font-light text-sage mb-1">1000+</div>
                <div className="text-sm text-slate-600 font-medium">Lives Transformed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}