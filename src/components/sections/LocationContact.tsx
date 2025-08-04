'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function LocationContact() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-terracotta-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-terracotta-500 font-medium uppercase tracking-wider text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Connect With Us
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-white mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Get in Touch for Your{' '}
            <span className="italic text-gold font-normal">Healing Journey</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Reach out to learn more about our frequency healing services and 
            schedule your personalized consultation.
          </motion.p>
        </motion.div>

        {/* Contact Information - Centered Layout */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-inter font-light text-white mb-8 text-center">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              {/* Phone */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-terracotta-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="w-3 h-3 bg-terracotta-500 rounded-sm" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider">Phone</div>
                  <a 
                    href="tel:+16155554325" 
                    className="text-lg text-white font-medium hover:text-terracotta-400 transition-colors duration-300"
                  >
                    (615) 555-HEAL
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="w-3 h-2 bg-sage-500 rounded-sm" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider">Email</div>
                  <a 
                    href="mailto:victoria@healingfrequencyspace.com" 
                    className="text-lg text-white font-medium hover:text-sage-400 transition-colors duration-300"
                  >
                    victoria@healingfrequencyspace.com
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-inter font-light text-white mb-6">
            Ready to Begin Your{' '}
            <span className="italic text-gold font-normal">Healing Journey</span>?
          </h3>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Experience transformative frequency healing through our in-person and remote services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/booking"
              variant="primary"
              size="lg"
            >
              Schedule Your Session
            </Button>
            <Button
              href="tel:+16155554325"
              variant="outline"
              size="lg"
            >
              Call to Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}