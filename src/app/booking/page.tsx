'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cream/10 to-white py-32">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          <h1 className="text-4xl md:text-5xl font-inter font-light text-amber-800 mb-6 tracking-tight">
            Schedule Your{' '}
            <span className="italic text-sage font-normal">Healing Session</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Begin your transformation journey with a personalized consultation and healing session 
            at Nashville&apos;s premier frequency healing sanctuary.
          </p>
        </motion.div>

        {/* Booking Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* In-Person Sessions */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-sage/10 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-terracotta-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-inter font-medium text-amber-800 mb-3">
                In-Person Sessions
              </h3>
              <p className="text-slate-600">
                Experience the full power of our Tesla Wellness Table and RoXiva light therapy 
                in our Nashville healing sanctuary.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Initial Consultation</span>
                <span className="font-medium text-amber-800">$150</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tesla Wellness Table</span>
                <span className="font-medium text-amber-800">$55-140</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">RoXiva Light Therapy</span>
                <span className="font-medium text-amber-800">$50-75</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Herbal Consultation</span>
                <span className="font-medium text-amber-800">$50-135</span>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              className="w-full hover:scale-105 transition-transform duration-300"
            >
              Book In-Person Session
            </Button>
          </motion.div>

          {/* Remote Sessions */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-sage/10 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌐</span>
              </div>
              <h3 className="text-2xl font-inter font-medium text-amber-800 mb-3">
                Remote Sessions
              </h3>
              <p className="text-slate-600">
                Experience the power of distance healing from the comfort of your home 
                through quantum field technology.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Virtual Consultation</span>
                <span className="font-medium text-amber-800">$75</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Extended Remote Session</span>
                <span className="font-medium text-amber-800">$120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">4-Session Package</span>
                <span className="font-medium text-amber-800">$255</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full hover:scale-105 transition-transform duration-300"
            >
              Book Remote Session
            </Button>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          className="text-center bg-gradient-to-r from-sage/5 via-cream/5 to-gold/5 rounded-2xl p-12 border border-sage/10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-inter font-light text-amber-800 mb-6">
            Need Help Choosing the{' '}
            <span className="italic text-terracotta-500 font-normal">Right Session</span>?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Victoria offers complimentary 15-minute consultations to help determine 
            the best healing approach for your unique needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              href="tel:+16155554325"
              variant="primary"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              Call (615) 555-HEAL
            </Button>
            <Button
              href="mailto:victoria@healingfrequencyspace.com"
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              Email Victoria
            </Button>
          </div>

          <div className="text-sm text-slate-500">
            <p>Location: 123 Healing Way, Nashville, TN 37203</p>
            <p>Hours: Monday-Friday 9AM-7PM, Saturday 10AM-5PM, Sunday by appointment</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}