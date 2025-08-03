'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function LocationContact() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
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
            Visit Our Sanctuary
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-inter font-light text-white mt-4 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Located in the Heart of{' '}
            <span className="italic text-gold font-normal">Nashville</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Discover your path to wellness in our thoughtfully designed healing sanctuary, 
            easily accessible from anywhere in Middle Tennessee.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-inter font-light text-white mb-6">
                Connect With Us
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
                    <span className="text-white text-lg">📞</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Phone</div>
                    <div className="text-lg text-white font-medium">(615) 555-HEAL</div>
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
                    <span className="text-white text-lg">✉️</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Email</div>
                    <div className="text-lg text-white font-medium">victoria@healingfrequencyspace.com</div>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">📍</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Location</div>
                    <div className="text-lg text-white font-medium">
                      123 Healing Way<br />
                      Nashville, TN 37203
                    </div>
                  </div>
                </motion.div>

                {/* Hours */}
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-terracotta-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🕐</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Hours</div>
                    <div className="text-lg text-white font-medium">
                      Monday - Friday: 9:00 AM - 7:00 PM<br />
                      Saturday: 10:00 AM - 5:00 PM<br />
                      Sunday: By Appointment
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Emergency Contact */}
            <motion.div
              className="bg-terracotta-500/10 border border-terracotta-500/20 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-terracotta-400 font-medium mb-2">24/7 Support Line</h4>
              <p className="text-slate-300 text-sm mb-3">
                For existing clients experiencing healing reactions or urgent questions.
              </p>
              <div className="text-white font-medium">(615) 555-CARE</div>
            </motion.div>
          </motion.div>

          {/* Map & Directions */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Map placeholder */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <div className="text-white font-medium">Interactive Map</div>
                <div className="text-slate-400 text-sm">Coming Soon</div>
              </div>
            </div>

            {/* Directions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-inter font-light text-white mb-6">
                Easy to Find
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center text-xs text-white font-bold">1</div>
                  <div>
                    <div className="text-white font-medium">From Downtown Nashville</div>
                    <div className="text-slate-400 text-sm">Take I-65 South for 5 minutes to Exit 81</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center text-xs text-white font-bold">2</div>
                  <div>
                    <div className="text-white font-medium">Free Parking Available</div>
                    <div className="text-slate-400 text-sm">Dedicated parking lot with convenient access</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center text-xs text-white font-bold">3</div>
                  <div>
                    <div className="text-white font-medium">Ground Floor Entrance</div>
                    <div className="text-slate-400 text-sm">Fully accessible with wheelchair access</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

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
            Discover remote healing options available worldwide, including pet healing and EMF protection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/remote-healing"
              variant="primary"
              size="lg"
              className="bg-terracotta-500 hover:bg-terracotta-600 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Explore Remote Healing
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300"
            >
              Ask Questions First
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}