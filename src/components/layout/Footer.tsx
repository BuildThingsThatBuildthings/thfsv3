'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-terracotta-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
        >
          {/* Business Info */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-inter font-light text-white tracking-wider mb-4">
                THE HEALING FREQUENCY SPACE
              </h3>
              <p className="text-lg italic text-gold font-light mb-2">
                Change Your Frequency, Change Everything
              </p>
            </motion.div>
            
            <motion.p 
              className="text-slate-300 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Nashville&apos;s premier destination for frequency-based healing. Experience transformative 
              wellness through our exclusive Tesla Wellness Table and RoXiva light therapy sessions.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>30+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>Nashville&apos;s Only Tesla Wellness Table</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>1000+ Lives Transformed</span>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium text-white mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Victoria', href: '/about' },
                { label: 'Tesla Wellness Table', href: '/services/tesla-wellness-table' },
                { label: 'RoXiva Light Therapy', href: '/services/roxiva-light-therapy' },
                { label: 'All Services', href: '/services' },
                { label: 'Testimonials', href: '/testimonials' },
                { label: 'Resources', href: '/resources' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-slate-300 hover:text-terracotta-500 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium text-white mb-6">Connect</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-slate-400 uppercase tracking-wider">Location</div>
                <div className="text-slate-300">
                  123 Healing Way<br />
                  Nashville, TN 37203
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-slate-400 uppercase tracking-wider">Phone</div>
                <a 
                  href="tel:+16155554325" 
                  className="text-slate-300 hover:text-terracotta-500 transition-colors duration-300"
                >
                  (615) 555-HEAL
                </a>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-slate-400 uppercase tracking-wider">Email</div>
                <a 
                  href="mailto:victoria@healingfrequencyspace.com" 
                  className="text-slate-300 hover:text-terracotta-500 transition-colors duration-300 text-sm"
                >
                  victoria@healingfrequencyspace.com
                </a>
              </div>
              
              <div className="pt-4">
                <Link 
                  href="/booking" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white px-6 py-3 rounded-lg hover:from-terracotta-600 hover:to-terracotta-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <span>Schedule Session</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Emergency Support */}
        <motion.div
          className="bg-gradient-to-r from-terracotta-500/10 to-sage/10 rounded-xl p-6 mb-12 border border-terracotta-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h4 className="text-terracotta-400 font-medium mb-2">24/7 Client Support Line</h4>
            <p className="text-slate-300 text-sm mb-3">
              For existing clients experiencing healing reactions or urgent questions
            </p>
            <a 
              href="tel:+16155554273" 
              className="text-white font-medium text-lg hover:text-terracotta-400 transition-colors duration-300"
            >
              (615) 555-CARE
            </a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-slate-600/50 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm mb-2">
                © {currentYear} The Healing Frequency Space. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs">
                Licensed healing sanctuary in Nashville, Tennessee
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <Link href="/privacy" className="text-slate-400 hover:text-terracotta-500 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-terracotta-500 transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/disclaimer" className="text-slate-400 hover:text-terracotta-500 transition-colors duration-300">
                  Medical Disclaimer
                </Link>
              </div>
              
              {/* Social Icons Placeholder */}
              <div className="flex gap-3">
                {['📧', '📞', '📍'].map((icon, index) => (
                  <div 
                    key={index}
                    className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-terracotta-500 transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-sm">{icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Medical Disclaimer */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              <strong>Medical Disclaimer:</strong> The services provided by The Healing Frequency Space are complementary 
              and alternative wellness approaches intended to support overall well-being. These services are not intended 
              to diagnose, treat, cure, or prevent any disease. Please consult with your healthcare provider before 
              beginning any new wellness program.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}